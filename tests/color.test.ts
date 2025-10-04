import { IroColor as Color } from "@irojs/iro-core";

let color: any; // Global test variable for reuse across tests

const roundObject = (obj: any): any =>
  Object.keys(obj).reduce((result: any, key: string) => {
    result[key] = Math.round(obj[key]);
    return result;
  }, {});

describe("Color conversion", () => {
  test("Color.rgbToHsv accurately converts rgb to hsv", () => {
    // Pure white
    expect(Color.rgbToHsv({ r: 255, g: 255, b: 255 })).toMatchObject({
      h: 0,
      s: 0,
      v: 100,
    });
    // Pure black
    expect(Color.rgbToHsv({ r: 0, g: 0, b: 0 })).toMatchObject({
      h: 0,
      s: 0,
      v: 0,
    });
    // Pure red
    expect(Color.rgbToHsv({ r: 255, g: 0, b: 0 })).toMatchObject({
      h: 0,
      s: 100,
      v: 100,
    });
    // Pure yellow
    expect(Color.rgbToHsv({ r: 255, g: 255, b: 0 })).toMatchObject({
      h: 60,
      s: 100,
      v: 100,
    });
    // Pure green
    expect(Color.rgbToHsv({ r: 0, g: 255, b: 0 })).toMatchObject({
      h: 120,
      s: 100,
      v: 100,
    });
    // Pure cyan
    expect(Color.rgbToHsv({ r: 0, g: 255, b: 255 })).toMatchObject({
      h: 180,
      s: 100,
      v: 100,
    });
    // Pure blue
    expect(Color.rgbToHsv({ r: 0, g: 0, b: 255 })).toMatchObject({
      h: 240,
      s: 100,
      v: 100,
    });
    // Pure magenta
    expect(Color.rgbToHsv({ r: 255, g: 0, b: 255 })).toMatchObject({
      h: 300,
      s: 100,
      v: 100,
    });
  });

  test("Color.hsvToRgb accurately converts hsv to rgb", () => {
    // Pure white
    expect(Color.hsvToRgb({ h: 0, s: 0, v: 100 })).toMatchObject({
      r: 255,
      g: 255,
      b: 255,
    });
    // Pure black
    expect(Color.hsvToRgb({ h: 0, s: 0, v: 0 })).toMatchObject({
      r: 0,
      g: 0,
      b: 0,
    });
    // Pure red
    expect(Color.hsvToRgb({ h: 0, s: 100, v: 100 })).toMatchObject({
      r: 255,
      g: 0,
      b: 0,
    });
    // Pure yellow
    expect(Color.hsvToRgb({ h: 60, s: 100, v: 100 })).toMatchObject({
      r: 255,
      g: 255,
      b: 0,
    });
    // Pure green
    expect(Color.hsvToRgb({ h: 120, s: 100, v: 100 })).toMatchObject({
      r: 0,
      g: 255,
      b: 0,
    });
    // Pure cyan
    expect(Color.hsvToRgb({ h: 180, s: 100, v: 100 })).toMatchObject({
      r: 0,
      g: 255,
      b: 255,
    });
    // Pure blue
    expect(Color.hsvToRgb({ h: 240, s: 100, v: 100 })).toMatchObject({
      r: 0,
      g: 0,
      b: 255,
    });
    // Pure magenta
    expect(Color.hsvToRgb({ h: 300, s: 100, v: 100 })).toMatchObject({
      r: 255,
      g: 0,
      b: 255,
    });
  });

  test("Color.hslToHsv accurately converts hsl to hsv", () => {
    // Pure white
    expect(Color.hslToHsv({ h: 0, s: 0, l: 100 })).toMatchObject({
      h: 0,
      s: 0,
      v: 100,
    });
    // Pure black
    expect(Color.hslToHsv({ h: 0, s: 0, l: 0 })).toMatchObject({
      h: 0,
      s: 0,
      v: 0,
    });
    // 25% s 25% l
    expect(Color.hslToHsv({ h: 0, s: 25, l: 25 })).toMatchObject({
      h: 0,
      s: 40,
      v: 31.25,
    });
    // 50% s 50% l
    expect(roundObject(Color.hslToHsv({ h: 0, s: 50, l: 50 }))).toMatchObject({
      h: 0,
      s: 67,
      v: 75,
    });
    // 75% s 75% l
    expect(Color.hslToHsv({ h: 0, s: 75, l: 75 })).toMatchObject({
      h: 0,
      s: 40,
      v: 93.75,
    });
  });

  test("Color.hsvToHsl accurately converts hsv to hsl", () => {
    // Pure white
    expect(Color.hsvToHsl({ h: 0, s: 0, v: 100 })).toMatchObject({
      h: 0,
      s: 0,
      l: 100,
    });
    // Pure black
    expect(Color.hsvToHsl({ h: 0, s: 0, v: 0 })).toMatchObject({
      h: 0,
      s: 0,
      l: 0,
    });
    // 25% s 25% l
    expect(Color.hsvToHsl({ h: 0, s: 40, v: 31.25 })).toMatchObject({
      h: 0,
      s: 25,
      l: 25,
    });
    // 50% s 50% l
    expect(roundObject(Color.hsvToHsl({ h: 0, s: 67, v: 75 }))).toMatchObject({
      h: 0,
      s: 50,
      l: 50,
    });
    // 75% s 75% l
    expect(Color.hsvToHsl({ h: 0, s: 40, v: 93.75 })).toMatchObject({
      h: 0,
      s: 75,
      l: 75,
    });
  });
});

