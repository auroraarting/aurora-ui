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
		elementType: "geometry",
		stylers: [
			{
				color: "#212121",
			},
		],
	},
	{
		elementType: "labels.icon",
		stylers: [
			{
				visibility: "off",
			},
		],
	},
	{
		elementType: "labels.text.fill",
		stylers: [
			{
				color: "#757575",
			},
		],
	},
	{
		elementType: "labels.text.stroke",
		stylers: [
			{
				color: "#212121",
			},
		],
	},
	{
		featureType: "administrative",
		elementType: "geometry",
		stylers: [
			{
				color: "#757575",
			},
		],
	},
	{
		featureType: "administrative.country",
		elementType: "labels.text.fill",
		stylers: [
			{
				color: "#9e9e9e",
			},
		],
	},
	{
		featureType: "administrative.land_parcel",
		elementType: "labels",
		stylers: [
			{
				visibility: "off",
			},
		],
	},
	{
		featureType: "administrative.locality",
		elementType: "labels.text.fill",
		stylers: [
			{
				color: "#bdbdbd",
			},
		],
	},
	{
		featureType: "poi",
		elementType: "labels.text",
		stylers: [
			{
				visibility: "off",
			},
		],
	},
	{
		featureType: "poi",
		elementType: "labels.text.fill",
		stylers: [
			{
				color: "#757575",
			},
		],
	},
	{
		featureType: "poi.business",
		stylers: [
			{
				visibility: "off",
			},
		],
	},
	{
		featureType: "poi.park",
		elementType: "geometry",
		stylers: [
			{
				color: "#181818",
			},
		],
	},
	{
		featureType: "poi.park",
		elementType: "labels.text.fill",
		stylers: [
			{
				color: "#616161",
			},
		],
	},
	{
		featureType: "poi.park",
		elementType: "labels.text.stroke",
		stylers: [
			{
				color: "#1b1b1b",
			},
		],
	},
	{
		featureType: "road",
		elementType: "geometry.fill",
		stylers: [
			{
				color: "#2c2c2c",
			},
		],
	},
	{
		featureType: "road",
		elementType: "labels.icon",
		stylers: [
			{
				visibility: "off",
			},
		],
	},
	{
		featureType: "road",
		elementType: "labels.text.fill",
		stylers: [
			{
				color: "#8a8a8a",
			},
		],
	},
	{
		featureType: "road.arterial",
		elementType: "geometry",
		stylers: [
			{
				color: "#373737",
			},
		],
	},
	{
		featureType: "road.highway",
		elementType: "geometry",
		stylers: [
			{
				color: "#3c3c3c",
			},
		],
	},
	{
		featureType: "road.highway.controlled_access",
		elementType: "geometry",
		stylers: [
			{
				color: "#4e4e4e",
			},
		],
	},
	{
		featureType: "road.local",
		elementType: "labels",
		stylers: [
			{
				visibility: "off",
			},
		],
	},
	{
		featureType: "road.local",
		elementType: "labels.text.fill",
		stylers: [
			{
				color: "#616161",
			},
		],
	},
	{
		featureType: "transit",
		stylers: [
			{
				visibility: "off",
			},
		],
	},
	{
		featureType: "transit",
		elementType: "labels.text.fill",
		stylers: [
			{
				color: "#757575",
			},
		],
	},
	{
		featureType: "water",
		elementType: "geometry",
		stylers: [
			{
				color: "#000000",
			},
		],
	},
	{
		featureType: "water",
		elementType: "labels.text.fill",
		stylers: [
			{
				color: "#3d3d3d",
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
	mapJson,
}) {
	let jsonToBeMapped = mapJson ? [mapJson] : locationJson;
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
			const filteredLocations = jsonToBeMapped.flatMap((country) =>
				country.markers.filter((loc) =>
					bounds.contains(new window.google.maps.LatLng(loc.lat, loc.lng))
				)
			);

			setVisibleLocations && setVisibleLocations(filteredLocations);
		}

		// Identify the country of visible markers
		const visibleCountries = new Set();
		jsonToBeMapped.forEach((country, index) => {
			if (
				country?.markers?.some((loc) =>
					bounds.contains(new window.google.maps.LatLng(loc.lat, loc.lng))
				)
			) {
				setValueOfSelect && setValueOfSelect(index);
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
					gestureHandling: "zoom", // Optional: Control gestures (pan, zoom)
					// disableDefaultUI: true, // Disable all default UI elements (including keyboard shortcuts)
				}}
			>
				{/* Child components, such as markers, info windows, etc. */}
				{jsonToBeMapped.map((country) =>
					country?.markers?.map((marker, index) => {
						/** href */
						const href = () => {
							if (marker?.url) return marker?.url;
							if (
								marker?.category?.nodes?.[0]?.contentType?.node?.name &&
								marker?.category?.nodes?.[0]?.slug
							) {
								return `/${marker?.category?.nodes?.[0]?.contentType?.node?.name}/${marker?.category?.nodes?.[0]?.slug}`;
							}

							return "/contact";
						};

						const uniqueName = marker.unique;
						return (
							<div key={index}>
								<Marker
									position={{
										lat: parseFloat(marker.lat) || parseFloat(marker.coordinates.lat),
										lng: parseFloat(marker.lng) || parseFloat(marker.coordinates.lng),
									}}
									icon={{
										url:
											marker?.icon?.node?.sourceUrl ||
											marker?.icon ||
											"/img/softwares/mapMarker.svg",
										// scaledSize: new window.google.maps.Size(10, 10),
										// origin: new window.google.maps.Point(0, 0),
										// anchor: new window.google.maps.Point(25, 50),
									}}
									onMouseOver={() => setSelectedMarker(uniqueName)}
									// onMouseOut={() => setSelectedMarker(null)}
									// onClick={() => (window.location.href = marker.url || "/contact")}
								/>
								{/* Show InfoWindow when hovering */}
								{selectedMarker === uniqueName && (
									<InfoWindow
										position={{
											lat: parseFloat(marker.lat) || parseFloat(marker.coordinates.lat),
											lng: parseFloat(marker.lng) || parseFloat(marker.coordinates.lng),
										}}
										onCloseClick={() => setSelectedMarker(null)}
									>
										<a href={href()}>
											<div
												className={`${styles.markerHover} ${
													marker?.hoverImg && `${styles.isHoverImg} isHoverImg`
												}  text_xs f_w_s_b text_uppercase`}
												// style={{ fontSize: "14px", fontWeight: "bold" }}
											>
												{marker?.name || marker?.category?.nodes?.[0]?.title}
											</div>
										</a>
									</InfoWindow>
								)}
							</div>
						);
					})
				)}
			</GoogleMap>
		</LoadScript>
	);
}
