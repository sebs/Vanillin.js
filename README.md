# Vanillin.js

Vanillin.js is an open-source toolchain designed for the development of web components using vanilla JavaScript. It simplifies the process by eliminating the need for bundlers and frameworks, focusing instead on modern CSS and web standards.

## Features

* **Zero-Config Setup** - Get started quickly with sensible defaults
* **TypeScript First** - Full TypeScript support with type-safe components
* **Virtual Filesystem** - Test components with an in-memory filesystem
* **Modern Testing** - Testing utilities with JSDOM integration
* **Standards Compliant** - Built on web standards and modern JavaScript
* **Developer Experience** - Hot reload, error handling, and debugging tools

## Quick Start

```bash
# Install the CLI globally
npm install -g @vanillin/cli

vanillin build
```

## Component Development

Create a new component with TypeScript:

```typescript
class MyCircle extends HTMLElement {
    private _size: number = 50;
    private _color: string = 'red';

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    static get observedAttributes() {
        return ['size', 'color'];
    }

    // ... see documentation for full example
}

customElements.define('my-circle', MyCircle);
```

## Testing

Vanillin provides powerful testing utilities:

```typescript
import { TestHelper } from 'vanillin';

describe('MyComponent', () => {
    let context;

    beforeEach(async () => {
        const helper = new TestHelper();
        context = await helper.mountAsScript('my-component', componentCode);
    });

    it('should render correctly', () => {
        const component = context.querySelector('my-component');
        assert.ok(component);
    });
});
```

## CLI Commands

### Component Commands
```bash
# Create a new component
vanillin create <name>

# Build components
vanillin build [options] <files...>

# Start development server
vanillin serve [options]
```

### Compiler Options
```bash
# Compile TypeScript files
vanillin compile [options] <files...>

Options:
  -p, --project <path>  Path to tsconfig.json
  -o, --outDir <path>   Output directory
  -w, --watch          Watch mode
  --sourceMaps        Generate source maps
```

## Development

### Setup Development Environment

```bash
# Clone the repository
git clone https://github.com/yourusername/Vanillin.js.git

# Install dependencies
make bootstrap

# Run tests
make test

# Clean build artifacts
make clean
```

### Project Structure

- `packages/vanillin`: Core library with compiler and testing utilities
- `packages/vanillin-cli`: Command-line interface
- `packages/component-my-circle`: Example component implementation

### Development Workflow

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

