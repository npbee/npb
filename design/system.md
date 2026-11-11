# Design system

A mono-led, mostly typographic system for a text-heavy personal site: paper, ink and one vermillion.

This document describes how things look and read. It is independent of how the site is built. The values it names live in [tokens.css](tokens.css) as plain CSS custom properties.

## Principles

1. **Type does the work.** Hierarchy comes from face, weight, size and position. There are no cards, shadows, gradients or rounded corners.
2. **Mono for short, sans for long.** Anything a reader scans is monospace. Anything a reader settles into is sans.
3. **One accent.** Vermillion appears once or twice per view and always means something: a link, the current page, the newest item.
4. **Rules, not containers.** Hairlines separate things. Only code blocks and the footer are enclosed.
5. **Show the count.** Lists say how many items they hold, and sequences are numbered.
6. **One drawing.** The home page may carry a single drawing. No other page has one.

## Type

Two faces, both open source and self-hosted:

- **Space Mono**, 400 and 700. The voice of the site.
- **Inter**, 400, 400 italic and 600. Reading text only.

| Mono                                   | Sans                              |
| -------------------------------------- | --------------------------------- |
| Name, page titles, post titles         | Post body                         |
| Navigation, section headers, labels    | Intro and about paragraphs        |
| Dates, counts, metadata, stack lines   | Project and demo descriptions     |
| Index lists, numbered lists, spec rows | Captions longer than a line       |
| Code, inline code, the footer          |                                   |

The test: if a piece of text runs past two lines at column width, set it in sans. Titles are the exception. A title stays mono even when it wraps.

Space Mono has only two weights. Bold is for names, titles and headers. Everything else is regular. Emphasis inside sans text uses Inter italic or 600, never a switch of face.

### Scale

Sizes assume a 16px root.

| Token            | Size                    | Line height | Face and weight   | Used for                                     |
| ---------------- | ----------------------- | ----------- | ----------------- | -------------------------------------------- |
| `--text-label`   | 0.75rem (12px)          | 1.4         | Mono 400          | Uppercase tracked labels, in muted           |
| `--text-meta`    | 0.8125rem (13px)        | 1.5         | Mono 400          | Dates, stack lines, short captions, in muted |
| `--text-mono`    | 0.9375rem (15px)        | 1.6         | Mono 400 or 700   | Nav, lists, section headers, item names      |
| `--text-body-s`  | 0.9375rem (15px)        | 1.55        | Sans 400          | Descriptions                                 |
| `--text-body`    | 1.0625rem (17px)        | 1.65        | Sans 400          | Post body, intro paragraphs                  |
| `--text-h2`      | 1.125rem (18px)         | 1.3         | Mono 700          | Headings inside a post                       |
| `--text-title`   | 1.75rem (28px)          | 1.2         | Mono 700          | Post titles                                  |
| `--text-display` | 2rem to 2.5rem, fluid   | 1.15        | Mono 700          | Page titles, the name on the home page       |

Display type is tracked at -0.02em. Labels are tracked at 0.16em. Nothing else is tracked.

### Case and figures

- Interface words are lowercase: `about`, `posts`, `projects`, `demos`, section headers, page titles.
- Authored titles keep the case they were written in.
- Uppercase is reserved for labels, and labels are always small, tracked and muted.
- Dates are `2023.10.23`. A month alone is `10`.
- Sequence numbers are zero-padded: `01`, `02`.
- Items in a line are joined with a spaced middle dot: `astro · react · deno deploy`.

## Color

| Token          | Light     | Dark      | Used for                                                    |
| -------------- | --------- | --------- | ----------------------------------------------------------- |
| `--paper`      | `#F7F2E8` | `#1A1715` | Page ground                                                 |
| `--paper-2`    | `#EEE7D5` | `#24201D` | Recessed ground: code blocks, inline code                   |
| `--ink`        | `#1A1715` | `#F2ECE0` | Text, strong rules                                          |
| `--muted`      | `#6A655E` | `#A39C91` | Labels, dates, secondary text                               |
| `--rule`       | `#D5CEBF` | `#3A3531` | Hairlines between items                                     |
| `--accent`     | `#F0352B` | `#FF4A3F` | Bars, markers, the underscore, the drawing                  |
| `--accent-ink` | `#C8281F` | `#FF4A3F` | Accent-colored text: links, counts, heading marks           |

Dark is the same system inverted. No component changes shape between themes.

