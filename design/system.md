# Design system

A quiet system for a text-heavy personal site, made by someone who cares about music and about small details. Every page is one reading column set off-center, with a narrow margin to its right for the things a reader glances at: the nav, dates, years and short notes. The one image is a waveform, drawn from sound and used in three places: on the home page, beside each post as its length, and above a post as the reader's progress.

The site should feel beautiful and calm, and it shouldn't take itself too seriously. Its personality comes from the writing, the waveform and care in the details, not from a theme or a metaphor.

This document describes how things look and read. It is independent of how the site is built. The values it names live in [tokens.css](tokens.css) as plain CSS custom properties. Copy shown here is placeholder: slots are described by what they hold, not by their wording.

## Principles

1. **A column and a margin.** Reading happens in the column. The margin holds what a reader scans: where they are, when something was written, how long it is, an aside. Nothing in the margin is needed to read the column.
2. **One image.** The waveform is the only picture the system draws, and the home page's mark is the same track, printed. There are no illustrations, icons, textures or objects. Posts may carry their own images.
3. **Type does the work.** Hierarchy comes from face, size, weight and color. There are no cards, shadows, gradients or rounded corners, except where a code block or example needs a ground.
4. **Mono for the margin.** Margin notes, dates, labels, read times and code are monospace. Reading text is the body face.
5. **A signal and an echo.** Vermilion marks links, the playhead and at most one other thing per view. Ochre answers it here and there. There are no section colors.
6. **Every mark earns its place.** Counts, numbers and labels appear only where a reader uses them. A read time is shown because it tells the reader something; a sequence number is not.
7. **Still by default.** One thing moves: the home page's mark drifts slowly and leans toward the mouse. Everything else waits for the reader.

## Type

Two faces, both open source and self-hosted: a serif for titles, and one monospace for everything else.

| Role   | Token          | Face          | Used for                                                          |
| ------ | -------------- | ------------- | ----------------------------------------------------------------- |
| Title  | `--font-title` | Newsreader    | Page and post titles, the name on the home page                   |
| Body   | `--font-body`  | IBM Plex Mono | Post body, intro, list titles, descriptions, headings inside a post |
| Margin | `--font-mono`  | IBM Plex Mono | Margin notes, nav, dates, read times, labels, code               |

Chosen on a real post (2026-11-14), from a picker that tried each against the others. Also tried for the body: Inter, Alegreya Sans, IBM Plex Sans, Source Sans 3, Recursive, Alegreya, Literata, Source Serif 4 and DM Mono. A serif title over a mono body keeps the manual's plainness and gives each page one moment of warmth. Body and margin share a face but stay separate tokens, so either can change alone.

- **Newsreader** at 400 and 500, with italic.
- **IBM Plex Mono** at 400, 500 and 600, with italic. 500 is the wordmark's alone; 600 is headings and strong text.

A mono body runs wide per character, so it's set a touch smaller (`font-size-adjust` 0.46 against the margin's 0.54) with 1.6 leading. At 18px that still holds about 60 characters in the column.

### Scale

Sizes assume a 16px root.

| Token            | Size                         | Line height | Role and weight | Used for                                      |
| ---------------- | ---------------------------- | ----------- | --------------- | --------------------------------------------- |
| `--text-note`    | 0.6875rem (11px)             | 1.65        | Mono 400        | Margin notes, dates, read times, labels       |
| `--text-nav`     | 0.75rem (12px)               | 1.4         | Mono 400 or 500 | Wordmark, nav                                 |
| `--text-row`     | 1rem (16px)                  | 1.4         | Body 400        | List titles, project names                    |
| `--text-body`    | 1.125rem (18px)              | 1.6         | Body 400        | Post body, page paragraphs                    |
| `--text-lead`    | 1.25rem (20px)               | 1.55        | Body 400        | The home intro                                |
| `--text-name`    | 1.375rem (22px)              | 1.2         | Title 500       | The name on the home page                     |
| `--text-title`   | 1.625rem to 2rem, fluid      | 1.2         | Title 500       | Page and post titles                          |

Titles are tracked at -0.015em, the name at -0.01em. Nothing else is tracked. Headings inside a post are the body face at 600, the same size as the body, with 2.2em above and 0.5em below.

### Case and figures

