# Gamut Wheel Examples

This directory contains examples demonstrating the Gamut Wheel component for Philips Hue smart lighting integration.

## Examples

### 1. Basic Example (`basic.html`)

A simple example showing how to use the Gamut Wheel with Philips Hue Gamut C (latest generation bulbs).

**Features:**

- Gamut Wheel with brightness slider
- Real-time color value display (HSV, RGB, XY)
- Demonstrates perceptual gamut mapping

**Use Case:** Getting started with Gamut Wheel, understanding basic usage

### 2. Gamut Comparison (`comparison.html`)

Side-by-side comparison of all three Philips Hue gamuts (A, B, C).

**Features:**

- Three synchronized color pickers
- Visual comparison of gamut differences
- Shows how the same color is mapped differently across gamuts

**Use Case:** Understanding gamut differences, choosing the right gamut for your bulbs

### 3. Hue API Integration (`hue-api-integration.html`)

Practical example showing how to integrate the Gamut Wheel with the Philips Hue API.

**Features:**

- Configuration panel for bridge IP, username, and light ID
- Real-time color updates sent to Hue bulbs
- Status display and error handling
- Complete API integration code

**Use Case:** Building a real Philips Hue color controller, production integration

## Running the Examples

### Prerequisites

**Build the library first** to ensure the local `dist/iro.js` includes the GamutWheel component:

```bash
cd ../..  # Navigate to iro.js root
npm run build
```

### Option 1: Open Directly in Browser

Simply open any `.html` file in your web browser. The examples reference the local build (`../../dist/iro.js`), so ensure you've run `npm run build` first.

### Option 2: Local Server (Recommended)

For the Hue API integration example, you may need to run a local server to avoid CORS issues:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (http-server)
npx http-server -p 8000

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000/basic.html` in your browser.

## Philips Hue Setup

To use the Hue API integration example, you'll need:

1. **Philips Hue Bridge** connected to your network
2. **Bridge IP Address** (find in your router or Hue app)
3. **API Username** (generate by pressing the link button on your bridge)

### Generating an API Username

1. Press the link button on your Hue bridge
2. Within 30 seconds, send a POST request to:
   ```
   http://<bridge-ip>/api
   ```
   With body:
   ```json
   { "devicetype": "iro_gamut_wheel_example#browser" }
   ```
3. The response will contain your username:
   ```json
   [{ "success": { "username": "your-username-here" } }]
   ```

For detailed instructions, see the [Philips Hue API documentation](https://developers.meethue.com/develop/get-started-2/).

## Gamut Types

| Gamut | Generation | Bulb Examples                                   |
| :---- | :--------- | :---------------------------------------------- |
| **A** | 1st gen    | Living Colors, Hue Lux                          |
| **B** | 2nd gen    | Hue White and Color Ambiance (older)            |
| **C** | 3rd gen    | Hue White and Color Ambiance (latest), Hue Plus |

**Not sure which gamut your bulbs support?**

- Check the [Philips Hue API documentation](https://developers.meethue.com/develop/application-design-guidance/color-conversion-formulas-rgb-to-xy-and-back/)
- Use Gamut C as a safe default for modern bulbs (2016+)
- Query your bulbs via the API: `GET /api/<username>/lights/<id>` and check the `capabilities.control.colorgamut` field

## Troubleshooting

### CORS Errors

If you encounter CORS errors when connecting to your Hue bridge:

1. **Use a local proxy** (e.g., [cors-anywhere](https://github.com/Rob--W/cors-anywhere))
2. **Use a browser extension** (e.g., "Allow CORS" for Chrome)
3. **Run a local server** (see "Running the Examples" above)

### Colors Not Matching

If the colors on your bulbs don't match the picker:

1. **Verify gamut type**: Ensure you're using the correct gamut (A, B, or C) for your bulbs
2. **Check matrix profile**: Use `matrixProfile: 'nodehue_d50_typo'` for compatibility with node-hue-api
3. **Brightness conversion**: Ensure brightness is converted from 0-100 to 0-254 (multiply by 2.54)

### Connection Issues

1. **Bridge not found**: Verify the IP address is correct and the bridge is on the same network
2. **Unauthorized**: Generate a new API username (see "Generating an API Username" above)
3. **Light not responding**: Check the light ID and ensure the bulb is powered on

## Further Reading

- [iro.js Documentation](https://iro.js.org)
- [Philips Hue API Documentation](https://developers.meethue.com)
- [CIE 1931 Color Space](https://en.wikipedia.org/wiki/CIE_1931_color_space)
- [Gamut Mapping Techniques](https://en.wikipedia.org/wiki/Gamut_mapping)

## License

These examples are part of the iro.js project and are licensed under the same terms (MPL-2.0).
