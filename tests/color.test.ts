import { IroColor as Color } from "@irojs/iro-core";

type Rgb = { r: number; g: number; b: number };

describe("Color static helpers", () => {
  const samples: Array<{ name: string; rgb: Rgb }> = [
    { name: "white", rgb: { r: 255, g: 255, b: 255 } },
    { name: "black", rgb: { r: 0, g: 0, b: 0 } },
    { name: "cyan", rgb: { r: 0, g: 255, b: 255 } },
    { name: "magenta", rgb: { r: 255, g: 0, b: 255 } },
  ];

  test.each(samples)("rgb ↔ hsv roundtrip for %s", ({ rgb }) => {
    const hsv = Color.rgbToHsv(rgb);
    const roundtrip = Color.hsvToRgb(hsv);
    expect(Math.round(roundtrip.r)).toBeCloseTo(rgb.r, 0);
    expect(Math.round(roundtrip.g)).toBeCloseTo(rgb.g, 0);
    expect(Math.round(roundtrip.b)).toBeCloseTo(rgb.b, 0);
  });

  test("hsl ↔ hsv keeps greys stable", () => {
    const hsv = { h: 0, s: 0, v: 42 };
    const hsl = Color.hsvToHsl(hsv);
    expect(hsl.s).toBe(0);
    const roundtrip = Color.hslToHsv(hsl);
    expect(roundtrip.v).toBeCloseTo(hsv.v, 5);
  });
});

describe("Color parsing", () => {
  test("constructs from css hex", () => {
    const color = new Color("#ff8800");
    expect(color.rgb).toMatchObject({ r: 255, g: 136, b: 0 });
  });

  test("constructs from rgba string with alpha", () => {
    const color = new Color("rgba(255, 0, 0, 0.25)");
    expect(color.rgb).toMatchObject({ r: 255, g: 0, b: 0 });
    expect(color.alpha).toBeCloseTo(0.25, 5);
  });

  test("rgbString setter accepts percentages", () => {
    const color = new Color();
    color.rgbString = "rgba(50%, 25%, 0%, 0.5)";
    const { r, g, b } = color.rgb;
    expect(r).toBeGreaterThanOrEqual(126);
    expect(r).toBeLessThanOrEqual(129);
    expect(g).toBeGreaterThanOrEqual(63);
    expect(g).toBeLessThanOrEqual(65);
    expect(Math.round(b)).toBe(0);
    expect(color.alpha).toBeCloseTo(0.5, 5);
  });
});

describe("Color accessors", () => {
  test("hsv setter normalizes hue", () => {
    const color = new Color({ h: 720, s: 50, v: 50 });
    const hue = (color.hsv as { h: number }).h;
    expect(hue % 360).toBe(0);
  });

  test("cloning preserves gamut preference", () => {
    const color = new Color({ h: 120, s: 60, v: 70 }, undefined, "C");
    const clone = color.clone();
    expect(clone.gamutType).toBe("C");
    expect(clone.rgb).toMatchObject(color.rgb);
  });
});
