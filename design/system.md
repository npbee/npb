# Design system

A mono-led system for a text-heavy personal site, with one piece of hardware. The home page is an instrument panel. Every other page is a single reading column with the manual's hairlines and one accent, which takes its color from the section. Every color comes from the instrument: in light the pages sit on its aluminum housing, and in dark they become its screen.

This document describes how things look and read. It is independent of how the site is built. The values it names live in [tokens.css](tokens.css) as plain CSS custom properties.

## Principles

1. **One panel.** The home page is a panel of modules: grilles, a screen, four knobs and four keys. It is the only place with fills, rounded corners and depth. No other page imitates hardware.
2. **Type does the work.** Off the panel, hierarchy comes from face, weight, size and position. There are no cards, shadows, gradients or rounded corners.
3. **One column, two edges.** Every inner page is a single reading-width column. The wordmark, titles, years and text start on its left edge; the nav, dates and line ends stop at its right. Paired facts mirror across its center line.
4. **Mono for short, sans for long.** Anything a reader scans is monospace. Anything a reader settles into is sans.
5. **One accent per page, chosen by section.** Each section owns a knob color, and that color is the accent on its pages. The accent appears as link text plus at most two marks.
6. **Rules, not containers.** Hairlines separate things. Only the panel, code blocks and examples are enclosed.
7. **Every mark earns its place.** Counts, labels and numbers appear only where a reader uses them. Page titles carry no counts and posts carry no sequence numbers; a numbered list stays numbered because its order matters.

## Type

Two faces, both open source and self-hosted:

- **JetBrains Mono**, 400, 500 and 700. The voice of the site.
- **Inter**, 400, 400 italic and 600. Reading text only.

| Mono                                     | Sans                          |
| ---------------------------------------- | ----------------------------- |
| Wordmark, page titles, post titles       | Post body                     |
| Running head, dividers, labels           | About paragraphs              |
| Dates, counts, metadata, stack lines     | Project and demo descriptions |
| Index lists, numbered lists, spec pairs  | Captions longer than a line   |
| Code, inline code, the footer, the panel |                               |

The test: if a piece of text runs past two lines at column width, set it in sans. Titles are the exception. A title stays mono even when it wraps.

Mono uses three weights, each with one job: 700 for titles and headers, 500 for the wordmark alone, 400 for everything else. Emphasis inside sans text uses Inter italic or 600, never a switch of face.

### Scale

Sizes assume a 16px root.

| Token            | Size                                | Line height | Face and weight | Used for                                               |
| ---------------- | ----------------------------------- | ----------- | --------------- | ------------------------------------------------------ |
| `--text-label`   | 0.6875rem (11px)                    | 1.4         | Mono 400        | Uppercase tracked labels, dividers, in muted           |
| `--text-meta`    | 0.8125rem (13px)                    | 1.5         | Mono 400        | Running head, dates, stack lines, page meta            |
| `--text-mono`    | 0.875rem (14px)                     | 1.6         | Mono 400 or 700 | Index rows, numbered lists, spec pairs, items          |
| `--text-body-s`  | 0.9375rem (15px)                    | 1.55        | Sans 400        | Descriptions                                           |
| `--text-body`    | 1.125rem (18px)                     | 1.65        | Sans 400        | Post body, about paragraphs                            |
| `--text-h2`      | 1.25rem (20px)                      | 1.3         | Mono 700        | Headings inside a post                                 |
| `--text-display` | 1.375rem to 1.5rem, fluid (22–24px) | 1.15        | Mono 700        | Page and post titles, the wordmark on the panel screen |

Display type is tracked at -0.02em. Labels are tracked at 0.16em. The wordmark has its own tracking, given below. Nothing else is tracked.

### Case and figures

- Interface words are lowercase: `about`, `posts`, `projects`, `demos`, dividers, page titles.
- Authored titles keep the case they were written in.
- Uppercase is reserved for labels, and labels are always small, tracked and muted.
- A full date is `2023.10.23`. Under a year divider the year is dropped: `10.23`. A month alone is `2023.10`.
- Sequence numbers are zero-padded: `01`, `02`.
- Items in a line are joined with a spaced middle dot: `astro · react · deno deploy`.