**Using the accent.** It is a signal, not a decoration. On any one view it may appear as link text plus at most two marks. Never use it as a fill behind text, as a section background, or on more than one item in a list.

**Contrast.** Ink on paper is about 15:1. Muted on paper is about 5.2:1. `--accent` on light paper is about 3.6:1, which is too low for text, so accent-colored text uses `--accent-ink` (about 5.0:1). In dark the two are the same value (about 5.4:1).

## Space and layout

- **One column.** Content sits in a single centered column, `--column` (40rem) wide, with a `--gutter` (1.5rem) on each side at narrow widths.
- **Measure.** Sans paragraphs are capped at `--measure` (36rem), about 68 characters. Mono lists use the full column.
- **Alignment.** Everything is left-aligned inside the column. The home hero is the one centered moment.
- **Spacing** steps on a 4px base: 0.25, 0.5, 0.75, 1, 1.5, 2, 3, 4 and 6rem (`--space-1` to `--space-24`). Sections are separated by `--space-16`. A header and its content are separated by `--space-4`.
- **Rules.** Hairlines are 1px. A rule under a section header is ink. A rule between items is `--rule`.
- **No radius, no shadow, no border on text blocks.**
- **Narrow screens.** Nothing reflows into a different design. The nav wraps under the mark. Long index titles wrap and hang under the title column. The footer block stacks its cells.

## Components

Sketches are schematic. Each is shown at mono character widths.

### Site header

```
──────────────────────────────▀▀▀▀▀───────
n.b.         about  projects  posts  demos
──────────────────────────────────────────
```

- The mark `n.b.` in bold mono on the left, linking home. Nav links in regular mono on the right, in muted.
- A hairline above and below.
- The current page is ink instead of muted, and a bar (`--bar`, 3px, accent) sits on the top rule directly above it, as wide as the word.
- Hover and focus turn a link ink.

### Page title

```
posts ¹⁵
2016–2024 · newest first
```

- Lowercase, `--text-display`, bold mono.
- Where the page is a list, its count sits raised after the title in `--accent-ink` at `--text-mono`, bold.
- An optional meta line follows in muted.

### Section header

```
projects                                 02
───────────────────────────────────────────
```

- Lowercase bold mono at `--text-mono`, with the count right-aligned in muted.
- An ink hairline underneath.

### Index list

```
  posts                                    15
  ───────────────────────────────────────────
■ 2024  Fresh with a Type-safe Hono API    02
        Supabase Auth with Deno Fresh      01
  ───────────────────────────────────────────
  2023  Showing audio progress with wavef… 12
        Neovim, Deno, and TypeScript in a… 11
```

- Grouped by year. The year is bold mono in a fixed left column and appears once per group.
- Titles are regular mono. The month is right-aligned in muted.
- A `--rule` hairline separates year groups. Rows inside a group have no rule.
- The newest item carries a marker (`--marker`, a 6px accent square) hanging in the left margin. Only one item is ever marked.
- The whole row is the link. Hover and focus turn the title `--accent-ink`.
- A truncated list ends with a muted line such as `+ 7 earlier`.

### Post header

```
POST 05 / 15                     2023.10.23

Command-based
undo for JS apps
A brain dump of research into non-trivial
undo implementations
▬▬▬
```

- A label line: position in the sequence on the left, date on the right.
- The title at `--text-title`, bold mono.
- The description in regular mono, muted.
- A short accent rule, 3rem wide and 3px thick, closes the header. The body starts `--space-8` below it.

### Post body

- Paragraphs are sans at `--text-body`, capped at `--measure`.
- **Headings** are bold mono at `--text-h2`, preceded by `##` in `--accent-ink`. Third-level headings use `###` and `--text-mono`. The marks are decorative and hidden from assistive technology.
- **Links** are `--accent-ink` with a 1px underline, offset 0.2em.
- **Lists** keep sans text. Ordered lists show zero-padded mono numerals in muted, hanging in a 1.5rem column. Unordered lists use a muted mono `–`.
- **Inline code** is mono at 0.9em on `--paper-2` with 0.15em of horizontal padding.
- **Quotes** are sans italic with a 1px ink rule on the left and 1rem of padding.
- **Images** fill the column with no border. A caption sits below in `--text-meta`, muted.

### Code block

```
TYPESCRIPT                           7 lines
────────────────────────────────────────────
  1  function undo() {
  2    const command = undoStack.pop();
  3    if (command) {
▌ 4      command.undo();
  5      redoStack.push(command);
  6    }
  7  }
```

