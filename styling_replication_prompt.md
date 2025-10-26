# Styling Replication Prompt for Multi-Framework Ticket Management App

Use this prompt to replicate the exact styling and design system from the original ticket management application to another project.

## Project Overview
Replicate the styling and design system of a multi-framework ticket management web app built with React, Vue.js, and Twig — all sharing the same Bootstrap-based design system.

## 🎨 Visual Design System
Replicate the following CSS custom properties and design tokens:

```css
:root {
  --max-width: 1440px;
  --status-open: #1abc9c;        /* Green tone for open tickets */
  --status-in_progress: #f39c12; /* Amber tone for in-progress tickets */
  --status-closed: #7f8c8d;      /* Gray tone for closed tickets */
  --bg: #ffffff;
  --muted: #6b7280;
  --bs-primary: #3b82f6;
  --bs-success: #10b981;
  --bs-warning: #f59e0b;
  --bs-secondary: #6b7280;
  --bs-danger: #ef4444;
  --bs-light: #f8fafc;
  --bs-dark: #0f172a;
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --border-radius-sm: 0.375rem;
  --border-radius: 0.5rem;
  --border-radius-lg: 0.75rem;
  --border-radius-xl: 1rem;
}
```

## 🌐 Typography & Font System
- **Primary Font**: 'Inter', system font stack (`-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial`)
- **Headings**: Weight 700, responsive sizes using Bootstrap display classes
- **Body**: Weight 400, size 1rem
- **Small text**: Weight 400, size 0.875rem

## 📐 Layout Constraints
- **Max-width**: 1440px for all containers
- **Centered layout**: `margin: 0 auto` for all main containers
- **Responsive flex container**: `d-flex flex-column min-vh-100` for full-height layout

## 🎨 Color Palette & Status Colors
- **Open Status**: `bg-success` (green) - `#10b981` - Text: white
- **In Progress Status**: `bg-warning` (amber) - `#f59e0b` - Text: #212529 (dark)
- **Closed Status**: `bg-secondary` (gray) - `#6b7280` - Text: white
- **High Priority**: `bg-danger` (red) - `#ef4444`
- **Medium Priority**: `bg-primary` (blue) - `#3b82f6`
- **Low Priority**: `bg-light` (light) - `#f8fafc`

## 🌊 Wave Hero Background
Replicate the SVG wave background:
```svg
<svg class="wave-svg" viewBox="0 0 1200 300" preserveAspectRatio="none">
  <path d="M0,280 L0,300 L1200,300 L1200,280 C1000,200 800,350 600,280 C400,210 200,300 0,280 Z" fill="#f8fafc"/>
</svg>
```

## 🔲 Card Design System
- **Border Radius**: `rounded-3` or `border-radius: var(--border-radius-lg)`
- **Shadow**: `shadow-sm` or `box-shadow: var(--shadow)`
- **Border**: `border-0` or `border: none`
- **Padding**: `p-4` or `padding: 1rem`
- **Height**: `h-100` for equal height cards in grid

## 🎯 Button Styling
- **Border Radius**: `border-radius: var(--border-radius) !important`
- **Padding**: `padding: 0.5rem 1rem !important`
- **Font Weight**: `font-weight: 500 !important`
- **Primary Button**: `btn-primary` with `background-color: var(--bs-primary) !important`
- **Outline Primary**: `btn-outline-primary` with custom hover states

## 🏗️ Header & Navigation
- **Responsive Breakpoint**: 670px (use `navbar-expand-md` and custom CSS)
- **Wave Background**: Use SVG as background image in header
- **Text Color**: White text for navigation links on wave background
- **Mobile Menu**: Dark background with transparency for mobile menu
- **Hamburger Styling**: Visible only on screens smaller than 670px

## 🦶 Footer Styling
- **Background**: `bg-black` with white text `text-white`
- **Padding**: `py-4` (vertical padding)
- **Margin**: `mt-5` (top margin for spacing)
- **Text Color**: White for all text elements

## 📱 Responsive Breakpoints
- **Mobile**: Up to 669.98px - Collapsible navigation menu
- **Tablet**: 670px - 767px - 2-column grid for cards
- **Desktop**: 768px+ - 3-column grid for cards, full navigation visible
- **Custom CSS for 670px break**:
```css
@media (max-width: 669.98px) {
  .navbar-expand-md .navbar-collapse { display: none; }
  .navbar-expand-md .navbar-collapse.show { display: block; }
  .navbar-expand-md .navbar-toggler { display: block; }
}
@media (min-width: 670px) {
  .navbar-expand-md .navbar-collapse { display: flex !important; flex-basis: auto; }
  .navbar-expand-md .navbar-toggler { display: none; }
}
```

## 🏷️ Status Badge Styling
```css
.status {
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.8rem;
  color: white;
}

.status.open { background: var(--status-open); }
.status.in_progress { 
  background: var(--status-in_progress); 
  color: #212529; /* dark text for better contrast */
}
.status.closed { background: var(--status-closed); }
```

## 🎨 Background & Container Styling
- **Container**: Use `container-xl` with max-width 1440px
- **Body Background**: `#f8fafc` with `color: #0f172a`
- **Page Background**: Linear gradient `linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)`
- **Card Background**: White with shadows for depth

## 🔤 Form Element Styling
- **Input Fields**: `form-control` with `border-radius: 8px`
- **Invalid State**: `is-invalid` class with red border and error messages
- **Button Sizing**: Consistent padding and border-radius across frameworks
- **Spacing**: Use Bootstrap's spacing utilities (`mb-3`, `mt-2`, etc.)

## ✨ Additional Design Elements
- **Decorative Circles**: Use `rounded-circle` with opacity and positioned absolutely
- **Box Shadows**: Consistent shadow system using CSS variables
- **Transitions**: Smooth transitions for hover states and mobile menu
- **Toast Notifications**: Bootstrap toast styles with custom positioning

## 📐 Grid System Reference
- **Landing Cards**: `row-cols-1 row-cols-md-2 row-cols-lg-3 g-4`
- **Dashboard Cards**: Responsive grid with equal height columns
- **Ticket Cards**: Responsive grid with status badges and action buttons
- **Spacing**: Consistent gutter spacing with `g-4` class

## 🎯 Accessibility Requirements
- **Semantic HTML**: Use proper HTML5 semantic elements
- **ARIA Labels**: Include appropriate ARIA attributes
- **Keyboard Navigation**: Ensure all interactive elements are keyboard accessible
- **Color Contrast**: Maintain WCAG AA standards for text contrast
- **Focus Indicators**: Visible focus states for keyboard users

## 🔧 Implementation Checklist
- [ ] CSS custom properties match exactly
- [ ] Container max-width set to 1440px with centered layout
- [ ] Wave SVG background implemented consistently
- [ ] Status colors match exactly (green, amber, gray)
- [ ] Responsive breakpoints set to 670px
- [ ] Bootstrap classes used consistently
- [ ] Color contrast ratios meet accessibility standards
- [ ] Form validation styling matches
- [ ] Toast notification styling matches
- [ ] Card styling and shadows match
- [ ] Navigation styling matches
- [ ] Typography scales appropriately

Use this prompt to ensure visual consistency across your new project while maintaining the exact design system, spacing, colors, and responsive behavior of the original ticket management application.