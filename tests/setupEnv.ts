if (document && document.readyState === "loading") {
  document.dispatchEvent(new Event("DOMContentLoaded"));
}