## Color

### Page

| Token       | Light     | Dark      | Used for                                  |
| ----------- | --------- | --------- | ----------------------------------------- |
| `--paper`   | `#E2E0DC` | `#000000` | Page ground                               |
| `--paper-2` | `#D6D3CE` | `#141414` | Recessed ground: code blocks, inline code |
| `--ink`     | `#1E1E1D` | `#F1F0EC` | Text, strong rules                        |
| `--muted`   | `#56524C` | `#8F8E89` | Labels, dates, leaders, secondary text    |
| `--rule`    | `#C4C0BA` | `#2A2A28` | Hairlines in dividers, unlit lights       |

Light is the instrument's aluminum housing: a warm grey ground, charcoal ink, and code on the slightly darker grey of a module. Dark is its screen: true black, the display's off-white ink and muted grey, and the display's own blue, green and red for the sections. In tokens.css the dark values point at the `--display-*` tokens, so the page and the panel's screen can't drift apart. `--paper` keeps its name for the page ground in both themes. No component changes shape between themes.

Decided from a prototype (2026-11-12). Rejected: the original off-white paper with a dark-paper inverse, a common editorial palette that came from nothing in the reference and gave dark mode no idea of its own; and a white-and-black "instrument" palette, which was clean but tied to the OP-1 only through the knob colors.

### Sections

Each section owns a color. The plain token is a fill: a knob, a light, a rule. The `-ink` token is the same hue darkened or lightened for text.

| Section  | Fill (light / dark)                | Text (light / dark)                    |
| -------- | ---------------------------------- | -------------------------------------- |
| about    | `--about` `#2B6BE0` / `#4D8DFF`    | `--about-ink` `#1C55B8` / `#4D8DFF`    |
| projects | `--projects` `#14995A` / `#35CF80` | `--projects-ink` `#0A6B3C` / `#35CF80` |
| posts    | `--posts` `#F0352B` / `#FF4A3F`    | `--posts-ink` `#B3241C` / `#FF4A3F`    |
| demos    | `--demos` `#F3F2EE` / `#F1F0EC`    | none, its pages use ink                |

In dark, fill and text are the same display color: on black, every one is readable as text.

### Ground texture

The page ground carries a faint pixel noise, like the specks in a powder-coated housing or a dim screen.

- One-pixel specks, each fully on or off, about half of them on, in a 200px tile.
- Painted in `--ink` at `--noise` (5%) opacity, so they darken the housing in light and lighten the screen in dark.
- Behind everything: it never sits on text, code blocks or the panel, and it never takes clicks.
- Drawn in CSS from an inline SVG filter, so there's no image to download.

Decided from a prototype (2026-11-12). Rejected: a soft film grain, which disappeared at any useful strength, and a cloudy paper fiber, which brought back the paper the palette had just dropped.

### The page accent

Every page has exactly one accent, `--accent` for marks and `--accent-ink` for text. The page's section sets it:

| Page                | `--accent`   | `--accent-ink`   |
| ------------------- | ------------ | ---------------- |
| Home, posts, a post | `--posts`    | `--posts-ink`    |
| About               | `--about`    | `--about-ink`    |
| Projects            | `--projects` | `--projects-ink` |
| Demos               | `--ink`      | `--ink`          |

In tokens.css this is a `data-section` attribute on the page's root. Demos' knob is white, so its pages have no hue: links are ink with an underline and marks are ink.

**Using the accent.** It is a signal, not a decoration. On any one view it may appear as link text plus at most two marks, such as the rule under a post title or a highlighted code line. Never use it as a fill behind text, as a section background, or on more than one item in a list. The panel is the one exception: it shows all four section colors at once, because it is where the sections are chosen.

### The panel

The panel has its own tokens, used nowhere else.

