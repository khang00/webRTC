import DeckGL from "@deck.gl/react";
import { HexagonLayer } from "@deck.gl/aggregation-layers";

const data = [{ COORDINATES: [-122.42177834, 37.78346622] }];

const layer = new HexagonLayer({
  id: "hexagon-layer",
  data,
  pickable: true,
  opacity: 0.8,
  stroked: true,
  filled: true,
  radiusScale: 6,
  radiusMinPixels: 1,
  radiusMaxPixels: 100,
  lineWidthMinPixels: 1,
  getPosition: (d) => d.coordinates,
  getRadius: (d) => Math.sqrt(d.exits),
  getFillColor: (d) => [255, 140, 0],
  getLineColor: (d) => [0, 0, 0],
});

const Map = () => {
  const layers = [layer];

  return <DeckGL controller={true} layers={layers} />;
};
