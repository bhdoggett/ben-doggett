# Design Document

## Overview

The bendoggett.com landing page will be a single-page website with a minimalist, split-screen design featuring innovative drag-and-drop navigation. The page features "Ben Doggett" centered at the top, with a draggable circular image (benface) that appears on hover. Two large navigation areas below—"Dev" on the left and "Musician" on the right—are separated by a distinctive jagged vertical partition. Navigation is achieved by dragging the benface circle onto the desired area, creating a playful and unconventional user experience. The benface displays different images based on which navigation area is being hovered over.

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

### 4. Benface Container Component

**Purpose**: Display a draggable circular image that serves as the navigation mechanism

**Structure**:

- Container div with circular clipping
- Image element that switches based on hover state
- Positioned absolutely for free movement

**Styling**:

- Circular shape (border-radius: 50%)
- Fixed dimensions (e.g., 15rem x 15rem)
- Initially hidden, appears on header hover
- Elevated z-index for dragging over other elements
- Smooth transitions for image switching
- Cursor: grab (when not dragging) / grabbing (when dragging)

**Behavior**:

- Appears when hovering over "Ben Doggett" header
- Remains visible once shown
- Draggable via mouse events
- Changes image based on which navigation area is hovered
- Position updates in real-time during drag

### 5. Drag and Drop System

**Purpose**: Enable intuitive drag-based navigation

**Components**:

1. **Drag Initiation**:

   - Listen for mousedown on benface container
   - Calculate offset between cursor and container center
   - Set isDragging flag
   - Change cursor to "grabbing"
   - Add circular borders to navigation link spans

2. **Drag Movement**:

   - Listen for mousemove on document
   - Update benface position based on cursor coordinates
   - Check for overlap with navigation areas
   - Provide visual feedback on valid drop targets

3. **Drag Release**:
   - Listen for mouseup on document
   - Check if benface overlaps a navigation area
   - Navigate to corresponding URL if overlap detected
   - Remove circular borders from navigation links
   - Reset cursor

**Collision Detection**:

- Use getBoundingClientRect() to get element positions
- Calculate overlap between benface and navigation areas
- Consider overlap valid if benface center is within navigation area bounds

### 6. Dynamic Image Switching

**Purpose**: Provide contextual visual feedback based on hover state

**Implementation**:

- Listen for mouseenter/mouseleave on navigation areas
- Update benface image src attribute based on hovered area
- Use CSS transitions for smooth image crossfade
- Maintain image aspect ratio and centering

**Image States**:

- Default: Standard Ben image (shown on initial hover over header)
- Dev: Dev-themed image (shown when hovering over Dev area)
- Music: Music-themed image (shown when hovering over Music area)

## Data Models

### Navigation Configuration

```javascript
const navigationLinks = {
  dev: {
    label: "Dev",
    url: "https://dev.bendoggett.com",
    position: "left",
  },
  music: {
    label: "Music",
    url: "https://music.bendoggett.com",
    position: "right",
  },
};
```

### Image State Management

```javascript
const benfaceImages = {
  default: "/images/ben_boggett.jpg",
  dev: "/images/ben_dev.jpg", // Dev-themed image
  music: "/images/ben_music.jpg", // Music-themed image
};
```

### Drag State

