# Shared Package

The shared package provides core utilities and AI provider integrations that power the autofix text completion platform. It serves as the foundation for AI-powered writing assistance across CLI, web, and server components.

## Overview

This package centralizes common functionality used throughout the autofix ecosystem, including AI model integrations, prompt engineering, and data validation schemas. By maintaining shared logic here, we ensure consistency and reduce code duplication across different platform components.

## Components

### AI Providers

- **Google Gemini** (`gemini.ts`) - Integration with Google's Gemini AI models for text generation
- **SambaNova** (`sambanova.ts`) - Alternative AI provider for enhanced reliability and performance

### Core Utilities

- **Prompt Engineering** (`prompts.ts`) - System prompt templates and dynamic prompt building
- **Schema Validation** (`schema.ts`) - TypeScript schemas for request/response validation
- **Schema Tests** (`schema.test.ts`) - Comprehensive test suite for data validation

## Usage

### Basic Text Completion

```typescript
import { generateTextCompletion } from './gemini.js';

const suggestion = await generateTextCompletion(
  'Hello world, this is',
  'sentence',
  'casual'
);
```

### Custom Prompts

```typescript
import { buildSystemPrompt } from './prompts.js';

const prompt = buildSystemPrompt('paragraph', 'technical');
```

## Architecture

The shared package follows these design principles:

- **Provider Abstraction** - Unified interface for multiple AI providers
- **Type Safety** - Comprehensive TypeScript definitions
- **Error Handling** - Graceful fallbacks between providers
- **Performance** - Efficient prompt caching and response processing

## Dependencies

- `@google/genai` - Google Gemini AI SDK
- `zod` - Schema validation
- Custom AI provider SDKs

## Testing

Run the test suite:

```bash
npm test
```

## References

- [Google Gemini AI Documentation](https://ai.google.dev/docs)
- [SambaNova API Reference](https://sambanova.ai/docs)
- [Zod Schema Validation](https://zod.dev/)
