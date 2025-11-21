# Client Application

The client application delivers a modern, responsive web-based text editor that provides intelligent writing assistance through AI-powered text completion. It serves as the primary user interface for the autofix platform.

## Overview

This React-based application offers a seamless writing experience with real-time AI suggestions, customizable settings, and an intuitive interface. The client communicates with the autofix server to provide context-aware text completion across different writing styles and modes.

## Features

### Core Functionality

- **Real-time Completion** - Instant AI-powered text suggestions as you type
- **Multi-Provider Support** - Choose between Gemini and SambaNova AI models
- **Style Customization** - Casual, formal, creative, and technical writing modes
- **Mode Selection** - Word, sentence, and paragraph completion levels

### User Experience

- **Keyboard Shortcuts** - Efficient navigation and editing commands
- **Settings Panel** - Comprehensive configuration options
- **Responsive Design** - Works seamlessly across desktop and mobile devices
- **Theme Support** - Light and dark mode compatibility

### Advanced Features

- **Session Persistence** - Maintains writing context across sessions
- **Error Handling** - Graceful degradation when AI services are unavailable
- **Performance Optimized** - Efficient rendering and minimal latency

## Development

### Local Development

```bash
cd apps/client
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
```

## Architecture

### Component Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Route-based page components
├── hooks/         # Custom React hooks
└── lib/           # Utility functions and configurations
```

### State Management

- React Query for server state
- Local component state for UI
- Context providers for global settings

## Technologies

### Core Framework

- **React 18** - Modern React with concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server

### UI & Styling

- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Framer Motion** - Smooth animations and transitions

### Data & Networking

- **React Query** - Powerful data synchronization
- **WebSocket** - Real-time communication
- **REST API** - Standard HTTP communication

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## References

- [React Documentation](https://react.dev/)
- [Vite Build Tool](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI Components](https://www.radix-ui.com/)
