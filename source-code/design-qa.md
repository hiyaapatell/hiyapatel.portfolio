# Design QA — Hiya Patel portfolio

Status: passed for the tested Chromium desktop/mobile paths, 2026-10-14.

## Reference and design intent

Reference: James Chugh portfolio linked by Wall of Portfolios. Desktop and mobile source states were inspected. Preserved broad section flow: immersive pinned hero, introduction, selectable journey, interactive project deck/case studies, featured websites, personal project, revealable tools, process, movable moodboard, notes and keyboard contact links.

User-directed change: complete Ferrari/F1 visual identity with original implementation. This is not a pixel-identical replica: scenery, typography, card treatment, transitions and responsive arrangements are adapted. Mobile project cards use a horizontally scrollable deck. Notes persist only in the visitor's browser, with that limitation visibly disclosed.

## Verified

- Production build completed; four hosting adapter tests passed.
- Production output served successfully at `/portfolio/`, testing repository-subpath asset resolution.
- Chromium desktop 1363×936 and mobile 390×844 visual inspections: hero, work, journey, moodboard and contact.
- Mobile document width equals viewport width (390px).
- All six project dialogs opened in the requested sequence; dialogs closed successfully.
- Paquet artwork enlargement and dismissal worked.
- Lights-out sequence completed and navigated to work.
- Education/experience selection, next journey stop and zoom-in controls worked.
- Education starts with MIT, then MassArt, then Nirma; MIT presented as coursework.
- Toolkit expanded, note form saved locally, light/dark theme changed.
- No application page errors or completed broken image requests in test run.
- Live development preview visually verified in cloud Chrome.

## Implementation coverage and limits

Pointer dragging, card hover/tilt, carousel controls, optional user-triggered audio, keyboard shortcuts, copy email and reduced-motion handling are implemented. Not every animation frame, operating-system mail handler or physical mobile browser was tested. External links are source links rather than duplicated external content. Actual GitHub publication remains a user step; the supplied archive includes tested static output and instructions.