| Token               | Light                 | Dark               | Used for                            |
| ------------------- | --------------------- | ------------------ | ----------------------------------- |
| `--panel-frame`     | `#3B3B3A`             | `#050505`          | The housing seen between modules    |
| `--panel-module`    | `#DCD9D4`             | `#282827`          | Module faces                        |
| `--panel-module-hi` | `#EBE9E5`             | `#333332`          | Top edge highlight of a module      |
| `--panel-module-lo` | `#C3BFB8`             | `#1A1A19`          | Bottom edge of a module             |
| `--panel-dish`      | `#E5E2DE`             | `#2F2F2E`          | The recess a knob or key sits in    |
| `--panel-ink`       | `#1F1F1E`             | `#EBE9E5`          | Text on modules                     |
| `--panel-muted`     | `#5A5650`             | `#9C978F`          | Module labels and counts            |
| `--panel-hole`      | `#2B2B2A`             | `#090909`          | Grille holes                        |
| `--panel-shade`     | `rgb(40 36 30 / 0.2)` | `rgb(0 0 0 / 0.5)` | Inset and drop shadows on the panel |
| `--notch-light`     | `#F7F6F2`             | same               | Notch on a colored knob             |
| `--notch-dark`      | `#1C1C1B`             | same               | Notch on the white knob             |

In dark the panel becomes a black edition. Its layout does not change.

The screen is dark in both themes. Only its ground changes, from `#080808` to `#000000`.

| Token             | Value     | Used for                               |
| ----------------- | --------- | -------------------------------------- |
| `--display`       | `#080808` | Screen ground                          |
| `--display-ink`   | `#F1F0EC` | Readout values, the wordmark           |
| `--display-muted` | `#8F8E89` | Neutral readout labels                 |
| `--display-dim`   | `#3E3E3C` | Ruler ticks                            |
| `--display-blue`  | `#4D8DFF` | The role label                         |
| `--display-green` | `#35CF80` | The base label                         |
| `--display-red`   | `#FF4A3F` | The now label, the ruler's center tick |

**Contrast.** Ink on the ground is about 12.7:1 in light and 18:1 in dark. Muted is 5.9:1 on the ground and 5.2:1 on `--paper-2` in light, and at least 5.6:1 in dark. Every `-ink` section color is at least 5:1 on the ground in both themes. The light fills are not: `--posts` is 3:1, `--about` 3.7:1 and `--projects` 2.8:1 on the housing, so they never set text, and a lit light is never the only sign of the current page. On the panel, labels are at least 4.6:1 on modules and dishes. On the screen, every readout color is at least 6:1.

## Space and layout

- **Edges.** Everything on an inner page shares the sheet's left and right edges: the running head, page and post titles, index lists, prose, code and the running foot. Only dividers and spec pairs use the center line.
- **Widths.** Inner pages are one column, `--measure` (40rem) wide, about 68 characters of 18px body text and about 71 of code. The sheet is that column plus its padding, so the nav ends where the text ends. The panel and the home page below it use `--panel` (65rem).
- Decided from a prototype on a real post (2026-11-12). At 36rem and 17px, half of that post's code blocks scrolled sideways; at 40rem and 18px, under a third do. Rejected: letting code break out past the right edge, which fit more code but broke the shared edge.
- **Gutter.** At narrow widths everything keeps `--gutter` (1.5rem) on each side.
- **Spacing** steps on a 4px base: 0.25, 0.5, 0.75, 1, 1.5, 2, 3, 4 and 6rem (`--space-1` to `--space-24`). The running head, the page's content and the footer are separated by `--space-12`, with `--space-4` more above the footer so it reads as end matter. Inside the content, blocks are separated by `--space-8`. A divider and its content are separated by `--space-2`.
- **Rules.** Hairlines are 1px. The rules under the running head and over the running foot, and the rules around a spec pair, are ink. Divider rules are `--rule`.
- **No radius, no shadow, no border on text blocks** outside the panel.
- **Narrow screens.** Inner pages keep their edges. The running head stacks the wordmark over the nav, both left-aligned. Spec pairs stay mirrored. The running foot stacks its links over the theme switch. The panel has its own narrow layout, given below.