- Interface words are lowercase: `about`, `posts`, `projects`, section labels.
- Authored titles keep the case they were written in.
- No uppercase anywhere.
- A full date is `2023.12.29`. Where a year sits in the margin beside it, the row drops it: `12.29`.
- A read time is `m:ss`, at 230 words a minute, like a track length: `2:11`.
- Items in a line are joined with a spaced middle dot: `12.29 · 2:11`.
- Digits that line up are tabular.

## Color

| Token            | Light                     | Dark                      | Used for                                        |
| ---------------- | ------------------------- | ------------------------- | ----------------------------------------------- |
| `--ground`       | `oklch(0.968 0.003 250)`  | `oklch(0.17 0.006 260)`   | Page ground                                     |
| `--ground-2`     | `oklch(0.935 0.005 250)`  | `oklch(0.215 0.008 260)`  | Code blocks and examples                        |
| `--ink`          | `oklch(0.2 0.012 260)`    | `oklch(0.93 0.004 250)`   | Text, the played part of a waveform             |
| `--muted`        | `oklch(0.5 0.014 260)`    | `oklch(0.68 0.012 260)`   | Margin text, dates, secondary text              |
| `--rule`         | `oklch(0.9 0.005 250)`    | `oklch(0.26 0.008 260)`   | Hairlines                                       |
| `--dim`          | `oklch(0.85 0.007 250)`   | `oklch(0.33 0.01 260)`    | The unplayed part of a waveform, mini waveforms |
| `--accent`       | `oklch(0.63 0.2 33)`      | `oklch(0.7 0.17 35)`      | Vermilion: the playhead, hovered mini waveforms |
| `--accent-ink`   | `oklch(0.53 0.18 33)`     | `oklch(0.75 0.14 38)`     | Links and any accent text                       |
| `--accent-2`     | `oklch(0.74 0.14 78)`     | `oklch(0.8 0.13 80)`      | Ochre, as a mark: the career's past             |
| `--accent-2-ink` | `oklch(0.52 0.1 72)`      | `oklch(0.82 0.12 80)`     | Ochre as text: code strings                     |

The neutrals lean cool, light and dark alike, so the vermilion reads warm against them. Neither ground is pure. Components keep their shape between themes.

**Contrast.** Ink is about 16.5:1 on the ground in light and 15.6:1 in dark. Muted is 5.5:1 in light and 6.6:1 in dark, and at least 4.9:1 on `--ground-2`. `--accent-ink` is 5.3:1 in light and 8.2:1 in dark; `--accent-2-ink` is 5.1:1 and 10.8:1. All of them hold 4.5:1 on `--ground-2`. In light, `--accent` (3.5:1) and `--accent-2` (2.1:1) set marks only, never text. `--dim` and `--rule` are marks only and never set text.

**Using the accents.** Vermilion is the signal: links and the current page in the nav are `--accent-ink`, and beyond links one view may use `--accent` for the waveform's playhead and one hover state. Ochre is its echo, used in two places: code strings, and the older end of the career list. Neither is a fill behind text, a background or a tint. The one gradient is the career list's, a blend from one accent to the other.

**Code syntax** uses ink, weight and ochre: keywords bold ink, strings `--accent-2-ink`, comments muted, everything else regular ink. Ochre keeps code apart from the vermilion links around it.

Decided from a prototype across the whole site (2026-11-14). Rejected: the study's quiet blue (read as a default); two channels, ultramarine and coral (two accents of equal weight fought); a lilac ground with a chartreuse highlighter (lovely, but the tint barely showed and chartreuse can't set text); a hue per post, like record sleeves (equal-strength hues still looked uneven). For the second accent, cobalt (too graphic against vermilion) and teal (calm, but a cold break from the red).

## Layout

```
            column (--measure)                     margin
┌──────────────────────────────────────────┐    ┌──────────────┐
│ wordmark                                 │    │ posts        │
│                                          │    │ projects     │
│                                          │    │ demos        │
│ ▁▃▅▇▅▃▁▃▅▇█▇▅▃▁▃▅▇▅▃▁ waveform ▃▅▇▅▃▁▃▅ │    │ 1:08         │
│                                          │    │ drag to scrub│
│ name                                     │    │              │
│ intro                                    │    │ note         │
└──────────────────────────────────────────┘    └──────────────┘
```