describe("Color constructor", () => {
  test("Color is a constructor", () => {
    expect(
      !!Color.prototype && !!Color.prototype.constructor.name
    ).toBeTruthy();
  });

  test("Color can be constructed with a hsv object", () => {
    const hsv = { h: 360, s: 100, v: 50, a: 1 };
    color = new Color(hsv);
    expect(color.hsv).toMatchObject({ h: 360, s: 100, v: 50 });
    expect(color.alpha).toEqual(1);
  });

  test("Color can be constructed with an rgb object", () => {
    let color = new Color({ r: 255, g: 255, b: 255 });
    expect(color.hsv).toMatchObject({ h: 0, s: 0, v: 100 });
  });

  test("Color can be constructed with a hsl object", () => {
    let color = new Color({ h: 0, s: 0, l: 100 });
    expect(color.hsv).toMatchObject({ h: 0, s: 0, v: 100 });
  });

  test("Color can be constructed with an rgb or rgba string", () => {
    let color = new Color("rgb(255, 0, 0)");
    expect(color.rgb).toMatchObject({ r: 255, g: 0, b: 0 });
    color = new Color("rgb(0, 255, 0)");
    expect(color.rgb).toMatchObject({ r: 0, g: 255, b: 0 });
    color = new Color("rgb(0, 0, 255)");
    expect(color.rgb).toMatchObject({ r: 0, g: 0, b: 255 });
    color = new Color("rgb(255,255,255)");
    expect(color.rgb).toMatchObject({ r: 255, g: 255, b: 255 });
    color = new Color("rgb 255 255 255");
    expect(color.rgb).toMatchObject({ r: 255, g: 255, b: 255 });
    color = new Color("rgba(255, 0, 0, 1)");
    expect(color.rgb).toMatchObject({ r: 255, g: 0, b: 0 });
    color = new Color("rgba(0, 255, 0, 1)");
    expect(color.rgb).toMatchObject({ r: 0, g: 255, b: 0 });
    color = new Color("rgba(0, 0, 255, 1)");
    expect(color.rgb).toMatchObject({ r: 0, g: 0, b: 255 });
    color = new Color("rgba(255,255,255,1)");
    expect(color.rgb).toMatchObject({ r: 255, g: 255, b: 255 });
    color = new Color("rgba 255 255 255 1");
    expect(color.rgb).toMatchObject({ r: 255, g: 255, b: 255 });
  });

  test("Color can be constructed with an rgb or rgba percentage string", () => {
    let color = new Color("rgb(100%, 0%, 0%)");
    let rgb = color.rgb;
    expect(rgb.r).toBeCloseTo(255, 0);
    expect(rgb.g).toBe(0);
    expect(rgb.b).toBe(0);
    color = new Color("rgb(0%, 100%, 0%)");
    rgb = color.rgb;
    expect(rgb.r).toBe(0);
    expect(rgb.g).toBeCloseTo(255, 0);
    expect(rgb.b).toBe(0);
    color = new Color("rgb(0%, 0%, 100%)");
    rgb = color.rgb;
    expect(rgb.r).toBe(0);
    expect(rgb.g).toBe(0);
    expect(rgb.b).toBeCloseTo(255, 0);
    color = new Color("rgb(100%, 100%, 100%)");
    rgb = color.rgb;
    expect(rgb.r).toBeCloseTo(255, 0);
    expect(rgb.g).toBeCloseTo(255, 0);
    expect(rgb.b).toBeCloseTo(255, 0);
    color = new Color("rgb(100%,100%,100%)");
    rgb = color.rgb;
    expect(rgb.r).toBeCloseTo(255, 0);
    expect(rgb.g).toBeCloseTo(255, 0);
    expect(rgb.b).toBeCloseTo(255, 0);
    color = new Color("rgb 100% 100% 100%");
    rgb = color.rgb;
    expect(rgb.r).toBeCloseTo(255, 0);
    expect(rgb.g).toBeCloseTo(255, 0);
    expect(rgb.b).toBeCloseTo(255, 0);
    color = new Color("rgba(100%, 100%, 100%, 100%)");
    rgb = color.rgb;
    expect(rgb.r).toBeCloseTo(255, 0);
    expect(rgb.g).toBeCloseTo(255, 0);
    expect(rgb.b).toBeCloseTo(255, 0);
    color = new Color("rgba(100%,100%,100%,100%)");
    rgb = color.rgb;
    expect(rgb.r).toBeCloseTo(255, 0);
    expect(rgb.g).toBeCloseTo(255, 0);
    expect(rgb.b).toBeCloseTo(255, 0);
    color = new Color("rgba 100% 100% 100% 100%");
    rgb = color.rgb;
    expect(rgb.r).toBeCloseTo(255, 0);
    expect(rgb.g).toBeCloseTo(255, 0);
    expect(rgb.b).toBeCloseTo(255, 0);
  });

  test("Color alpha component can be set with an rgba or rgba percentage string", () => {
    let color = new Color("rgba(255, 255, 255, 0)");
    expect(color.alpha).toEqual(0);
    color = new Color("rgba(255, 255, 255, 1)");
    expect(color.alpha).toEqual(1);
    color = new Color("rgba(255, 255, 255, .5)");
    expect(color.alpha).toEqual(0.5);
    color = new Color("rgba(255, 255, 255, 0.75)");
    expect(color.alpha).toEqual(0.75);
    color = new Color("rgba(100%, 100%, 100%, 0)");
    expect(color.alpha).toEqual(0);
    color = new Color("rgba(100%, 100%, 100%, 1)");
    expect(color.alpha).toEqual(1);
    color = new Color("rgba(100%, 100%, 100%, .5)");
    expect(color.alpha).toEqual(0.5);
    color = new Color("rgba(100%, 100%, 100%, 0.75)");
    expect(color.alpha).toEqual(0.75);
  });

  test("Color can be constructed with an hsl or hsla string", () => {
    let color = new Color("hsl(360, 0%, 100%)");
    expect(color.hsl).toMatchObject({ h: 360, s: 0, l: 100 });
    color = new Color("hsl(360,100%,100%)");
    expect(color.hsl).toMatchObject({ h: 360, s: 0, l: 100 });
    color = new Color("hsl 360 100% 100%");
    expect(color.hsl).toMatchObject({ h: 360, s: 0, l: 100 });
    color = new Color("hsla(360, 100%, 100%, 1)");
    expect(color.hsl).toMatchObject({ h: 360, s: 0, l: 100 });
    color = new Color("hsla(360,100%,100%,1)");
    expect(color.hsl).toMatchObject({ h: 360, s: 0, l: 100 });
    color = new Color("hsla 360 100% 100% 1");
    expect(color.hsl).toMatchObject({ h: 360, s: 0, l: 100 });
  });

  test("Color alpha component can be set with a hsla string", () => {
    let color = new Color("hsla(360, 100%, 100%, 0)");
    expect(color.alpha).toEqual(0);
    color = new Color("hsla(360, 100%, 100%, 1)");
    expect(color.alpha).toEqual(1);
    color = new Color("hsla(360, 100%, 100%, .5)");
    expect(color.alpha).toEqual(0.5);
    color = new Color("hsla(360, 100%, 100%, 0.75)");
    expect(color.alpha).toEqual(0.75);
    color = new Color("hsla(100%, 100%, 100%, 0)");
    expect(color.alpha).toEqual(0);
    color = new Color("hsla(100%, 100%, 100%, 1)");
    expect(color.alpha).toEqual(1);
    color = new Color("hsla(100%, 100%, 100%, .5)");
    expect(color.alpha).toEqual(0.5);
    color = new Color("hsla(100%, 100%, 100%, 0.75)");
    expect(color.alpha).toEqual(0.75);
  });

  test("Color can be constructed with a hex3 value", () => {
    let color = new Color("#f00");
    expect(color.rgb).toMatchObject({ r: 255, g: 0, b: 0 });
    color = new Color("#0f0");
    expect(color.rgb).toMatchObject({ r: 0, g: 255, b: 0 });
    color = new Color("#00f");
    expect(color.rgb).toMatchObject({ r: 0, g: 0, b: 255 });
    color = new Color("#fff");
    expect(color.rgb).toMatchObject({ r: 255, g: 255, b: 255 });
    color = new Color("#FFF");
    expect(color.rgb).toMatchObject({ r: 255, g: 255, b: 255 });
    color = new Color("fff");
    expect(color.rgb).toMatchObject({ r: 255, g: 255, b: 255 });
    color = new Color("0xfff");
    expect(color.rgb).toMatchObject({ r: 255, g: 255, b: 255 });
    color = new Color("0xFFF");
    expect(color.rgb).toMatchObject({ r: 255, g: 255, b: 255 });
  });

  test("Color can be constructed with a hex4 value", () => {
    let color = new Color("#f000");
    expect(color.rgb).toMatchObject({ r: 255, g: 0, b: 0 });
    color = new Color("#0f00");
    expect(color.rgb).toMatchObject({ r: 0, g: 255, b: 0 });
    color = new Color("#00f0");
    expect(color.rgb).toMatchObject({ r: 0, g: 0, b: 255 });
    color = new Color("#000f");
    expect(color.rgb).toMatchObject({ r: 0, g: 0, b: 0 });
    color = new Color("#ffff");
    expect(color.rgb).toMatchObject({ r: 255, g: 255, b: 255 });
    color = new Color("#ffff");
    expect(color.rgb).toMatchObject({ r: 255, g: 255, b: 255 });
    color = new Color("#FFFF");
    expect(color.rgb).toMatchObject({ r: 255, g: 255, b: 255 });
    color = new Color("ffff");
    expect(color.rgb).toMatchObject({ r: 255, g: 255, b: 255 });
    color = new Color("0xffff");
    expect(color.rgb).toMatchObject({ r: 255, g: 255, b: 255 });
    color = new Color("0xFFFF");
    expect(color.rgb).toMatchObject({ r: 255, g: 255, b: 255 });
  });

  test("Color can be constructed with a hex6 value", () => {
    let color = new Color("#ff0000");
    expect(color.rgb).toMatchObject({ r: 255, g: 0, b: 0 });
    color = new Color("#00ff00");
    expect(color.rgb).toMatchObject({ r: 0, g: 255, b: 0 });
    color = new Color("#0000ff");
    expect(color.rgb).toMatchObject({ r: 0, g: 0, b: 255 });
    color = new Color("#ffffff");
    expect(color.rgb).toMatchObject({ r: 255, g: 255, b: 255 });
    color = new Color("#FFFFFF");
    expect(color.rgb).toMatchObject({ r: 255, g: 255, b: 255 });
    color = new Color("ffffff");
    expect(color.rgb).toMatchObject({ r: 255, g: 255, b: 255 });
    color = new Color("FFFFFF");
    expect(color.rgb).toMatchObject({ r: 255, g: 255, b: 255 });
    color = new Color("0xffffff");
    expect(color.rgb).toMatchObject({ r: 255, g: 255, b: 255 });
    color = new Color("0xFFFFFF");
    expect(color.rgb).toMatchObject({ r: 255, g: 255, b: 255 });
  });

  test("Color can be constructed with a hex8 value", () => {
    let color = new Color("#ff000000");
    expect(color.rgb).toMatchObject({ r: 255, g: 0, b: 0 });
    color = new Color("#00ff0000");
    expect(color.rgb).toMatchObject({ r: 0, g: 255, b: 0 });
    color = new Color("#0000ff00");
    expect(color.rgb).toMatchObject({ r: 0, g: 0, b: 255 });
    color = new Color("#000000ff");
    expect(color.rgb).toMatchObject({ r: 0, g: 0, b: 0 });
    color = new Color("#ffffffff");
    expect(color.rgb).toMatchObject({ r: 255, g: 255, b: 255 });
    color = new Color("#FFFFFFFF");
    expect(color.rgb).toMatchObject({ r: 255, g: 255, b: 255 });
    color = new Color("ffffffff");
    expect(color.rgb).toMatchObject({ r: 255, g: 255, b: 255 });
    color = new Color("FFFFFFFF");
    expect(color.rgb).toMatchObject({ r: 255, g: 255, b: 255 });
    color = new Color("0xffffffff");
    expect(color.rgb).toMatchObject({ r: 255, g: 255, b: 255 });
    color = new Color("0xFFFFFFFF");
    expect(color.rgb).toMatchObject({ r: 255, g: 255, b: 255 });
  });
});