## Components

Sketches are schematic. Each is shown at mono character widths.

### The sheet

```
nick ball              · about  · projects  ● posts  · demos
────────────────────────────────────────────────────────────

                         (content)

────────────────────────────────────────────────────────────
github · twitter · linkedin · rss                light / dark
```

- Inner pages sit on a sheet `--measure` wide plus its padding, centered. Every inner page is the reading width; the home panel is the one wider page.
- The sheet has no ground, border or marks of its own. The running head's rule and the running foot's rule are its only frame.
- Decided from a prototype of seven frames (2026-11-11). Rejected for now: corner crop marks (four marks apart from everything else, and redundant once the head and foot have rules), a typographic folio (more text for little information), and five drafting marks on the rules. Those were dimension ticks, registration crosses, rules that overshoot into the margin, ringed targets, and a labeled dimension. The rule marks remain the way to bring the drafting idea back; see Open.

### Running head

```
nick ball              · about  · projects  ● posts  · demos
────────────────────────────────────────────────────────────
```

- The wordmark on the left, linking home. Nav links on the right, in muted. Both are `--text-mono` and share a baseline; the wordmark's weight and ink set it apart, not its size.
- An ink hairline underneath, 10px below the text.
- Each nav link has a light before it: a `--light` (6px) dot, `--rule` when unlit, centered on the x-height, 6px from its label.
- Links are `--space-6` (24px) apart, four times the light's gap, so each light reads as part of its word. Narrow: `--space-4`, so the nav stays on one line.
- The current page is ink instead of muted, and its light is lit in its section color with a 3px halo of the same color at 28%.
- Hover turns a link ink and lights its dot in the section's color, without the halo. Focus shows the focus ring.
- Each link's hit area is at least 44px tall and reaches halfway to its neighbors. It's a pseudo-element, so the layout doesn't move and the focus ring stays tight around the word.
- Narrow: the wordmark and the nav stack, both left-aligned, `--space-4` apart.

### Page title

```
posts
```

- Left-aligned on the sheet's left edge, the same edge as the wordmark and the list below. Lowercase, `--text-display`, bold mono.
- Usually the title stands alone. Where a count helps, it sits raised after the title in `--accent-ink`, regular mono at 15px.
- An optional meta line follows in muted at `--text-meta`.

### Divider

```
──────────────────── 2024 ────────────────────
```

- A short lowercase label at `--text-label`, tracked, muted, centered between two `--rule` hairlines that fill the width.
- Used for `latest` on the home page and named lists such as `things I've built`. Use them sparingly: every divider adds two lines.

### Index list

```
2024   Fresh with a Type-safe Hono API . . . . . .  02.10
       Supabase Auth with Deno Fresh . . . . . . .  01.05

2023   Showing audio progress with waveform images  12.29
       Neovim, Deno, and TypeScript in a monorepo   11.09
```

- Spans the sheet: the year column starts on the wordmark's edge and the dates end on the nav's edge.
- The year in bold mono, in a 5rem column, once per group. The title in regular mono at `--text-mono`. The date (`mm.dd`) right-aligned in muted at 12px, tabular.
- A leader of spaced muted dots runs from the title to the date, sitting on the text baseline. The dots are 1.5px, 6px apart, and anchored at the date end, so they line up from row to row. Spaced dots read as a path for the eye, where a dotted border reads as another rule.
- No rules. Year groups are separated by `--space-8` of space; rows inside a group sit close.
- A long title wraps; its leader and date follow its last line.
- No item is marked as newest. The list is newest first, so the top row already says it.
- Narrow: the year moves above its rows, so titles get the full width.
- The whole row is the link. Hover and focus turn the title `--accent-ink`.
- A truncated list ends with a centered link in `--accent-ink`, such as `all 15 posts →`.