```javascript
const dragState = {
  isDragging: false,
  startX: 0,
  startY: 0,
  currentX: 0,
  currentY: 0,
  offsetX: 0,
  offsetY: 0,
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

### Interaction Design

#### Header Hover Interaction

**Trigger**: Mouse enters "Ben Doggett" header text

**Effect**:

- Benface container fades in (opacity: 0 → 1)
- Benface container slides down slightly (transform: translateY(-8px) → translateY(0))
- Transition duration: 200ms
- Container remains visible after hover ends

#### Navigation Area Hover (Without Drag)

**Dev Link Hover**:

- Background color change
- Text moves up slightly with increased letter spacing
- Benface image switches to dev-themed image
- Subtle scale transform (1.02)

**Music Link Hover**:

- Background color change
- Text moves up slightly with increased letter spacing
- Benface image switches to music-themed image
- Subtle scale transform (1.02)

**Transition Properties**:

- `transition: all 200ms ease-in-out` on navigation areas
- Smooth color interpolation
- Hardware-accelerated transforms

#### Drag Interaction Flow

**Phase 1: Drag Start (mousedown on benface)**

1. Cursor changes to "grabbing"
2. Circular borders appear around both navigation link spans
3. Calculate and store cursor offset from benface center
4. Set isDragging flag to true
5. Prevent default link navigation behavior

**Phase 2: Dragging (mousemove on document)**

1. Update benface position to follow cursor (accounting for offset)
2. Check for overlap with navigation areas
3. Optionally highlight the overlapped navigation area
4. Update benface image based on which area is underneath

**Phase 3: Drop (mouseup on document)**

1. Check if benface center overlaps a navigation area
2. If overlap detected, navigate to corresponding URL
3. If no overlap, benface remains at dropped position
4. Remove circular borders from navigation links
5. Reset cursor to "grab"
6. Set isDragging flag to false

#### Circular Border Styling

**Appearance**:

- Applied to navigation link `<span>` elements
- Border: 2-3px solid with contrasting color
- Border-radius: 50%
- Padding to create space between text and border
- Smooth transition on appearance/disappearance (200ms)

**Trigger**: Only visible during drag operations

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

## Technical Implementation Details

### Drag Functionality (JavaScript)

```javascript
// Drag state
let isDragging = false;
let offsetX = 0;
let offsetY = 0;

// Get elements
const benface = document.querySelector(".benface-container");
const navDev = document.querySelector(".nav-dev");
const navMusic = document.querySelector(".nav-music");
const devSpan = navDev.querySelector("span");
const musicSpan = navMusic.querySelector("span");

// Mouse down - start drag
benface.addEventListener("mousedown", (e) => {
  isDragging = true;
  const rect = benface.getBoundingClientRect();
  offsetX = e.clientX - rect.left - rect.width / 2;
  offsetY = e.clientY - rect.top - rect.height / 2;

  benface.style.cursor = "grabbing";
  devSpan.classList.add("drop-target");
  musicSpan.classList.add("drop-target");
  e.preventDefault();
});

// Mouse move - update position
document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  const x = e.clientX - offsetX;
  const y = e.clientY - offsetY;

  benface.style.left = `${x}px`;
  benface.style.top = `${y}px`;
  benface.style.transform = "translate(-50%, -50%)";
});

// Mouse up - check for drop
document.addEventListener("mouseup", (e) => {
  if (!isDragging) return;

  isDragging = false;
  benface.style.cursor = "grab";
  devSpan.classList.remove("drop-target");
  musicSpan.classList.remove("drop-target");

  // Check collision
  const benfaceRect = benface.getBoundingClientRect();
  const benfaceCenterX = benfaceRect.left + benfaceRect.width / 2;
  const benfaceCenterY = benfaceRect.top + benfaceRect.height / 2;

  const devRect = navDev.getBoundingClientRect();
  const musicRect = navMusic.getBoundingClientRect();

  // Check if benface center is over dev area
  if (
    benfaceCenterX >= devRect.left &&
    benfaceCenterX <= devRect.right &&
    benfaceCenterY >= devRect.top &&
    benfaceCenterY <= devRect.bottom
  ) {
    window.location.href = navDev.href;
  }

  // Check if benface center is over music area
  if (
    benfaceCenterX >= musicRect.left &&
    benfaceCenterX <= musicRect.right &&
    benfaceCenterY >= musicRect.top &&
    benfaceCenterY <= musicRect.bottom
  ) {
    window.location.href = navMusic.href;
  }
});
```

### Image Switching (JavaScript)

```javascript
const benfaceImg = benface.querySelector("img");
const images = {
  default: "/images/ben_boggett.jpg",
  dev: "/images/ben_dev.jpg",
  music: "/images/ben_music.jpg",
};

