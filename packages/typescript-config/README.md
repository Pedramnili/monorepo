
# @repo/typescript-config

Shared TypeScript configuration for the monorepo.

## Usage

This package provides TypeScript configurations that can be extended across all packages in the monorepo.

### Installation

This package is internal to the monorepo and doesn't need separate installation. It's referenced via workspace protocol.

### Extending the Config

In your package's `tsconfig.json`, extend from one of the available configurations:

#### For React Applications

```json
{
  "extends": "@repo/typescript-config/react-library.json",
  "compilerOptions": {
    "baseUrl": "src"
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist", "build"]
}
```
#### For Next.js Applications
```json
{
  "extends": "@repo/typescript-config/nextjs.json",
  "compilerOptions": {
    "baseUrl": "."
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```
#### For Node.js Packages
```json
{
  "extends": "@repo/typescript-config/node.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```
#### For Library Packages
```json
{
  "extends": "@repo/typescript-config/library.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist", "**/*.test.ts"]
}
```
## Available Configurations

### `base.json`
Base configuration with common settings shared across all configs.

### `react-library.json`
For React component libraries and applications:
- JSX support with `react-jsx` transform
- DOM type definitions
- Bundler module resolution

## Package Structure
```json
packages/typescript-config/
├── base.json
├── react-library.json
├── package.json
└── README.md
```
## Configuration Philosophy

All configurations follow these principles:

- **Strict Type Checking**: `strict: true` enabled by default
- **Modern JavaScript**: Target ESNext for maximum flexibility
- **Developer Experience**: Helpful error messages and IDE support
- **Performance**: Skip lib checks and enable incremental builds where appropriate

## Customizing Options

You can override any option in your local `tsconfig.json`:

```json
{
  "extends": "@repo/typescript-config/react-library.json",
  "compilerOptions": {
    "target": "ES2020",
    "noImplicitAny": false,
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```
## Example: Web App Configuration

```json
{
  "extends": "@repo/typescript-config/react-library.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/components/*": ["src/components/*"],
      "@/lib/*": ["src/lib/*"],
      "@/hooks/*": ["src/hooks/*"]
    }
  },
  "include": ["src", "vite.config.ts"],
  "exclude": ["node_modules", "dist"]
}
```
## Example: Shared UI Library

```json
{
  "extends": "@repo/typescript-config/base.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src",
    "declarationDir": "dist/types"
  },
  "include": ["src"],
  "exclude": ["src/**/*.stories.tsx", "src/**/*.test.tsx"]
}
```
## Contributing

When updating configurations:

1. Test changes across all packages that use them
2. Update this README with any new configurations
3. Ensure backward compatibility or communicate breaking changes

## Related Packages

- `@repo/eslint-config` - ESLint configurations for the monorepo
- `@repo/tsup-config` - Build configurations using tsup

## Requirements

- TypeScript >= 5.0
- Node.js >= 18
