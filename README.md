# Tauri Boilerplate

<p align="center">
  <img src="./public/tauri-boilerplate.png" width="200" alt="tauri-boilerplate logo" />
</p>

A modern, production-ready desktop application template built with **Tauri 2 + React 19 + TypeScript + Tailwind CSS 4**.

Perfect for building cross-platform developer tools and utilities with native performance and modern web technologies.

## ✨ Key Features

- 🚀 **Native Performance** - Lightweight (~few MB) desktop app with instant startup via Tauri
- 🎨 **Modern UI** - Clean, responsive interface with Tailwind CSS 4 and custom window chrome
- ⌨️ **Global Shortcuts** - `Ctrl+Shift+Space` to toggle window, `Ctrl+K` for global search
- 🔍 **Global Search** - Spotlight/Raycast-style modal for quick tool discovery
- 📌 **System Tray** - Minimize to tray with menu support
- 🔒 **Privacy-First** - All tools work offline, no external data collection
- 🌍 **Cross-Platform** - Builds for Windows, macOS, and Linux
- 🔧 **Easy to Extend** - Well-structured, maintainable codebase

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19 + React Router 7 |
| **Language** | TypeScript (strict mode) |
| **Styling** | Tailwind CSS 4 |Tauri Boilerplate
| **Build** | Vite 7 |
| **Desktop** | Tauri 2 (Rust backend) |
| **Icons** | React Icons |
| **State** | React Hooks + localStorage |

## 📋 Prerequisites

- Node.js 18+
- Rust (for Tauri backend)
- npm or yarn package manager

## 🚀 Quick Start

### 1. Clone & Install
```bash
git clone https://github.com/Abdul-dewaswala/tauri-boilerplate
cd tauri-boilerplate
npm install
```

### 2. Development Mode
```bash
npm run tauri dev
```
Opens app with hot reload for development

### 3. Build for Production
```bash
npm run build     # Build web assets
npm run tauri build  # Build desktop app
```

## 📂 Project Structure

```
tauri-boilerplate/
├── src/
│   ├── Components/           # Reusable UI components
│   │   ├── AppHeader.tsx     # Top navigation bar with app info
│   │   ├── Sidebar.tsx       # Left sidebar with tool categories
│   │   ├── SearchModal.tsx   # Global search modal (Ctrl+K)
│   │   ├── SectionHeader.tsx # Page section headers
│   │   ├── Card.tsx          # Reusable card component
│   │   └── Input.tsx         # Form input component
│   ├── Pages/                # Full page components
│   │   ├── Home.tsx          # Home page (favorites + categories)
│   │   └── Settings.tsx      # App settings page
│   ├── Services/
│   │   └── MenuItems.ts      # Tool definitions & configurations
│   ├── Hooks/                # Custom React hooks
│   │   ├── useSearch.ts      # Search functionality
│   │   ├── useToolHistory.ts # Favorites & history tracking
│   │   ├── useGlobalShortcut.ts # Global keyboard shortcuts
│   │   └── useAppDate.ts     # App metadata
│   ├── Layouts/
│   │   └── MainLayout.tsx    # App shell/layout wrapper
│   ├── types/
│   │   └── index.ts          # TypeScript interfaces
│   ├── constant.ts           # App configuration & constants
│   └── App.tsx               # Root component with routes
├── src-tauri/                # Rust backend
│   ├── src/
│   │   ├── lib.rs            # Tauri setup & tray management
│   │   └── main.rs           # Tauri entry point
│   └── Cargo.toml            # Rust dependencies
├── DEVELOPER_GUIDE.md        # Guide for adding new tools
└── README.md                 # This file
```

## 🎯 Pre-Available Functions & Hooks

### Custom React Hooks

#### `useSearch(tools)`
Provides fuzzy search functionality for tools with scoring algorithm.

**Location:** `src/Hooks/useSearch.ts`

**Parameters:**
- `tools: Tool[]` - Array of tools to search

**Returns:**
```typescript
{
  query: string,                 // Current search query
  setQuery: (q: string) => void, // Update search query
  results: Tool[],               // Filtered results (sorted by relevance)
  clearQuery: () => void,        // Clear search
  hasResults: boolean            // Has any results
}
```

