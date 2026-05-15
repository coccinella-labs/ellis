# Autofix CLI

This package provides the `autofix` command.

It opens a small terminal editor for AI text completion. It can start a new
document or edit an existing file.

## Build

From the repo root:

```sh
npm install
cd apps/cli
npm install
npm run build
```

## Setup

Set a Gemini key before running the command:

```sh
export GEMINI_API_KEY=your_key
```

The CLI also looks for a `.env` file while walking up from the current
directory.

## Use

Create a new document:

```sh
autofix new
```

Edit a file:

```sh
autofix edit draft.txt
```

Useful options:

```sh
autofix new --mode sentence --style casual --output notes.txt
autofix edit draft.txt --mode paragraph --style technical
```

Modes are `word`, `sentence`, and `paragraph`.

Styles are `casual`, `formal`, `creative`, and `technical`.

## License

MIT.
