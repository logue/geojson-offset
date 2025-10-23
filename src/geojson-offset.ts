import type { GeoJSON, Position } from 'geojson';

/**
 * Validates if a GeoJSON object is valid and non-null
 * @param geojson - GeoJSON object to validate
 */
function validateGeoJSON(
  geojson: GeoJSON | null | undefined
): asserts geojson is GeoJSON {
  if (geojson == null) {
    throw new Error(
      'geojson-offset: GeoJSON object cannot be null or undefined'
    );
  }
  if (typeof geojson !== 'object' || !geojson.type) {
    throw new Error('geojson-offset: Invalid GeoJSON object');
  }
}

/**
 * Add offset to GeoJSON coordinates.
 *
 * @param geojson - GeoJSON to change
 * @param xOffset - X-coordinate offset
 * @param yOffset - Y-coordinate offset
 * @param zOffset - Z-coordinate offset
 * @returns The modified GeoJSON object
 */
export const offset = (
  geojson: GeoJSON,
  xOffset: number,
  yOffset: number,
  zOffset?: number
): GeoJSON => {
  validateGeoJSON(geojson);

  if (!Number.isFinite(xOffset) || !Number.isFinite(yOffset)) {
    throw new Error('geojson-offset: Offset values must be finite numbers');
  }

  if (zOffset !== undefined && !Number.isFinite(zOffset)) {
    throw new Error('geojson-offset: Z-offset value must be a finite number');
  }

  switch (geojson.type) {
    case 'Point':
      pointOffset(geojson.coordinates, xOffset, yOffset, zOffset);
      break;
    case 'MultiPoint':
    case 'LineString':
      coordinateArrayOffset(geojson.coordinates, xOffset, yOffset, zOffset);
      break;
    case 'MultiLineString':
    case 'Polygon':
      coordinateNestedArrayOffset(
        geojson.coordinates,
        xOffset,
        yOffset,
        zOffset
      );
      break;
    case 'MultiPolygon':
      for (const polygon of geojson.coordinates) {
        coordinateNestedArrayOffset(polygon, xOffset, yOffset, zOffset);
      }
      break;
    case 'Feature':
      if (geojson.geometry) {
        offset(geojson.geometry, xOffset, yOffset, zOffset);
      }
      break;
    case 'FeatureCollection':
      for (const feature of geojson.features) {
        offset(feature, xOffset, yOffset, zOffset);
      }
      break;
    default:
      throw new Error(
        `geojson-offset: ${String((geojson as { type?: string }).type)} is not a supported GeoJSON type`
      );
  }
  return geojson;
};

/**
 * Add random offset to GeoJSON coordinates.
 *
 * @param geojson - GeoJSON to change
 * @param xRange - X-coordinate offset range [min, max]
 * @param yRange - Y-coordinate offset range [min, max]
 * @param zRange - Z-coordinate offset range [min, max] (optional)
 * @returns The modified GeoJSON object
 */
export const randomOffset = (
  geojson: GeoJSON,
  xRange: Position,
  yRange: Position,
  zRange?: Position
): GeoJSON => {
  if (
    !Array.isArray(xRange) ||
    xRange.length < 2 ||
    !Array.isArray(yRange) ||
    yRange.length < 2
  ) {
    throw new Error(
      'geojson-offset: Range arrays must have at least 2 elements'
    );
  }

  if (zRange !== undefined && (!Array.isArray(zRange) || zRange.length < 2)) {
    throw new Error(
      'geojson-offset: Z-range array must have at least 2 elements'
    );
  }

  const xMin = xRange[0] ?? 0;
  const xMax = xRange[1] ?? 0;
  const yMin = yRange[0] ?? 0;
  const yMax = yRange[1] ?? 0;

  const xOffset = xMin + (xMax - xMin) * Math.random();
  const yOffset = yMin + (yMax - yMin) * Math.random();
  const zOffset =
    zRange !== undefined
      ? (zRange[0] ?? 0) + ((zRange[1] ?? 0) - (zRange[0] ?? 0)) * Math.random()
      : undefined;

  return offset(geojson, xOffset, yOffset, zOffset);
};

/**
 * Apply offset to a single coordinate position
 * @param coordinates - Current position
 * @param x - Offset X
 * @param y - Offset Y
 * @param z - Offset Z (optional)
 */
const pointOffset = (
  coordinates: Position,
  x: number,
  y: number,
  z?: number
): void => {
  coordinates[0] += x;
  coordinates[1] += y;
  if (z !== undefined && coordinates.length > 2) {
    coordinates[2] = (coordinates[2] ?? 0) + z;
  }
};

/**
 * Apply offset to an array of coordinates (LineString, MultiPoint)
 * @param coordinates - Array of coordinate positions
 * @param x - Offset X
 * @param y - Offset Y
 * @param z - Offset Z (optional)
 */
const coordinateArrayOffset = (
  coordinates: Position[],
  x: number,
  y: number,
  z?: number
): void => {
  for (const point of coordinates) {
    pointOffset(point, x, y, z);
  }
};

/**
 * Apply offset to a nested array of coordinates (Polygon, MultiLineString)
 * @param coordinates - Nested array of coordinate positions
 * @param x - Offset X
 * @param y - Offset Y
 * @param z - Offset Z (optional)
 */
const coordinateNestedArrayOffset = (
  coordinates: Position[][],
  x: number,
  y: number,
  z?: number
): void => {
  for (const ring of coordinates) {
    coordinateArrayOffset(ring, x, y, z);
  }
};
