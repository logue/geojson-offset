# geojson-offset-ts

English | [日本語](README.ja.md)

[![npm version](https://img.shields.io/npm/v/geojson-offset-ts.svg)](https://www.npmjs.com/package/geojson-offset-ts)
[![NPM Downloads](https://img.shields.io/npm/dm/geojson-offset-ts.svg?style=flat)](https://www.npmjs.com/package/geojson-offset-ts)
[![jsdelivr CDN](https://data.jsdelivr.com/v1/package/npm/geojson-offset-ts/badge)](https://www.jsdelivr.com/package/npm/geojson-offset-ts)
[![Open in unpkg](https://img.shields.io/badge/Open%20in-unpkg-blue)](https://uiwjs.github.io/npm-unpkg/#/pkg/geojson-offset-ts/file/README.md)
[![Open in Gitpod](https://shields.io/badge/Open%20in-Gitpod-green?logo=Gitpod)](https://gitpod.io/#https://github.com/logue/geojson-offset-ts)
[![X Follow](https://img.shields.io/twitter/follow/logue256?style=plastic)](https://twitter.com/logue256)
[![GitHub Sponsors](https://img.shields.io/github/sponsors/logue?label=Sponsor&logo=github&color=ea4aaa)](https://github.com/sponsors/logue)

Add offsets to GeoJSON coordinates in place.
This package is written in TypeScript and provides helpers for both deterministic and random coordinate offsets.

## Installation

```bash
pnpm add geojson-offset-ts
```

## Usage

> The functions mutate the input object in place. If you need to preserve the original geometry, create a copy before calling them.

```ts
import { offset, randomOffset } from "geojson-offset-ts";

const geojson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-78, 48],
      },
      properties: {},
    },
  ],
};

offset(geojson, -1, 1);
offset(geojson, 0, 0, 0.5);

randomOffset(geojson, [0, 10], [-10, 10]);
randomOffset(geojson, [0, 10], [-10, 10], [-5, 5]);
```

## Supported types

The library supports the following GeoJSON types:

- Point
- MultiPoint
- LineString
- MultiLineString
- Polygon
- MultiPolygon
- Feature
- FeatureCollection
- GeometryCollection

[TopoJSON](https://github.com/topojson/topojson) is not supported. Convert it to GeoJSON before using this package.

## API

### offset(geojson, xOffset, yOffset, zOffset?)

Applies a fixed offset to all coordinates in the supplied GeoJSON value.

- `xOffset`: offset for the X coordinate
- `yOffset`: offset for the Y coordinate
- `zOffset`: optional offset for the Z coordinate

### randomOffset(geojson, xRange, yRange, zRange?)

Applies a random offset within the provided ranges.

- `xRange`: `[min, max]` for the X coordinate
- `yRange`: `[min, max]` for the Y coordinate
- `zRange`: optional `[min, max]` for the Z coordinate

## Development

### Testing

This project uses [Rstest](https://rstest.dev/) for unit testing.

```bash
# Run the test suite
pnpm test

# Run tests in watch mode
pnpm test:watch
```

The test suite covers the core geometry types as well as feature and geometry collection handling.

## LICENSE

©2022-2026 by Logue.
Licensed under the [MIT License](LICENSE).
