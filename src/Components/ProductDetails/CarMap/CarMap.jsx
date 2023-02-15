import React, { useRef, useEffect, useState } from "react";
import maplibregl from "maplibre-gl";
import "./carMap.scss";

const CarMap = (props) => {
  const mapContainerRef = useRef();
  const map = useRef(null);
  const [lng] = useState(props.lng);
  const [lat] = useState(props.lat);
  const [zoom] = useState(13);
  const [API_KEY] = useState("ikAqi1XMHQHDEkoG9cUC");

  useEffect(() => {
    if (map.current) return;
    map.current = new maplibregl.Map({
      container: mapContainerRef.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
      center: [lng, lat],
      zoom: zoom,
    });
  });

  return (
    <div className="map_wrapper">
      <h2>Location</h2>
      <span>
        {props.location} {props.city}
      </span>
      <div className="map-wrap">
        <div ref={mapContainerRef} className="map" />
      </div>
    </div>
  );
};

export default CarMap;
