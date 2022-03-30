# geojson-offset-ts

Add coordinate offest to the GeoJSON.
This fork is rewritten in typescript.

## Installation

```bash
npm install geojson-offset-ts
```

```bash
yarn add geojson-offset-ts
```

## Usage

Noted this function will **UPDATE** the input geojson. If there is a need to return a copy of original geojson, please let me know by openning an issue.

`geojson-offset-ts` supports all GeoJSON types:

- FeatureCollection
- Feature
- Geometery
  - Point
  - MultiPoint
  - LineString
  - MultiLineString
  - Polygon
  - MultiPolygon

But [TopoJSON](https://github.com/topojson/topojson) does not supported. Please convert to geojson by `topojson.feature` before use.

```javascript
import { offset } from 'geojson-offset';
import { randomOffset } from 'geojson-offset';

let geojson = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-78, 48],
      },
      properties: {},
    },
  ],
};

/**
 * Pass the geojson and the x/y coordinate offset
 */
gejson = offset(geojson, -1, 1);

/**
 * Pass the geojson and x/y coordinate offset range. The same offset will be
 * applied to all features in the input GeoJSON.
 */
geojson = randomOffset(geojson, [0, 10], [-10, 10]);
```
