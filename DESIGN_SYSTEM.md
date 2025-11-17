# 연결실 (Connection Room) - Enhanced Design System

A comprehensive, highly visible, and accessible component library for the 연결실 mood-matching cafe community platform.

## ✨ Version 2.0 Enhancements (Latest)

### What's New
All components have been significantly enhanced for **maximum visibility** and **eye-catching design**:

#### 🎯 Visual Improvements
- **Bolder Typography**: All text upgraded to bold/extrabold weights
- **Thicker Borders**: Increased from 1-2px to 2-4px for better definition
- **Enhanced Shadows**: Neon glow effects with drop-shadows (opacity 60-80%)
- **Stronger Contrast**: White text on dark backgrounds, vibrant neon accents
- **Vivid Animations**: More pronounced hover effects (scale 110%, rotation, glow)

#### 🔘 Button Enhancements
- Primary: Tri-color gradient (pink → yellow → mint)
- Font weight: extrabold with white border overlay
- Hover: 110% scale + 1deg rotation
- Shadow: 2xl with colored glow (60-80% opacity)

#### 🎴 Card Enhancements
- Border: 2px instead of 1px
- Glassmorphism: Enhanced backdrop-blur-xl
- Hover: Lift 2x (-translate-y-2) + scale-105
- Shadow: 2xl with neon-pink glow (30% opacity)

#### 📝 Input Enhancements
- Solid dark background for better text visibility
- White text (font-medium)
- Border: 2px with 4px focus ring
- Labels: Bold with tracking-wide
- Error states: Emoji indicators (⚠️)

#### 🪟 Modal Enhancements
- Backdrop: 80% opacity with blur-lg
- Border: 3px with gradient background
- Header: Gradient pink/mint background
- Title: 3xl extrabold
- Close button: Rotation animation on hover

#### ⏳ Loading Enhancements
- Tri-color ring (pink, yellow, mint)
- Border: 6px instead of 4px
- Added outer glow effect with blur
- Bold text with drop-shadow
- Enhanced center pulse

#### 🔔 Toast Enhancements
- Border: 3px with type-specific colored shadows
- Icons: 7x7 with drop-shadow glow
- Text: Semibold for better readability
- Hover: Scale-105 effect
- Border radius: 2xl

#### 📰 Design System Page
- Massive gradient header (6xl-7xl)
- Emoji section icons (🎨 🔘 🎴 etc.)
- Enhanced color swatches with hover scale
- Typography examples in bordered cards
- Color-coded code snippets

---

## 🎨 Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| **Neon Pink** | `#FF1B8D` | Primary actions, highlights |
| **Mint** | `#00FFC6` | Secondary actions, success states |
| **Electric Yellow** | `#FFE400` | Info states, accents |
| **Dark BG** | `#0A0A0A` | Main background |
| **Dark BG Secondary** | `#1A1A1A` | Card backgrounds, elevated surfaces |

## 📦 Components

### Button

A versatile button component with multiple variants and sizes.

**Props:**
- `variant`: `'primary' | 'secondary' | 'ghost'` (default: `'primary'`)
- `size`: `'sm' | 'md' | 'lg'` (default: `'md'`)
- `isLoading`: `boolean` - Shows loading spinner
- `fullWidth`: `boolean` - Makes button full width
- `disabled`: `boolean` - Disables the button

**Usage:**
```tsx
import { Button } from '@/components/common';

// Primary button
<Button variant="primary">Click Me</Button>

// Loading state
<Button isLoading>Loading...</Button>

// Full width
<Button fullWidth>Submit</Button>
```

**Features:**
- Gradient hover effects on primary variant
- 0.2s smooth transitions
- Loading state with spinner
- Focus ring for accessibility
- Disabled state styling

---

### Card

A glassmorphism card component with hover effects.

**Props:**
- `hoverable`: `boolean` - Enable hover lift effect (default: `true`)
- `glassmorphism`: `boolean` - Enable glass effect (default: `true`)

**Usage:**
```tsx
import { Card } from '@/components/common';

<Card>
  <div className="p-6">
    <h3>Card Title</h3>
    <p>Card content goes here</p>
  </div>
</Card>
```

**Features:**
- Backdrop blur effect
- Subtle border glow on hover
- Lift animation (translateY)
- Dark mode optimized

---

### Input & Textarea

Form input components with validation states.

**Input Props:**
- `label`: `string` - Field label
- `error`: `string` - Error message
- `helperText`: `string` - Helper text below input
- `type`: Standard HTML input types

**Textarea Props:**
- Same as Input
- `rows`: `number` - Number of rows (default: `4`)

**Usage:**
```tsx
import { Input, Textarea } from '@/components/common';

<Input
  label="이메일"
  type="email"
  placeholder="email@example.com"
  error={errors.email}
  helperText="올바른 이메일을 입력하세요"
/>

<Textarea
  label="메시지"
  placeholder="메시지를 입력하세요..."
  rows={6}
/>
```

**Features:**
- Neon focus states
- Error state styling
- ARIA labels for accessibility
- Helper text support
- Smooth transitions

---

### Modal

A responsive modal with backdrop blur and animations.

