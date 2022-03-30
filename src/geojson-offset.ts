import type { GeoJSON, Position } from 'geojson';
/**
 * Add offset to GeoJSON coordinates.
 *
 * @param geojson - GeoJSON to change
 * @param xOffset - X-coordinate offset
 * @param yOffset - Y-coordinate offset
 */
export const offset = (geojson: GeoJSON, xOffset: number, yOffset: number) => {
  switch (geojson.type) {
    case 'Point':
      pointOffset(geojson.coordinates, xOffset, yOffset);
      break;
    case 'MultiPoint':
    case 'LineString':
      lineStringOffset(geojson.coordinates, xOffset, yOffset);
      break;
    case 'MultiLineString':
    case 'Polygon':
      polygonOffset(geojson.coordinates, xOffset, yOffset);
      break;
    case 'MultiPolygon':
      geojson.coordinates.forEach(polygon =>
        polygonOffset(polygon, xOffset, yOffset)
      );
      break;
    case 'Feature':
      offset(geojson.geometry, xOffset, yOffset);
      break;
    case 'FeatureCollection':
      geojson.features.forEach(feature => offset(feature, xOffset, yOffset));
      break;
    default:
      throw new Error('geojson-offset: Unknown geojson type.');
  }
  return geojson;
};

/**
 * Add offset to GeoJSON coordinates.
 *
 * @param geojson - GeoJSON to change
 * @param xRange - X-coordinate offset range
 * @param yRange - Y-coordinate offset range
 */
export const randomOffset = (
  geojson: GeoJSON,
  xRange: Position,
  yRange: Position
) => {
  const xOffset = xRange[0] + (xRange[1] - xRange[0]) * Math.random();
  const yOffset = yRange[0] + (yRange[1] - yRange[0]) * Math.random();

  return offset(geojson, xOffset, yOffset);
};

/**
 * @param coordinates - Current position
 * @param x - Offset X
 * @param y - Offset Y
 */
const pointOffset = (coordinates: Position, x: number, y: number) => {
  coordinates[0] += x;
  coordinates[1] += y;
};

/**
 * @param coordinates LineString coordinates
 * @param x - Offset X
 * @param y - Offset Y
 */
const lineStringOffset = (coordinates: Position[], x: number, y: number) => {
  coordinates.forEach(point => pointOffset(point, x, y));
};

/**
 * @param coordinates Polygon coordinates
 * @param x - Offset X
 * @param y - Offset Y
 */
const polygonOffset = (coordinates: Position[][], x: number, y: number) => {
  coordinates.forEach(line => lineStringOffset(line, x, y));
};
