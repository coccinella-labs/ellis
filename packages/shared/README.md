# Shared Package

This package contains shared utilities and AI provider integrations used across the autofix platform.

## Files

- `gemini.ts` - Google Gemini AI provider integration
- `sambanova.ts` - SambaNova AI provider integration
- `prompts.ts` - System prompts and prompt building utilities
- `schema.ts` - TypeScript schemas and validation
- `schema.test.ts` - Tests for schema validation

## Usage

```typescript
import { generateTextCompletion } from './gemini.js';
import { buildSystemPrompt } from './prompts.js';
```
