import { h, render, ComponentType, Attributes } from "preact";

// Turn a component into a widget
// This returns a factory function that can be used to create an instance of the widget component
// The first function param is a DOM element or CSS selector for the element to mount to,
// The second param is for config options which are passed to the component as props
// This factory function can also delay mounting the element into the DOM until the page is ready

export interface Widget {
  base?: Element | Text;
  onMount: (root: HTMLElement) => void;
}

export function createWidget<C extends Widget, P>(
  WidgetComponent: ComponentType
) {
  const widgetFactory = function (
    parent: string | HTMLElement,
    props: Partial<P> = {}
  ): C {
    let widget: C = null!; // will become an instance of the widget component class
    const widgetRoot = document.createElement("div");

    // Render widget into a temp DOM node
    render(
      h(WidgetComponent, {
        ref: (ref: C | null) => (widget = ref!),
        ...(props || {}),
      } as Attributes),
      widgetRoot
    );

    function mountWidget() {
      const container =
        parent instanceof Element ? parent : document.querySelector(parent);
      if (!container) {
        // Warn if selector not found
        if (typeof parent === "string") {
          console.warn(`[iro.js] Selector "${parent}" not found in document`);
        }
        return;
      }
      // Guard against missing widget.base before appending
      if (!widget.base) {
        console.warn("[iro.js] Widget base element not ready, retrying...");
        // Retry on next frame
        requestAnimationFrame(mountWidget);
        return;
      }
      container.appendChild(widget.base);
      // Only call onMount if container is an HTMLElement (not SVG or other Element types)
      if (container instanceof HTMLElement) {
        widget.onMount(container);
      }
    }
    // Mount it into the DOM when the page document is ready
    const isElementParent = parent instanceof Element;
    if (isElementParent || document.readyState !== "loading") {
      mountWidget();
    } else {
      document.addEventListener("DOMContentLoaded", mountWidget, {
        once: true,
      });
    }

    return widget;
  };

  // Allow the widget factory to inherit component prototype + static class methods
  // This makes it easier for plugin authors to extend the base widget component
  widgetFactory.prototype = WidgetComponent.prototype;
  Object.assign(widgetFactory, WidgetComponent);
  // Add reference to base component too
  widgetFactory.__component = WidgetComponent;

  return widgetFactory;
}
