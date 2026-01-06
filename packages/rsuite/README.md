# @repo/rsuite

A shared UI component library for the monorepo, built on top of RSuite with custom theming support.

## Features

- Built on RSuite component library
- Custom color themes (red, orange, yellow, green, blue, violet)
- Dark mode support
- TypeScript support
- SCSS-based styling with CSS variables

## Installation

This package is intended for use within the monorepo workspace.

```bash
# In your package.json
{
  "dependencies": {
    "@repo/ui": "workspace:*"
  }
}
```

## Usage

### Basic Import

```typescript
import { Button } from "@repo/ui";
import "rsuite/dist/rsuite.min.css"; // Required for RSuite base styles

function App() {
  return (
    <Button appearance="primary" color="violet">
      Click Me
    </Button>
  );
}
```

### Available Components

#### Button

A wrapper around RSuite's Button component with enhanced theming.

```typescript
import { Button } from "@repo/ui";

<Button appearance="primary" color="red">Primary Red</Button>
<Button appearance="ghost" color="blue">Ghost Blue</Button>
<Button appearance="subtle" color="green">Subtle Green</Button>
<Button appearance="link" color="orange">Link Orange</Button>
```

### Supported Colors

The Button component supports the following custom colors:

- `red` - Red theme variants
- `orange` - Orange theme variants
- `yellow` - Yellow theme variants
- `green` - Green theme variants
- `blue` - Blue theme variants
- `violet` - Violet theme variants

### Dark Mode

The component library automatically supports dark mode through RSuite's theme system:

```typescript
import { CustomProvider } from "@repo/ui";

<CustomProvider theme="dark">
  <Button color="violet">Dark Mode Button</Button>
</CustomProvider>
```

## Component Props

All components extend their respective RSuite component props. For example, the Button component accepts all standard RSuite ButtonProps:

```typescript
interface RSButtonProps extends ButtonProps {
  children?: ReactNode;
  appearance?: "default" | "primary" | "link" | "subtle" | "ghost";
  color?: "red" | "orange" | "yellow" | "green" | "blue" | "violet";
  size?: "lg" | "md" | "sm" | "xs";
  disabled?: boolean;
  loading?: boolean;
  // ... and all other RSuite Button props
}
```

## Development

### Adding New Components

1. Create a new component folder under `src/components/`
2. Add the component file with `.component.tsx` extension
3. Add corresponding `.scss` file for custom styling
4. Export the component from `src/index.tsx`

Example structure:
```
src/
├── components/
│   ├── Button/
│   │   ├── Button.component.tsx
│   │   └── Button.scss
│   └── NewComponent/
│       ├── NewComponent.component.tsx
│       └── NewComponent.scss
└── index.tsx
```

### Custom Styling

Components use CSS variables for theming. To customize a component's appearance:

```scss
button.rs-btn.rs-btn-custom.my_rsuite {
  --rs-btn-primary-bg: var(--rs-custom-300);
  --rs-btn-primary-hover-bg: var(--rs-custom-200);
  --rs-btn-primary-text: var(--rs-gray-900);
}
```

## Dependencies

- **rsuite**: ^5.x.x - Base component library
- **react**: ^18.x.x - Peer dependency
- **react-dom**: ^18.x.x - Peer dependency

## TypeScript

This package is fully typed with TypeScript. All component props are properly typed and extend RSuite's original types.

## License

Private package for internal monorepo use.