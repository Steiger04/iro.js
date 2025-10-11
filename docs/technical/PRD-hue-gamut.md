# 📄 Product Requirements Document (PRD)

**Projekt:** Erweiterung von iro.js um Philips Hue Gamut-Unterstützung
**Verantwortlich:** [Entwicklerteam / Maintainer]
**Status:** Entwurf
**Version:** 1.0

---

## 1. Hintergrund & Motivation

Die JavaScript-Bibliothek [iro.js](https://github.com/jaames/iro.js) ist ein populärer Farb-Picker. Aktuell unterstützt sie verschiedene Farbmodelle (`rgb`, `hsl`, `hsv`, `hex`, etc.), jedoch keine spezifische Anpassung an Philips Hue Farb-Gamuts (A, B, C).

Philips Hue Leuchtmittel unterstützen nur einen eingeschränkten Farbraum („gamut“). Um Farben korrekt an Hue-Geräte zu übermitteln, müssen RGB-Werte in **CIE 1931 xy-Farbraum-Koordinaten** umgerechnet und dabei auf den jeweiligen Gamut begrenzt werden.

Das Ziel ist, iro.js so zu erweitern, dass Entwickler direkt mit Hue-kompatiblen Farbwerten arbeiten können.

---

## 2. Ziele

- Neue **Option `gamut`** in iro.js hinzufügen, mit möglichen Werten:
  - `"none"` (Standard – keine Einschränkung, heutiges Verhalten bleibt)
  - `"A"`, `"B"`, `"C"` (Philips Hue spezifische Gamuts)
- Bei gesetztem `gamut` wird das Farbobjekt (`color`) um den Wert **`xy`** erweitert.
- Die `xy`-Werte werden auf Basis der RGB-Eingabe berechnet und an den gültigen Hue-Gamut angepasst.
- Kompatibilität mit bestehenden Funktionen und Farbmodellen sicherstellen.

---

## 3. Anforderungen

### 3.1 Funktionale Anforderungen

1. **Option `gamut`:**

   - Kann beim Erstellen eines `iro.ColorPicker` oder beim Setzen von Farbeigenschaften angegeben werden.
   - Default: `"none"`.

   Beispiel:

   ```js
   let colorPicker = new iro.ColorPicker("#picker", {
     gamut: "C",
   });
   ```

2. **Neues Farbmodell `xy`:**

   - `color.xy` gibt ein Array `[x, y]` zurück, berechnet nach CIE 1931 Standard.
   - Werte werden abhängig vom eingestellten `gamut` ggf. korrigiert (clamped).
   - Bei `gamut: "none"` werden Werte berechnet, aber **nicht** eingeschränkt.

   Beispiel:

   ```js
   colorPicker.color.rgb = { r: 255, g: 0, b: 0 };
   console.log(colorPicker.color.xy); // z.B. [0.675, 0.322] für Rot im Gamut C
   ```

3. **Berechnungen & Utility-Funktionen:**
   - Nachbau relevanter Funktionen aus [`node-hue-api` rgb.ts](https://github.com/peter-murray/node-hue-api/blob/typescript/src/rgb.ts):
     - `rgbToXy()` – Umrechnung von RGB in xy
     - `applyGammaCorrection()`
     - `checkPointInLampsReach()` / `closestPointOnLine()` – Korrektur der xy-Werte auf gültigen Gamut
   - Gamut-Definitionen als Konstante hinterlegen:
     ```js
     const GAMUT_A = [
       [0.704, 0.296],
       [0.2151, 0.7106],
       [0.138, 0.08],
     ];
     const GAMUT_B = [
       [0.675, 0.322],
       [0.409, 0.518],
       [0.167, 0.04],
     ];
     const GAMUT_C = [
       [0.692, 0.308],
       [0.17, 0.7],
       [0.153, 0.048],
     ];
     ```
   - Interne Helper-Funktionen:
     - `isPointInTriangle(p, a, b, c)`
     - `getClosestPointToTriangle(p, triangle)`

---

### 3.2 Nicht-funktionale Anforderungen

- **Performance:** Berechnungen müssen performant sein (keine signifikanten Verzögerungen bei Farbänderungen).
- **Backward Compatibility:** Bestehende Nutzer ohne `gamut`-Option dürfen keine Änderungen bemerken.
- **Maintainability:** Implementierung orientiert sich eng an node-hue-api, aber in ES6-Modul-Stil, passend zu iro.js.

---

## 4. User Stories

1. **Als Entwickler** möchte ich den Gamut (`A/B/C`) definieren können, damit die Farbwerte korrekt für Hue-Leuchten berechnet werden.
2. **Als Entwickler** möchte ich `color.xy` abfragen können, damit ich diese Werte direkt an die Hue API übermitteln kann.
3. **Als Nutzer ohne Hue-Bezug** möchte ich weiterhin nur mit `rgb/hsl/hex` arbeiten können, ohne dass sich das Verhalten verändert.

---

## 5. Akzeptanzkriterien

- [ ] `color.xy` wird für jede Farbänderung korrekt berechnet.
- [ ] Bei `gamut: none` → keine Einschränkung, volle CIE 1931 xy.
- [ ] Bei `gamut: A/B/C` → Werte liegen garantiert im gültigen Hue-Gamut-Dreieck.
- [ ] Keine Breaking Changes in bestehender API.

---

## 6. Architektur / Technisches Design

- **Neue Option** in `ColorPicker`-Konfiguration: `gamut`
- **Neue Datei/Modul:** `iro.color.gamut.js`
  - Enthält: Gamut-Definitionen, Hilfsfunktionen zur Umrechnung/Korrektur
- **Integration in Core:**
  - Erweiterung von `Color`-Klasse um `xy` Getter.
  - Getter ruft intern `rgbToXy(this.rgb, this.gamut)` auf.

---

## 7. Risiken & offene Fragen

- Unterschiedliche Implementierungen des RGB → xy-Algorithmus (leicht abweichende Resultate). Entscheidung: exakt `node-hue-api` nachbauen.
- Es soll nicht zusätzlich `brightness` (Y-Wert aus XYZ) berücksichtigt werden.

---

## 8. Nächste Schritte

1. Proof-of-Concept: RGB → xy + Gamut-Clamping in Standalone Utility.
2. Integration in `iro.Color`.
3. Tests mit bekannten Philips Hue xy-Testwerten.
