# geojson-offset-ts

[![jsdelivr CDN](https://data.jsdelivr.com/v1/package/npm/geojson-offset-ts/badge)](https://www.jsdelivr.com/package/npm/geojson-offset-ts)
[![NPM Downloads](https://img.shields.io/npm/dm/geojson-offset-ts.svg?style=flat)](https://www.npmjs.com/package/geojson-offset-ts)
[![Open in unpkg](https://img.shields.io/badge/Open%20in-unpkg-blue)](https://uiwjs.github.io/npm-unpkg/#/pkg/geojson-offset-ts/file/README.md)
[![npm version](https://img.shields.io/npm/v/geojson-offset-ts.svg)](https://www.npmjs.com/package/geojson-offset-ts)
[![Open in Gitpod](https://shields.io/badge/Open%20in-Gitpod-green?logo=Gitpod)](https://gitpod.io/#https://github.com/logue/geojson-offset)
[![Twitter Follow](https://img.shields.io/twitter/follow/logue256?style=plastic)](https://twitter.com/logue256)

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