### Post header

```
Command-based undo
for JS apps
A brain dump of research into non-trivial undo implementations
2023.10.23
▬▬▬
```

Left-aligned on the sheet's edge, like everything else on the page. A post opens exactly like the posts index: the title is the first thing under the running head, at the same height, size and tracking as a page title.

- The title is set like a page title: `--text-display`, bold mono, `--tracking-display`, across the full column. If it must wrap, its lines are balanced, and a hyphenated word never breaks at its hyphen.
- The description follows `--space-3` below, in regular mono at `--text-mono`, muted.
- The date sits just under the description, `--space-1` below, in `--text-meta`, muted, tabular. Description and date read as one group. No position in the sequence: it told the reader nothing they'd act on.
- A short accent rule, 3rem wide and `--bar` thick, closes the header `--space-6` below the date. The body starts `--space-8` below the rule.

### Post body

- Paragraphs are sans at `--text-body`, left-aligned, filling the sheet's `--measure`. Blocks are one line apart (`1lh`), so the vertical rhythm holds.
- **Headings** are bold mono at `--text-h2`, preceded by `##` in `--accent-ink`. Third-level headings use `###` and `--text-mono`. The marks are decorative and hidden from assistive technology. A heading has 2.5rem above it and `--space-3` below, so it belongs to what follows.
- **Links** are `--accent-ink` with a 1px underline, offset 0.2em; hover thickens the underline to 2px. Long bare URLs break anywhere rather than widen the page.
- **Lists** keep sans text. Ordered lists show zero-padded mono numerals in muted, hanging in a 1.5rem column. Unordered lists use a muted mono `–`. Markers are smaller than the text but sit on its baseline.
- **Inline code** is mono at 0.86em on `--paper-2` with 0.15em of horizontal padding.
- **Quotes** are sans italic with a 1px ink rule on the left and 1rem of padding.
- **Images** fill the measure with no border, and never break out past it. A caption sits below in `--text-meta`, muted. Wide screenshots and diagrams scale down to the measure; most are 2× files, so they land near their natural size. Decided on the posts with the widest images (2026-11-12), for the same reason code doesn't break out: it would break the shared edge.

### Code block

```
TYPESCRIPT                           7 LINES
────────────────────────────────────────────
  1  function undo() {
  2    const command = undoStack.pop();
  3    if (command) {
▌ 4      command.undo();
  5      redoStack.push(command);
  6    }
  7  }
```

- Ground is `--paper-2`. It fills the measure. No border.
- A header row carries the language and the line count, both `--text-label`, uppercase, muted, over a `--rule` hairline. Blocks are not numbered as figures: the numbers told the reader nothing.
- Code is 13.5px mono. Line numbers are muted, right-aligned in a 3.4em column.
- Syntax uses two of the instrument's hues and weight: strings in `--code-string` (green), functions and types in `--code-function` (blue), keywords bold ink, comments muted, everything else regular ink. In light the two hues are darkened to `#0A5F35` and `#1A4FA8` so they clear 5:1 on `--paper-2`; in dark they are the display's own green and blue, so a code block reads like the instrument's screen.
- No red in code: red is the posts accent, and the highlighter's "constant" group also catches variable names, so it would land on half the identifiers.
- Plain text blocks are labeled `TEXT`, and shell blocks `SHELL`.
- A highlighted line is marked with a `--bar` accent bar on the block's left edge. The line's ground does not change.
- Long lines scroll inside the block.
- **Collapsed.** Code a reader may skip starts closed, showing only its header row: `▸ CODE · HTML` on the left, the line count on the right. The row is the toggle; open, the mark turns to `▾`, the row takes its hairline, and the code follows without a second header. Hover turns the row ink.

### Example

```
EXAMPLE
────────────────────────────────────────────
                                            
   ▁▃▅▇▅▃▁▃▅▇█▇▅▃▁▃▅▇▅▃▁▃▅▇▅▃▁▃▅▇▅▃▁▃▅      
                                            
```