**Props:**
- `isOpen`: `boolean` - Controls modal visibility
- `onClose`: `() => void` - Close handler
- `title`: `string` - Modal title (optional)
- `size`: `'sm' | 'md' | 'lg' | 'full'` (default: `'md'`)

**Usage:**
```tsx
import { Modal } from '@/components/common';

const [isOpen, setIsOpen] = useState(false);

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Modal Title"
  size="md"
>
  <p>Modal content goes here</p>
</Modal>
```

**Features:**
- ESC key to close
- Click backdrop to close
- Body scroll lock when open
- Slide-up animation on mobile
- Fade-in animation on desktop
- Focus trap (accessibility)

---

### Loading

A retro-style loading spinner with pulse effects.

**Props:**
- `size`: `'sm' | 'md' | 'lg'` (default: `'md'`)
- `text`: `string` - Optional loading text
- `fullScreen`: `boolean` - Show as fullscreen overlay

**Usage:**
```tsx
import { Loading } from '@/components/common';

// Inline loading
<Loading size="md" text="Loading data..." />

// Fullscreen loading
<Loading fullScreen size="lg" text="처리 중..." />
```

**Features:**
- Retro spinning animation
- Neon color rings
- Pulsing center dot
- Optional loading text
- Fullscreen overlay mode

---

### Toast Notification System

A stacked toast notification system with auto-dismiss.

**Usage:**
```tsx
import { useToast } from '@/contexts/ToastContext';

function MyComponent() {
  const toast = useToast();

  const handleSuccess = () => {
    toast.success('작업이 완료되었습니다!');
  };

  const handleError = () => {
    toast.error('오류가 발생했습니다!');
  };

  const handleInfo = () => {
    toast.info('정보 메시지입니다', 5000); // Custom duration
  };

  return (
    <div>
      <button onClick={handleSuccess}>Success</button>
      <button onClick={handleError}>Error</button>
      <button onClick={handleInfo}>Info</button>
    </div>
  );
}
```

**Methods:**
- `toast.success(message, duration?)` - Success notification (green/mint)
- `toast.error(message, duration?)` - Error notification (red)
- `toast.info(message, duration?)` - Info notification (yellow)

**Features:**
- Auto-dismiss after 3s (customizable)
- Stacked notifications
- Slide-up animation
- Click to dismiss
- ARIA live regions for screen readers

---

## 🎭 Animations

All animations use smooth easing functions and are optimized for performance.

| Animation | Duration | Easing |
|-----------|----------|--------|
| Button hover | 200ms | ease |
| Card hover | 200ms | ease |
| Input focus | 200ms | ease |
| Modal slide-up | 300ms | ease-out |
| Modal fade-in | 200ms | ease-out |
| Toast slide-up | 300ms | ease-out |
| Loading spin | 1s | ease-in-out |
| Neon pulse | 2s | cubic-bezier |

## ♿ Accessibility

All components follow WCAG 2.1 AA standards:

- **Keyboard Navigation**: All interactive elements are keyboard accessible
- **ARIA Labels**: Proper ARIA attributes for screen readers
- **Focus States**: Visible focus indicators on all interactive elements
- **Color Contrast**: Minimum 4.5:1 contrast ratio
- **Error Messages**: Associated with form fields via `aria-describedby`
- **Modal Focus Trap**: Focus stays within modal when open
- **Live Regions**: Toast notifications use `aria-live="polite"`

## 🚀 Usage

### Setup

The design system is already integrated into the app. To use components:

1. Import from `@/components/common`:
```tsx
import { Button, Card, Input, Modal, Loading } from '@/components/common';
```

2. For Toast notifications, wrap your app with `ToastProvider` (already done in `App.tsx`):
```tsx
import { ToastProvider } from '@/contexts/ToastContext';

function App() {
  return (
    <ToastProvider>
      {/* Your app */}
    </ToastProvider>
  );
}
```

3. Use the `useToast` hook in components:
```tsx
import { useToast } from '@/contexts/ToastContext';

function MyComponent() {
  const toast = useToast();
  // Use toast.success(), toast.error(), toast.info()
}
```

### Showcase Page

Visit `/design-system` to see all components in action with interactive examples.

## 🎨 Customization

All components use Tailwind CSS classes and can be customized via:

1. **Tailwind Config** (`tailwind.config.js`):
   - Modify colors in `theme.extend.colors`
   - Add custom animations in `theme.extend.keyframes`

2. **Component Props**:
   - Pass `className` prop to override styles
   - All components accept standard HTML attributes

3. **Global Styles** (`src/index.css`):
   - Modify base styles in `@layer base`

## 📱 Responsive Design

- Mobile-first approach
- Breakpoint: `768px` (mobile class)
- Modal adapts: slide-up on mobile, fade-in on desktop
- Navigation: hamburger menu on mobile, horizontal on desktop

## 🔮 Future Enhancements

- [ ] Sound effects integration (placeholder added to Button)
- [ ] Animation variants (spring, bounce)
- [ ] Dark/Light mode toggle
- [ ] Additional components (Badge, Avatar, Dropdown, etc.)
- [ ] Component composition patterns
- [ ] Theme customization API

## 📄 License

Part of the 연결실 (Connection Room) platform.
