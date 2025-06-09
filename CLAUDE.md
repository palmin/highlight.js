# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

### Building
```bash
# Build for Node.js (includes all languages)
npm run build

# Build for browser with common languages only
npm run build-browser

# Build for CDN distribution
npm run build-cdn

# Build specific languages for debugging (no compression)
node tools/build.js -n python ruby

# Build with specific target
node tools/build.js -t browser :common
```

### Testing
```bash
# Run all tests
npm test

# Run specific test suites
npm run test-markup    # Syntax highlighting tests
npm run test-detect    # Language auto-detection tests
npm run test-browser   # Browser-specific tests
npm run test-parser    # Parser tests

# Build and test in one command
npm run build_and_test
npm run build_and_test_browser
```

### Linting
```bash
# Lint source files
npm run lint

# Lint language definitions specifically
npm run lint-languages
```

## Architecture Overview

### Core Structure
The highlight.js library is a syntax highlighter that works both in browsers and Node.js. The architecture separates concerns into:

1. **Core Engine** (`src/highlight.js`): Main highlighting logic, mode compilation, and API
2. **Language Definitions** (`src/languages/*.js`): Individual language grammars as ES6 modules
3. **Built-in Modes** (`src/lib/modes.js`): Reusable patterns like strings, comments, numbers
4. **Compiler Extensions** (`src/lib/compiler_extensions.js`): Extensions for the mode compiler
5. **HTML Renderer** (`src/lib/html_renderer.js`): Converts tokens to HTML output

### Language Definition Pattern
Languages are defined as functions returning configuration objects:
- **keywords**: Language-specific keywords (can be strings, arrays, or categorized objects)
- **contains**: Array of modes (patterns) that can appear in the code
- **modes**: Reusable patterns with scope, begin/end regex, and sub-modes
- **relevance**: Scoring for auto-detection accuracy

### Build System
The build tool (`tools/build.js`) handles:
- Target environments: `node`, `browser`, `cdn`
- Language selection (all, common subset, or specific languages)
- Minification and optimization
- Dependency resolution for language definitions

### Testing Infrastructure
- **Markup tests**: Compare highlighted output against expected results
- **Detection tests**: Verify language auto-detection accuracy
- **Visual testing**: Developer tool at `tools/developer.html` for interactive testing

## Key Development Patterns

### Adding/Modifying Languages
New languages are developed as separate 3rd-party repositories, not merged into core. Language definitions use:
- Pre-defined modes from `hljs.*_MODE` constants
- Regular expressions for pattern matching
- Nested modes with `contains` arrays
- Scope names matching CSS classes for styling

### Mode Compilation
The mode compiler transforms language definitions into optimized matcher functions:
- Merges and compiles regex patterns
- Handles mode inheritance and references
- Optimizes for performance with caching

### Plugin System
Highlight.js embraces plugins over core features. Plugins can:
- Hook into parsing events
- Extend language definitions
- Add new rendering capabilities
- Implement features like line numbers externally