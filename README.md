# Autofix

Autofix is a text completion tool.

It can be used as a command line program, as a web editor, or through a
small HTTP API.

Gemini is the main provider.  SambaNova may be used as a fallback.


## Installation

Install the command line program with npm:

```sh
npm install -g @harpertoken/autofix-cli
```


## Use

Run Autofix with some text:

```sh
autofix "The future of AI is"
```

The server exposes `POST /api/complete` for suggestions and
`GET /api/status` for provider status.


## Development

To run the project from source:

```sh
git clone https://github.com/harpertoken/autofix.git
cd autofix
npm install
npm run prepare
npm run dev
```

Then open `http://localhost:3000`.

Set provider keys before asking for completions:

```sh
export GEMINI_API_KEY=your_gemini_key
export SAMBANOVA_API_KEY=your_sambanova_key
```


## Documentation

The API is described in [api.md](api.md).

More notes are in [apps/cli](apps/cli/README.md),
[apps/client](apps/client/README.md), [apps/server](apps/server/README.md),
and [packages/shared](packages/shared/README.md).


## Copying

Autofix is released under the MIT license.  See [LICENSE](LICENSE).