- **Grid.** Two columns: the column at `--measure` (40rem) and the margin at `--margin` (14rem), `--margin-gap` (4rem) apart. The pair is centered in the window, so the column sits left of center.
- **Rows.** Each column-and-margin pair is its own row. A margin note belongs to the row it sits in and aligns to the top of that row's content, offset to share its first baseline.
- **Measure.** 40rem holds about 68 characters of 18px body text and keeps most code blocks from scrolling. Decided on a real post under the earlier system (2026-11-12); the reasoning carries over.
- **Margin width.** Notes are at most `--note-width` (13rem), shorter than the margin, so a note never reaches the window's edge.
- **Narrow (under 47.5rem).** The margin folds into the column. Each note appears in the flow beside what it belongs to: above a row it labels (a year), below the content it annotates, or as a block with a 1px `--rule` on its left and 0.875rem of padding when it stands alone (an intro note). The nav moves to a single row under the wordmark.
- **Gutter.** At narrow widths everything keeps `--gutter` (1rem) on each side, plus the safe-area inset.
- **Spacing** steps on a 4px base: 0.25, 0.5, 0.75, 1, 1.5, 2, 3, 4, 4.5, 6 and 7rem (`--space-1` to `--space-28`). Sections of a page are 6rem apart (`--space-24`). The footer sits 7rem below the content.
- **Rules.** Hairlines are 1px `--rule`. They sit above project rows and above the footer, and nowhere else outside a post.
- **No radius, no shadow, no border** on text. Code blocks and examples have a 4px radius and no border.

## Components

### Head

```
wordmark                                          posts
                                                  projects
                                                  demos
                                                  about
```

- The wordmark in the column, linking home: mono at `--text-nav`, 500.
- The nav in the margin, stacked, mono at `--text-nav`, muted, in the home page's order (posts, projects, demos) with about last. The current page is `--accent-ink` and carries `aria-current`; hovering the others turns them ink.
- Nav rows are 24px tall and each link fills its row, so pointer targets tile without overlapping. The wordmark shares that line height, and so the first link's baseline. Narrow, where the links sit in one row, each target is 44px tall.
- Hover turns a link ink, with no underline.
- The head is followed by 5.5rem of space on the home page and 4.5rem elsewhere.
- Narrow: the nav sits in one row under the wordmark, links 1rem apart.

### Margin note

The margin's one component.

- Mono at `--text-note`, muted, tabular.
- A note may hold a few short lines, joined with line breaks rather than punctuation.
- A value that leads the note (a year, a date) is ink, so the eye finds it first.
- Links in a note are `--accent-ink`, not underlined until hovered.
- A note never holds anything the column needs. If the margin disappeared, the page would lose detail but no meaning.

### Section label

```
posts                                             bar length is read time
```

A lowercase mono label at `--text-note`, muted, in the column, with an optional note in the margin explaining what the section's marks mean. It replaces the earlier divider: no rules, no centering.

### The waveform

The site's one image, drawn on a canvas from a list of peaks.

- **Bars.** Vertical bars centered on a horizontal axis, each as tall as its peak. Bar width is 45% of the step; the rest is gap. Minimum bar height 1.5px, so silence still draws a line.
- **Color.** Bars before the playhead are `--ink`; bars after it are `--dim`. The playhead is a 1px `--accent` line, the full height.
- **Drawn at device resolution** and redrawn on resize and on a theme change, reading its colors from the tokens.
- **Hidden from assistive technology** unless it is interactive, when it carries a label.

It appears in two sizes, and the home page prints it as a mark (below):

| Use                 | Height | Step | Behavior                                                    |
| ------------------- | ------ | ---- | ----------------------------------------------------------- |
| Post progress       | 22px   | 3px  | Fills as the post is read                                   |
| Read time, in lists | 18px   | 3px  | Static, length set by read time                             |

**Post progress.** Spans the column, sticky at the top of the viewport while the post scrolls, on the page's ground with 10px of padding. Its playhead sits at the reader's progress through the post, counted from when the post's top passes 40% of the viewport to when its end does.

**Read time.** A row of 1.6px rounded bars on a 3px pitch, `--dim`, turning `--accent` when its row is hovered. Its length is proportional to the post's read time against the longest post's, in a 120px track (72px narrow), with at least three bars. Its peaks are seeded from the post's slug, so each post keeps the same shape.

