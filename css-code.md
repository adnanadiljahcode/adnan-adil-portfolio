Your project's styling is built on Tailwind CSS combined with CSS Custom Properties (Variables) to deliver an atmospheric, dark minimal aesthetic (muted slate-blue background with warm cream typography).

The styling is organized across three main layers:

---

1. The Design Tokens (`src/index.css` → `:root`)

In `src/index.css`, colors and design tokens are declared as raw HSL channel values (Hue Saturation Lightness) without the `hsl()` wrapper:

```css
:root {
  /* Core Background - Muted slate blue */
  --background: 210 15% 42%;
  --foreground: 40 30% 95%;

  /* Custom portfolio tokens */
  --text-primary: 40 30% 95%;   /* Crisp cream for headings & emphasis */
  --text-secondary: 40 20% 80%; /* Softer cream for body & descriptions */
  --text-muted: 40 15% 65%;     /* Faded cream for dates & metadata */
  
  /* Subtle borders & hovers with alpha transparency */
  --border: 40 20% 85% / 0.15;
  --hover-strong: 40 30% 95% / 0.1;
}
```

Why raw HSL numbers?  
Storing values as `210 15% 42%` allows Tailwind to wrap them in `hsl(...)` dynamically while still enabling alpha opacity modifiers anywhere in your HTML (for example: `bg-background/80` or `text-foreground/50`).

---

2. How `tailwind.config.ts` Bridges the Variables

`tailwind.config.ts` connects those CSS variables to Tailwind’s utility class engine:

```ts
colors: {
  background: "hsl(var(--background))",
  foreground: "hsl(var(--foreground))",
  border: "hsl(var(--border))",
  ...
}
```

When you write `<div className="bg-background text-foreground">`, Tailwind outputs CSS that reads directly from `--background` and `--foreground`. If you change `--background` in `src/index.css`, every component on the site updates instantly.

---

3. Typography & Google Fonts

The project uses three distinct typefaces declared in `index.html` and mapped in `tailwind.config.ts`:

* `font-sans` (`Inter`): Clean, modern body text used across paragraphs.
* `font-serif` (`Playfair Display`): Elegant display serif used for large titles and name headings.
* `font-mono` (`DM Mono`): Monospaced font for section tags (`// 01 EXPERIENCE`), dates, location, and metadata.

---

4. Base & Component Utility Layers (`src/index.css`)

Inside `src/index.css`, `@layer base` and `@layer components` define global defaults and reusable component classes:

* Global Defaults (`@layer base`):
  * `html { scroll-behavior: smooth; }` makes clicking navigation links smoothly scroll to sections.
  * `* { @apply border-border; }` ensures all borders default to the custom subtle cream border.
* Reusable Class Presets (`@layer components`):
  * `.heading-display`: Applies `Playfair Display` serif styling.
  * `.section-header`: Applies uppercase, wide-spaced mono text (`DM Mono`) for headers.
  * `.experience-card`: Bundles flex layout, hover highlights (`--hover-strong`), and smooth 300ms transitions for portfolio cards.
  * `.external-link`: Provides subtle underline offsets and hover transitions.

---

5. What About `src/App.css`?

`src/App.css` contains default Vite starter demo code (like `.logo-spin` and `#root { text-align: center }`). Your actual application components do not rely on it because all styling is driven by Tailwind and `src/index.css`.

---

Would you like to adjust any color tones (such as tweaking the slate-blue background or link colors), or would you like to clean up `src/App.css`?