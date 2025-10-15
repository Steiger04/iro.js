---
title: Get Started
---

## Installation

### Install from NPM

```bash
$ npm install @jaames/iro --save
```

Then if you are using a module bundler like Webpack or Rollup, import iro.js into your project:

```js
// Using ES6 module syntax
import iro from "@jaames/iro";

// Using CommonJS modules
const iro = require("@jaames/iro");
```

### Or use the jsDelivr CDN

Drop this script into the `<head>` of your page's HTML:

```html
<script src="https://cdn.jsdelivr.net/npm/@jaames/iro@5"></script>
```

When you manually include the library like this, iro.js will be made globally available on `window.iro`.

### Or download and host yourself

**[Development version](https://raw.githubusercontent.com/jaames/iro.js/master/dist/iro.js)**<br/>
Uncompressed, with source comments included. Intended for debugging.

**[Production version](https://raw.githubusercontent.com/jaames/iro.js/master/dist/iro.min.js)**<br/>
Minified and optimized version.

## Color Picker Setup

First, we need a HTML element with a unique identifier (such as an `id` attribute) to act as a container for the color picker:

```html
<div id="picker"></div>
```

Then use JavaScript to create a new `iro.ColorPicker` with a CSS selector that matches your chosen container element:

```js
var colorPicker = new iro.ColorPicker("#picker");
```

You can also use a DOM object instead of a CSS selector here -- this might be more suitable if you're integrating iro.js into an application built with a framework such as Vue, React, etc.

## Color Picker Options

The color picker can be customized by passing a set of options to the second `iro.ColorPicker` parameter:

```js
var colorPicker = new iro.ColorPicker("#picker", {
  // Set the size of the color picker
  width: 320,
  // Set the initial color to pure red
  color: "#f00",
});
```

### Available Options

| Option               | Purpose                                                                                                     | Default Value           |
| :------------------- | :---------------------------------------------------------------------------------------------------------- | :---------------------- |
| `width`              | Total width of the control UI.                                                                              | `300`                   |
| `color`              | The initial color value. This can be any [supported color format](/color_api.html#supported-color-formats). | `"#ffffff"`             |
| `colors`             | Initial color values used for [multi-color selections](/advanced.html#multi-color-selections).              | null                    |
| `display`            | CSS display value for the color picker root element.                                                        | `"block"`               |
| `id`                 | HTML ID for the color picker root element.                                                                  | `null`                  |
| `layout`             | Used for customising the [UI component layout](/advanced.html#custom-ui-layouts).                           | `null`                  |
| `layoutDirection`    | UI component stacking direction; either `"vertical"` or `"horizontal"`.                                     | `"vertical"`            |
| `padding`            | Padding around the control handles.                                                                         | `6`                     |
| `margin`             | Gap between individual components.                                                                          | `12`                    |
| `borderWidth`        | Width of the border around the controls. Set to `0` for no border.                                          | `0`                     |
| `borderColor`        | Color of the border. Any valid CSS color is supported.                                                      | `"#ffffff"`             |
| `handleRadius`       | Radius of the control handles.                                                                              | `8`                     |
| `activeHandleRadius` | Radius of the control handle for the currently selected color.                                              | Inherits `handleRadius` |
| `handleSvg`          | Custom handle SVG, used for [custom handles](/advanced.html#custom-handles).                                | `null`                  |
| `handleProps`        | Custom handle properties, used for [custom handles](/advanced.html#custom-handles).                         | `{x:0, y:0}`            |
| `wheelLightness`     | If set to `false`, the color wheel will not fade to black when the lightness decreases.                     | `true`                  |
| `wheelAngle`         | Starting angle of the color wheel's hue gradient, measured in degrees.                                      | `0`                     |
| `wheelDirection`     | Direction of the color wheel's hue gradient; either `"clockwise"` or `"anticlockwise"`.                     | `"anticlockwise"`       |
| `sliderSize`         | Slider control size. By default this will be calculated automatically.                                      | `undefined`             |
| `boxHeight`          | Box control height. By default this will be the same as the `width`.                                        | `undefined`             |
| `matrixProfile`      | RGB↔XYZ color space transformation matrix profile. See [Matrix Profiles](#matrix-profiles) section below.   | `"nodehue_d50_typo"`    |

More details about color picker options, properties, and methods can be found on the [ColorPicker API documentation](/colorPicker_api.html).

## Matrix Profiles

**Important:** iro.js uses **D50-adapted sRGB matrices by default** for compatibility with Philips Hue smart lighting systems. If you're building a web application without Hue integration, you may want to use the standard sRGB D65 profile instead.

### What are Matrix Profiles?

Matrix profiles control how RGB colors are converted to/from CIE XYZ color space, which affects xy chromaticity calculations used by Philips Hue bulbs and similar smart lighting systems. The choice of matrix profile determines the **white point** (D50 vs D65) and **transformation matrices** used for color conversions.

### Available Profiles

iro.js supports three matrix profiles:

| Profile               | White Point | Description                                                                               | Best For                                           |
| :-------------------- | :---------- | :---------------------------------------------------------------------------------------- | :------------------------------------------------- |
| `"nodehue_d50_typo"`  | D50         | Matches node-hue-api library (includes historical typos for backward compatibility)       | **Default** - Philips Hue integration              |
| `"icc_d50_corrected"` | D50         | Corrected ICC Profile Connection Space standard (mathematically accurate D50 adaptation)  | Professional color management, accurate Hue colors |
| `"srgb_d65"`          | D65         | Native sRGB standard used by web browsers and most displays (IEC 61966-2-1 specification) | **Web/sRGB contexts without Hue integration**      |

### When to Use Which Profile

#### Use `"nodehue_d50_typo"` (default) when:

- Integrating with Philips Hue smart bulbs via node-hue-api
- You need backward compatibility with existing Hue-based projects
- Working with legacy code that depends on the node-hue-api matrix values

#### Use `"icc_d50_corrected"` when:

- You want mathematically accurate D50-adapted sRGB conversions
- Working with ICC color profiles or professional color management
- Integrating with Hue but prefer accurate color science over legacy compatibility

#### Use `"srgb_d65"` when:

- Building standard web applications **without** Philips Hue integration
- You need colors that match CSS specifications and browser rendering
- Working exclusively with computer displays (not smart lighting)
- You want the most common sRGB standard (D65 white point)

::: warning
**The default profile (`nodehue_d50_typo`) may surprise web developers**: it uses D50 white point instead of the standard D65, which can cause slight color differences compared to CSS color values. For typical web applications, consider using `"srgb_d65"`.
:::

### Setting Matrix Profile in ColorPicker

You can specify the matrix profile when creating a color picker:

```js
// For standard web/sRGB applications (recommended for most web developers)
var colorPicker = new iro.ColorPicker("#picker", {
  width: 320,
  color: "#ff0000",
  matrixProfile: "srgb_d65", // Use standard sRGB D65 matrices
});

// For Philips Hue integration (default behavior)
var hueColorPicker = new iro.ColorPicker("#hue-picker", {
  width: 320,
  color: "#ff0000",
  matrixProfile: "nodehue_d50_typo", // Matches node-hue-api
  gamut: "C", // Philips Hue Gamut C
});

// For accurate D50 color management
var professionalPicker = new iro.ColorPicker("#pro-picker", {
  width: 320,
  color: "#ff0000",
  matrixProfile: "icc_d50_corrected", // ICC-compliant D50 matrices
});
```

### Setting Matrix Profile in IroColor

You can also specify the matrix profile when creating standalone `IroColor` objects:

```js
import { IroColor } from "@jaames/iro";

// Create color with standard sRGB D65 profile
var webColor = new IroColor("#ff0000", {
  matrixProfile: "srgb_d65",
});

// Create color with Hue-compatible profile
var hueColor = new IroColor("#ff0000", {
  matrixProfile: "nodehue_d50_typo",
});

// Access xy chromaticity coordinates (affected by matrix profile)
console.log(webColor.xy); // xy values using D65 white point
console.log(hueColor.xy); // xy values using D50 white point (Hue-compatible)
```

### Technical Details

The matrix profile affects:

- **xy chromaticity coordinates**: Used by Philips Hue API and CIE 1931 color space
- **White point reference**: D50 (horizon light) vs D65 (daylight)
- **RGB↔XYZ transformations**: Different matrices yield slightly different color mappings

For typical web RGB/HSV/HSL operations, the matrix profile has **no effect** - it only matters when converting to/from XYZ or xy chromaticity space.

::: tip
See the [iro-core WHITE_POINT.md documentation](https://github.com/jaames/iro-core/blob/master/docs/WHITE_POINT.md) for detailed technical information about the transformation matrices and white point differences.
:::

### Switching Matrix Profiles at Runtime

You can change the matrix profile of an existing color or color picker at runtime using the `matrixProfile` property or `setMatrixProfile()` method. **Important:** switching the profile does **not** automatically re-fit the HSV values to preserve the visual RGB appearance - the internal HSV values remain unchanged, which means the color's mapping to XYZ/xy space will change.

#### Default Behavior: HSV Unchanged (Fast, Color Mapping Changes)

When you switch profiles, the HSV values stay the same, but xy chromaticity coordinates will be recalculated using the new transformation matrix:

```js
var color = new IroColor("#ff0000", {
  matrixProfile: "nodehue_d50_typo",
});

console.log(color.matrixProfile); // "nodehue_d50_typo"
console.log(color.hsv); // { h: 0, s: 100, v: 100 }
console.log(color.xy); // xy using D50 white point

// Switch to sRGB D65 profile
color.matrixProfile = "srgb_d65";

console.log(color.hsv); // Still { h: 0, s: 100, v: 100 } - unchanged
console.log(color.xy); // NEW xy values using D65 white point
console.log(color.hexString); // Still "#ff0000" - RGB appearance unchanged
```

This behavior is **fast** because it only updates the profile metadata - no color conversions are performed. The RGB/HSV/HSL values remain identical, but any subsequent access to `xy` coordinates will use the new transformation matrices.

**Use this approach when:**

- You want to change how xy coordinates are calculated without affecting the displayed color
- Performance is critical (no conversion overhead)
- You're setting the profile before loading/setting colors
- You understand that xy values will change but RGB appearance will not

#### Recipe 2: Preserve Visual RGB Appearance (Recalculate HSV)

If you need to **preserve the visual RGB color** when switching profiles (e.g., maintaining the same xy coordinates in different profiles), you must manually capture the RGB, switch the profile, and then re-set the RGB:

```js
var color = new IroColor("#ff0000", {
  matrixProfile: "nodehue_d50_typo",
});

console.log(color.xy); // e.g., { x: 0.6484, y: 0.3309 } (D50)

// Capture current RGB appearance before switching
var currentRgb = { ...color.rgb };

// Switch to sRGB D65 profile
color.matrixProfile = "srgb_d65";

// Re-apply the RGB to maintain visual appearance
color.rgb = currentRgb;

console.log(color.rgb); // Same RGB values - visual appearance preserved
console.log(color.xy); // e.g., { x: 0.6400, y: 0.3300 } (D65, slightly different)
// Note: xy values change because they're recalculated with new D65 matrices
```

**Use this approach when:**

- You need xy coordinates that represent the same visual color in different profiles
- You're switching profiles for colors that are already set and need to maintain appearance
- You're doing professional color management with multiple profiles
- Accuracy is more important than performance

#### Helper Utility: `rebaseColorToProfile()` (Optional)

For convenience, you can create a utility function to encapsulate Recipe 2:

```js
/**
 * Switches a color's matrix profile while preserving its visual RGB appearance.
 * This captures the current RGB, switches the profile, then re-applies the RGB
 * so that xy coordinates are recalculated with the new transformation matrices.
 *
 * @param color - IroColor instance to rebase
 * @param newProfile - Target matrix profile name
 * @returns The same color instance (for chaining)
 */
function rebaseColorToProfile(color, newProfile) {
  // Capture current visual RGB
  var currentRgb = { ...color.rgb };

  // Switch the matrix profile (fast, HSV unchanged)
  color.matrixProfile = newProfile;

  // Re-apply RGB to recalculate HSV/xy with new profile
  color.rgb = currentRgb;

  return color;
}

// Usage example
var color = new IroColor("#ff0000", {
  matrixProfile: "nodehue_d50_typo",
});

console.log(color.xy); // xy with D50

// Rebase to sRGB D65 while preserving visual RGB
rebaseColorToProfile(color, "srgb_d65");

console.log(color.xy); // xy with D65, representing the same visual red
console.log(color.hexString); // Still "#ff0000"
```

::: warning
**Important Distinction:**

- **Recipe 1 (default)**: Fast, no conversion. HSV stays the same, RGB appearance unchanged, xy calculation changes.
- **Recipe 2 (rebase)**: Slower, performs conversion. RGB appearance preserved, HSV may shift slightly due to round-trip conversion, xy represents the same visual color in the new profile's space.
  :::

## Philips Hue Gamut Wheel

::: tip
**Availability:** The Gamut Wheel component is included in `@jaames/iro` version 5.6.0 and later. Ensure you have the latest version installed:

```bash
npm install @jaames/iro@latest
```

Or reference it via CDN (once published):

```html
<script src="https://cdn.jsdelivr.net/npm/@jaames/iro@5.6"></script>
```

For local development, the examples in this repository use the local build (`dist/iro.js`).
:::

The Gamut Wheel is a specialized color picker component designed for Philips Hue smart lighting systems. Unlike the standard color wheel which displays the full HSV color space, the Gamut Wheel uses **perceptual gamut mapping** to show only colors that can be physically reproduced by Philips Hue bulbs. This ensures that the colors you select in the UI will accurately match what the bulbs can display, without unexpected color shifts or clipping.

### What is Gamut Mapping?

Philips Hue bulbs have different color reproduction capabilities depending on their generation (Gamut A, B, or C). Colors outside a bulb's gamut cannot be physically displayed and must be mapped to the nearest displayable color.

The Gamut Wheel uses **perceptual gamut mapping** in the CIELAB color space to:

- Preserve hue (color tone) exactly
- Preserve lightness (brightness) exactly
- Reduce chroma (saturation) only as much as needed to fit within the gamut
- Create smooth, natural-looking transitions without abrupt color jumps

### Basic Usage

Provide a simple example:

```javascript
var colorPicker = new iro.ColorPicker("#picker", {
  width: 300,
  color: "#ff0000",
  gamut: "C", // Philips Hue Gamut C (latest generation)
  layout: [
    {
      component: iro.ui.GamutWheel,
    },
    {
      component: iro.ui.Slider,
      options: { sliderType: "value" },
    },
  ],
});
```

The `gamut` option specifies which Philips Hue gamut to use (A, B, or C). The `iro.ui.GamutWheel` component replaces the standard `iro.ui.Wheel`. A brightness slider is typically added alongside the Gamut Wheel for full color control.

### Philips Hue Gamut Types

| Gamut | Generation                           | Color Space                         | Best For                   |
| :---- | :----------------------------------- | :---------------------------------- | :------------------------- |
| `'A'` | 1st generation (Living Colors, etc.) | Smallest gamut                      | Older Hue bulbs            |
| `'B'` | 2nd generation                       | Medium gamut                        | Mid-range Hue bulbs        |
| `'C'` | 3rd generation (latest)              | Largest gamut, extended color range | Latest Hue bulbs, Hue Plus |

Gamut C provides the widest color range and is recommended for modern Philips Hue installations. If you're unsure which gamut your bulbs support, consult the Philips Hue API documentation or use Gamut C as a safe default for newer bulbs.

### Gamut Wheel Options

The Gamut Wheel supports all the same options as the standard Wheel component:

| Option           | Purpose                                                       | Default Value     |
| :--------------- | :------------------------------------------------------------ | :---------------- |
| `wheelLightness` | If `true`, the wheel fades to black as brightness decreases   | `true`            |
| `wheelAngle`     | Starting angle of the hue gradient (degrees)                  | `0`               |
| `wheelDirection` | Hue gradient direction: `'clockwise'` or `'anticlockwise'`    | `'anticlockwise'` |
| `gamut`          | **Required**: Philips Hue gamut type (`'A'`, `'B'`, or `'C'`) | `'none'`          |

::: warning
**Important:** The `gamut` option must be set to `'A'`, `'B'`, or `'C'` for the Gamut Wheel to function. If `gamut` is `'none'` or undefined, the component will not render or will show a warning.
:::

### Example: Complete Philips Hue Color Picker

```javascript
var hueColorPicker = new iro.ColorPicker("#hue-picker", {
  width: 320,
  color: "#ff6b35",
  gamut: "C", // Latest Philips Hue bulbs
  matrixProfile: "nodehue_d50_typo", // Hue-compatible color space
  wheelLightness: true, // Show brightness in wheel
  wheelAngle: 0,
  wheelDirection: "anticlockwise",
  borderWidth: 2,
  borderColor: "#ffffff",
  handleRadius: 10,
  layout: [
    {
      component: iro.ui.GamutWheel,
      options: {
        borderColor: "#ffffff",
      },
    },
    {
      component: iro.ui.Slider,
      options: {
        sliderType: "value",
        borderColor: "#ffffff",
      },
    },
  ],
});

// Listen for color changes
hueColorPicker.on("color:change", function (color) {
  // Get xy chromaticity coordinates for Philips Hue API
  var xy = color.xy;
  console.log("Hue API xy:", xy.x, xy.y);

  // Get brightness (0-100)
  var brightness = color.value;
  console.log("Brightness:", brightness);

  // Send to Philips Hue API
  // sendToHueAPI({ xy: [xy.x, xy.y], bri: Math.round(brightness * 2.54) });
});
```

This example creates a complete color picker for Philips Hue integration. The `matrixProfile` is set to `'nodehue_d50_typo'` for compatibility with the node-hue-api library. The `color.xy` property provides CIE 1931 xy chromaticity coordinates required by the Philips Hue API. Brightness is accessed via `color.value` (0-100) and should be converted to Hue's 0-254 range.

### Gamut Wheel vs Standard Wheel

| Feature             | Standard Wheel               | Gamut Wheel                                 |
| :------------------ | :--------------------------- | :------------------------------------------ |
| Color Space         | Full HSV (all colors)        | Gamut-constrained (only displayable colors) |
| Rendering           | CSS conic-gradient           | Canvas with perceptual mapping              |
| Use Case            | General web applications     | Philips Hue smart lighting                  |
| Hue Preservation    | N/A                          | Exact hue preservation                      |
| Saturation Handling | Full 0-100% range            | Reduced to fit gamut                        |
| Performance         | Faster (CSS)                 | Slightly slower (canvas rendering)          |
| Visual Appearance   | May show unrealizable colors | Only shows achievable colors                |

Use the **Standard Wheel** for general web applications where you need the full HSV color space. Use the **Gamut Wheel** when integrating with Philips Hue or other smart lighting systems with limited color gamuts.

### How Perceptual Mapping Works

The Gamut Wheel uses a sophisticated perceptual gamut mapping algorithm:

1. Converts RGB colors to CIELAB color space (perceptually uniform)
2. Transforms CIELAB to LCh (cylindrical coordinates: Lightness, Chroma, Hue)
3. Iteratively reduces Chroma until the color fits within the gamut triangle
4. Preserves Lightness and Hue throughout the process
5. Converts back to RGB for display

::: tip
**Technical Note:** The perceptual mapping algorithm ensures that colors are mapped in a way that matches human color perception. This means that the visual difference between the original color and the mapped color is minimized, even if the mathematical difference in RGB space is significant.
:::

### Switching Between Gamuts

You can dynamically change gamuts at runtime:

```javascript
var picker = new iro.ColorPicker("#picker", {
  gamut: "A",
  layout: [{ component: iro.ui.GamutWheel }],
});

// Later, switch to a different gamut
picker.setGamut("C");

// Listen for gamut changes
picker.on("gamut:change", function (newGamut) {
  console.log("Gamut changed to:", newGamut);
});
```

Use `setGamut()` to dynamically change the gamut at runtime. The Gamut Wheel will automatically re-render with the new gamut constraints. The `gamut:change` event fires when the gamut is changed.

### Integration with Philips Hue API

Here's a practical integration example:

```javascript
// Example: Sending color to Philips Hue API
function sendColorToHue(color, lightId) {
  // Get xy chromaticity coordinates
  var xy = color.xy;

  // Get brightness (convert from 0-100 to 0-254)
  var brightness = Math.round(color.value * 2.54);

  // Construct Hue API payload
  var payload = {
    xy: [xy.x, xy.y],
    bri: brightness,
    transitiontime: 4, // 400ms transition
  };

  // Send to Hue bridge (example using fetch)
  fetch(`http://<bridge-ip>/api/<username>/lights/${lightId}/state`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

// Use with color picker
hueColorPicker.on("input:change", function (color) {
  sendColorToHue(color, 1); // Send to light ID 1
});
```

The Philips Hue API expects xy chromaticity coordinates and brightness (bri) values. Use `color.xy` to get the xy coordinates (already gamut-mapped). Convert brightness from 0-100 to 0-254 by multiplying by 2.54. Use `input:change` event to update lights only on user interaction (not programmatic changes).

### See Also

- [Matrix Profiles](#matrix-profiles) - Understanding color space transformations
- [Custom UI Layouts](/advanced.html#custom-ui-layouts) - Combining Gamut Wheel with other components
- [Color API](/color_api.html) - Working with color objects and xy coordinates
- [ColorPicker API](/colorPicker_api.html) - Full API reference including `setGamut()` method

## Working with Colors

Each color picker has a `color` object which stores the currently selected color. This color object is tied to the color picker, so any changes to its values will be reflected by the picker, and vice versa.

### Color Properties

The color object has some "magic" properties which can be used to both **get** and **set** the selected color in different formats. Whenever one of these properties is set, the color picker controls will update and the [`color:change`](#color-picker-events) event will fire.

For example, to get the current color as a hex string:

```js
var hex = colorPicker.color.hexString;
console.log(hex); // hex = "#ff0000"
```

Or to set the selected color from a hsl object:

```js
colorPicker.color.hsl = { h: 180, s: 100, l: 50 };
// Color picker updates to match hsl(180, 100, 50)
```

The color object has properties which cover all of the most common web color formats (HEX, RGB, HSL and HSV), as well as some extras:

| Property     | Example Format                     |
| :----------- | :--------------------------------- |
| `hexString`  | `"#ff0000"`                        |
| `hex8String` | `"#ff0000ff"`                      |
| `rgb`        | `{ r: 255, g: 0, b: 0 }`           |
| `rgba`       | `{ r: 255, g: 0, b: 0, a: 1 }`     |
| `rgbString`  | `"rgb(255, 0, 0)"`                 |
| `rgbaString` | `"rgb(255, 0, 0, 1)"`              |
| `hsl`        | `{ h: 360, s: 100, l: 50 }`        |
| `hsla`       | `{ h: 360, s: 100, l: 50, a: 1 }`  |
| `hslString`  | `"hsl(360, 100%, 50%)"`            |
| `hslaString` | `"hsla(360, 100%, 50%, 1)"`        |
| `hsv`        | `{ h: 360, s: 100, v: 100 }`       |
| `hsva`       | `{ h: 360, s: 100, v: 100, a: 1 }` |
| `red`        | `0` to `255`                       |
| `green`      | `0` to `255`                       |
| `blue`       | `0` to `255`                       |
| `alpha`      | `0` to `1`                         |
| `hue`        | `0` to `360`                       |
| `saturation` | `0` to `100`                       |
| `value`      | `0` to `100`                       |
| `kelvin`     | `1000` to `40000`                  |

For more details about color objects, check out the [Color API documentation](/color_api.html).

## Color Picker Events

Events let you to run your own code after certain things have happened, like when the selected color has changed or when the user has interacted with the color picker.

The color picker's [`on`](/colorPicker_api.html#on) method can be used to attach functions that will be called whenever a particular event is fired. In this example, we add a listener for the `color:change` event:

```js
// listen to a color picker's color:change event
// color:change callbacks receive the current color
colorPicker.on("color:change", function (color) {
  // log the current color as a HEX string
  console.log(color.hexString);
});
```

The [`on`](/colorPicker_api.html#on) method can also take an array of event names, in case you want to listen to multiple events with one function:

```js
// listen to a color picker's color:init and color:change events
colorPicker.on(["color:init", "color:change"], function (color) {
  // log the current color as a HEX string
  console.log(color.hexString);
});
```

Event listeners can also be removed at any time by passing the same function to the color picker's [`off`](/colorPicker_api.html#off) method:

```js
// create a callback function
function onColorChange(color) {
  console.log(color.hexString);
}

// add color:change listener
colorPicker.on("color:change", onColorChange);

// later, if we want to stop listening to color:change...
colorPicker.off("color:change", onColorChange);
```

### Available Events

##### `color:change`

Fired whenever the selected color changes -- either when the user interacts with the color picker, or when the color is updated by your own code. This event's callback functions will receive two values:

- `color`: the [currently selected color](#working-with-colors)
- `changes`: an object showing which HSV channels have changed since the last time the event was fired

It is safe to modify the `color` object within callbacks for this event. This can be helpful if you want to limit the range or a certain color channel, for example:

```js
colorPicker.on("color:change", function (color) {
  // don't let the color saturation fall below 50!
  if (color.saturation < 50) {
    color.saturation = 50;
  }
});
```

##### `input:change`

Similar to `color:change`, except this event is only fired when the color is changed with the user's **mouse or touch input**.

Callbacks for this event receive the same values as `color:change`, and it is also safe to modify the `color` object within callbacks for this event.

##### `input:start`

Fired whenever the users starts interacting with the color picker controls. The [currently selected color](#working-with-colors) is passed to this event's callback function.

##### `input:move`

Fired when the user moves their pointer/mouse after beginning interaction. The [currently selected color](#working-with-colors) is passed to this event's callback function.

##### `input:end`

Fired whenever the user stops interacting with the color picker controls. The [currently selected color](#working-with-colors) is passed to this event's callback function.

##### `color:init`

Fired whenever a color is added. This event's callbacks will receive the newly added color object.

##### `color:remove`

Fired when a color is removed from the color picker. This event's callbacks will receive the removed color object.

##### `color:setActive`

Fired whenever the 'active' color is switched. This event's callbacks will receive the active color object.

##### `mount`

Fired when the colorPicker's UI has been mounted to the DOM and is ready for user interaction. The colorPicker object is passed to this event's callback function.