### Index list

```
how a post appears                                   2023
12.29 · 2:11                     ▁▃▅▃▁▃▅

another post                                         
11.09 · 1:54                     ▁▃▅
```

- Each row is the post's title (`--text-row`, body face) over its date and read time (`mm.dd · m:ss`, mono, `--text-note`, muted), with its read-time waveform in a 7.5rem track on the right (4.5rem narrow), spanning both lines, `--space-6` from the text.
- The year sits in the margin, in ink, beside the first post of each year.
- No rules and no leaders. Rows are 0.75rem of padding apart.
- The whole row is the link. Hover turns the waveform `--accent`.
- Narrow: the year sits above its first row, with `--space-6` above each year after the first.
- The year in the margin is hidden from assistive technology; each row's date carries a visually hidden year instead, and its read time a visually hidden label.
- A margin note may mark a post when it says something true and useful about it, such as being the longest. Use this rarely.

### Post

```
▁▃▅▇▅▃▁▃▅▇█▇▅▃▁▃▅▇▅▃▁▃▅▇▅▃▁▃▅ progress            2023.12.29
                                                   2:11 to read
Showing audio progress with
waveform images                                    note

Body text …
```

- The progress waveform at the top of the column, sticky.
- The title, 2.5rem below it, at `--text-title`, weight 500, balanced. Hyphenated words never break at the hyphen.
- The description, if any, `--space-3` under the title in the body face at `--text-row`, muted. It stays under the title: the margin's top is the pinned date and read time, and a sentence there would crowd it.
- The body follows, 2.75rem below.
- The margin holds the date (ink) and read time on one line (`2023.12.29 · 2:04 to read`), pinned level with the progress strip at the top of the viewport and set flush right, to end where wide figures end, on the page's ground reaching back across the gap. Below it the margin stays empty, so figures can run into it and pass under the pinned row as they scroll. Narrow, the notes lead the post as a block note and aren't pinned.
- Narrow: the margin's notes come first, above the progress strip, as a block note.

### Post body

- Paragraphs in the body face at `--text-body`, filling the measure, 1.2em apart.
- **Headings** in the body face at 600, at body size. No marks.
- **Links** are `--accent-ink` with a 1px underline offset 3px; hover thickens it to 2px. The same `.links` style sets links in any running text outside a post: the home intro, the about intro, the not-found line. Long bare URLs break anywhere rather than widen the page.
- **Lists** keep the body face. Ordered lists show mono numerals in muted, hanging. Unordered lists use a muted mono `–`.
- **Inline code** is mono at 0.82em, no ground.
- **Quotes** are italic with a 1px `--rule` on the left and 1rem of padding.
- **Images** fill the measure, and run across the margin with the post's other figures (see Wide figures). No border. A caption below in mono at `--text-note`, muted.
- **Diagrams** drawn on white opt in with a `#diagram` fragment on their URL and take the page's ground: multiplied in light; inverted, hue turned back 180° and screened in dark. Screenshots don't, since inverting a photo of an interface misrepresents it.

### Code block

```
typescript                                    7 lines
  1  function undo() {
  2    const command = undoStack.pop();
▌ 3    command?.undo();
```

- `--ground-2`, 4px radius, filling the measure, 18px by 20px of padding. No border.
- A header row with the language and the line count, lowercase mono at `--text-note`, muted. No rule under it.
- Code is mono at 13px, 1.7 leading. Line numbers muted, right-aligned in a 3.8em column.
- A highlighted line has a 2px `--accent` bar on the block's left edge.
- Long lines scroll inside the block.
- **Copy.** A code block may offer `copy` in its caption, in `--accent-ink`, beside the line count. Script adds it, so there's no dead button without script. On by request (`copy` on `Code`), for code meant to be taken, like a demo's source.
- **Collapsed.** Code a reader may skip starts closed, showing only its header row with `▸`; open, the mark turns to `▾`.

### Wide figures

A figure can run across the gap and the margin, to the margin's right edge. Only where the margin is at its full width (60rem and up); narrower, it keeps to the column.

- **In a post, every figure is wide**: code blocks, collapsed code, examples, images and embeds. The post keeps its margin clear below the pinned notes for them. Text stays in the column.
- **Elsewhere**, use it for the thing a page is about, not for every figure: `wide` on `Example` and `Code`, or the `.wide` class.

