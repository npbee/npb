# Design system

A quiet system for a text-heavy personal site, made by someone who cares about music and about small details. Every page is one reading column set off-center, with a narrow margin to its right for the things a reader glances at: the nav, dates, years and short notes. The one image is a waveform, drawn from sound and used in three places: on the home page, beside each post as its length, and above a post as the reader's progress.

The site should feel beautiful and calm, and it shouldn't take itself too seriously. Its personality comes from the writing, the waveform and care in the details, not from a theme or a metaphor.

This document describes how things look and read. It is independent of how the site is built. The values it names live in [tokens.css](tokens.css) as plain CSS custom properties. Copy shown here is placeholder: slots are described by what they hold, not by their wording.

## Principles

1. **A column and a margin.** Reading happens in the column. The margin holds what a reader scans: where they are, when something was written, how long it is, an aside. Nothing in the margin is needed to read the column.
2. **One image.** The waveform is the only picture the system draws. There are no illustrations, icons, textures or objects. Posts may carry their own images.
3. **Type does the work.** Hierarchy comes from face, size, weight and color. There are no cards, shadows, gradients or rounded corners, except where a code block or example needs a ground.
4. **Mono for the margin.** Margin notes, dates, labels, read times and code are monospace. Reading text is the body face.
5. **One accent.** A single quiet blue marks links, the playhead and at most one other thing per view. There are no section colors.
6. **Every mark earns its place.** Counts, numbers and labels appear only where a reader uses them. A read time is shown because it tells the reader something; a sequence number is not.
7. **Still by default.** One thing moves: the home waveform drifts slowly. Everything else waits for the reader.

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

| Token          | Light     | Dark      | Used for                                         |
| -------------- | --------- | --------- | ------------------------------------------------ |
| `--ground`     | `#F4F4F2` | `#0E0F0F` | Page ground                                      |
| `--ground-2`   | `#EAEAE7` | `#1A1B1A` | Code blocks and examples                         |
| `--ink`        | `#1A1A19` | `#E9E8E4` | Text, the played part of a waveform              |
| `--muted`      | `#67675F` | `#8A8A85` | Margin text, dates, secondary text               |
| `--rule`       | `#E0E0DC` | `#222322` | Hairlines                                        |
| `--dim`        | `#CFCFCA` | `#2C2D2C` | The unplayed part of a waveform, mini waveforms  |
| `--accent`     | `#3F6E9C` | `#8FB3D9` | The playhead, hovered mini waveforms             |
| `--accent-ink` | `#355F88` | `#8FB3D9` | Links and any accent text                        |

Light is a cool, barely warm grey; dark is near black with a trace of green. Neither is pure. Components keep their shape between themes.

**Contrast.** Ink is about 15.8:1 on the ground in light and 15.7:1 in dark. Muted is 5.2:1 in light and 5.5:1 in dark, and at least 4.7:1 on `--ground-2`. `--accent-ink` is 6.1:1 in light and 8.8:1 in dark. `--accent` in light is 4.9:1, so it may set large marks but not small text. `--dim` and `--rule` are marks only and never set text.

**The accent is open** as a hue. The quiet blue is study 04's. Whatever it becomes, it stays one hue and stays quiet.

**Using the accent.** Links are `--accent-ink`. Beyond links, one view may use the accent for the waveform's playhead and one hover state. Never as a fill behind text, a background or a tint.

**Code syntax** uses ink, weight and the accent: keywords bold ink, strings `--accent-ink`, comments muted, everything else regular ink. One hue, so code doesn't bring a second palette onto the page.

## Layout

```
            column (--measure)                     margin
┌──────────────────────────────────────────┐    ┌──────────────┐
│ wordmark                                 │    │ about        │
│                                          │    │ projects     │
│                                          │    │ posts        │
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
wordmark                                          about
                                                  projects
                                                  posts
```

- The wordmark in the column, linking home: mono at `--text-nav`, 500.
- The nav in the margin, stacked, mono at `--text-nav`, muted. The current page is ink and carries `aria-current`.
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

It appears in three sizes:

| Use                 | Height | Step | Behavior                                                    |
| ------------------- | ------ | ---- | ----------------------------------------------------------- |
| Home                | 120px  | 4px  | Drifts, scrubs                                              |
| Post progress       | 22px   | 3px  | Fills as the post is read                                   |
| Read time, in lists | 18px   | 3px  | Static, length set by read time                             |

**Home.** Spans the column. The playhead drifts left to right over 90 seconds, then wraps. Pressing and dragging on the waveform scrubs it; releasing lets it drift on from there. The margin beside it shows the playhead's time in ink at 13px over a short instruction in muted. Under `prefers-reduced-motion` it doesn't drift and can still be scrubbed. The time is read against `--track-length` (the length of the source track).

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
- The description, if any, `--space-3` under the title in the body face at `--text-row`, muted. Its placement is still open.
- The body follows, 2.75rem below.
- The margin holds the date (ink) over the read time, and below that any note the post wants. It starts level with the title and is sticky, so it stays beside the reader as the post scrolls.
- Narrow: the margin's notes come first, above the progress strip, as a block note.

### Post body

- Paragraphs in the body face at `--text-body`, filling the measure, 1.2em apart.
- **Headings** in the body face at 600, at body size. No marks.
- **Links** are `--accent-ink` with a 1px underline offset 3px; hover thickens it to 2px. Long bare URLs break anywhere rather than widen the page.
- **Lists** keep the body face. Ordered lists show mono numerals in muted, hanging. Unordered lists use a muted mono `–`.
- **Inline code** is mono at 0.82em, no ground.
- **Quotes** are italic with a 1px `--rule` on the left and 1rem of padding.
- **Images** fill the measure, never break out, and have no border. A caption below in mono at `--text-note`, muted.

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
- **Collapsed.** Code a reader may skip starts closed, showing only its header row with `▸`; open, the mark turns to `▾`.

