import DeckGL from "@deck.gl/react";
import { HexagonLayer } from "@deck.gl/aggregation-layers";
import { StaticMap } from "react-map-gl";
import { MapView } from "@deck.gl/core";
import styles from "../styles/Map.module.css";

const data = [
  [106.6835318, 10.7670787],
  [106.6835318, 10.7670787],
  [106.6835318, 10.7670787],
];

const INITIAL_VIEW_STATE = {
  longitude: 106.6835318,
  latitude: 10.7670787,
  zoom: 10,
  minZoom: 5,
  maxZoom: 1000,
  pitch: 0,
  bearing: 0,
};

const Map = () => {
  const LAYER = new HexagonLayer({
    id: "hexagon-layer",
    data,
    colorDomain: [1, 2, 3, 5, 8, 13, 21],
    pickable: true,
    opacity: 0.8,
    stroked: true,
    filled: true,
    radiusScale: 6,
    radiusMinPixels: 1,
    radiusMaxPixels: 100,
    lineWidthMinPixels: 1,
    getPosition: (d) => d,
  });

  return (
    <div className={styles.map}>
      <DeckGL
        controller={true}
        initialViewState={INITIAL_VIEW_STATE}
        layers={[LAYER]}
      >
        <MapView id="map" height="60%" controller={true}>
          <StaticMap mapboxApiAccessToken="pk.eyJ1IjoiZHZrbmRuIiwiYSI6ImNraHZ0ejA5azFhcDMycnBpYzM2aGRlcjAifQ.tYlEq89Jn2NPJnSRu15OFA" />
        </MapView>
      </DeckGL>
    </div>
  );
};

export default Map;
