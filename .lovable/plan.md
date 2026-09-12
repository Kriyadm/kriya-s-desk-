# Refine the memory wall and favourites

## What will change
- Restyle the memory wall as a scrapbook collage inspired by the reference: warm paper background, layered paper textures, playful decorations, and overlapping Polaroid photos.
- Keep every photo draggable, but make dropping one over another swap their places for easy rearranging.
- Preserve photo captions, positions, and uploaded images in the visitor's browser; keep rename, enlarge, remove, and reshuffle actions.
- Add Harry Potter series, Set It Up, The Hello series, and Windy City series to the book shelf.
- Replace the single magazine mockup with four individual magazine cards linked to the supplied Canva URLs.
- Add a cover-image upload control to each magazine card so Kriya can display the real cover; uploaded covers stay in that browser.

## Technical details
- Rework the existing Memory Wall component rather than adding a new section.
- Use responsive initial collage slots instead of unconstrained random placement, while retaining free dragging within the board.
- Detect overlap after dragging and exchange the two photos' stored coordinates.
- Store magazine cover images in local storage, consistent with the existing memory-wall approach.
- Verify desktop and mobile layouts, interactions, TypeScript, and the live preview.
