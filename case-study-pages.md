To remove the leftover template case study pages (`Verve`, `Spotify`, `Figma`, `Notion`, and `Explorations`), there are two primary steps, plus an optional asset cleanup.

---

1. Clean Up the Routes in `src/App.tsx`

Currently, `src/App.tsx` imports the page components and registers a route for each.

Lines to remove:
Imports (lines 7–11):
```tsx
import Verve from "./pages/Verve";
import Spotify from "./pages/Spotify";
import Figma from "./pages/Figma";
import Notion from "./pages/Notion";
import Explorations from "./pages/Explorations";
```

Route tags (lines 24–28):
```tsx
<Route path="/verve" element={<Verve />} />
<Route path="/spotify" element={<Spotify />} />
<Route path="/figma" element={<Figma />} />
<Route path="/notion" element={<Notion />} />
<Route path="/explorations" element={<Explorations />} />
```

What `src/App.tsx` looks like afterward:
```tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* Any unrecognised path will now hit NotFound */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
```

---

2. Delete the Page Files

Once the routes are unhooked, the component files in `src/pages/` can be deleted:
- `src/pages/Verve.tsx`
- `src/pages/Spotify.tsx`
- `src/pages/Figma.tsx`
- `src/pages/Notion.tsx`
- `src/pages/Explorations.tsx`

---

3. Optional Asset Cleanup

The template's mockup images in `src/assets/` are only imported by those 5 pages. Deleting them keeps the repository lightweight:
- `src/assets/verve-showcase-1.jpg`, `2.jpg`, `3.jpg`
- `src/assets/spotify-showcase-1.jpg`
- `src/assets/figma-showcase-1.jpg`
- `src/assets/notion-showcase-1.jpg`
- `src/assets/explorations-showcase-1.jpg`

---

Status in `src/components/ExperienceSection.tsx`

Your items (EUSOPHT, SSUET, Easy Bookings, and Little Fern's Cozy Corner) already point to external live links, so none of them link to `/verve` or `/explorations` anymore.

Whenever you're ready to remove these files and streamline `App.tsx`, let me know and I can switch to Build mode to take care of it.