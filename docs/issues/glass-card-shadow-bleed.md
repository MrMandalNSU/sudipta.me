# Glass Card Shadow Bleed / Rectangular Shadow Artifact

## Symptom

A large dark rectangular shadow or backdrop layer appears below a glassmorphism card. It can look like the card's shadow is detached, bleeding behind the next section, or sometimes appearing in front of the following section.

This has appeared around large landing-page cards such as the Research section, especially when the section sits above another card-heavy section like Competitive Programming.

## Visual Clues

- A blocky rectangle appears below the card instead of a soft shadow.
- The rectangle may extend beyond the intended card/container width.
- It may look like a hidden duplicate card, z-index issue, or background slab.
- It can appear intermittently after layout changes, hover transforms, added charts, or taller content.

## Likely Cause

This project uses glassmorphism surfaces with:

- translucent backgrounds
- `backdrop-filter`
- large `boxShadow`
- hover `transform`
- nested `Paper` / card layers

On some layouts, the browser compositor can promote the card to its own paint layer. Large shadows and transformed glass cards may then bleed outside their visual section, causing a rectangular artifact around the next section.

This is not usually a data/rendering bug. It is a paint/compositing and stacking-context issue.

## Fix Pattern

For the affected section/card:

1. Isolate the section paint layer.
2. Clip the outer glass container.
3. Avoid large external hover shadows on the big wrapper card.
4. Keep the hover motion if the section uses it, but pair it with border or internal glow feedback instead of an outside `boxShadow`.

Example pattern:

```jsx
const OuterPaper = styled(Paper)(({ theme }) => ({
  position: "relative",
  zIndex: 0,
  isolation: "isolate",
  overflow: "hidden",
  padding: theme.spacing(4),
  borderRadius: theme.spacing(3),
  background: theme.palette.mode === "light"
    ? "rgba(255, 255, 255, 0.4)"
    : "rgba(15, 23, 42, 0.4)",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
}));

const LargeCard = styled(Box)(({ theme }) => ({
  position: "relative",
  zIndex: 1,
  isolation: "isolate",
  overflow: "hidden",
  borderRadius: theme.spacing(2),
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  boxShadow: "none",
  transition: "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), border-color 0.2s ease, background-color 0.2s ease",
  "&::after": {
    content: '""',
    position: "absolute",
    inset: 0,
    borderRadius: "inherit",
    pointerEvents: "none",
    opacity: 0,
    boxShadow: "inset 0 0 0 1px rgba(129, 140, 248, 0.35), inset 0 0 32px rgba(79, 70, 229, 0.14)",
    transition: "opacity 0.25s ease",
  },
  "@media (hover: hover)": {
    "&:hover": {
      transform: "translateY(-8px) scale(1.02)",
      border: `1px solid ${theme.palette.primary.main}`,
      "&::after": {
        opacity: 1,
      },
    },
  },
}));
```

For the outer section wrapper, this also helps:

```jsx
<Box
  sx={{
    position: "relative",
    zIndex: 0,
    isolation: "isolate",
  }}
>
```

## What To Avoid

Avoid this combination on large landing cards:

```jsx
"&:hover": {
  transform: "translateY(-5px)",
  boxShadow: "0 12px 24px rgba(...)",
}
```

The transform is not the problem by itself. The risky part is pairing transformed glass surfaces with a large external `boxShadow`. Prefer `transform` plus border/internal glow. Small repeated cards can still use hover lift/shadow if they are safely contained and do not sit near section boundaries.

## Current Known Fix

The Research section fix used:

- `position: "relative"`
- `zIndex: 0`
- `isolation: "isolate"`
- `overflow: "hidden"` on the outer `Paper`
- `position: "relative"`, `zIndex: 1`, and `isolation: "isolate"` on the large card
- keep or restore the large card hover `transform`
- remove only the large external hover `boxShadow`
- use border hover feedback and/or an internal `::after` glow

If this bug reappears elsewhere, apply the same pattern to the nearest section-level `Paper` and large glass card wrapper.
