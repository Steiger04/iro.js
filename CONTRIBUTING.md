# Contributing to iro.js

Thank you for your interest in improving iro.js! This project is open source under the MPL-2.0 license and thrives on collaborative contributions. If you have questions or ideas, please start a discussion or open an issue on GitHub.

## Getting Started

- **Node.js**: Use the version listed in [`.node-version`](.node-version). Tools like `nvm` or `fnm` make switching easy.
- **Clone repositories**: iro.js depends on the local `@irojs/iro-core` package. Check out both `iro.js/` and the sibling `iro-core/` directories.
- **Install dependencies**:

  ```bash
  npm install
  ```

This command installs both runtime and development dependencies, including Rollup, Preact, Jest, and VuePress.

## Project Structure

- `src/` — TypeScript source for the ColorPicker widget (components such as `ColorPicker.tsx`, `Wheel.tsx`, `Box.tsx`, `Slider.tsx`).
- `tests/` — Jest test suites executed with ts-jest and the jsdom environment.
- `docs/` — VuePress documentation site, including guides, API docs, and localized content under `docs/zh/`.
- `docs/technical/` — Technical planning and verification documents (PRDs, ADRs, validation reports).
- `dist/` — Generated build artifacts (UMD, ESM, minified bundles, and type definitions).
- `demo/` — Lightweight HTML demo for quick manual testing.
- `../iro-core/` — Local sibling package that supplies shared color math, gamut handling, and utilities.

## Development Workflow

- **Install dependencies**:

  ```bash
  npm install
  ```

- **Run dev server** (Rollup watch + live reload at http://localhost:10001):

  ```bash
  npm start
  ```

- **Run the test suite** (Jest with ts-jest):

  ```bash
  npm test
  ```

- **Run tests in watch mode**:

  ```bash
  npm test -- --watch
  ```

- **Build production bundles** (UMD, ESM, minified, plus docs helper script):

  ```bash
  npm run build
  ```

## Code Style Guidelines

- **Language**: TypeScript targeting ES2019; JSX is compiled with the Preact `h` factory.
- **Formatting**: Follow the existing 2-space indentation and trailing comma patterns. Use descriptive names and keep imports sorted logically.
- **Naming**:
  - Components and classes: PascalCase (`ColorPicker`, `WheelHandle`).
  - Files: Match their primary export (e.g., `ColorPicker.tsx`).
  - Private fields: Prefix with `_` when needed.
- **Typing**: Prefer explicit types. Avoid `any` unless absolutely necessary and document why.
- **Comments**: Use JSDoc for public APIs and clarify complex logic with concise inline comments.

## Testing Requirements

- Add or update tests in `tests/` alongside new functionality.
- Test files follow the `*.test.ts` naming convention.
- The Jest environment is jsdom; DOM-focused tests can render Preact components.
- Good reference suites: `tests/color.test.ts`, `tests/colorPicker.test.ts`, and `tests/util.createWidget.test.ts`.
- Run `npm test` before submitting a pull request. Aim for meaningful coverage of critical behaviors.

## Pull Request Process

Before submitting a PR:

- ✅ Run `npm test` and ensure all suites pass.
- ✅ Run `npm run build` to verify bundles produce cleanly.
- ✅ Manually sanity-check changes in the demo (`npm start`) when UI is affected.
- ✅ Update documentation or examples if public APIs change.

Your PR description should include:

- What changed and why.
- Links to related issues (e.g., `Fixes #123`).
- Screenshots or GIFs for UI changes.
- A clear note about breaking changes, if any.

Review etiquette:

- Maintainers may request adjustments—please respond promptly and keep discussion open.
- Once approvals are in place, a maintainer will merge the PR.

### Sample PR description

- Motivation
- Changes
- Tests
- Screenshots
- Breaking Changes

### PR Checklist

- [ ] Tests pass (`npm test`)
- [ ] Build succeeds (`npm run build`)
- [ ] Demo manually checked for UI changes (`npm start`)
- [ ] Docs/examples updated if API changed
- [ ] Breaking changes documented

## Types of Contributions

- **Bug fixes** — Provide reproduction steps and explain expected versus actual results.
- **New features** — Consider opening an issue first to align on approach; see `docs/technical/` for past planning examples.
- **Documentation** — Improvements, clarifications, and new tutorials are always welcome.
- **Performance work** — Include benchmark data or profiling evidence to illustrate benefits.
- **Refactoring** — Call out the motivation (readability, maintainability) and ensure behavior parity.

## Issue-Templates

Issue templates live under [`.github/ISSUE_TEMPLATE/`](.github/ISSUE_TEMPLATE/). When opening a new issue, select the template that best matches your request:

- **Bug report** (`bug_report.md`)
  - Required fields: description, reproduction steps, expected vs actual behavior, environment details, and any relevant logs or screenshots.
- **Feature request** (`feature_request.md`)
  - Required fields: summary, motivation, proposed solution, alternatives, and additional context or mockups.

Templates pre-fill the issue body to ensure reviewers have the information needed to triage quickly.

## Documentation Site

The public docs at [iro.js.org](//iro.js.org) run on [VuePress](https://vuepress.vuejs.org).

- **Install dependencies**:

  ```bash
  npm install
  ```

- **Live preview** (http://localhost:8080):

  ```bash
  npm run docs:dev
  ```

- **Static build** (output to `docs/.vuepress/dist`):

  ```bash
  npm run docs:build
  ```

- **Content structure**: Markdown lives under `docs/`, with localized translations in `docs/zh/`. Interactive examples rely on components within `docs/.vuepress/components/` (e.g., `ColorPicker.vue`).

## Build Process Details

- **Bundler**: Rollup configured in `rollup.config.js` with TypeScript, alias, and replace plugins.
- **Outputs**:
  - `dist/iro.js` — UMD bundle for browsers/CommonJS.
  - `dist/iro.es.js` — ES module bundle for modern bundlers.
  - `dist/iro.min.js` — Minified UMD bundle.
  - `dist/index.d.ts` — Generated TypeScript declarations.
- **Docs script**: `npm run build` also copies `dist/iro.es.js` into the docs theme via `docs:copyscript`.
- **TypeScript config**: See `tsconfig.json` (`esModuleInterop`, `allowSyntheticDefaultImports`, JSX `reactNamespace: "h"`).

## Working with iro-core

- iro.js consumes the local package `@irojs/iro-core` (see `package.json` dependency `"file:../iro-core"`).
- If you modify iro-core, rebuild both repositories and ensure cross-project tests still pass.
- iro-core exposes color math, gamut mapping, and shared UI utilities. Consult its README for deeper context.

## Technical Documentation

- Major features or architectural decisions should be documented in `docs/technical/`.
- Suitable additions: PRDs, verification reports, ADRs, benchmarking results.
- Refer to [docs/technical/README.md](docs/technical/README.md) for directory guidelines.

## Questions or Issues?

- Open a GitHub issue for bugs, feature requests, or clarification.
- Check existing issues and discussions before creating a new thread.
- For general questions, GitHub Discussions (if enabled) or issues are both acceptable venues.

## License

By contributing, you agree that your work will be licensed under the [Mozilla Public License 2.0](LICENSE.txt). Thank you for helping improve iro.js!
