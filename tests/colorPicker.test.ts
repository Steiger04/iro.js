import { IroColorPickerWidget as IroColorPicker } from "../src/ColorPicker";
import { IroColor } from "@irojs/iro-core";

// TODO: much more robust testing

let root: HTMLDivElement;

beforeAll(() => {
  root = document.createElement("div");
  (document.body || document.documentElement).appendChild(root);
});

beforeEach(() => {
  root.innerHTML = "";
});

afterAll(() => {
  root.parentNode!.removeChild(root);
  root = null!;
});

describe("ColorPicker mounting", () => {
  test("ColorPicker successfully mounts", () => {
    void IroColorPicker(root);
    expect(root.children.length).toBe(1);
  });

  test("ColorPicker renders root div with class .iro__colorPicker", () => {
    void IroColorPicker(root);
    const colorPickerBase = root.children[0];
    expect(colorPickerBase.tagName).toBe("DIV");
    expect(colorPickerBase.className).toBe("iro__colorPicker");
  });

  // Need to make sure that mount() is fired even if the event is registered after the colorpicker mount?
  // test('ColorPicker fires mount event', done => {
  //   const colorPicker = new IroColorPicker(root);
  //   colorPicker.on('mount', function() {
  //     done()
  //   });
  // });
});

describe("ColorPicker public properties", () => {
  test("ColorPicker el property references its DOM container element", () => {
    const colorPicker = IroColorPicker(root);
    expect(colorPicker.el).toBe(root);
  });

  test("ColorPicker base property references its DOM root element", () => {
    const colorPicker = IroColorPicker(root);
    expect(colorPicker.base).toBe(root.children[0]);
  });

  test("ColorPicker color property is an iro.Color instance", () => {
    const colorPicker = IroColorPicker(root);
    expect(colorPicker.color instanceof IroColor).toBeTruthy();
  });
});

describe("ColorPicker config object", () => {
  test("ColorPicker receives defaultProps as default config params", () => {
    const colorPicker = IroColorPicker(root);
    expect(Object.keys(colorPicker.props)).toEqual(
      expect.arrayContaining(Object.keys((IroColorPicker as any).defaultProps))
    );
  });

  test("ColorPicker initial config props are merged into component state", () => {
    const colorPicker = IroColorPicker(root);
    expect(Object.keys(colorPicker.state)).toEqual(
      expect.arrayContaining(Object.keys(colorPicker.props))
    );
  });

  test("ColorPicker receives config from constructor function as props", () => {
    const colorPicker = IroColorPicker(root, {
      color: "#ff0000",
      width: 200,
      display: "flex",
    });
    expect(colorPicker.props.color).toBe("#ff0000");
    expect(colorPicker.props.width).toBe(200);
    expect(colorPicker.props.display).toBe("flex");
  });
});

describe("ColorPicker events API", () => {
  test("ColorPicker on() method registers an event", (done) => {
    const colorPicker = IroColorPicker(root);
    colorPicker.on("test", (): void => {
      done();
    });
    colorPicker.emit("test");
  });

  test("ColorPicker off() method unregisters an event", () => {
    const colorPicker = IroColorPicker(root);
    let wasCalled = false;
    const callback = (): void => {
      wasCalled = true;
    };
    colorPicker.on("test", callback);
    colorPicker.off("test", callback);
    colorPicker.emit("test");
    expect(wasCalled).toBeFalsy();
  });
});

describe("ColorPicker color API", () => {
  test("ColorPicker default selected color is created from the config value", () => {
    const colorPicker = IroColorPicker(root, {
      color: { h: 360, s: 0, v: 100 },
    });
    expect(colorPicker.color.hsv).toMatchObject({ h: 360, s: 0, v: 100 });
  });

  test("ColorPicker color:change event is fired when the color changes", (done): void => {
    const colorPicker = IroColorPicker(root, {
      color: { h: 360, s: 0, v: 100 },
    });
    colorPicker.on("color:change", (): void => {
      done();
    });
    colorPicker.color.hsv = { h: 0, s: 100, v: 0 };
  });
});

