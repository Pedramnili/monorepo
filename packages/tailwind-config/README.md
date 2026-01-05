# @repo/tailwind-config

Shared Tailwind CSS v4 configuration and global styles for the monorepo.

## Overview

This package provides centralized Tailwind CSS v4 configuration using the new CSS-first architecture. No JavaScript configuration file needed - everything is done through CSS
imports and directives.

## Package Structure

```
packages/tailwind-config/
├── shared-styles.css    # Global CSS with Tailwind v4 imports
├── postcss.config.js    # PostCSS configuration
├── package.json
└── README.md
```

## What's New in Tailwind v4

This package uses **Tailwind CSS v4**, which introduces:

- Native CSS imports (`@import "tailwindcss"`)
- Unified PostCSS plugin (`@tailwindcss/postcss`)
- CSS-first configuration with `@theme` directive
- Custom variants with `@custom-variant`
- **No separate tailwind.config.ts needed**

## Installation

This is an internal workspace package. Reference it in your package.json:

```json
{
  "devDependencies": {
    "@repo/tailwind-config": "workspace:*",
    "tailwindcss": "^4.1.17",
    "postcss": "^8.5.6"
  }
}
```

## Usage

### 1. Use PostCSS Configuration

Link to the shared PostCSS configuration in your `postcss.config.js`:

```javascript
export { postcssConfig as default } from '@repo/tailwind-config/postcss';
```

Or extend it:

```javascript
import { postcssConfig } from '@repo/tailwind-config/postcss';

export default {
  plugins: {
    ...postcssConfig.plugins,
    // Add your custom plugins here
  },
};
```

### 2. Import Global Styles

Import the shared styles in your app's entry point:

**For Next.js (app/globals.css):**

```css
@import "@repo/tailwind-config";
```

**For Vite/React (src/index.css):**

```css
@import "@repo/tailwind-config";
```

That's it! No tailwind.config.ts required.

## What's Included

### Global Styles (shared-styles.css)

```css
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));

@layer utilities {
    input[type="number"]::-webkit-inner-spin-button,
    input[type="number"]::-webkit-outer-spin-button {
        @apply appearance-none;
    }
}
```

**Features:**

- Single `@import "tailwindcss"` imports all Tailwind features
- Custom dark mode variant using CSS selector syntax
- Utility for hiding number input spin buttons

### PostCSS Configuration

Pre-configured with Tailwind v4's unified plugin:

```javascript
export const postcssConfig = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

## Theme Customization

### Extend Theme in Your App

Create a CSS file in your app and import the shared config:

**app/globals.css:**

```css
@import "@repo/tailwind-config";

@theme {
--color-brand-primary: #0070f3;
--color-brand-secondary: #7928ca;

--font-size-huge: 4rem;
--spacing-18: 4.5rem;

--breakpoint-3xl: 1920px;
}
```

### Example Custom Theme

```css
@import "@repo/tailwind-config";

@theme {
/* Custom Colors */
--color-blue-1000: #892AF6;
--color-purple-1000: #a853ba;
--color-red-1000: #e92a67;
```

/* Custom Spacing */
--spacing-88: 22rem;

/* Custom Fonts */
--font-sans: "Inter", system-ui, sans-serif;
--font-mono: "Fira Code", monospace;
}

## Configuration Examples

### Next.js Application

**app/globals.css:**

```css
@import "@repo/tailwind-config";

@theme {
--color-brand: #0070f3;
}

/* Custom components */
@layer components {
  .btn-primary {
  @apply px-4 py-2 bg-blue-500 text-white rounded-lg;
  }
}
```

**app/layout.tsx:**

```typescript
import './globals.css';

export default function RootLayout({children,}: {children: React.ReactNode;}) {
  return (
    <html lang="en">
     <body>{children}</body>
    </html>
  );
}
```

**postcss.config.js:**

```javascript
export { postcssConfig as default } from '@repo/tailwind-config/postcss';
```

### Vite/React Application

**src/index.css:**

```css
@import "@repo/tailwind-config";

@theme {
--color-primary: #0ea5e9;
}
```

**src/main.tsx:**

```typescript
import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

createRoot(document.getElementById('root')!).render(
<StrictMode>
<App />
</StrictMode>
);
```

**postcss.config.js:**

```javascript
export { postcssConfig as default } from '@repo/tailwind-config/postcss';
```

## Custom Variants

### Dark Mode (Included)

The package includes a custom dark mode variant:

```css
@custom-variant dark (&:where(.dark, .dark *));
```

Usage in your components:

```typescript
<div className="bg-white dark:bg-gray-900">
  <h1 className="text-gray-900 dark:text-white">Hello</h1>
</div>
```

Toggle dark mode:

```typescript
// Add/remove dark class on html element
document.documentElement.classList.toggle('dark');
```

### Adding More Custom Variants

In your app's CSS file:

```css
@import "@repo/tailwind-config";

@custom-variant light (&:where(.light, .light *));
@custom-variant hocus (&:is(:hover, :focus));
@custom-variant group-hocus (:merge(.group):is(:hover, :focus) &);
```

## Advanced Features

### Custom Utilities (Included)

The package includes a utility for hiding number input spin buttons:

```css
@layer utilities {
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    @apply appearance-none;
  }
}
```

Usage:

```typescript
<input type="number" className="..." />
// Spin buttons are automatically hidden
```

### Adding Custom Utilities

In your app's CSS file:

```css
@import "@repo/tailwind-config";

