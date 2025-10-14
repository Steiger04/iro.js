---
title: Introduction
---

## Features

- Simple, low-friction API with support for HEX, RGB, HSL, HSV, and kelvin temperatures.
- Assemble the perfect color picker from a selection of pre-built UI components.
- Add multiple colors to the same picker for quick harmony and theme exploration.
- Ships as a single [9.5kb](https://bundlephobia.com/result?p=@jaames/iro) (min + gzip) script—no extra CSS, images, or third-party libraries needed.
- Works across all modern browsers and devices, including touchscreens.
- Licenced under MPL 2.0 and free for personal and commercial use.

## Quick Start

### Basic Usage

```js
// Default: uses 'nodehue_d50_typo' matrix profile (Philips Hue compatible)
var colorPicker = new iro.ColorPicker("#picker");
```

### For Web/sRGB Applications

```js
// Recommended for standard web apps (no smart lighting integration)
var colorPicker = new iro.ColorPicker("#picker", {
  matrixProfile: "srgb_d65", // Use standard sRGB D65 white point
});
```

::: tip About Matrix Profiles
iro.js defaults to the **`nodehue_d50_typo`** matrix profile for compatibility with Philips Hue smart lighting systems. This uses D50 white point adaptation instead of the standard D65 white point used by web browsers and CSS specifications.

**For most web applications**, you should explicitly set `matrixProfile: "srgb_d65"` to ensure color accuracy with standard web/sRGB workflows. The matrix profile only affects xy chromaticity calculations used by smart lighting APIs—it doesn't impact RGB, HSV, or HSL operations.

See the [Matrix Profiles guide](/guide.html#matrix-profiles) for detailed information.
:::

## Examples

A collection of [interactive examples](https://codepen.io/collection/XQgGRB) are available on Codepen.

## Support

If you run into any problems when using iro.js, feel free to contact me for help! The best way to get support is by [opening an issue thread on the iro.js Github repo](https://github.com/jaames/iro.js/issues), but you can also [email me](mailto:irojs@jamesdaniel.dev) or [send me a DM on Twitter](https://twitter.com/rakujira).

## Motivation

I built iro.js after feeling unsatisfied with the existing color picker widgets I came across while working on a project. They were either unintuitive, bloated, depended on extra libraries, or had been long-abandoned by their author. iro.js is my answer to that gap: a light, extensible picker that stays fast and friendly.