Something live inside a post: a rendered demo the reader watches or uses.

- Set like a code block: `--paper-2` ground filling the measure, no border, and a header row with an uppercase `--text-label` in muted over a `--rule` hairline. The label is `example`, or `demo` for something the reader can use.
- The content sits `--space-6` from the top and bottom and `--space-4` from the sides. Several pieces in one example stack `--space-6` apart.
- An example and the code that makes it are two blocks, one line apart, like any others.
- Inside, the post's text styles and block rhythm don't apply: the example styles itself, in the system's faces and tokens.
- Colors baked into images, such as waveforms, use the system's hex values: grey `#8F8E89`, red `#F0352B`, blue `#2B6BE0`. They read on the housing and the screen alike.
- Decided from a prototype on the waveform post (2026-11-12). Rejected: an unenclosed example between two hairlines, which left the demo floating among paragraphs, and an example joined to its code as one block, which didn't hold for examples without code.

**The audio player** is the one interactive example. The track title in bold mono at 15px over the artist in muted `--text-meta`, both linking out; on the right, the time (`00:00 / 03:12`, muted, tabular, hidden until the audio loads) over a text button, `▶ play` or `❚❚ pause`, in `--accent-ink`. Below, the full-width waveform: played in red, the rest in grey, and a 1px ink line under the pointer on hover. Before the audio loads, the whole waveform is a play button. No artwork, no spinner: loading shows as `loading` in the button.

### Item

```
theaironearth.com ··························· ↗
A personal site for my musical alias, The Air
on Earth.
sveltekit
```

Used for projects and demos.

- The name in bold mono at 15px, a dotted leader in muted, and an arrow in `--accent-ink`.
- The description in sans at `--text-body-s`.
- An optional stack line in `--text-meta`, lowercase, muted.
- Items are separated by `--space-8`, with no rule between them. The whole item is the link. Hover turns the name `--accent-ink`.

### Spec pair

```
──────────────────────────┬──────────────────────────
                CURRENTLY │ PREVIOUSLY
  staff engineer, risotto │ dropbox · loudr
──────────────────────────┴──────────────────────────
```

Two facts mirrored across the axis.

- Ink hairlines above and below, and an ink rule on the axis between the two cells.
- Each cell is a label over a value. The left cell is right-aligned; the right cell is left-aligned.
- Labels are `--text-label`, uppercase, tracked, muted. Values are regular mono at `--text-mono`.
- It stays two cells on narrow screens.

### Numbered list

```
─────────────── things I've built ───────────────
01  Drag-and-drop heavy interfaces with React
02  Rich text editors with Prosemirror
03  Component libraries with React and CSS
```

For short items outside a post. A divider names the list. Mono throughout at `--text-mono`, with muted numerals in a 2.6rem column.

### Running foot

```
────────────────────────────────────────────────────────────
github · twitter · linkedin · rss                light / dark
                                                 ‾‾‾‾‾
```

The footer mirrors the running head. It holds only what does something: the outside links and the theme switch. Facts such as location and typefaces belong on the about page.

- An ink hairline above, 10px over the text, spanning the same edges as the running head.
- Links on the left in muted `--text-mono`, joined by spaced middle dots. Hover turns a link ink.
- The theme switch on the right: one button, `light / dark`, with the current theme in ink and underlined and the other in muted.
- Links and the switch have hit areas at least 44px tall, made with pseudo-elements that stop short of the separator dots.
- Narrow: the links and the switch stack, both left-aligned.

## The panel

The home page is a panel of modules, laid out like the top of an instrument.

```
┌────────────┬─────────────────────────┬────────────┐
│ ·········· │ ROLE                NOW │ ·········· │
│ ·········· │       nick  ball        │ ·········· │
│ ·········· │ BASE            WRITING │ ·········· │
├────────────┼────────────┬────────────┼────────────┤
│   (o)      │   (o)   02 │   (o)   15 │   (o)   01 │
│   about    │  projects  │   posts    │   demos    │
├────────────┼────────────┼────────────┼────────────┤
│  ↗ github  │ ↗ twitter  │ ↗ linkedin │   + rss    │
└────────────┴────────────┴────────────┴────────────┘
```