- Ground is `--paper-2`. It fills the column. No border.
- A header row carries the language as a label and the line count in muted, over a `--rule` hairline.
- Line numbers are muted.
- Syntax is distinguished by weight, not hue: keywords are bold, everything else regular.
- A highlighted line is marked with an accent bar on the block's left edge. The line's ground does not change.
- Long lines scroll inside the block.

### Item

```
theaironearth.com                          →
A personal site for my musical alias, The
Air on Earth.
sveltekit
```

Used for projects and demos.

- The name in bold mono, with an arrow right-aligned in `--accent-ink`.
- The description in sans at `--text-body-s`.
- An optional stack line in `--text-meta`, lowercase, muted.
- Items are separated by `--space-8`, with no rule between them.

### Spec rows

```
currently    Risotto — Staff Engineer
previously   Dropbox · Loudr
```

For any label and value pair. The label is muted mono in a fixed column. The value is regular mono.

### Numbered list

```
01  Drag-and-drop heavy interfaces with React
02  Rich text editors with Prosemirror
03  Component libraries with React and CSS
```

For short items outside a post. Mono throughout, with muted numerals. A label above it names the list.

### Footer

```
┌──────────────┬──────────────┬──────────────┐
│ SITE         │ SET IN       │ YEAR       ■ │
│ npbee.me     │ mono + inter │ 2026         │
├──────────────┼──────────────┴──────────────┤
│ LOCATION     │ FIND ME                     │
│ portland, or │ github · twitter · linkedin │
└──────────────┴─────────────────────────────┘
```

- Set as a drafting title block: cells divided by 1px ink lines.
- Each cell is a label over a value in regular mono.
- One 8px accent square sits in the top-right cell.
- The theme switch, if there is one, is a cell like any other: label `THEME`, value `light` or `dark`.

## The mark and the drawing

**The mark** is `n.b.` in bold lowercase mono. It is text, not an image.

**The underscore.** On the home page the name is followed by an accent underscore, as if the line were still being typed: `nick ball_`. It is the system's signature and appears nowhere else.

**The drawing** is a disc resting on a line: an accent disc, 5.75rem across, tangent to an ink hairline 12.5rem wide. It sits above the name on the home page, centered, with `--space-8` between the line and the name. It is the only drawing in the system. If another is ever commissioned, it replaces this one.

## Page recipes

- **Home.** Header. Hero, centered: the drawing, the name at display size with the underscore, a muted mono line (`software developer · portland, or`). Then, left-aligned: an intro paragraph in sans, projects and demos as items, the newest posts as an index list, footer.
- **Posts.** Header, page title with count, the full index list, footer.
- **Post.** Header, post header, post body, footer.
- **About.** Header, page title, paragraphs in sans, spec rows for current and past roles, a numbered list of things built, footer.
- **Projects and demos.** Header, page title with count, items, footer.

## Motion

The system is still. The one permitted movement is the home underscore, which may blink once a second in steps, with no easing. It does not blink when the reader has asked for reduced motion.

## Accessibility

- All text meets 4.5:1 against its ground in both themes.
- The current page is marked with `aria-current` as well as the bar. The bar and color are never the only signal.
- Focus is a 2px `--accent` outline, offset 2px, on every interactive element.
- Decorative marks (`##`, the marker square, the drawing, the underscore) are hidden from assistive technology.
- Index rows are single links with the full title as their name.
- Body text never drops below `--text-body-s`. Labels never drop below `--text-label`.

## Not in the system

Explored and left out on purpose. Adding any of these is a change to the system, not a use of it.

- A serif face.
- Illustrated objects: cassettes, cards, tickets, hardware panels, stamps, seals.
- A second accent color, tints of the accent, gradients, grain or light leaks.
- Cards, shadows, rounded corners, pills.
- Uppercase headings or centered body text.
- Icons. Arrows and marks are type characters or plain squares.

## Where it came from

The system was chosen from a lab of numbered studies. For reference, the studies each part descends from:

| Part                            | Studies      |
| ------------------------------- | ------------ |
| Mono and sans roles             | 133–142      |
| Header with bar marker          | 127, 136     |
| Index list by year              | 120, 137     |
| Post header                     | 124, 138     |
| Post body and heading marks     | 132, 139     |
| Code block                      | 131          |
| Items, spec rows, numbered list | 49, 140, 141 |
| Footer title block              | 50, 128      |
| The underscore                  | 104, 133     |
| The drawing                     | 05, 12, 135  |
