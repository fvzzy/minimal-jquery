# Minimal jQuery

A minimal implementation of jQuery in TypeScript.

A learning exercise with a limited feature set, and support only for modern browsers. Tested only in Chrome (v92).

Implements:

- `$()` (element collection selector)
- `.ready()`
- `$.each()` (operates over element collection in args)
- `.on()`
- `.click()`
- `.hover()`
- `.width()`

Uses code borrowed from a [popular image slider written by André Cortellini](https://codepen.io/AndreCortellini/pen/kxwmj) to test the implementation.

## Compiling

Install TypeScript (`npm i -g typescript`) and run `tsc` to compile. Open `./demo/index.html` to check it works.
