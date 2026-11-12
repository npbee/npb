# Design system

A mono-led system for a text-heavy personal site, with one piece of hardware. The home page is an instrument panel. Every other page is a sheet from a manual: paper, ink, hairlines and one accent, which takes its color from the section.

This document describes how things look and read. It is independent of how the site is built. The values it names live in [tokens.css](tokens.css) as plain CSS custom properties.

## Principles

1. **One panel.** The home page is a panel of modules: grilles, a screen, four knobs and four keys. It is the only place with fills, rounded corners and depth. No other page imitates hardware.
2. **Type does the work.** Off the panel, hierarchy comes from face, weight, size and position. There are no cards, shadows, gradients or rounded corners.
3. **Two edges.** Inner pages hang on the sheet's left and right edges. The wordmark, page title, years and titles start on the left edge; the nav and dates end on the right. Paired facts mirror across the center line, and prose is left-aligned in a column centered on it.
4. **Mono for short, sans for long.** Anything a reader scans is monospace. Anything a reader settles into is sans.
5. **One accent per page, chosen by section.** Each section owns a knob color, and that color is the accent on its pages. The accent appears as link text plus at most two marks.
6. **Rules, not containers.** Hairlines separate things. Only the panel and code blocks are enclosed.
7. **Show the count.** Lists say how many items they hold, and sequences are numbered.

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

| Token            | Size                  | Line height | Face and weight | Used for                                      |
| ---------------- | --------------------- | ----------- | --------------- | --------------------------------------------- |
| `--text-label`   | 0.6875rem (11px)      | 1.4         | Mono 400        | Uppercase tracked labels, dividers, in muted  |
| `--text-meta`    | 0.8125rem (13px)      | 1.5         | Mono 400        | Running head, dates, stack lines, page meta   |
| `--text-mono`    | 0.875rem (14px)       | 1.6         | Mono 400 or 700 | Index rows, numbered lists, spec pairs, items |
| `--text-body-s`  | 0.9375rem (15px)      | 1.55        | Sans 400        | Descriptions                                  |
| `--text-body`    | 1.0625rem (17px)      | 1.65        | Sans 400        | Post body, about paragraphs                   |
| `--text-h2`      | 1.125rem (18px)       | 1.3         | Mono 700        | Headings inside a post                        |
| `--text-title`   | 1.75rem (28px)        | 1.2         | Mono 700        | Post titles                                   |
| `--text-display` | 2rem to 2.5rem, fluid | 1.15        | Mono 700        | Page titles, the wordmark on the panel screen |

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
| `--paper`   | `#F3F3F0` | `#121211` | Page ground                               |
| `--paper-2` | `#E8E8E2` | `#1D1D1B` | Recessed ground: code blocks, inline code |
| `--ink`     | `#121212` | `#ECECE8` | Text, strong rules                        |
| `--muted`   | `#63635C` | `#9B9B94` | Labels, dates, leaders, secondary text    |
| `--rule`    | `#CDCDC6` | `#34342F` | Hairlines in dividers, unlit lights       |

Dark is the same system inverted. No component changes shape between themes.

### Sections

Each section owns a color. The plain token is a fill: a knob, a light, a rule. The `-ink` token is the same hue darkened or lightened for text.

| Section  | Fill (light / dark)                | Text (light / dark)                    |
| -------- | ---------------------------------- | -------------------------------------- |
| about    | `--about` `#2B6BE0` / `#3B7BF0`    | `--about-ink` `#1F5BC4` / `#6D9CFF`    |
| projects | `--projects` `#14995A` / `#1FAE68` | `--projects-ink` `#0D7A45` / `#3FCF86` |
| posts    | `--posts` `#F0352B` / `#FF4A3F`    | `--posts-ink` `#C8281F` / `#FF6B61`    |
| demos    | `--demos` `#F3F2EE` / `#ECEBE6`    | none, its pages use ink                |

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