**Features:**
- Fuzzy matching on label, description, and category
- Automatic result scoring and sorting
- Debounced for performance

---

#### `useGlobalShortcut()`
Registers and manages global keyboard shortcuts.

**Location:** `src/Hooks/useGlobalShortcut.ts`

**Default Shortcuts:**
- `Ctrl+Shift+Space` - Toggle app window visibility
- `Ctrl+K` - Open global search modal

**Features:**
- Auto-cleanup on unmount
- Debounced to prevent rapid triggering
- Works even when app is not focused

---

#### `useAppDate()`
Retrieves app metadata from Tauri.

**Location:** `src/Hooks/useAppDate.ts`

**Returns:**
```typescript
{
  appname: string,    // App name from config
  appversion: string  // App version
}
```

---

### UI Components

#### `<AppHeader />`
Top navigation bar with app branding.

**Location:** `src/Components/AppHeader.tsx`

**Features:**
- Displays app name & version
- Shows current page title
- Minimal, clean design

---

#### `<Sidebar />`
Collapsible navigation sidebar.

**Location:** `src/Components/Sidebar.tsx`

**Features:**
- Expandable/collapsible categories
- Auto-opens current tool's category
- Home & Settings links
- Active state highlighting

---

#### `<SearchModal />`
Spotlight-style search modal (Ctrl+K).

**Location:** `src/Components/SearchModal.tsx`

**Props:**
```typescript
{
  isOpen: boolean,       // Modal visibility
  onClose: () => void    // Close handler
}
```

**Features:**
- Keyboard navigation (↑↓ arrows, Enter, Esc)
- Real-time fuzzy search
- Formatted results with icons

---

#### `<SectionHeader />`
Page section header component.

**Location:** `src/Components/SectionHeader.tsx`

**Props:**
```typescript
{
  label: string,              // Section title
  secondary: string,          // Description
  Icon?: React.ComponentType  // Optional icon
}
```

---

#### `<Card />`
Reusable card container.

**Location:** `src/Components/Card.tsx`

**Props:**
```typescript
{
  children: React.ReactNode,
  className?: string
}
```

---

#### `<Input />`
Form input with consistent styling.

**Location:** `src/Components/Input.tsx`

**Props:**
```typescript
{
  value: string,
  onChange: (value: string) => void,
  placeholder?: string,
  type?: 'text' | 'password' | 'email' | 'number'
}
```

---

### Services & Configuration

#### `menuItems`
**Type:** `Tool[]`

Array of all available developer tools.

**Structure:**
```typescript
{
  label: string,              // Display name
  secondary: string,          // Short description
  route: string,              // URL path (e.g., 'json-formatter')
  Icon: React.ComponentType,  // Icon component
  category: string            // Category group
}
```

---

#### `menuCategories`
**Type:** `MenuCategory[]`

Tools grouped by category.

**Structure:**
```typescript
{
  category: string,           // Category name
  description: string,        // Category description
  icon: React.ComponentType,  // Category icon
  items: Tool[]               // Tools in category
}
```

---

#### `allMenuItems`
**Type:** `Tool[]`

Home page + all tool menu items combined.

---

### Constants (`src/constant.ts`)

#### `APP_CONFIG`
Application metadata:
```typescript
{
  name: "Tauri Boilerplate",
  author: "Abdul Quadir",
  authorUrl: "https://abdulquadir.com",
  version: "0.0.0"
}
```

#### `SHORTCUTS`
Global keyboard shortcuts:
```typescript
{
  TOGGLE_WINDOW: "ctrl+shift+space",
  OPEN_SEARCH: "ctrl+k"
}
```

#### `STORAGE_KEYS`
localStorage key names:
```typescript
{
  TOOL_HISTORY: "history",
  FAVORITES: "favorites"
}
```

#### `DEBOUNCE`
Performance tuning values (ms):
```typescript
{
  SHORTCUT: 300,  // Shortcut debounce
  SEARCH: 100     // Search debounce
}
```

#### `UI`
UI limits and dimensions:
```typescript
{
  SIDEBAR_WIDTH: 288,      // pixels
  HEADER_HEIGHT: 48,       // pixels
  MAX_RECENT_TOOLS: 10,    // items
  MAX_SEARCH_RESULTS: 20   // items
}
```

---

## 🎯 Common Patterns & Usage

