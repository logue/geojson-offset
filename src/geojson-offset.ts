import type { GeoJSON, Position } from 'geojson';
/**
 * Add offset to GeoJSON coordinates.
 *
 * @param geojson - GeoJSON to change
 * @param xOffset - X-coordinate offset
 * @param yOffset - Y-coordinate offset
 * @param zOffset - Z-coordinate offset
 */
export const offset = (
  geojson: GeoJSON,
  xOffset: number,
  yOffset: number,
  zOffset?: number
): GeoJSON => {
  switch (geojson.type) {
    case 'Point':
      pointOffset(geojson.coordinates, xOffset, yOffset, zOffset);
      break;
    case 'MultiPoint':
    case 'LineString':
      lineStringOffset(geojson.coordinates, xOffset, yOffset, zOffset);
      break;
    case 'MultiLineString':
    case 'Polygon':
      polygonOffset(geojson.coordinates, xOffset, yOffset, zOffset);
      break;
    case 'MultiPolygon':
      geojson.coordinates.forEach(polygon => {
        polygonOffset(polygon, xOffset, yOffset, zOffset);
      });
      break;
    case 'Feature':
      offset(geojson.geometry, xOffset, yOffset, zOffset);
      break;
    case 'FeatureCollection':
      geojson.features.forEach(feature =>
        offset(feature, xOffset, yOffset, zOffset)
      );
      break;
    default:
      throw new Error(`geojson-offset: ${geojson.type} is not supported type.`);
  }
  return geojson;
};

/**
 * Add offset to GeoJSON coordinates.
 *
 * @param geojson - GeoJSON to change
 * @param xRange - X-coordinate offset range
 * @param yRange - Y-coordinate offset range
 * @param zRange - Z-coordinate offset range
 */
export const randomOffset = (
  geojson: GeoJSON,
  xRange: Position,
  yRange: Position,
  zRange?: Position
): GeoJSON => {
  const xOffset =
    (xRange[0] ?? 0) + ((xRange[1] ?? 0) - (xRange[0] ?? 0)) * Math.random();
  const yOffset =
    (yRange[0] ?? 0) + ((yRange[1] ?? 0) - (yRange[0] ?? 0)) * Math.random();
  const zOffset =
    zRange !== undefined
      ? (zRange[0] ?? 0) + ((zRange[1] ?? 0) - (zRange[0] ?? 0)) * Math.random()
      : undefined;

  return offset(geojson, xOffset, yOffset, zOffset);
};

/**
 * @param coordinates - Current position
 * @param x - Offset X
 * @param y - Offset Y
 * @param z - Offset Z
 */
const pointOffset = (
  coordinates: Position,
  x: number,
  y: number,
  z?: number
): void => {
  coordinates[0] += x;
  coordinates[1] += y;
  if (z !== undefined) {
    coordinates[2] += z;
  }
};

/**
 * @param coordinates - LineString coordinates
 * @param x - Offset X
 * @param y - Offset Y
 * @param z - Offset Z
 */
const lineStringOffset = (
  coordinates: Position[],
  x: number,
  y: number,
  z?: number
): void => {
  coordinates.forEach(point => {
    pointOffset(point, x, y, z);
  });
};

/**
 * @param coordinates - Polygon coordinates
 * @param x - Offset X
 * @param y - Offset Y
 * @param z - Offset Z
 */
const polygonOffset = (
  coordinates: Position[][],
  x: number,
  y: number,
  z?: number
): void => {
  coordinates.forEach(line => {
    lineStringOffset(line, x, y, z);
  });
};