describe("Color properties", () => {
  test("Color hsv property is readable", () => {
    const hsv = { h: 360, s: 100, v: 50 };
    color = new Color(hsv);
    expect(color.hsv).toMatchObject(hsv);
  });

  test("Color hsv property is writable", () => {
    const hsv = { h: 360, s: 100, v: 50, a: 1 };
    color = new Color();
    color.hsv = hsv;
    expect(color.hsv).toMatchObject({ h: 360, s: 100, v: 50 });
    expect(color.alpha).toEqual(1);
  });

  test("Color rgb property is readable", () => {
    let color = new Color({ h: 360, s: 100, v: 50 });
    let rgb = color.rgb;
    expect(rgb.r).toBeCloseTo(127.5, 1);
    expect(rgb.g).toBe(0);
    expect(rgb.b).toBe(0);
  });

  test("Color rgb property is writable", () => {
    let color = new Color({ h: 0, s: 0, v: 0, a: 0 });
    color.rgb = { r: 128, g: 0, b: 0 };
    expect(roundObject(color.hsv)).toMatchObject({ h: 0, s: 100, v: 50 });
  });

  test("Color hsl property is readable", () => {
    let color = new Color({ h: 360, s: 100, v: 50 });
    expect(color.hsl).toMatchObject({ h: 360, s: 100, l: 25 });
  });

  test("Color hsl property is writable", () => {
    let color = new Color({ h: 0, s: 0, v: 0, a: 0 });
    color.hsl = { h: 360, s: 100, l: 100 };
    expect(roundObject(color.hsv)).toMatchObject({ h: 360, s: 0, v: 100 });
  });

  test("Color rgbString property is readable", () => {
    let color = new Color({ h: 360, s: 100, v: 50 });
    expect(color.rgbString).toBe("rgb(128, 0, 0)");
  });

  test("Color rgbString property is writable", () => {
    let color = new Color({ h: 0, s: 0, v: 0, a: 0 });
    color.rgbString = "rgb(128, 0, 0)";
    expect(roundObject(color.hsv)).toMatchObject({ h: 0, s: 100, v: 50 });
  });

  test("Color hslString property is readable", () => {
    let color = new Color({ h: 360, s: 100, v: 50 });
    expect(color.hslString).toBe("hsl(360, 100%, 25%)");
  });

  test("Color hslString property is writable", () => {
    let color = new Color({ h: 0, s: 0, v: 0, a: 0 });
    color.hslString = "hsl(360, 100%, 25%)";
    expect(roundObject(color.hsv)).toMatchObject({ h: 360, s: 100, v: 50 });
  });

  test("Color hexString property is readable", () => {
    let color = new Color({ r: 255, g: 0, b: 0 });
    expect(color.hexString).toBe("#ff0000");
  });

  test("Color hexString property is writable", () => {
    let color = new Color({ h: 0, s: 0, v: 0, a: 0 });
    color.hexString = "#ff0000";
    expect(roundObject(color.rgb)).toMatchObject({ r: 255, g: 0, b: 0 });
  });
});