**Housing.** An eight-column grid, `--panel` wide at most, centered. Modules sit 4px apart on `--panel-frame`, which also pads the housing by 8px and shows as a dark frame around and between them. The housing has `--radius-housing`. The three rows are fluid: at most 16.25rem, 11.75rem and 6.875rem.

**Modules.** Each module is `--panel-module` with `--radius-module`, a 1px `--panel-module-hi` highlight along its top edge and a 2px `--panel-module-lo` edge along its bottom. That is the panel's only depth.

**Grilles.** Two modules, two columns each, flank the screen. Each holds a field of 4px holes in `--panel-hole` on an 11px grid, inset 15% from the module's edges and spaced so that only whole holes show.

**Screen.** The middle four columns of the top row. A module with a `--display` screen inset 10px, `--radius-display`. On it:

- Four readouts in the corners, each a label over a value. Labels are `--text-label`, uppercase, tracked, in their display color. Values are 12px mono in `--display-ink`. Right-hand readouts are right-aligned.
  - top left, `ROLE` in `--display-blue`: `product engineer`
  - top right, `NOW` in `--display-red`: `staff engineer, risotto`, with the company linked
  - bottom left, `BASE` in `--display-green`: `portland, or`
  - bottom right, `WRITING` in `--display-muted`: `15 posts`
- The wordmark in the middle at `--text-display`, in `--display-ink`.
- Along the bottom, a ruler of `--display-dim` ticks every 8px, with one `--display-red` tick on the axis.

**Knobs.** The middle row is four modules, one per section in nav order: about, projects, posts, demos. Each is a link.

- A round dish in `--panel-dish`, 56% of the module's width and at most 6.5rem, with an inset `--panel-shade` shadow.
- A cap in the section's color, half the dish's width, with a small drop shadow and a 2px notch at twelve o'clock in `--notch-light`. Demos' white cap takes `--notch-dark`.
- The section name below in `--panel-muted` at 12px. Ink on hover.
- The section's count in the module's top-right corner at `--text-label`, muted. About has no count.

**Keys.** The bottom row is four modules: github, twitter, linkedin and rss. Each is a link with a 2.5rem dish holding a type character (`↗` for an outside link, `+` for the feed) and a label below.

**Narrow (under 45rem).** Four columns. The grilles are dropped. The screen spans the full width and is at least 14.75rem tall. Knobs sit two by two. Keys sit in one row with 2.125rem dishes and 11px labels.

**Below the panel**, at the same width: a `latest` divider, the three newest posts as index rows with `yyyy.mm` dates, a centered `all 15 posts →` link, then the footer.

## The wordmark

The mark is the name, set as live text:

- `nick ball`, always lowercase.
- JetBrains Mono at weight 500 (`--mark-weight`). Nothing else uses this weight.
- Tracked at 0.07em (`--mark-tracking`).
- The two words sit 0.84em apart (`--mark-gap`), wider than a typed space.
- Ink on the ground, or `--display-ink` on the panel screen. It carries no accent, symbol or punctuation.

It appears in the running head at `--text-mono` and on the panel screen at `--text-display`. Because it is text, it scales with the type around it and needs no image file.

```html
<a class="wordmark" href="/"><span>nick</span> <span>ball</span></a>
```

```css
.wordmark {
  display: inline-flex;
  gap: var(--mark-gap);
  font-family: var(--font-mono);
  font-weight: var(--mark-weight);
  letter-spacing: var(--mark-tracking);
  line-height: 1.1;
  white-space: nowrap;
  color: var(--ink);
  text-decoration: none;
}

/* trailing tracking would push a centered mark off the axis */
.wordmark > :last-child {
  margin-right: calc(var(--mark-tracking) * -1);
}
```

