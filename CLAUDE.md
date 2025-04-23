# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands
- `npm run build` - Compile TypeScript code
- `npm run start` - Run the compiled server
- `npm run dev` - Watch for changes and recompile

## Code Style Guidelines

### TypeScript
- Use ES modules (`import`/`export`)
- Strict TypeScript mode enabled
- Target: ES2020, Module: NodeNext

### Formatting
- Use 2-space indentation
- Use semicolons at the end of statements
- Use double quotes for strings

### Error Handling
- Use try/catch blocks for async operations
- Log errors to stderr (console.error)
- Include descriptive error messages

### Naming Conventions
- Use camelCase for variables and functions
- Use PascalCase for classes and interfaces
- Use descriptive names in English (code) with Japanese allowed in comments and user-facing text

### Imports
- Use explicit imports from specific files
- Group imports: external libraries first, then internal modules