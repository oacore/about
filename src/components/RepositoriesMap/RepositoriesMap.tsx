"use client";

import { Spin } from "antd";
import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

import type { FormapPoint } from "@/app/data/formap.json/route";

import markerIcon from "./marker.svg";

import styles from "./RepositoriesMap.module.css";

// Same-site, server-cached list of [name, lat, lng] (see src/app/data/formap.json/route.ts)
const FORMAP_DATA_URL = "/data/formap.json";
const MILTON_KEYNES: [number, number] = [55.04, 0.76];

type RepositoriesMapProps = {
  className?: string;
};

/** World map of CORE data providers (ported from the old about repo `components/repositories-map`). */
const RepositoriesMap = ({ className }: RepositoriesMapProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let disposed = false;
    let map: import("leaflet").Map | undefined;

    const init = async () => {
      const L = (await import("leaflet")).default;
      await import("leaflet.markercluster");

      if (disposed || !containerRef.current) return;

      map = L.map(containerRef.current, {
        center: MILTON_KEYNES,
        zoom: 1,
        maxBounds: [
          [-70, -180],
          [70, 180],
        ],
        scrollWheelZoom: false,
        layers: [
          L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
              '<a href="https://www.openstreetmap.org">OpenStreetMap</a> under <a href="https://creativecommons.org/licenses/by-sa/2.0">CC-BY-SA</a>',
            minZoom: 1,
            maxZoom: 12,
          }),
        ],
      });

      const icon = L.icon({
        iconUrl: markerIcon.src,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      });

      const markers = L.markerClusterGroup({
        chunkedLoading: true,
        chunkProgress: (processed, total) => {
          if (!disposed && processed >= total) setIsLoading(false);
        },
      });

      try {
        const response = await fetch(FORMAP_DATA_URL);
        if (!response.ok)
          throw new Error(`Error loading data providers: ${response.status}`);

        const points = (await response.json()) as FormapPoint[];
        if (disposed) return;

        points.forEach(([name, latitude, longitude]) => {
          const marker = L.marker([latitude, longitude], { title: name, icon });
          marker.bindPopup(name);
          markers.addLayer(marker);
        });

        map.addLayer(markers);
      } catch (error) {
        // Handled: the map still renders, just without markers
        console.warn("Repositories map: could not load data providers", error);
      } finally {
        if (!disposed && !markers.getLayers().length) setIsLoading(false);
      }
    };

    void init();

    return () => {
      disposed = true;
      map?.remove();
    };
  }, []);

  return (
    <div
      className={classNames(styles.map, isLoading && styles.loading, className)}
    >
      <div className={styles.inner} ref={containerRef} />
      {isLoading ? <Spin className={styles.spinner} /> : null}
    </div>
  );
};

export default RepositoriesMap;