// Preload images
Object.values(images).forEach((src) => {
  const img = new Image();
  img.src = src;
});

// Switch image on hover
navDev.addEventListener("mouseenter", () => {
  if (!isDragging) {
    benfaceImg.src = images.dev;
  }
});

navMusic.addEventListener("mouseenter", () => {
  if (!isDragging) {
    benfaceImg.src = images.music;
  }
});

// Reset to default when leaving nav areas
navDev.addEventListener("mouseleave", () => {
  if (!isDragging) {
    benfaceImg.src = images.default;
  }
});

navMusic.addEventListener("mouseleave", () => {
  if (!isDragging) {
    benfaceImg.src = images.default;
  }
});
```

### Circular Border Styling (CSS)

```css
.nav-link span {
  transition: all 200ms ease-in-out;
  display: inline-block;
}

.nav-link span.drop-target {
  border: 3px solid rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  padding: 2rem 3rem;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
}
```

### Prevent Default Navigation (JavaScript)

```javascript
// Prevent default click navigation
navDev.addEventListener("click", (e) => {
  e.preventDefault();
});

navMusic.addEventListener("click", (e) => {
  e.preventDefault();
});
```

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
   - Benface container appears on header hover
   - Benface is circular with proper dimensions

2. **Image Switching**:

   - Default image shows when benface first appears
   - Dev image shows when hovering over Dev area
   - Music image shows when hovering over Music area
   - Image transitions are smooth (200ms)

3. **Drag Interaction Testing**:

   - Benface can be grabbed with mousedown
   - Cursor changes to "grabbing" during drag
   - Benface follows cursor smoothly during drag
   - Circular borders appear on nav link spans when drag starts
   - Circular borders disappear when drag ends
   - Benface position updates in real-time

4. **Drop and Navigation Testing**:

   - Dropping benface on Dev area navigates to dev.bendoggett.com
   - Dropping benface on Music area navigates to music.bendoggett.com
   - Dropping benface outside nav areas keeps it at dropped position
   - Direct clicking on nav links does NOT navigate (only drag-drop works)

5. **Cross-browser Testing**:

   - Chrome/Edge (Chromium)
   - Firefox
   - Safari
   - Mobile browsers (iOS Safari, Chrome Mobile) - note: drag may need touch event handling

6. **Responsive Testing**:
   - Desktop (1920x1080, 1366x768)
   - Tablet (768x1024)
   - Mobile (375x667, 414x896) - verify touch drag works

### Accessibility Considerations

- Sufficient color contrast ratios (WCAG AA minimum)
- Keyboard navigation support (tab to links, enter to activate)
- Semantic HTML (proper use of header, nav, anchor tags)
- Focus indicators visible on keyboard navigation

## Implementation Notes

1. **File Structure**: HTML, CSS, and JavaScript are separated into individual files (index.html, styles.css, script.js) for better maintainability
2. **No External Dependencies**: No frameworks or libraries required (vanilla JavaScript)
3. **Performance Considerations**:
   - Use requestAnimationFrame for smooth drag updates
   - Debounce collision detection if needed
   - Preload all three images to prevent loading delays during interaction
4. **Maintainability**: CSS custom properties make color scheme updates easy
5. **Progressive Enhancement**:
   - Benface appears and is draggable with JavaScript
   - Navigation still possible via drag-drop mechanism
   - Fallback: Consider adding traditional click navigation as backup
6. **Event Handling**:
   - Prevent default on mousedown to avoid text selection during drag
   - Use event delegation where possible
   - Clean up event listeners properly
7. **Image Management**:
   - Ensure all three images exist before deployment
   - Use consistent image dimensions for smooth transitions
   - Consider lazy loading or preloading strategy
8. **Accessibility Considerations**:
   - Drag-drop navigation may not be keyboard accessible
   - Consider adding keyboard shortcuts or alternative navigation
   - Ensure sufficient color contrast on circular borders
   - Add ARIA labels for screen readers

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
