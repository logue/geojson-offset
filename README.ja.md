# geojson-offset-ts

[English](README.md) | 日本語

[![npm version](https://img.shields.io/npm/v/geojson-offset-ts.svg)](https://www.npmjs.com/package/geojson-offset-ts)
[![NPM Downloads](https://img.shields.io/npm/dm/geojson-offset-ts.svg?style=flat)](https://www.npmjs.com/package/geojson-offset-ts)
[![jsdelivr CDN](https://data.jsdelivr.com/v1/package/npm/geojson-offset-ts/badge)](https://www.jsdelivr.com/package/npm/geojson-offset-ts)
[![Open in unpkg](https://img.shields.io/badge/Open%20in-unpkg-blue)](https://uiwjs.github.io/npm-unpkg/#/pkg/geojson-offset-ts/file/README.md)
[![Open in Gitpod](https://shields.io/badge/Open%20in-Gitpod-green?logo=Gitpod)](https://gitpod.io/#https://github.com/logue/geojson-offset)
[![X Follow](https://img.shields.io/twitter/follow/logue256?style=plastic)](https://twitter.com/logue256)
[![GitHub Sponsors](https://img.shields.io/github/sponsors/logue?label=Sponsor&logo=github&color=ea4aaa)](https://github.com/sponsors/logue)

GeoJSON の座標にオフセットを適用するための TypeScript 製ライブラリです。
このパッケージは、固定値によるオフセットとランダムなオフセットの両方を提供します。

## インストール

```bash
pnpm add geojson-offset-ts
```

## 対応している GeoJSON 型

次の GeoJSON 型をサポートしています。

- Point
- MultiPoint
- LineString
- MultiLineString
- Polygon
- MultiPolygon
- Feature
- FeatureCollection
- GeometryCollection

[TopoJSON](https://github.com/topojson/topojson) はサポートしていません。利用前に GeoJSON に変換してください。

## 使い方

> この関数は入力オブジェクトをその場で変更します。元のジオメトリを保持したい場合は、呼び出し前にコピーを作成してください。

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

## API

### offset(geojson, xOffset, yOffset, zOffset?)

指定した GeoJSON オブジェクト内の全座標に、固定のオフセットを適用します。

- `xOffset`: X 座標へのオフセット
- `yOffset`: Y 座標へのオフセット
- `zOffset`: 任意。Z 座標へのオフセット

### randomOffset(geojson, xRange, yRange, zRange?)

指定した範囲内のランダムな値でオフセットを適用します。

- `xRange`: X 座標用の `[min, max]`
- `yRange`: Y 座標用の `[min, max]`
- `zRange`: 任意。Z 座標用の `[min, max]`

## 開発

### テスト

このプロジェクトでは [Rstest](https://rstest.dev/) を使ってユニットテストを実行します。

```bash
# テストを実行
pnpm test

# ウォッチモードで実行
pnpm test:watch
```

テストスイートでは、基本ジオメトリだけでなく Feature や GeometryCollection の扱いも確認しています。
