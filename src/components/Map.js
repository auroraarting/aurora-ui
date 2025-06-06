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
import stylesMapJson from "@/data/stylesForMap.json";

// MAP DETAILS //
const containerStyle = {
	width: "650px",
	height: "100%",
	background: "transparent",
};

const stylesMap = stylesMapJson;

/** Map Component */
export default function Map({
	mapCenter,
	setVisibleLocations,
	setValueOfSelect,
	map,
	setMap,
	mapJson,
	defaultZoom = 4,
}) {
	let jsonToBeMapped = mapJson ? [mapJson] : locationJson;
	const [selectedMarker, setSelectedMarker] = useState(null); // Track hovered marker

	const center = mapCenter;

	const onLoad = useCallback(
		(mapObj) => {
			if (locationJson?.length) {
				const bounds = new window.google.maps.LatLngBounds();

				locationJson?.forEach((country) => {
					country?.markers?.forEach((marker) => {
						const lat = parseFloat(marker?.coordinates?.lat || marker?.lat);
						const lng = parseFloat(marker?.coordinates?.lng || marker?.lng);
						bounds.extend(new window.google.maps.LatLng(lat, lng));
					});
				});

				mapObj.fitBounds(bounds);

				// Optional: Limit max zoom after fitBounds
				const listener = window.google.maps.event.addListenerOnce(
					mapObj,
					"bounds_changed",
					() => {
						if (mapObj.getZoom() > defaultZoom) {
							mapObj.setZoom(defaultZoom);
						}
					}
				);
			}

			setMap(mapObj);
		},
		[locationJson, defaultZoom, setMap]
	);

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
								/** keyModule  */
								const keyModule = () => {
									if (
										marker?.category?.nodes?.[0]?.contentType?.node?.name === "softwares"
									) {
										return "software";
									}
									if (
										marker?.category?.nodes?.[0]?.contentType?.node?.name === "services"
									) {
										return "service";
									}
									return marker?.category?.nodes?.[0]?.contentType?.node?.name;
								};
								return `/${keyModule()}/${marker?.category?.nodes?.[0]?.slug}`;
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
											marker?.icon?.node?.mediaItemUrl ||
											marker?.icon ||
											"/img/softwares/mapMarkerYellow.svg",
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
												<p>{marker?.name || marker?.category?.nodes?.[0]?.title}</p>
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
