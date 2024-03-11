import React from "react";
import { Icon } from "leaflet";
import classNames from "classnames";
import styles from "./map.module.css";
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import type { Castel } from "@/app/Type/Castel";

interface MapProps {
  castels: Castel[];
  location: [number, number];
}

function Map({ castels, location }: MapProps): React.JSX.Element {
  const myIcon = new Icon({
    iconUrl: "/images/marker-icon.png",
    iconSize: [25, 41],
  });

  return (
    <MapContainer
      className={classNames(styles.map)}
      center={location}
      zoom={2}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {castels.map((castel) => (
        <Marker
          key={castel.name}
          position={castel.coordinates as [number, number]}
          icon={myIcon}
        >
          <Popup>{castel.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Map;
