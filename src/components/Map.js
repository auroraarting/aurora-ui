// MODULES //
import { useCallback, useState } from "react";

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

// MAP DETAILS //
const containerStyle = {
	width: "100%",
	height: "100%",
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
			},
		],
	},
];

const center = {
	lat: -25.2744,
	lng: 133.7751,
};

/** Map Component */
export default function Map() {
	const [map, setMap] = useState(null);
	const [selectedMarker, setSelectedMarker] = useState(null); // Track hovered marker

	const onLoad = useCallback((map) => {
		const bounds = new window.google.maps.LatLngBounds(center);
		map.fitBounds(bounds);

		// Set zoom level after fitBounds
		setTimeout(() => {
			map.setZoom(4); // Change this value as needed
		}, 100);

		setMap(map);
	}, []);

	const onUnmount = useCallback(function callback(map) {
		setMap(null);
	}, []);

	return (
		<LoadScript
			googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
			libraries={["places"]}
		>
			<GoogleMap
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
				<Marker
					position={{ lat: -33.8688, lng: 151.2093 }}
					icon={{
						url: "/img/softwares/mapMarker.svg",
						// scaledSize: new window.google.maps.Size(10, 10),
						// origin: new window.google.maps.Point(0, 0),
						// anchor: new window.google.maps.Point(25, 50),
					}}
					onMouseOver={() => setSelectedMarker("New South Wales")}
					// onMouseOut={() => setSelectedMarker(null)}
				/>
				{/* Show InfoWindow when hovering */}
				{selectedMarker && (
					<InfoWindow
						position={{ lat: -33.8688, lng: 151.2093 }}
						onCloseClick={() => setSelectedMarker(null)}
					>
						<div style={{ fontSize: "14px", fontWeight: "bold" }}>
							{selectedMarker}
						</div>
					</InfoWindow>
				)}
			</GoogleMap>
		</LoadScript>
	);
}
