# Hiya Patel — Ferrari-inspired product design portfolio

A responsive React portfolio with original code, six Behance projects, résumé, selectable journey circuit, animated project cards, case-study dialogs, image enlargement, draggable notes, carousel, toolkit reveal, day/night themes, keyboard shortcuts and an optional race-start sequence.

## Run and edit

Requires Node.js 20.19+ or 22.12+.

```sh
npm ci
npm run dev
```

Edit portfolio content and links in `src/data.js`, layout in `src/App.jsx`, and appearance in `src/styles.css`. Original project images and résumé are in `public/`. Fonts and images are served locally.

```sh
npm run build
npm run test:sites
```

The complete static website is generated in `dist/client/`. Upload the CONTENTS of this folder to the root of your GitHub Pages repository after each rebuild. The relative base also supports project repositories, with no code changes. Hash-based project links survive reloads on static hosting.

## Publish without coding

Use the prebuilt files at the root of the supplied ZIP. See `START-HERE.md`. No npm, backend, API keys or paid hosting required to publish the prebuilt website.

## Interaction details

- Contact keyboard shortcuts: M email, B Behance, L LinkedIn, R résumé. Disabled while typing or viewing dialogs.
- Day/night preference and visitor notes are saved only in the current browser. The notes are not submitted to Hiya; the adjacent email link is the contact route.
- Race audio is off by default and starts only on a click.
- Reduced-motion settings suppress scrolling/reveal motion. The optional start sequence can be skipped.
- Behance and live-project links open external sites.

## Credits

Project content/artwork: Hiya Patel’s supplied résumé and six linked Behance projects. Paddock and circuit backgrounds: AI-generated thematic artwork. Interaction reference: jameschugh.com, linked by wallofportfolios.in. Implementation and visual design are original. Ferrari-inspired personal portfolio, independently created; no affiliation is implied. Font and icon license notices are included in THIRD-PARTY-NOTICES.txt.
