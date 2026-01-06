# @repo/eslint-config

A shared ESLint configuration for the monorepo, providing consistent linting rules across all packages and applications.

## Features

- ESLint v9+ with flat config format
- TypeScript support with typescript-eslint
- React and React Hooks linting
- Next.js specific rules
- Prettier integration
- Turbo monorepo-specific rules
- All errors converted to warnings for better DX

## Installation

This package is intended for use within the monorepo workspace.

```bash
# In your package.json
{
  "devDependencies": {
    "@repo/eslint-config": "workspace:*",
    "eslint": "^9.39.1"
  }
}
```

## Available Configurations

### Base Config

For general TypeScript/JavaScript projects.

```javascript
// eslint.config.js
import { config } from "@repo/eslint-config/base";

export default [...config];
```

**Includes:**
- ESLint recommended rules
- TypeScript ESLint recommended rules
- Prettier compatibility
- Turbo environment variable checks
- All errors as warnings

### React Internal Config

For internal React libraries and packages (non-Next.js).

```javascript
// eslint.config.js
import { config } from "@repo/eslint-config/react-internal";

export default [...config];
```

**Includes:**
- All base config rules
- React recommended rules
- React Hooks rules
- Browser and Service Worker globals
- Automatic React version detection
- No need for `React` import in JSX files

### Next.js Config

For Next.js applications.

```javascript
// eslint.config.js
import { nextJsConfig } from "@repo/eslint-config/next-js";

export default [...nextJsConfig];
```

**Includes:**
- All base config rules
- React and React Hooks rules
- Next.js recommended rules
- Core Web Vitals rules
- Service Worker globals
- Automatic Next.js build output ignores

## Usage Examples

### Basic TypeScript Package

```javascript
// packages/utils/eslint.config.js
import { config } from "@repo/eslint-config/base";

export default [
  ...config,
  {
    // Add package-specific rules
    rules: {
      "no-console": "warn",
    },
  },
];
```

### React Component Library

```javascript
// packages/ui/eslint.config.js
import { config } from "@repo/eslint-config/react-internal";

export default [
  ...config,
  {
    // Custom rules for your UI library
    rules: {
      "react/prop-types": "off", // Using TypeScript
    },
  },
];
```

### Next.js Application

```javascript
// apps/web/eslint.config.js
import { nextJsConfig } from "@repo/eslint-config/next-js";

export default [
  ...nextJsConfig,
  {
    // App-specific overrides
    rules: {
      "@next/next/no-html-link-for-pages": "off",
    },
  },
];
```

## Ignoring Files

Each configuration automatically ignores common build outputs:

- `dist/**` (all configs)
- `.next/**` (Next.js config)
- `out/**` (Next.js config)
- `build/**` (Next.js config)

To add custom ignores:

```javascript
import { config } from "@repo/eslint-config/base";

export default [
  ...config,
  {
    ignores: ["coverage/**", "*.config.js"],
  },
];
```

## Rules Overview

### Turbo Rules

- `turbo/no-undeclared-env-vars`: Warns about undeclared environment variables in Turborepo

### React Rules

- React version auto-detection
- React Hooks rules enforced
- No need for React imports in JSX (new JSX transform)

### Next.js Rules

- Next.js recommended best practices
- Core Web Vitals optimization rules
- Proper image optimization warnings
- Link component usage enforcement

## Customization

You can extend or override any rules in your local config:

```javascript
import { config } from "@repo/eslint-config/base";

export default [
  ...config,
  {
    rules: {
      // Override specific rules
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      "no-console": "error",
    },
  },
  {
    // File-specific rules
    files: ["**/*.test.ts"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
];
```

## Dependencies

- **eslint**: ^9.39.1 - Core linting engine
- **typescript-eslint**: ^8.48.1 - TypeScript support
- **eslint-plugin-react**: ^7.37.5 - React rules
- **eslint-plugin-react-hooks**: ^7.0.1 - React Hooks rules
- **@next/eslint-plugin-next**: ^16.0.7 - Next.js rules
- **eslint-plugin-turbo**: ^2.6.3 - Turborepo rules
- **eslint-config-prettier**: ^10.1.8 - Prettier compatibility
- **eslint-plugin-only-warn**: ^1.1.0 - Convert errors to warnings

## Scripts

Add these scripts to your package.json:

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

## Migration from ESLint v8

This config uses ESLint v9's flat config format. If migrating from v8:

1. Remove `.eslintrc.js` or `.eslintrc.json`
2. Create `eslint.config.js`
3. Import the appropriate config
4. Update your ESLint version to ^9.39.1

## TypeScript

This package is fully compatible with TypeScript projects and includes all necessary TypeScript ESLint rules.

## License

Private package for internal monorepo use.