### Adding a New Tool

1. **Define in MenuItems.ts:**
```typescript
export const menuItems: Tool[] = [
  {
    label: 'JSON Formatter',
    secondary: 'Format and validate JSON',
    route: 'json-formatter',
    Icon: FiCode,
    category: 'Data & API'
  }
];
```

2. **Create Page in Pages/JsonFormatter.tsx:**
```typescript
import { useToolHistory } from '../Hooks/useToolHistory';

export default function JsonFormatter() {
  const { addToHistory } = useToolHistory();

  useEffect(() => {
    addToHistory('/json-formatter');
  }, [addToHistory]);

  return (
    <div>
      {/* Your tool UI */}
    </div>
  );
}
```

3. **Add Route in App.tsx:**
```typescript
<Route path="/json-formatter" element={<JsonFormatter />} />
```

---

### Using Favorites

```typescript
const { toggleFavorite, isFavorite } = useToolHistory();

<button
  onClick={() => toggleFavorite('/my-tool')}
  className={isFavorite('/my-tool') ? 'starred' : ''}
>
  Add to Favorites
</button>
```

---

### Using Search

```typescript
const [isSearchOpen, setIsSearchOpen] = useState(false);

return (
  <>
    <button onClick={() => setIsSearchOpen(true)}>
      Search (Ctrl+K)
    </button>
    <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
  </>
);
```

---

## 📖 Documentation Files

- **[DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md)** - Detailed guide for adding new tools

---

## ⌨️ Global Shortcuts Reference

| Shortcut | Action |
|----------|--------|
| `Ctrl+Shift+Space` | Toggle app window visibility |
| `Ctrl+K` | Open global search modal |

Customize in `src/constant.ts` → `SHORTCUTS` object.

---

## 💾 Data Persistence

Uses browser `localStorage` for:
- **Tool Favorites** - Starred tools for quick access
- **Tool History** - Recently used tools (max 10)

**Keys:**
```typescript
localStorage.getItem('favorites')  // JSON array of favorite paths
localStorage.getItem('history')    // JSON array of recent tool paths
```

---

## 🔧 Best Practices

### Component Guidelines
- ✅ Keep components under 200 lines
- ✅ Use TypeScript (strict mode)
- ✅ Extract logic into custom hooks
- ✅ Use `useCallback` for handlers
- ✅ Use `useMemo` for calculations
- ✅ Handle errors gracefully

### Naming Conventions
- **Components:** PascalCase (`SearchModal`)
- **Hooks:** camelCase with "use" (`useToolHistory`)
- **Constants:** UPPER_SNAKE_CASE (`MAX_RECENT_TOOLS`)
- **Types:** PascalCase (`Tool`, `MenuCategory`)

---

## 🧪 Development Commands

```bash
# Install dependencies
npm install

# Start development with hot reload
npm run tauri dev

# Type check & build
npm run build

# Build desktop app
npm run tauri build

```

---

## 🐛 Troubleshooting

**App won't start**
- Clear `node_modules`: `npm install`
- Check Node 18+ installed
- Clear Rust cache: `cargo clean`

**Search not working**
- Verify `menuItems` populated
- Check `route` properties unique
- See browser console for errors

**Shortcuts not working**
- Check system keyboard conflicts
- Restart app after changes
- Verify format in `constant.ts`

**Tray icon missing**
- Check Tauri permissions
- Verify `tray-icon` in `Cargo.toml`

---

## 📚 Resources

- **Tauri:** https://tauri.app/
- **React:** https://react.dev/
- **TypeScript:** https://www.typescriptlang.org/
- **Tailwind CSS:** https://tailwindcss.com/
- **React Router:** https://reactrouter.com/

---

## 📄 License

MIT - Free for personal and commercial use

---

## 👤 Author

**Abdul Quadir**
- Website: [abdulquadir.com](https://abdulquadir.com)
- GitHub: [@Abdul-dewaswala](https://github.com/Abdul-dewaswala)

---

## 🤝 Contributing

1. Follow `NAMING_CONVENTIONS.md`
2. Keep components < 200 lines
3. Use TypeScript strictly
4. Test with `npm run build`
5. Update documentation

---

**Last Updated:** May 1, 2026

**Status:** ✅ Production Ready
