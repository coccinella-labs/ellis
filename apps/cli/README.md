# @palmshed/fx

Terminal editor for AI text completion.

```
fx new
fx edit draft.txt
```

## Setup

```sh
export GEMINI_API_KEY=your_key
```

The CLI also looks for a `.env` file while walking up from the current
directory.

## Options

```
fx new --mode sentence --style casual --output notes.txt
fx edit draft.txt --mode paragraph --style technical
```

Modes: `word`, `sentence`, `paragraph`.
Styles: `casual`, `formal`, `creative`, `technical`.

## Build

```sh
cd apps/cli
npm install
npm run build
```

## License

MIT.
