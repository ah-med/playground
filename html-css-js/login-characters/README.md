# Login page with interactive characters

A split-screen login UI: left side has four blob characters that react to the user; right side is a minimal login form.

## Behaviour

- **Eyes follow cursor** — As you move the mouse, the characters’ eyes (and pupils) track the cursor.
- **Typing password** — When you focus or type in the password field, the characters get a “curious” look (slightly different mouth).
- **Reveal password** — When you click the eye icon to show the password, the characters look away (pupils to the left, slight body tilt, embarrassed mouth).

## Run

Open `index.html` in a browser (no server required).

## Files

- `index.html` — Layout and form markup
- `style.css` — Layout, character shapes, form styles, reaction states
- `script.js` — Mouse tracking, password focus/input, visibility toggle, class toggles