@layer utilities {
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }

  .text-balance {
    text-wrap: balance;
  }
}
```

### Adding Custom Components

```css
@import "@repo/tailwind-config";

@layer components {
  .btn {
    @apply px-4 py-2 rounded-lg font-medium transition-colors;
  }

  .btn-primary {
    @apply bg-blue-500 text-white hover:bg-blue-600;
  }

  .btn-secondary {
    @apply bg-gray-200 text-gray-900 hover:bg-gray-300;
  }

  .card {
    @apply bg-white rounded-xl shadow-lg p-6 dark:bg-gray-800;
  }
}
```

## Migration from Tailwind v3

**Old (v3) - Required tailwind.config.js:**

```javascript
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#0070f3',
      },
     },
  },
};
```

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**New (v4) - No config file needed:**

```css
@import "tailwindcss";

@theme {
  --color-brand: #0070f3;
}
```

## Best Practices

1. **No Config File**: Don't create tailwind.config.ts - use CSS for configuration
2. **Single Import**: Use `@import "tailwindcss"` instead of multiple imports
3. **CSS-First**: Define theme customizations using `@theme` in CSS
4. **Custom Variants**: Use `@custom-variant` for reusable state combinations
5. **Layer Organization**: Use `@layer` to organize custom styles
6. **Import Order**: Import @repo/tailwind-config before app-specific styles

## Content Scanning

Tailwind v4 automatically scans your source files. Ensure your project structure is clear:

```
your-app/
├── src/
│ ├── components/ # Components here
│ ├── app/ # Pages here
│ └── index.css # Import @repo/tailwind-config here
└── postcss.config.js # Import shared config here
```

## Troubleshooting

### Styles Not Applying

1. Verify PostCSS config is properly imported
2. Check that your CSS file imports @repo/tailwind-config
3. Ensure @import statements are at the top of your CSS file
4. Clear build cache: `rm -rf .next` or `rm -rf dist`

### PostCSS Plugin Error

If you see `@tailwindcss/postcss` errors:

```bash

# Ensure correct versions

npm install tailwindcss@^4.1.17 postcss@^8.5.6
```

### Dark Mode Not Working

1. Add the `dark` class to your root element:

```typescript
<html className="dark">
  <body>{children}</body>
</html>
```

2. Or toggle programmatically:

typescript
document.documentElement.classList.toggle('dark');

### Custom Theme Not Applied

1. Ensure `@theme` is defined **after** `@import "tailwindcss"`
2. Use correct CSS variable naming: `--color-brand-500` not `--brand-500`
3. Restart dev server after CSS changes
4. Check for syntax errors in @theme block

### Import Not Working

If `@import "@repo/tailwind-config"` doesn't work:

```css
/* Use explicit path */
@import "@repo/tailwind-config/shared-styles.css";
```

## TypeScript Support

Ensure proper types (even without config file):

```json
{
  "devDependencies": {
    "tailwindcss": "^4.1.17",
    "@types/node": "^20.0.0",
    "typescript": "^5.0.0"
  }
}
```

## Related Packages

- **@repo/ui** - Shared component library using Tailwind
- **@repo/typescript-config** - TypeScript configurations
- **@repo/eslint-config** - Linting configurations

## Requirements

- **Tailwind CSS**: >= 4.1.0
- **PostCSS**: >= 8.5.0
- **Node.js**: >= 18.0.0

## Resources

- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [Tailwind v4 Migration Guide](https://tailwindcss.com/docs/upgrade-guide)
- [PostCSS Documentation](https://postcss.org/)
- [Turborepo Documentation](https://turbo.build/repo/docs)

## Contributing

When updating this package:

1. Test changes across all apps using it
2. Maintain CSS-first approach (no config files)
3. Update this README with any changes
4. Document breaking changes in CHANGELOG

## License

MIT