**The short form.** Where the full name cannot fit, such as the browser tab icon, the mark shortens to a lowercase `n` in the same face and weight: the ground color on an ink square, set at about 60% of the square's height.

## Page recipes

| Page     | Section  | Recipe                                                                                                                                                                                 |
| -------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Home     | posts    | The panel, the `latest` divider and three index rows, `all 15 posts →`, footer. No running head.                                                                                       |
| Posts    | posts    | Sheet. Running head, page title alone, the full index list, footer.                                                                                                                    |
| Post     | posts    | Sheet. Running head, post header, post body, footer.                                                                                                                                   |
| About    | about    | Sheet. Running head, page title with `product engineer · portland, or`, a spec pair (currently, previously), paragraphs, a numbered list of things built, a closing paragraph, footer. |
| Projects | projects | Sheet. Running head, page title with count, items, footer.                                                                                                                             |
| Demos    | demos    | Sheet. Running head, page title with count, items, footer.                                                                                                                             |

## Motion

Inner pages are still. Nothing moves on its own, and hover and focus changes are instant.

The panel has two small movements, both on hover and focus:

- A knob's cap turns 60° clockwise over 180ms.
- A key's dish deepens its inset shadow over 120ms, as if pressed.

Both are removed under `prefers-reduced-motion`.

## Accessibility

- All text meets 4.5:1 against its ground in both themes. Section fills never set text.
- The current page is marked with `aria-current` as well as its light and ink color. The light and color are never the only signal.
- Focus is a 2px `--ink` outline, offset 2px, on every interactive element, including the panel's knobs and keys. It is never the accent: a colored ring clashes with the lights and section colors around it.
- Decorative marks are hidden from assistive technology: `##`, lights, grilles, the ruler, knob notches and key characters.
- Index rows, items, knobs and keys are each a single link named by their visible text.
- Body text never drops below `--text-body-s`. Labels never drop below `--text-label`.

## Not in the system

Explored and left out on purpose. Adding any of these is a change to the system, not a use of it.

- A serif face, or a second monospace face.
- An accent, symbol or punctuation attached to the wordmark.
- Hardware anywhere but the home panel. Illustrated objects such as cassettes, cards, tickets, stamps or seals.
- More than one accent on an inner page, tints of an accent, gradients or light leaks. Any texture beyond the ground's pixel noise.
- Cards, shadows, rounded corners or pills outside the panel.
- Uppercase headings or centered body text.
- Icons. Arrows and marks are type characters or plain shapes.
- The disc-on-line drawing. The panel replaced it.

## Open

Not yet decided. Each should be settled, and written into this document, when the page that needs it is built.

- Images with a baked-in white ground, such as the undo diagrams, sit as bright slabs on the housing and glare on the dark screen. Either a treatment for images in dark mode, or re-exporting them on a transparent ground.
- The demos page's items, and whether demos needs its own index layout.
- The panel's screen on very narrow phones, below about 22rem.
- The 404 page and the generated social image.
- Whether the head and foot rules take a drafting mark after all. The two closest candidates were dimension ticks at the rules' ends and ringed registration targets in the margin at both ends of both rules.

## Where it came from

The system was chosen in two rounds. A lab of numbered studies set the type, the inner components and the footer. A second set, the panel studies (01 to 05), added the home panel, the manual-style sheet and section accents. The wordmark was tuned in a separate mark tool.

| Part                            | Studies                    |
| ------------------------------- | -------------------------- |
| Mono and sans roles             | lab 133–142                |
| The panel                       | panel 01, 05               |
| Sheet, running head, the axis   | panel 02, 05               |
| Index list                      | lab 120, 137               |
| Post header                     | lab 124, 138; panel 05     |
| Post body and heading marks     | lab 132, 139               |
| Code block                      | lab 131; panel 05          |
| Items, spec pair, numbered list | lab 49, 140, 141; panel 02 |
| Running foot                    | panel 05, then review      |
| Section accents                 | panel 05                   |
| The wordmark                    | mark tool                  |
