# GamutWheel Visual Testing Checklist

## Comment 3: Edge Case Testing - wheelLightness + Saturation Overlay

After resolving saturation duplication and HiDPI rendering issues, perform visual testing to verify the overlay interactions.

### Test Configuration

Test the GamutWheel with the following combinations:

#### Gamuts to Test

- **Gamut A** (Philips Hue A19 bulbs)
- **Gamut B** (Philips Hue B22 bulbs)
- **Gamut C** (Philips Hue Gen 3+ bulbs)

#### Brightness Values to Test

Test with `wheelLightness=true` and the following brightness (`v`) values:

- **v = 20** (very dark)
- **v = 50** (medium)
- **v = 80** (bright)

### Expected Visual Behavior

For each combination, verify:

1. **Center Grayscale Appearance**

   - Center should appear as grayscale (achromatic) due to saturation overlay
   - At v=20: Center should be dark gray
   - At v=50: Center should be medium gray
   - At v=80: Center should be light gray
   - Lightness overlay opacity should be: `1 - (v / 100)`

2. **Edge Chroma Consistency**

   - Edge colors should show full saturation (100%)
   - Edge colors should be gamut-mapped (constrained to device gamut)
   - Gamut A: Most restricted (smallest color space)
   - Gamut B: Medium restriction
   - Gamut C: Least restricted (largest color space)
   - At v=20: Edge colors should be dark but saturated
   - At v=50: Edge colors should be medium brightness and saturated
   - At v=80: Edge colors should be bright and saturated

3. **Gradient Smoothness**

   - Smooth transition from center (white/gray) to edge (saturated color)
   - No banding or discontinuities
   - Saturation overlay should create natural desaturation toward center
   - Lightness overlay should create natural darkening (when v < 100)

4. **No Double Saturation**

   - Colors should NOT appear overly desaturated
   - Canvas now renders at 100% saturation
   - CSS overlay applies the saturation gradient
   - Result: Single, correct saturation gradient

5. **HiDPI Rendering**
   - On high-DPI displays (Retina, 4K, etc.), the wheel should be sharp
   - No pixelation or blurriness
   - Proper scaling for devicePixelRatio > 1

### Testing Examples

Open the following HTML files in a browser to test:

```bash
cd d:/dev-workspace/iro.js
npm run build
```

Then open in browser:

- `examples/gamut-wheel/basic.html`
- `examples/gamut-wheel/comparison.html`
- `examples/gamut-wheel/hue-api-integration.html`

### Manual Testing Steps

1. **Basic Saturation Test**

   - Open `examples/gamut-wheel/basic.html`
   - Verify center is white (or gray if wheelLightness=true)
   - Verify edge colors are saturated
   - Drag brightness slider to test v=20, 50, 80

2. **Gamut Comparison Test**

   - Open `examples/gamut-wheel/comparison.html`
   - Compare all three gamuts side-by-side
   - Verify Gamut A has smallest color range
   - Verify Gamut C has largest color range
   - Check consistency of center grayscale across all gamuts

3. **wheelLightness Test**

   - Enable wheelLightness option
   - Set v=20: Verify dark gray center, dark saturated edges
   - Set v=50: Verify medium gray center, medium saturated edges
   - Set v=80: Verify light gray center, bright saturated edges

4. **HiDPI Test**
   - Test on high-DPI display (Retina MacBook, 4K monitor, etc.)
   - Zoom in browser (Ctrl/Cmd + +)
   - Verify wheel remains sharp at all zoom levels
   - Check for pixelation or artifacts

## Implementation Details

### Changes Made (Comments 1 & 2)

#### Comment 1: Fixed Double Saturation

- **Before**: Saturation calculated in canvas (`saturation = (distance / radius) * 100`)
- **After**: Canvas renders at 100% saturation (`saturation = 100`)
- **Result**: Saturation gradient now only applied by CSS overlay

#### Comment 2: Fixed HiDPI Rendering

- **Before**: Used logical coordinates with `ctx.setTransform(dpr, 0, 0, dpr, 0, 0)`
- **After**: Work entirely in physical coordinates
  - Calculate physical center: `pCx = Math.round(cx * dpr)`
  - Calculate physical radius: `pRadius = Math.round(radius * dpr)`
  - Create ImageData at physical size: `createImageData(physicalWidth, physicalHeight)`
  - Iterate over physical pixels: `y < physicalHeight`, `x < physicalWidth`
  - Put image data at (0, 0) without transform
- **Result**: Proper HiDPI rendering on high-resolution displays

### Overlay Stacking Order

From bottom to top:

1. **Canvas** - Gamut-mapped colors at 100% saturation
2. **Saturation Overlay** - Radial gradient (white center → transparent edge)
3. **Lightness Overlay** - Black overlay (opacity = 1 - v/100, if wheelLightness=true)
4. **Border** - Visual frame
5. **Handles** - Interactive color selection

## Verification Checklist

- [ ] Center appears white (v=100) or appropriate gray (v<100)
- [ ] Edge colors show full saturation
- [ ] Smooth gradient from center to edge
- [ ] Gamut A shows smallest color range
- [ ] Gamut B shows medium color range
- [ ] Gamut C shows largest color range
- [ ] wheelLightness=true darkens appropriately at v=20
- [ ] wheelLightness=true shows medium darkness at v=50
- [ ] wheelLightness=true shows light colors at v=80
- [ ] No double saturation artifacts
- [ ] Sharp rendering on HiDPI displays
- [ ] No pixelation when zoomed
- [ ] All automated tests passing (43 passed, 8 skipped)

## Test Results

Record your visual test results here:

### Gamut A

- v=20: ******\_\_\_******
- v=50: ******\_\_\_******
- v=80: ******\_\_\_******

### Gamut B

- v=20: ******\_\_\_******
- v=50: ******\_\_\_******
- v=80: ******\_\_\_******

### Gamut C

- v=20: ******\_\_\_******
- v=50: ******\_\_\_******
- v=80: ******\_\_\_******

### HiDPI Testing

- Display resolution: ******\_\_\_******
- DevicePixelRatio: ******\_\_\_******
- Visual quality: ******\_\_\_******

## Notes

- All automated tests passing (43/43, 8 skipped with documentation)
- TypeScript compilation successful with no errors
- Canvas rendering now works in physical coordinates for proper HiDPI support
- Saturation gradient only applied once (via CSS overlay)
