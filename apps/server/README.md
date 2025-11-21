# Server Application

The server application provides a robust Node.js backend that powers the AI-driven text completion capabilities of the autofix platform. It serves as the central processing hub connecting client applications with AI providers.

## Overview

Built with Express.js and TypeScript, this server handles API requests for text completion, manages user sessions, implements security measures, and orchestrates communication between multiple AI providers. The server ensures high availability, performance, and security for the entire platform.

## Features

### API Services

- **Text Completion API** - RESTful endpoints for AI-powered text generation
- **Real-time WebSocket** - Live updates and streaming responses
- **Health Monitoring** - System status and performance metrics

### Security & Performance

- **Rate Limiting** - Prevents abuse and ensures fair usage
- **Session Management** - Secure user session handling
- **Request Validation** - Comprehensive input sanitization
- **Error Handling** - Graceful failure management

### Data Management

- **File Storage** - Persistent storage for user data
- **Caching Layer** - Optimized response times
- **Database Integration** - User preferences and history

## Development

### Local Development

```bash
npm run dev
```

Starts the development server with hot reloading.

### Production Build

```bash
npm run build
npm start
```

## API Reference

### Text Completion

**POST** `/api/complete`

Generate AI-powered text completions.

**Request Body:**

```json
{
  "text": "Hello world, this is",
  "mode": "sentence",
  "style": "casual",
  "provider": "auto"
}
```

**Response:**

```json
{
  "completion": " a great day to start coding!",
  "provider": "gemini",
  "confidence": 0.95
}
```

### Server Status

**GET** `/api/status`

Check server health and configuration.

**Response:**

```json
{
  "status": "healthy",
  "version": "1.0.0",
  "providers": ["gemini", "sambanova"]
}
```

## Architecture

### Request Flow

1. **Validation** - Input sanitization and schema validation
2. **Rate Limiting** - Check request frequency limits
3. **Authentication** - Session validation (if required)
4. **AI Processing** - Route to appropriate AI provider
5. **Response** - Format and return completion

### Provider Management

- **Auto Selection** - Intelligent provider routing based on availability
- **Fallback System** - Automatic failover between providers
- **Load Balancing** - Distribute requests across provider instances

## Technologies

### Runtime & Framework

- **Node.js 22** - JavaScript runtime environment
- **Express.js** - Web application framework
- **TypeScript** - Type-safe development

### Security & Middleware

- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **express-rate-limit** - Request rate limiting
- **express-session** - Session management

### Data & Storage

- **PostgreSQL** - Primary database (via Drizzle ORM)
- **Redis** - Caching and session storage
- **File System** - Local file storage

### Real-time Communication

- **WebSocket** - Bidirectional communication
- **Socket.io** - WebSocket framework

## Configuration

### Environment Variables

```bash
# AI Providers
GEMINI_API_KEY=your_gemini_key
SAMBA_NOVA_API_KEY=your_samba_key

# Database
DATABASE_URL=postgresql://...

# Security
SESSION_SECRET=your_secret_key
CORS_ORIGIN=https://yourdomain.com

# Performance
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX_REQUESTS=100
```

## Monitoring

### Health Checks

- Automatic health monitoring
- Provider availability testing
- Performance metrics collection

### Logging

- Structured logging with request IDs
- Error tracking and alerting
- Performance monitoring

## Deployment

### Docker

A Dockerfile is provided in the project root for containerizing the server. Pre-built images are available on Docker Hub and GitHub Container Registry.

#### Pull from Docker Hub

```bash
docker pull harpertoken/autofix-server
```

#### Pull from GHCR

```bash
docker pull ghcr.io/harpertoken/autofix-server
```

#### Build and Run Locally

```bash
docker build -t autofix-server .
docker run -p 3001:3001 \
  -e GEMINI_API_KEY=your_api_key \
  -e SAMBANOVA_API_KEY=your_samba_key \
  -v autofix-data:/app/data \
  autofix-server
```

#### Environment Variables

- `GEMINI_API_KEY`: Required for Google Gemini AI
- `SAMBANOVA_API_KEY`: Optional fallback AI provider
- `DATABASE_URL`: PostgreSQL connection string (if using database)
- `SESSION_SECRET`: Secret for session management

#### Volumes

- `/app/data`: Persistent storage for user files and sessions

#### Ports

- `3001`: HTTP server port

### Environment Setup

```bash
# Install dependencies
npm ci

# Build application
npm run build

# Start production server
npm start
```

## References

- [Express.js Documentation](https://expressjs.com/)
- [Node.js Best Practices](https://nodejs.org/en/docs/guides/)
- [WebSocket Protocol](https://tools.ietf.org/html/rfc6455)
- [REST API Design](https://restfulapi.net/)