describe("ColorPicker gamut API", () => {
  test("setGamut updates all colors", () => {
    const colorPicker = IroColorPicker(root, {
      colors: [
        "#ff0000", // Red
        "#00ff00", // Green
        "#ff00ff", // Magenta (outside gamut C)
      ],
      gamut: "none",
    });

    colorPicker.setGamut("C");

    // All colors should have gamut C
    colorPicker.colors.forEach((color) => {
      expect(color.gamutType).toBe("C");
    });

    // Magenta should be clamped
    const magentaColor = colorPicker.colors[2];
    const xy = magentaColor.xy;
    // Verify xy is within reasonable bounds for gamut C (simplified check)
    expect(xy.x).toBeGreaterThan(0);
    expect(xy.x).toBeLessThan(1);
    expect(xy.y).toBeGreaterThan(0);
    expect(xy.y).toBeLessThan(1);
  });

  test("setGamut updates ColorPicker state", () => {
    const colorPicker = IroColorPicker(root, {
      gamut: "none",
    });

    colorPicker.setGamut("B");

    // Check that colors were updated (state update is async)
    colorPicker.colors.forEach((color) => {
      expect(color.gamutType).toBe("B");
    });
  });

  test("setGamut does NOT trigger color:change events (Comment 7 - silent mode)", (done) => {
    const colorPicker = IroColorPicker(root, {
      color: "#ff00ff", // Magenta (outside gamut C)
      gamut: "none",
    });

    let eventFired = false;
    colorPicker.on("color:change", (): void => {
      eventFired = true;
    });

    colorPicker.setGamut("C");

    // Give time for event to potentially fire
    setTimeout(() => {
      expect(eventFired).toBe(false); // Should NOT fire due to silent mode
      done();
    }, 10);
  });

  test("New colors after setGamut use new gamut", (done) => {
    const colorPicker = IroColorPicker(root, {
      gamut: "none",
    });

    colorPicker.setGamut("A");

    // setState is async, so wait a bit before adding new color
    setTimeout(() => {
      colorPicker.addColor("#ff0000");
      const newColor = colorPicker.colors[colorPicker.colors.length - 1];
      expect(newColor.gamutType).toBe("A");
      done();
    }, 10);
  });

  test("setGamut with single-color picker", () => {
    const colorPicker = IroColorPicker(root, {
      color: "#ff0000",
      gamut: "none",
    });

    expect(() => {
      colorPicker.setGamut("C");
    }).not.toThrow();

    expect(colorPicker.color.gamutType).toBe("C");
  });

  test("setGamut from restrictive to none expands color space", () => {
    const colorPicker = IroColorPicker(root, {
      color: "#ff0000",
      gamut: "A",
    });

    expect(colorPicker.color.gamutType).toBe("A");
    colorPicker.setGamut("none");
    expect(colorPicker.color.gamutType).toBe("none");

    // Future xy operations will not be clamped
    // This is the key behavior change
  });

  test("setGamut with same gamut is idempotent", () => {
    const colorPicker = IroColorPicker(root, {
      color: "#ff0000",
      gamut: "C",
    });

    const mockListener = jest.fn();
    colorPicker.on("color:change", mockListener);

    colorPicker.setGamut("C"); // Same gamut

    // Event should not fire since color doesn't change
    expect(mockListener).not.toHaveBeenCalled();
  });

  test("setGamut emits gamut:change event exactly once", (done) => {
    const colorPicker = IroColorPicker(root, {
      colors: ["#ff0000", "#00ff00", "#0000ff"],
      gamut: "none",
    });

    const gamutChangeListener = jest.fn();
    colorPicker.on("gamut:change", gamutChangeListener);

    colorPicker.setGamut("C");

    // Give time for async operations
    setTimeout(() => {
      // Should fire exactly once, not once per color
      expect(gamutChangeListener).toHaveBeenCalledTimes(1);
      expect(gamutChangeListener).toHaveBeenCalledWith("C");
      done();
    }, 10);
  });

  test("setOptions with gamut updates all colors and emits gamut:change", (done) => {
    const colorPicker = IroColorPicker(root, {
      colors: ["#ff0000", "#00ff00", "#0000ff"],
      gamut: "none",
    });

    const gamutChangeListener = jest.fn();
    colorPicker.on("gamut:change", gamutChangeListener);

    // Use setOptions to change gamut
    colorPicker.setOptions({ gamut: "C" });

    setTimeout(() => {
      // Verify all colors have the new gamut
      colorPicker.colors.forEach((color) => {
        expect(color.gamutType).toBe("C");
      });
      // Verify gamut:change event was emitted exactly once
      expect(gamutChangeListener).toHaveBeenCalledTimes(1);
      expect(gamutChangeListener).toHaveBeenCalledWith("C");
      done();
    }, 10);
  });

  test("setOptions with unchanged gamut only is a no-op", (done) => {
    const colorPicker = IroColorPicker(root, {
      gamut: "C",
    });

    const gamutChangeListener = jest.fn();
    colorPicker.on("gamut:change", gamutChangeListener);

    // Spy on setState to verify it's not called
    const setStateSpy = jest.spyOn(colorPicker as any, "setState");

    // Call setOptions with unchanged gamut only
    colorPicker.setOptions({ gamut: "C" });

    setTimeout(() => {
      // Verify no setState was called (early return worked)
      expect(setStateSpy).not.toHaveBeenCalled();
      // Verify no gamut:change event was emitted
      expect(gamutChangeListener).not.toHaveBeenCalled();
      setStateSpy.mockRestore();
      done();
    }, 10);
  });
});
