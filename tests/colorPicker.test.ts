import { IroColorPickerWidget as IroColorPicker } from "../src/ColorPicker";
import { IroColor } from "@irojs/iro-core";

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

describe("ColorPicker basics", () => {
  test("mounts into the host element", () => {
    void IroColorPicker(root);
    expect(root.children.length).toBe(1);
    expect(root.querySelector(".iro__colorPicker")).not.toBeNull();
  });

  test("exposes color handle", () => {
    const picker = IroColorPicker(root);
    expect(picker.el).toBe(root);
    expect(picker.base).toBe(root.firstElementChild);
    expect(picker.color).toBeInstanceOf(IroColor);
  });
});

describe("ColorPicker events", () => {
  test("color:change fires when hsv mutates", (done) => {
    const picker = IroColorPicker(root, { color: { h: 0, s: 0, v: 0 } });
    picker.on("color:change", () => done());
    picker.color.hsv = { h: 200, s: 60, v: 90 };
  });

  test("setGamut updates colors and emits gamut:change once", (done) => {
    const picker = IroColorPicker(root, {
      colors: ["#ff0000", "#00ff00", "#0000ff"],
      gamut: "none",
    });

    const gamutListener = jest.fn();
    picker.on("gamut:change", gamutListener);

    picker.setGamut("C");

    setTimeout(() => {
      expect(gamutListener).toHaveBeenCalledTimes(1);
      expect(gamutListener).toHaveBeenCalledWith("C");
      picker.colors.forEach((color) => {
        expect(color.gamutType).toBe("C");
      });
      done();
    }, 10);
  });

  test("setGamut does not trigger color:change", (done) => {
    const picker = IroColorPicker(root, {
      color: "#ff00ff",
      gamut: "none",
    });

    const colorListener = jest.fn();
    picker.on("color:change", colorListener);

    picker.setGamut("B");

    setTimeout(() => {
      expect(colorListener).not.toHaveBeenCalled();
      expect(picker.color.gamutType).toBe("B");
      done();
    }, 10);
  });
});

describe("Wheel styling", () => {
  test("wheel hue gradient respects direction and angle", () => {
    IroColorPicker(root, {
      wheelDirection: "clockwise",
      wheelAngle: 35,
    });
    const wheelHue = root.querySelector(".IroWheelHue") as HTMLElement;
    expect(wheelHue).not.toBeNull();
    expect(wheelHue.style.transform).toBe("rotateZ(55deg)");
  });

  test("setOptions keeps hue when visual preservation disabled", (done) => {
    const picker = IroColorPicker(root, {
      color: { h: 210, s: 70, v: 80 },
      preserveVisualHueOnWheelChange: false,
    });
    const beforeHue = picker.color.hsv.h;

    picker.setOptions({ wheelAngle: 35 });

    setTimeout(() => {
      expect(picker.color.hsv.h).toBe(beforeHue);
      done();
    }, 10);
  });
});
