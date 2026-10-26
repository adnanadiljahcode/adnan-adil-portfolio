Here is an explanation of the change and how the updated code works:

---

The Issue with the Current Code

Currently, lines 66–70 of `src/components/ExperienceSection.tsx` look like this:

```tsx
if (item.link) {
  return <Link to={item.link}>{content}</Link>;
}

return content;
```

`<Link>` is a component from React Router built for internal single-page app navigation (like navigating from `/` to `/about`). When passed an external URL like `https://portrait-time-picker.lovable.app/`, it doesn't open in a new tab, and can cause unexpected routing behavior.

For external URLs, we want standard HTML anchor tags (`<a>`) configured with:
* `target="_blank"`: opens the link in a new tab/window so visitors don't lose their place on your portfolio.
* `rel="noopener noreferrer"`: a security and performance best practice that prevents the newly opened page from accessing `window.opener` (protecting against reverse tabnabbing) and prevents passing referrer headers.

---

The Code Change

In `src/components/ExperienceSection.tsx`, we inspect whether `item.link` starts with `http://` or `https://`:

```tsx
const ExperienceCard = ({ item, index }: { item: ExperienceItem; index: number }) => {
  const content = (
    // ... same motion.div card JSX as before ...
  );

  if (item.link) {
    const isExternal = item.link.startsWith("http://") || item.link.startsWith("https://");

    if (isExternal) {
      return (
        <a 
          href={item.link} 
          target="_blank" 
          rel="noopener noreferrer"
        >
          {content}
        </a>
      );
    }

    return <Link to={item.link}>{content}</Link>;
  }

  return content;
};
```

---

How It Works Step-by-Step

1. `if (item.link)`: Checks whether the experience or project has a link assigned.
2. `isExternal` check: Checks if the link starts with `http://` or `https://`.
3. If `true`: Wraps the card in a native `<a>` tag with `target="_blank"` and `rel="noopener noreferrer"`, smoothly launching your app in a fresh tab.
4. If `false`: Falls back to `<Link to={item.link}>`, allowing any internal case study pages (like `/explorations`) to continue working with fast client-side routing.
5. If no link exists: Renders the static card without wrapping it in an anchor.

---

Next Step

Would you like me to switch to Build mode and apply this update to `src/components/ExperienceSection.tsx`?