**Contrast.** Ink on paper is about 17:1 in light and 16:1 in dark. Muted is 5.4:1 on paper and 4.9:1 on `--paper-2` in light, and higher in dark. Every `-ink` section color is at least 4.8:1 on paper in both themes. The fills are not: `--posts` is 3.6:1, `--about` 4.4:1 and `--projects` 3.3:1 on light paper, so they never set text. On the panel, labels are at least 4.6:1 on modules and dishes. On the screen, every readout color is at least 6:1.

## Space and layout

- **Edges and axis.** The running head, page title, index lists and footer share the sheet's left and right edges. Dividers, the post header and spec pairs are built on the center line. Prose is left-aligned inside a centered column.
- **Widths.** Inner pages sit in a `--sheet` (55rem). Inside it, the running head, index lists and footer use the full width, so they share a left and a right edge. Spec pairs and the post label use `--column` (40rem). Prose, numbered lists and items are capped at `--measure` (36rem), about 68 characters. The panel and the home page below it use `--panel` (65rem).
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

- Inner pages sit on a sheet `--sheet` wide, centered.
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
          POST 11 / 15 │ 2023.10.23

              Command-based
            undo for JS apps
      A brain dump of research into
     non-trivial undo implementations
                   ▬▬▬
```

- A label row mirrored across the axis: the position in the sequence right-aligned to the left of a short vertical ink rule, the date left-aligned to its right. `--text-label`, uppercase, tracked, muted.
- The title, centered, at `--text-title`, bold mono, balanced, at most 26 characters wide.
- The description, centered, in regular mono at `--text-mono`, muted, balanced.
- A short accent rule, 3rem wide and `--bar` thick, centered, closes the header. The body starts `--space-8` below it.

### Post body

- Paragraphs are sans at `--text-body`, left-aligned, capped at `--measure`, centered on the axis.
- **Headings** are bold mono at `--text-h2`, preceded by `##` in `--accent-ink`. Third-level headings use `###` and `--text-mono`. The marks are decorative and hidden from assistive technology.
- **Links** are `--accent-ink` with a 1px underline, offset 0.2em.
- **Lists** keep sans text. Ordered lists show zero-padded mono numerals in muted, hanging in a 1.5rem column. Unordered lists use a muted mono `–`.
- **Inline code** is mono at 0.86em on `--paper-2` with 0.15em of horizontal padding.
- **Quotes** are sans italic with a 1px ink rule on the left and 1rem of padding.
- **Images** fill the measure with no border. A caption sits below in `--text-meta`, muted.

### Code block

```
FIG. 1 · TYPESCRIPT                  7 LINES
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
- A header row carries a label and the line count, both `--text-label`, uppercase, muted, over a `--rule` hairline. The label numbers the block as a figure, in order within the post, then names the language: `FIG. 1 · TYPESCRIPT`.
- Code is 13.5px mono. Line numbers are muted, right-aligned in a 3.4em column.
- Syntax is distinguished by weight, not hue: keywords are bold, everything else regular.
- A highlighted line is marked with a `--bar` accent bar on the block's left edge. The line's ground does not change.
- Long lines scroll inside the block.

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
- Ink on paper, or `--display-ink` on the panel screen. It carries no accent, symbol or punctuation.

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

**The short form.** Where the full name cannot fit, such as the browser tab icon, the mark shortens to a lowercase `n` in the same face and weight: paper on an ink square, set at about 60% of the square's height.

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
- More than one accent on an inner page, tints of an accent, gradients, grain or light leaks.
- Cards, shadows, rounded corners or pills outside the panel.
- Uppercase headings or centered body text.
- Icons. Arrows and marks are type characters or plain shapes.
- The disc-on-line drawing. The panel replaced it.

## Open

Not yet decided. Each should be settled, and written into this document, when the page that needs it is built.

- How MDX embeds sit in a post, such as the audio player in the waveform post.
- Images wider than the measure, and whether a figure number applies to images as well as code.
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
