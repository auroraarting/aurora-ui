// MODULES //
import { useCallback, useEffect, useState } from "react";

// COMPONENTS //

// SECTIONS //

// PLUGINS //
import {
	GoogleMap,
	LoadScript,
	Marker,
	OverlayView,
	InfoWindow,
} from "@react-google-maps/api";

// UTILS //

// STYLES //
import styles from "@/styles/components/Map.module.scss";

// IMAGES //

// DATA //
import locationJson from "@/data/locations.json";

// MAP DETAILS //
const containerStyle = {
	width: "650px",
	height: "100%",
	background: "transparent",
};

const stylesMap = [
	{
		elementType: "labels",
		stylers: [
			{
				visibility: "off",
			},
		],
	},
	{
		featureType: "administrative.land_parcel",
		stylers: [
			{
				visibility: "off",
			},
		],
	},
	{
		featureType: "administrative.neighborhood",
		stylers: [
			{
				visibility: "off",
			},
		],
	},
	{
		featureType: "landscape.natural.landcover",
		elementType: "geometry.fill",
		stylers: [
			{
				color: "#e5e5e5",
			},
			{
				visibility: "on",
			},
		],
	},
	{
		featureType: "road",
		stylers: [
			{
				visibility: "off",
			},
		],
	},
	{
		featureType: "water",
		elementType: "geometry.fill",
		stylers: [
			{
				color: "#f7f7f7",
				opacity: 0,
			},
		],
	},
];

/** Map Component */
export default function Map({
	mapCenter,
	setVisibleLocations,
	setValueOfSelect,
	map,
	setMap,
}) {
	const [selectedMarker, setSelectedMarker] = useState(null); // Track hovered marker

	const center = mapCenter;

	const onLoad = useCallback((mapObj) => {
		const bounds = new window.google.maps.LatLngBounds(center);
		mapObj.fitBounds(bounds);

		// Set zoom level after fitBounds
		setTimeout(() => {
			mapObj.setZoom(4); // Change this value as needed
		}, 100);

		setMap(mapObj);
	}, []);

	/** Function to update visible locations based on map viewport */
	const updateVisibleLocations = (mapObj) => {
		if (!mapObj) return;
		const bounds = map.getBounds(); // Get the visible area of the map

		if (bounds) {
			const filteredLocations = locationJson.flatMap((country) =>
				country.markers.filter((loc) =>
					bounds.contains(new window.google.maps.LatLng(loc.lat, loc.lng))
				)
			);

			setVisibleLocations(filteredLocations);
		}

		// Identify the country of visible markers
		const visibleCountries = new Set();
		locationJson.forEach((country, index) => {
			if (
				country.markers.some((loc) =>
					bounds.contains(new window.google.maps.LatLng(loc.lat, loc.lng))
				)
			) {
				setValueOfSelect(index);
				visibleCountries.add(country.name);
			}
		});

		// // If only one country is visible, set it
		// if (visibleCountries.size === 1) {
		// 	setVisibleCountry([...visibleCountries][0]);
		// } else {
		// 	setVisibleCountry(""); // If multiple countries, clear the state
		// }
	};

	const onUnmount = useCallback(function callback(map) {
		setMap(null);
	}, []);

	useEffect(() => {
		if (map) {
			map.addListener("bounds_changed", () => updateVisibleLocations(map));
		}
	}, [map]);

	return (
		<LoadScript
			googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
			libraries={["places"]}
		>
			<GoogleMap
				mapContainerClassName={`${styles.mapContainer}`}
				mapContainerStyle={containerStyle}
				center={center}
				onLoad={onLoad}
				onUnmount={onUnmount}
				options={{
					styles: stylesMap,
					mapTypeControl: false, // Hide the "Map" and "Satellite" buttons
					streetViewControl: false, // Hide the Pegman (Street View) icon
					// zoomControl: false, // Hide the plus and minus zoom buttons
					// fullscreenControl: false, // Hide fullscreen button
					gestureHandling: "greedy", // Optional: Control gestures (pan, zoom)
					// disableDefaultUI: true, // Disable all default UI elements (including keyboard shortcuts)
				}}
			>
				{/* Child components, such as markers, info windows, etc. */}
				{locationJson.map((country) =>
					country.markers.map((marker, index) => {
						return (
							<>
								<Marker
									position={{ lat: marker.lat, lng: marker.lng }}
									icon={{
										url: "/img/softwares/mapMarker.svg",
										// scaledSize: new window.google.maps.Size(10, 10),
										// origin: new window.google.maps.Point(0, 0),
										// anchor: new window.google.maps.Point(25, 50),
									}}
									onMouseOver={() => setSelectedMarker(marker.name)}
									// onMouseOut={() => setSelectedMarker(null)}
								/>
								{/* Show InfoWindow when hovering */}
								{selectedMarker === marker.name && (
									<InfoWindow
										position={{ lat: marker.lat, lng: marker.lng }}
										onCloseClick={() => setSelectedMarker(null)}
									>
										<div
											className={`${styles.markerHover} text_xs f_w_s_b text_uppercase`}
											// style={{ fontSize: "14px", fontWeight: "bold" }}
										>
											{marker.name}
										</div>
									</InfoWindow>
								)}
							</>
						);
					})
				)}
			</GoogleMap>
		</LoadScript>
	);
}