### Example

Something live inside a post.

- Set like a code block: `--ground-2`, 4px radius, filling the measure, with a header row labeled `example`, or `demo` when the reader can use it.
- Content sits 1.5rem from the top and bottom and 1rem from the sides.
- Inside, the post's text styles don't apply; the example styles itself from the system's tokens.
- Colors baked into images, such as waveforms, use the system's hex values.

**The audio player** draws its waveform as the system's waveform does: played in ink, unplayed in grey, the playhead in `--accent`. Its waveforms are images from waveformr, so the colors are fixed hex values, one image per theme. The unplayed grey is a step past `--dim` (`#B4B4AE` light, `#4A4B4A` dark), because `--dim` disappears on `--ground-2`. The track title in the body face at 600 over the artist in muted mono, both linking out; the time (`0:00 / 3:12`, tabular, hidden until the audio loads) over a text button, `play` or `pause`, in `--accent-ink`. Before the audio loads, the whole waveform is a play button.

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
- **Color.** The accent, as a ramp by age: the current role at full strength, each older one lighter in light mode and dimmer in dark (oklch, relative to `--accent`: L ±0.075–0.08 and C −0.01 per step). It's the one place the accent appears more than twice on a view, because here it is the drawing.
- **Narrow.** The year moves above its role, indented to the text's edge, and the thread runs through it unbroken.
- Hidden from assistive technology: the thread, dots, joint and track, and the year in the margin, which the dates already carry.

Decided from a prototype on the about page (2026-11-14), over four rounds. Rejected: no decoration (plain, but the page had no shape); a line that stepped right at each promotion (abstract until noticed); a vertical waveform rail (texture more than timeline); curved branches off the thread (too soft for the system); straight elbows, diagonals and circuit-board traces into the dates (decoration without information); tenure lines measured from the thread rather than on a shared scale (hid gaps and overlaps); a dotted guide to each role's start (busier than the track); and a year ruler under the list (made it a chart). The earlier timeline drawing, the instrument's screen, is gone with the instrument.

### Numbered list

For short items outside a post, such as the things built on the about page. A section label names the list; rows are the body face at `--text-row`, with zero-padded mono numerals in muted hanging in a 2rem column. Numbered because the list is ordered by the author, not because numbering looks tidy; if order stops mattering, the numbers go.

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

## The wordmark

The name, set as live text in IBM Plex Mono at weight 500, lowercase, in the head at `--text-nav`. It carries no accent, symbol or punctuation. Its tracking and word gap (0.07em and 0.84em) were tuned for JetBrains Mono and need checking again in Plex.

**The short form,** for the browser tab icon: a lowercase `n` in the same face and weight, the ground color on an ink square, at about 60% of the square's height.

## Page recipes

| Page     | Recipe                                                                                                                         |
| -------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Home     | Head. The waveform with its time in the margin. Name and intro, with notes in the margin. Posts as an index list. Projects as project rows. Footer. |
| Posts    | Head. Page title. The full index list. Footer.                                                                                 |
| Post     | Head. Post. Footer.                                                                                                            |
| About    | Head. Page title. Paragraphs, with a note in the margin. The career list under a `work` label. The numbered list of things built. Footer. |
| Projects | Head. Page title. Project rows. Footer.                                                                                        |
| Demos    | Head. Page title. Project rows. Footer.                                                                                        |

## Motion

The home waveform drifts, as above. Hover changes on links are instant; the read-time waveform's color change takes 200ms. Nothing animates on load. Under `prefers-reduced-motion`, nothing moves on its own.

## Accessibility

- All text meets 4.5:1 against its ground in both themes. `--dim`, `--rule` and light `--accent` never set small text.
- The current page is marked with `aria-current` as well as ink.
- Focus is a 2px outline in the current text color, offset 3px, on every interactive element. Never the accent.
- Decorative marks are hidden from assistive technology: the read-time and progress waveforms, and list markers.
- The home waveform, being interactive, has a label and is operable by pointer; keyboard scrubbing is open.
- Index rows and project names are each one link named by their visible text.
- Nothing in the margin is the only place a fact appears that the reader needs.

## Not in the system

Left out on purpose. Adding any of these is a change to the system, not a use of it.

- Hardware: panels, knobs, lights, screens or devices. The instrument system this replaced is in git history.
- Hand-drawn marks, scribbled underlines or other faux-handmade flourishes.
- Section colors, more than one accent, tints, gradients or texture.
- Cards, shadows or rounded corners beyond code blocks and examples.
- Uppercase, tracked labels.
- Illustrations or icons. Arrows and marks are type characters.
- Centered layouts. The column is always left of center.

## Open

Each should be settled, and written into this document, when the page that needs it is built.

- The wordmark's tracking and word gap in Plex Mono.
- The accent hue.
- What the home waveform is drawn from: a real track, and which one. Until then, peaks are generated.
- Whether a post's description goes under its title or into the margin.
- Keyboard scrubbing for the home waveform.
- Images with a baked-in white ground, such as the undo diagrams, in dark mode.
- The 404 page and the generated social image.
- All copy: the intro, margin notes and footer wording. The post's read time currently reads `2:11 to read`, as a placeholder.

## Where it came from

Chosen from the quiet studies (2026-11-13), made after the instrument system stopped feeling personal. Study 03 (signal) gave the waveform in its three uses; study 02 (margins) gave the off-center column and the margin; study 04 combined them. Carried over from the earlier system, where they were decided on real posts: the measure, the date format, images kept inside the measure, and the code block and example structure.
