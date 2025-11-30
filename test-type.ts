import { offset, randomOffset } from './src/geojson-offset.js';

import type {
  Point,
  LineString,
  Polygon,
  Feature,
  FeatureCollection,
} from 'geojson';

// Pointのテスト
const point: Point = { type: 'Point', coordinates: [0, 0] };
const resultPoint = offset(point, 1, 1);
// resultPointの型は Point として保持されている
const pointCoords = resultPoint.coordinates; // エラーなし！
console.log('Point coordinates:', pointCoords);

// LineStringのテスト
const lineString: LineString = {
  type: 'LineString',
  coordinates: [
    [0, 0],
    [1, 1],
  ],
};
const resultLineString = offset(lineString, 1, 1);
// resultLineStringの型は LineString として保持されている
const lineCoords = resultLineString.coordinates; // エラーなし！
console.log('LineString coordinates:', lineCoords);

// Polygonのテスト
const polygon: Polygon = {
  type: 'Polygon',
  coordinates: [
    [
      [0, 0],
      [1, 0],
      [1, 1],
      [0, 1],
      [0, 0],
    ],
  ],
};
const resultPolygon = offset(polygon, 2, 2);
const polyCoords = resultPolygon.coordinates; // エラーなし！
console.log('Polygon coordinates:', polyCoords);

// Featureのテスト
const feature: Feature<Point> = {
  type: 'Feature',
  geometry: { type: 'Point', coordinates: [5, 5] },
  properties: { name: 'test' },
};
const resultFeature = offset(feature, 1, 1);
const featureGeom = resultFeature.geometry; // エラーなし！
console.log('Feature geometry:', featureGeom);

// FeatureCollectionのテスト
const featureCollection: FeatureCollection<Point> = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [0, 0] },
      properties: null,
    },
  ],
};
const resultFC = offset(featureCollection, 3, 3);
const fcFeatures = resultFC.features; // エラーなし！
console.log('FeatureCollection features:', fcFeatures);

// randomOffsetのテスト
const point2: Point = { type: 'Point', coordinates: [10, 10] };
const resultRandom = randomOffset(point2, [-1, 1], [-1, 1]);
const randomCoords = resultRandom.coordinates; // エラーなし！
console.log('Random offset coordinates:', randomCoords);
