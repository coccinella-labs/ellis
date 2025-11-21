# Autofix API Reference

This document describes the REST API endpoints provided by the Autofix server.

## Endpoints

### POST /api/complete

Generates AI-powered text completion based on the provided input.

**Request Body:**

```json
{
  "text": "string", // The text to complete (required)
  "mode": "word" | "sentence" | "paragraph", // Completion mode (default: "sentence")
  "style": "casual" | "formal" | "creative" | "technical", // Writing style (default: "casual")
  "provider": "auto" | "gemini" | "sambanova", // AI provider selection (default: "auto")
  "geminiModel": "string", // Specific Gemini model (default: "gemini-3-pro-preview")
  "geminiApiKey": "string", // Custom Gemini API key (optional)
  "sambaNovaApiKey": "string" // Custom SambaNova API key (optional)
}
```

**Response:**

```json
{
  "suggestion": "string" // The generated completion text
}
```

**Status Codes:**

- 200: Success
- 400: Bad Request
- 500: Internal Server Error

### GET /api/status

Returns the status of the server and available AI providers.

**Response:**

```json
{
  "status": "ok",
  "providers": {
    "gemini": boolean, // Whether Gemini is available
    "sambanova": boolean // Whether SambaNova is available
  }
}
```

**Status Codes:**

- 200: Success
- 500: Internal Server Error

## Authentication

API requests require valid AI provider API keys to be configured on the server.

## Error Handling

The API returns standard HTTP status codes. Error responses may include a JSON body with error details.

## Rate Limiting

Requests are subject to the rate limits of the underlying AI providers:

- Gemini: 200 requests/day free tier (varies by model)
- SambaNova: Varies by plan

The system automatically falls back to alternative providers or models when rate limits are hit.