### Example

Something live inside a post.

- Set like a code block: `--ground-2`, 4px radius, filling the measure, with a header row labeled `example`, or `demo` when the reader can use it.
- Content sits 1.5rem from the top and bottom and 1rem from the sides.
- Inside, the post's text styles don't apply; the example styles itself from the system's tokens.
- Colors baked into images, such as waveforms, use the system's hex values.

**The audio player** draws its waveform as the system's waveform does: played in ink, unplayed in grey, the playhead in `--accent`. Its waveforms are images from waveformr, so the colors are fixed hex values, one image per theme. The unplayed grey is a step past `--dim` (`#AEB1B6` light, `#4A4D53` dark), because `--dim` disappears on `--ground-2`. The track title in the body face at 600 over the artist in muted mono, both linking out; the time (`0:00 / 3:12`, tabular, hidden until the audio loads) over a text button, `play` or `pause`, in `--accent-ink`. Before the audio loads, the whole waveform is a play button.

### Project row

```
waveformr                                      what it is,
                                               what it's built with
```

- The project's name in the body face at `--text-row`, in the column, above a 1px `--rule`.
- Its description in the margin as a note.
- The whole name is the link. Hover turns it `--accent-ink`.
- Narrow: the description follows the name as a note.

### Career list

The about page's work, set like the index list, with a timeline drawn down its left edge.

```
●╲ risotto · staff engineer                                    2026
│ ╲▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁━━━━
│ 2026.08 → now
○╲ dropbox · senior software engineer                          2019
│ ╲▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━▁▁▁▁
│ 2019.02 → 2026.08
```

- **Rows.** The role (`company · title`, body face, `--text-row`) over a track, over its dates (`yyyy.mm → yyyy.mm`, or `→ now`; mono, `--text-note`, muted). Both ends carry the year: a bare month read as ambiguous even with the year in the margin. The start year sits in the margin, in ink, beside the first role that began that year.
- **The thread.** A 2px line down a 1.75rem gutter, centered 4px in. Each role has an 8px ring on it, level with the title's first line; the current role's is filled and carries a soft 3px halo of its own color at 18%. The thread starts at the first dot and stops at the last, with no fade.
- **The track.** A 2px line under each role's title spanning the whole career, from the first role's start to now, in `--rule`. The role's own time is drawn on it in color, on that shared scale, so gaps, overlaps and tenure all show. It's the waveform's played-and-unplayed idea, turned into a career. It follows the title, so a title that wraps pushes it down instead of crossing it.
- **The joint.** The line leaves the dot's center at 45° and turns level into the track: square ends, mitered corners. The dot sits on top, so the line appears to come out of the ring. A title that wraps drops the track, so the joint then leaves the thread below the dot.
- **Every line is 2px**: thread, ring, joint, track.
- **Color.** One blend down the list, mixed in oklch: `--accent` on the newest role to `--accent-2` on the first. Each dot, joint and track takes the blend at its role's place; each stretch of thread runs from halfway to the role above to halfway to the one below, so the segments meet without a seam. It's the one place an accent appears more than twice on a view, because here it is the drawing. Rejected: vermilion now and ochre for the past, lightening with age (the jump between them read as a break, and the oldest roles washed out).
- **Narrow.** The year moves above its role, indented to the text's edge, and the thread runs through it unbroken.
- Hidden from assistive technology: the thread, dots, joint and track, and the year in the margin, which the dates already carry.

Decided from a prototype on the about page (2026-11-14), over four rounds. Rejected: no decoration (plain, but the page had no shape); a line that stepped right at each promotion (abstract until noticed); a vertical waveform rail (texture more than timeline); curved branches off the thread (too soft for the system); straight elbows, diagonals and circuit-board traces into the dates (decoration without information); tenure lines measured from the thread rather than on a shared scale (hid gaps and overlaps); a dotted guide to each role's start (busier than the track); and a year ruler under the list (made it a chart). The earlier timeline drawing, the instrument's screen, is gone with the instrument.

### Numbered list

