# Developer Guide - Adding Tools

## Quick Start

### 1. Add Tool Definition
Edit `src/Services/MenuItems.ts`:

```typescript
import { FiCode } from 'react-icons/fi'; // Import icon

export const menuItems: Tool[] = [
  {
    label: 'JSON Formatter',
    secondary: 'Format, validate, and beautify JSON',
    route: 'json-formatter',
    Icon: FiCode,
    category: 'Data & API'
  },
  // Add more tools...
];

export const menuCategories: MenuCategory[] = [
  {
    category: 'Data & API',
    description: 'Tools for working with data formats',
    icon: FiCode,
    items: menuItems.filter(t => t.category === 'Data & API')
  },
];
```

### 2. Create Tool Page
Create `src/Pages/JsonFormatter.tsx`:

```typescript
export default function JsonFormatter() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="bg-white rounded-lg shadow p-6">
        {/* Your tool UI here */}
      </div>
    </div>
  );
}
```

### 3. Add Route
Edit `src/App.tsx`:

```typescript
import JsonFormatter from "./Pages/JsonFormatter";

<Route path="/json-formatter" element={<JsonFormatter />} />
```

## Architecture Patterns

### Using useToolHistory
Track user interactions:

```typescript
import { useToolHistory } from '../Hooks/useToolHistory';

const MyTool = () => {
  const { addToHistory, toggleFavorite, isFavorite } = useToolHistory();
  
  useEffect(() => {
    addToHistory('/my-tool');
  }, [addToHistory]);
  
  return <button onClick={() => toggleFavorite('/my-tool')}>Star</button>;
};
```

### Component Structure
```
<div className="max-w-4xl mx-auto px-6 py-8">
  {/* Main content card */}
  <div className="bg-white rounded-lg shadow p-6">
    {/* Tool content */}
  </div>
</div>
```

### Tauri Invocation
```typescript
import { invoke } from '@tauri-apps/api/core';

const result = await invoke('your_command_name', { param: value });
```

## Styling Guidelines

- **Colors**: Use slate, indigo, blue from Tailwind
- **Spacing**: Use p-6, px-6, py-8 patterns
- **Cards**: `bg-white rounded-lg shadow p-6`
- **Buttons**: Use consistent hover states
- **Typography**: h1 for titles, p for body text

## Type Safety

Always type your components:

```typescript
interface MyToolProps {
  value: string;
  onChange: (value: string) => void;
}

const MyTool: React.FC<MyToolProps> = ({ value, onChange }) => {
  // Component
};
```

## Testing

Run build to check TypeScript:
```bash
npm run build
```

Run dev mode:
```bash
npm run tauri:dev
```

## Best Practices

✅ Use `useCallback` for event handlers
✅ Use `useMemo` for expensive calculations
✅ Keep components under 200 lines
✅ Export types from components
✅ Handle errors gracefully
✅ Use localStorage for tool-specific settings
✅ Track tool usage with `useToolHistory`

❌ Don't use any types
❌ Don't create global state (use hooks instead)
❌ Don't fetch on render (use useEffect)
