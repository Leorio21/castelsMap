import React from "react";
import { Icon } from "leaflet";
import classNames from "classnames";
import styles from "./Map.module.css";
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import type { Castel } from "@/app/Type/Castel";
import Image from "next/image";

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
          <Popup>
            <div className={classNames(styles.popup)}>
              <Image
                src={`/img/map_${castel.picture}`}
                width={120}
                height={72}
                alt={`Photo du chateau de ${castel.name}`}
              />
              <p className={classNames(styles.popupInfos)}>
                <span>{castel.name}</span>
                <span>
                  {castel.locality} - {castel.country}
                </span>
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Map;