For short items outside a post, such as the things built on the about page. A section label names the list; rows are the body face at `--text-row`, with zero-padded mono numerals in muted hanging in a 2rem column. An item may carry a margin note of links on a single line, joined with ` · `: on the about page, the posts written about that kind of work, by short labels (the full title on hover), so the list points at evidence. The note never wraps, so every row is the same height. Narrow, the note follows its item, indented to the item's text. Numbered because the list is ordered by the author, not because numbering looks tidy; if order stops mattering, the numbers go.

### Footer

```
────────────────────────────────────────────────
outside links · rss                               light / dark
```

- A 1px `--rule` above, spanning the column.
- The outside links in the column, mono at `--text-note`, muted, joined by spaced middle dots. Hover turns a link ink.
- The theme switch in the margin: one button, `light / dark`, the current theme in ink, the other muted.
- Hit areas at least 44px tall.
- Narrow: the switch follows the links.

## Not found

The 404 page is the waveform of nothing: a page title, `not found`, over a nearly flat line of `--dim` bars with `404` in ink in the margin beside it, then one lead-size line pointing to the posts and the home page. Its wording is placeholder, like all copy.

## Home mark

The home page draws its track as a print in two inks, vermilion for the low voice and ochre for the high, and a different variation on every load. It's tuned in a lab, not by hand.

- **Directions.** *Groove*: the track wrapped in rings, like a record, with low marks falling inside each ring and high marks rising outside. *Bands*: bars along time from an off-center baseline, the high voice narrower and half a step over. *Ridges*: stretches of the track as stacked, leaning rows. *Roll*: a piano roll or graphic score, notes starting where the track peaks.
- **Print rules.** Two inks only, no near-black. Where they cross they multiply (screen in dark), like an overprint. Flat marks, no gradients. Every mark comes from the track's data: a real recording, below.
- **Placement.** The mark is a full-width layer behind the page, never in front of text. *Free* marks (groove, roll) lie behind the header and intro; they're thin or sparse enough to read through. *Strips* (bands, ridges) are bolder, so they keep to the band between the header and the intro. Either way the slot above the intro holds the space, with its height set in the HTML so nothing moves when the drawing arrives.
- **Variation.** Each request picks a liked setting, blends it toward another like of the same direction by a random amount, lets a few values wander a little (where there are few likes to blend between), and draws on a fresh seed. Every value stays within the knob's tested range. Picked on the server, drawn on the client.
- **Motion.** It drifts slowly at the like's speed while on screen. The mouse plays it, each direction in its own way, within about 150px of the pointer and easing in and out: *groove* drags round with the pointer like a hand on a record, its marks leaning into the turn; *bands* jump like a meter catching a peak; *ridges* part around the pointer like wind through grass, rows above pushed up and below pushed down; *roll* treats the pointer as a playhead, and the notes it passes over swell while they sound. Mouse only; touch has no hover. Under `prefers-reduced-motion` it's still and doesn't follow the pointer.
- **Accessibility.** Decorative, hidden from assistive technology.
- **Source.** The lab is at `/lab/home-mark` in development only: click for a new seed, tune, and *like* with a note. Likes are kept in `src/data/home-mark-likes.json`, which the home page reads; notes stay out of the page. The render and variation functions are `src/utils/home-mark.ts`.
- **The track.** "Rest" by The Air on Earth, the song in the audio player demo. It's split into two voices by loudness: the low voice below 200Hz (kick and bass), the high voice above 3kHz (hats and air), as RMS over 2048 windows, scaled to the 99th percentile. Each seed draws a different stretch, 60% of the song, scaled within itself. The analysis runs in the browser at `/lab/home-mark/analyse` (development only), which writes `src/data/home-mark-track.json`.

Rejected: a single drifting, scrubbable waveform (beautiful, but just a waveform, and symmetric); concentric arcs after Müller-Brockmann's *musica viva* posters (liked least of the directions).

## Social image

1200 × 630, light theme only, set like a page: the wordmark at top left in Plex Mono 500; the title in Newsreader 500 at 64px over the description in Plex Mono at 24px, muted; for a post, the date (ink) over the read time in a 220px margin on the right; and a waveform along the bottom, 72px tall on a 6px step.

A post's waveform uses the same seed as its progress strip, and is drawn for its share of the longest post's read time, then runs on as a flat `--rule` track, as on the posts index. The home image draws its waveform in full from the home page's seed. Rendered with satori from the Fontsource `.woff` files, since satori can't read `woff2`. Posts carry no image of their own: the waveform is the image.

