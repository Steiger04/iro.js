---
title: Migration Guide
---

## Migrating from v4

iro.js version 5.0.0 mostly adds new features, with minimal changes that won't affect most people using the library. However, if for whatever reason you need to use v4, the latest v4 build has been preserved in the [v4 branch](https://github.com/jaames/iro.js/tree/v4).

### Color Picker Options

The option names stayed mostly the same, but two properties were renamed for clarity. Update any existing configuration to use the new names:

| v4 option      | v5 option     | Notes                                                     |
| -------------- | ------------- | --------------------------------------------------------- |
| `sliderHeight` | `sliderSize`  | Controls the thickness/diameter of slider components.     |
| `handleOrigin` | `handleProps` | Pass any props supported by the built-in handle elements. |

```js
// v4
new iro.ColorPicker("#picker", {
  sliderHeight: 16,
  handleOrigin: { x: 0, y: 0 },
});

// v5
new iro.ColorPicker("#picker", {
  sliderSize: 16,
  handleProps: { x: 0, y: 0 },
});
```

### Plugins

The plugin API introduced in v4 has been deprecated and removed, along with the [iro-dynamic-css](https://github.com/irojs/iro-dynamic-css) and [iro-transparency-plugin](https://github.com/irojs/iro-transparency-plugin) packages. The transparency slider is now part of the core iro.js library, and the dynamic CSS behavior can be replicated with [CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties).

#### Dynamic CSS Plugin Replacement

Set up some JavaScript to update the `--iro-color-value` variable when the color changes:

```js
var rootStyle = document.documentElement.style;
colorPicker.on(["color:init", "color:change"], function (color) {
  rootStyle.setProperty("--iro-color-value", color.rgbString);
});
```

Then use `--iro-color-value` in any of the styles you want to update based on the current color:

```css
body {
  background-color: var(--iro-color-value);
}
```
