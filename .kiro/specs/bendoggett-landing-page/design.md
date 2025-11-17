# Design Document

## Overview

The bendoggett.com landing page will be a single-page website with a minimalist, split-screen design. The page features "Ben Doggett" centered at the top, with two large interactive navigation areas below: "Dev" on the left and "Musician" on the right, separated by a distinctive jagged vertical partition. The design emphasizes simplicity, visual impact, and clear navigation through hover interactions.

## Architecture

### Technology Stack

- **HTML5**: Semantic markup for structure
- **CSS3**: Styling including flexbox/grid for layout, custom properties for theming, and transitions for hover effects
- **Vanilla JavaScript**: Event handling for hover state management and dynamic styling updates

### File Structure

```
index.html (single file containing all HTML, CSS, and JavaScript)
```

## Components and Interfaces

### 1. Header Component

**Purpose**: Display the site owner's name prominently

**Structure**:

- Container element (header or div)
- Text element displaying "Ben Doggett"

**Styling**:

- Centered horizontally
- Large, readable typography
- Fixed or relative positioning at top of viewport
- Adequate padding/margin for visual hierarchy

### 2. Navigation Split Component

**Purpose**: Provide two distinct, interactive navigation areas

**Structure**:

- Container element wrapping both navigation areas
- Left navigation area (anchor tag) for "Dev"
- Right navigation area (anchor tag) for "Musician"
- SVG or CSS-based jagged partition element

**Styling**:

- Full viewport height minus header
- 50/50 split (left/right)
- Large, centered text labels
- Distinct hover states with color/scale/opacity changes
- Smooth transitions (100ms or less)

### 3. Jagged Partition

**Purpose**: Create visual separation between navigation areas

**Implementation Options**:

1. **CSS Clip-path** (Recommended): Use `clip-path: polygon()` to create jagged edge on one side
2. **SVG**: Inline SVG with path element for precise control
3. **CSS Border Trick**: Stacked triangular borders

**Design Decision**: CSS clip-path provides the best balance of simplicity and visual effect without external assets.

## Data Models

No complex data models required. Static content only:

```javascript
const navigationLinks = {
  dev: {
    label: "Dev",
    url: "https://dev.bendoggett.com",
    position: "left",
  },
  musician: {
    label: "Musician",
    url: "https://music.bendoggett.com",
    position: "right",
  },
};
```

## Detailed Design Specifications

### Layout Structure

```
┌─────────────────────────────────────┐
│         BEN DOGGETT                 │
├─────────────┬───────────────────────┤
│             │╲                      │
│             │ ╲                     │
│    Dev      │  ╲    Musician       │
│             │  ╱                    │
│             │ ╱                     │
│             │╱                      │
└─────────────┴───────────────────────┘
```

### CSS Architecture

**Custom Properties** (CSS Variables):

```css
:root {
  --header-height: 15vh;
  --nav-height: 85vh;
  --transition-speed: 100ms;
  --dev-color: #color1;
  --dev-hover-color: #color2;
  --musician-color: #color3;
  --musician-hover-color: #color4;
}
```

**Layout Approach**:

- CSS Grid or Flexbox for main layout
- Viewport units (vh, vw) for responsive sizing
- Absolute positioning for partition overlay (if needed)

### Hover Interaction Design

**Dev Link Hover**:

- Background color change
- Text color change (if needed for contrast)
- Optional: subtle scale transform (1.02)
- Optional: partition line color/animation

**Musician Link Hover**:

- Background color change
- Text color change (if needed for contrast)
- Optional: subtle scale transform (1.02)
- Optional: partition line color/animation

**Transition Properties**:

- `transition: all 100ms ease-in-out` on navigation areas
- Smooth color interpolation
- Hardware-accelerated transforms if using scale

### Jagged Partition Implementation

**Approach**: CSS clip-path on navigation areas

```css
.nav-left {
  clip-path: polygon(
    0 0,
    100% 0,
    95% 10%,
    100% 20%,
    95% 30%,
    100% 40%,
    95% 50%,
    100% 60%,
    95% 70%,
    100% 80%,
    95% 90%,
    100% 100%,
    0 100%
  );
}
```

This creates a jagged right edge on the left navigation area, giving the appearance of a partition.

## Error Handling

Minimal error handling required for static page:

1. **Link Validation**: Ensure href attributes are properly formatted
2. **Fallback Styling**: Ensure page is usable without JavaScript (links still work)
3. **Browser Compatibility**: Test clip-path support, provide fallback for older browsers

## Testing Strategy

### Manual Testing Checklist

1. **Visual Verification**:
   - Name displays correctly at top
   - Navigation areas are properly sized (50/50 split)
   - Jagged partition is visible and aesthetically pleasing
2. **Interaction Testing**:

   - Hover over "Dev" link triggers styling change
   - Hover over "Musician" link triggers styling change
   - Hover effects respond within 100ms
   - Clicking "Dev" navigates to dev.bendoggett.com
   - Clicking "Musician" navigates to music.bendoggett.com

3. **Cross-browser Testing**:

   - Chrome/Edge (Chromium)
   - Firefox
   - Safari
   - Mobile browsers (iOS Safari, Chrome Mobile)

4. **Responsive Testing**:
   - Desktop (1920x1080, 1366x768)
   - Tablet (768x1024)
   - Mobile (375x667, 414x896)

### Accessibility Considerations

- Sufficient color contrast ratios (WCAG AA minimum)
- Keyboard navigation support (tab to links, enter to activate)
- Semantic HTML (proper use of header, nav, anchor tags)
- Focus indicators visible on keyboard navigation

## Implementation Notes

1. **Single File Approach**: All HTML, CSS, and JavaScript will be contained in `index.html` for simplicity
2. **No External Dependencies**: No frameworks, libraries, or external stylesheets
3. **Performance**: Minimal JavaScript ensures fast load times
4. **Maintainability**: CSS custom properties make color scheme updates easy
5. **Progressive Enhancement**: Core functionality (links) works without JavaScript; hover effects enhance experience

## Testing Infrastructure

### Playwright Configuration

**Purpose**: Provide automated end-to-end testing for the landing page

**Setup**:

- Install Playwright as a dev dependency
- Create `playwright.config.js` with browser configurations (Chromium, Firefox, WebKit)
- Configure base URL for local testing
- Set up test directory structure

**Test Structure**:

```
tests/
  landing-page.spec.js
playwright.config.js
package.json
```

### Test Scenarios

1. **Visual Elements Test**:

   - Verify "Ben Doggett" header is visible
   - Verify "Dev" link is visible
   - Verify "Musician" link is visible
   - Check text content matches expected values

2. **Navigation Test**:

   - Verify "Dev" link has correct href attribute (dev.bendoggett.com)
   - Verify "Musician" link has correct href attribute (music.bendoggett.com)
   - Test that links are clickable

3. **Hover Interaction Test**:

   - Hover over "Dev" link and verify style changes
   - Hover over "Musician" link and verify style changes
   - Verify computed styles change on hover (background-color, color, etc.)

4. **Layout Test**:
   - Verify split-screen layout (50/50 positioning)
   - Check viewport coverage
   - Validate responsive behavior

### Test Execution

**Commands**:

- `npm test` or `npx playwright test` - Run all tests
- `npx playwright test --headed` - Run with visible browser
- `npx playwright test --debug` - Run in debug mode
- `npx playwright show-report` - View test results

**CI/CD Integration**: Tests can be integrated into GitHub Actions or other CI pipelines for automated validation on commits.