## The wordmark

The name, set as live text in IBM Plex Mono at weight 500, lowercase, in the head at `--text-nav`. It carries no accent, symbol or punctuation. It's set as plain mono: no tracking, and a word gap of one character (0.6em, Plex Mono's advance), so it sits on the same grid as every other line of mono. Weight alone sets it apart from the nav. Rejected: the 0.07em tracking and 0.84em gap carried over from JetBrains Mono (airy, and off the character grid in Plex).

**The logomark,** for the browser tab and home-screen icons: an `n` laid out as three notes on a piano roll, the roll direction of the home mark. The low voice's stem in `--accent`, the high voice's arch and its fall in `--accent-2`, on `--ground`. The notes sit on a 4-unit grid of a 32-unit square, so each cell is 2px in a 16px tab; 2-unit gaps (a whole pixel) separate them and their corners are rounded by 1 unit. The SVG follows the system's color scheme; the `.ico` and the 180px Apple touch icon are light. Drawn by `src/utils/favicon.ts` from the tokens and served by `favicon.svg`, `favicon.ico` and `apple-touch-icon.png` routes, prerendered.

Rejected: a ground `n` on an ink square (quiet, no accent); a ground `n` on a vermilion tile, and that tile with the `n` overprinted in ochre (the ochre muddies on vermilion); the `n` printed twice out of register (blurs at 16px); a record, and two tiles at different angles (busier than the roll, and further from the letter); the home mark's bands in miniature (reads as an audio icon); the roll as solid joined blocks, on the vermilion tile, or over the roll's lanes (the gaps make it a roll; the lanes vanish at 16px); `nb` and `npb` (too small to read in a tab).

## Page recipes

| Page     | Recipe                                                                                                                         |
| -------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Home     | Head. The home mark behind the head and intro. Name and intro, with notes in the margin. Posts as an index list. Projects as project rows. Footer. |
| Posts    | Head. Page title. The full index list. Footer.                                                                                 |
| Post     | Head. Post. Footer.                                                                                                            |
| About    | Head. Page title. Paragraphs, with a square photo (7rem, untreated) in the margin, and no note: the first sentence already says what one would. The career list under a `work` label. The numbered list of things built. Footer. |
| Projects | Head. Page title. Project rows. Footer.                                                                                        |
| Demos    | Head. Page title. Project rows, from the demos collection; names lowercase, like project names. Footer.                                                                                        |

## Motion

The home mark drifts, as above. Hover changes on links are instant; the read-time waveform's color change takes 200ms. Nothing animates on load. Under `prefers-reduced-motion`, nothing moves on its own.

## Accessibility

- All text meets 4.5:1 against its ground in both themes. `--dim`, `--rule` and light `--accent` never set small text.
- The current page is marked with `aria-current` as well as color.
- Focus is a 2px outline in the current text color, offset 3px, on every interactive element. Never the accent.
- Decorative marks are hidden from assistive technology: the read-time and progress waveforms, and list markers.
- Index rows and project names are each one link named by their visible text.
- Nothing in the margin is the only place a fact appears that the reader needs.

## Not in the system

Left out on purpose. Adding any of these is a change to the system, not a use of it.

- Hardware: panels, knobs, lights, screens or devices. The instrument system this replaced is in git history.
- Hand-drawn marks, scribbled underlines or other faux-handmade flourishes.
- Section colors, a third accent, tints, gradients beyond the career list's, or texture.
- Cards, shadows or rounded corners beyond code blocks and examples.
- Uppercase, tracked labels.
- Illustrations or icons. Arrows and marks are type characters.
- Centered layouts. The column is always left of center.

## Open

Each should be settled, and written into this document, when the page that needs it is built.

- All copy: the intro, margin notes and footer wording. The post's read time currently reads `2:11 to read`, as a placeholder.

## Where it came from

Chosen from the quiet studies (2026-11-13), made after the instrument system stopped feeling personal. Study 03 (signal) gave the waveform in its three uses; study 02 (margins) gave the off-center column and the margin; study 04 combined them. Carried over from the earlier system, where they were decided on real posts: the measure, the date format, images kept inside the measure, and the code block and example structure.