describe("Color methods", () => {
  test("Color clone method returns a new color with the same value", () => {
    let color = new Color({ h: 0, s: 100, v: 100, a: 1 });
    const cloneColor = color.clone();
    expect(color.hsv).toMatchObject(cloneColor.hsv);
  });

  // set() is also used internally by the iro.Color parser,
  // so the constructor tests already make that this method parses different colors properly
  test("Color set method successfully updates the color value", () => {
    let color = new Color({ h: 0, s: 100, v: 100, a: 1 });
    color.set({ h: 360, s: 0, v: 0, a: 0 });
    expect(color.hsv).toMatchObject({ h: 360, s: 0, v: 0 });
  });

  test("Color setChannel method successfully sets hsv channels", () => {
    let color = new Color({ h: 0, s: 0, v: 0, a: 0 });
    color.setChannel("hsv", "h", 360);
    expect(color.hsv).toMatchObject({ h: 360, s: 0, v: 0 });

    color = new Color({ h: 0, s: 0, v: 0, a: 0 });
    color.setChannel("hsv", "s", 100);
    expect(color.hsv).toMatchObject({ h: 0, s: 100, v: 0 });

    color = new Color({ h: 0, s: 0, v: 0, a: 0 });
    color.setChannel("hsv", "v", 100);
    expect(color.hsv).toMatchObject({ h: 0, s: 0, v: 100 });
  });

  test("Color setChannel method successfully sets rgb channels", () => {
    let color = new Color({ r: 0, g: 0, b: 0 });
    color.setChannel("rgb", "r", 255);
    expect(color.rgb).toMatchObject({ r: 255, g: 0, b: 0 });

    color = new Color({ r: 0, g: 0, b: 0 });
    color.setChannel("rgb", "g", 255);
    expect(color.rgb).toMatchObject({ r: 0, g: 255, b: 0 });

    color = new Color({ r: 0, g: 0, b: 0 });
    color.setChannel("rgb", "b", 255);
    expect(color.rgb).toMatchObject({ r: 0, g: 0, b: 255 });
  });
});

describe("Color onChange callback", () => {
  test("Color accepts and fires onChange callback", (done): void => {
    color = new Color({ h: 360, s: 100, v: 100, a: 1 }, (): void => {
      done();
    });
    color.hsv = { h: 0, s: 0, v: 0, a: 0 };
  });

  test("Color onChange callback receives color and changes params", (done): void => {
    color = new Color(
      { h: 360, s: 100, v: 100, a: 1 },
      (color: any, changes: any): void => {
        expect(color).toBe(color);
        expect(
          "h" in changes && "s" in changes && "v" in changes && "a" in changes
        ).toBeTruthy();
        done();
      }
    );
    color.hsv = { h: 0, s: 0, v: 0, a: 0 };
  });

  test("Color onChange changes param provides an accurate diff or color changes", (done): void => {
    color = new Color(
      { h: 360, s: 100, v: 100, a: 1 },
      (color: any, changes: any): void => {
        // all hsva channels should have changed
        expect(changes).toMatchObject({
          h: true,
          s: true,
          v: true,
          a: true,
        });
        done();
      }
    );
    color.hsv = { h: 0, s: 0, v: 0, a: 0 };
  });
});
