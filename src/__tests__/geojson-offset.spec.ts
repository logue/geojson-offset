import { it, describe, expect } from 'vitest';
import {
  offset as _offset,
  randomOffset as _randomOffset,
} from '../geojson-offset';
import type {
  Feature,
  FeatureCollection,
  LineString,
  Point,
  Polygon,
} from 'geojson';
const offset = _offset;
const randomOffset = _randomOffset;

describe('offset()', () => {
  it('#1, should work with Point Geometry.', () => {
    const geometry: Point = { type: 'Point', coordinates: [0, 0] };
    offset(geometry, 1, 1);

    expect(geometry.coordinates).to.deep.equal([1, 1]);
  });

  it('#2, should work with LineString Geometry.', () => {
    const geometry: LineString = {
      type: 'LineString',
      coordinates: [
        [0, 0],
        [1, 1],
      ],
    };
    offset(geometry, 1, 1);

    expect(geometry.coordinates).to.deep.equal([
      [1, 1],
      [2, 2],
    ]);
  });

  it('#3, should work with Polygon Geometry.', () => {
    const geometry: Polygon = {
      type: 'Polygon',
      coordinates: [
        [
          [0, 0],
          [1, 1],
          [0, 1],
        ],
      ],
    };
    offset(geometry, 1, 1);

    expect(geometry.coordinates).to.deep.equal([
      [
        [1, 1],
        [2, 2],
        [1, 2],
      ],
    ]);
  });

  it('#4, hould work with Feature', () => {
    const feature: Feature<Point> = {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [0, 0],
      },
      properties: null,
    };

    offset(feature, 1, 1);
    expect(feature.geometry.coordinates).to.deep.equal([1, 1]);
  });

  it('#5, should work with FeatureCollection', () => {
    const featureCollection: FeatureCollection<Point> = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [0, 0],
          },
        } as Feature<Point>,
      ],
    };

    offset(featureCollection, 1, 1);
    expect(featureCollection.features[0].geometry.coordinates).to.deep.equal([
      1, 1,
    ]);
  });
});

describe('randomOffset()', () => {
  it('should add a random offset to Point Geometry', () => {
    const geometry: Point = { type: 'Point', coordinates: [0, 0] };
    randomOffset(geometry, [-1, 1], [-1, 1]);

    expect(geometry.coordinates[0]).to.be.within(-1, 1);
    expect(geometry.coordinates[1]).to.be.within(-1, 1);
  });
});
