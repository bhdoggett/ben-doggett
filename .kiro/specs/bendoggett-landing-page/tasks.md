# Implementation Plan

- [x] 1. Create the base HTML structure with semantic elements

  - Create index.html file with DOCTYPE, html, head, and body tags
  - Add meta tags for charset and viewport
  - Set up the basic page title
  - Create header element for "Ben Doggett" name
  - Create container for navigation split areas
  - Add anchor tags for "Dev" and "Musician" links with proper href attributes
  - _Requirements: 1.1, 1.3, 2.1, 2.2, 2.4, 2.5, 4.1_

- [x] 2. Implement CSS styling for layout and visual design

  - [x] 2.1 Define CSS custom properties for colors and dimensions
    - Create :root selector with CSS variables for header height, navigation height, transition speed, and color scheme
    - _Requirements: 1.2, 4.2_
  - [x] 2.2 Style the header with "Ben Doggett" name
    - Apply typography, centering, and positioning to make the name prominent at the top
    - Ensure sufficient size and contrast for immediate visibility
    - _Requirements: 1.1, 1.2, 1.3_
  - [x] 2.3 Create the split-screen layout for navigation areas
    - Implement CSS Grid or Flexbox to create 50/50 left-right split
    - Style navigation areas to fill viewport height minus header
    - Center the "Dev" and "Musician" text labels within their respective areas
    - Apply base colors and typography to navigation links
    - _Requirements: 2.1, 2.2_
  - [x] 2.4 Implement the jagged partition using CSS clip-path
    - Apply clip-path polygon to create jagged edge effect between navigation areas
    - Ensure the partition is visually distinctive and aesthetically pleasing
    - _Requirements: 2.3_

- [x] 3. Add hover interaction styling with CSS transitions

  - Define hover state styles for both "Dev" and "Musician" navigation links
  - Implement CSS transitions with 100ms timing for smooth color changes
  - Ensure distinct visual feedback when hovering over each link
  - Test that hover effects restore to default when cursor moves away
  - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [x] 4. Add JavaScript for enhanced hover effects

  - Write JavaScript event listeners for mouseenter and mouseleave events
  - Implement dynamic class toggling or style updates for additional hover effects
  - Ensure JavaScript enhances but doesn't replace CSS hover functionality
  - _Requirements: 3.1, 3.2, 3.3, 4.3_

- [x] 5. Set up Playwright testing infrastructure

  - [x] 5.1 Initialize Node.js project and install Playwright
    - Create package.json with npm init
    - Install Playwright as dev dependency
    - Run Playwright installation to download browsers
    - _Requirements: 5.1_
  - [x] 5.2 Create Playwright configuration
    - Write playwright.config.js with browser configurations (Chromium, Firefox, WebKit)
    - Configure base URL for local testing
    - Set up test directory and output settings
    - _Requirements: 5.1_

- [x] 6. Implement multiple image support for benface container

  - [x] 6.1 Add dev and music themed images to the images directory
    - Create or source a dev-themed image of Ben (ben_dev.jpg)
    - Create or source a music-themed image of Ben (ben_music.jpg)
    - Ensure images are same dimensions as existing ben_boggett.jpg
    - _Requirements: 5.1, 5.2, 5.3_
  - [x] 6.2 Implement image switching logic in JavaScript
    - Create image configuration object with paths to all three images
    - Preload all images to prevent loading delays
    - Add mouseenter event listeners to navigation links to switch benface image
    - Add mouseleave event listeners to reset to default image
    - Ensure smooth transitions between images (200ms)
    - _Requirements: 5.1, 5.2, 5.3, 5.4_

- [x] 7. Implement drag functionality for benface container

  - [x] 7.1 Add drag state management
    - Create drag state variables (isDragging, offsetX, offsetY)
    - Add mousedown event listener to benface container to initiate drag
    - Calculate cursor offset from benface center on drag start
    - Change cursor to "grabbing" during drag
    - Prevent default behavior to avoid text selection
    - _Requirements: 6.1, 6.2_
  - [x] 7.2 Implement drag movement tracking
    - Add mousemove event listener to document for drag updates
    - Update benface position to follow cursor with offset
    - Use absolute positioning with left/top properties
    - Ensure benface stays visible during drag (maintain z-index)
    - _Requirements: 6.2, 6.4, 6.5_
  - [x] 7.3 Handle drag release
    - Add mouseup event listener to document to end drag
    - Reset cursor to "grab" on release
    - Set isDragging flag to false
    - Maintain benface position after drag ends
    - _Requirements: 6.3, 6.4_

- [x] 8. Add circular borders to navigation links during drag

  - [x] 8.1 Create CSS styles for drop-target state
    - Add .drop-target class with circular border styling
    - Use border-radius: 50% for circular appearance
    - Add padding to create space between text and border
    - Include smooth transition for appearance (200ms)
    - Ensure sufficient visibility with contrasting colors
    - _Requirements: 7.1, 7.2, 7.4_
  - [x] 8.2 Toggle drop-target class during drag operations
    - Add drop-target class to both nav link spans on drag start (mousedown)
    - Remove drop-target class from both nav link spans on drag end (mouseup)
    - _Requirements: 7.1, 7.2, 7.3_

- [x] 9. Implement drag-and-drop navigation

  - [x] 9.1 Add collision detection logic
    - Calculate benface center coordinates on mouseup
    - Get bounding rectangles for both navigation areas
    - Check if benface center overlaps Dev navigation area
    - Check if benface center overlaps Music navigation area
    - _Requirements: 8.1, 8.2_
  - [x] 9.2 Navigate on valid drop
    - Navigate to dev.bendoggett.com if dropped on Dev area
    - Navigate to music.bendoggett.com if dropped on Music area
    - Do nothing if dropped outside navigation areas
    - _Requirements: 8.3, 8.4_
  - [x] 9.3 Prevent default click navigation
    - Add click event listeners to both navigation links
    - Call preventDefault() to disable normal link behavior
    - Ensure navigation only works via drag-and-drop
    - _Requirements: 8.5_
  - [ ]\* 9.4 Add visual feedback for valid drop targets
    - Optionally highlight navigation area when benface hovers over it during drag
    - Provide subtle visual cue that drop will trigger navigation
    - _Requirements: 8.6_

- [x] 10. Update benface positioning and visibility

  - [x] 10.1 Modify benface initial positioning
    - Change benface from fixed to absolute positioning for drag support
    - Update initial position calculation to center on screen
    - Ensure benface remains visible after first hover
    - _Requirements: 6.4, 6.5_
  - [x] 10.2 Add cursor styling for drag affordance
    - Set cursor to "grab" when benface is hoverable
    - Change to "grabbing" during active drag
    - _Requirements: 6.1, 6.2_

- [ ] 11. Write Playwright end-to-end tests

  - [ ] 11.1 Create test file for visual elements
    - Write test to verify "Ben Doggett" header is visible
    - Write test to verify "Dev" navigation link is visible
    - Write test to verify "Music" navigation link is visible
    - Verify text content matches expected values
    - _Requirements: 9.2, 9.3_
  - [ ] 11.2 Create test for navigation functionality
    - Write test to verify "Dev" link href points to dev.bendoggett.com
    - Write test to verify "Music" link href points to music.bendoggett.com
    - Verify both links are present
    - _Requirements: 9.4_
  - [ ] 11.3 Create test for hover interactions
    - Write test to hover over "Dev" link and verify style changes
    - Write test to hover over "Music" link and verify style changes
    - Verify computed styles change on hover (background-color or other properties)
    - _Requirements: 9.5_
  - [ ]\* 11.4 Create test for drag-and-drop functionality
    - Write test to verify benface appears on header hover
    - Write test to simulate drag operation
    - Verify circular borders appear during drag
    - Test drop on Dev area triggers navigation
    - Test drop on Music area triggers navigation
    - _Requirements: 6.1, 6.2, 6.3, 7.1, 7.2, 8.1, 8.2, 8.3, 8.4_

- [ ] 12. Verify all functionality and requirements
  - Manually test benface appearance on header hover
  - Verify image switching when hovering over Dev and Music areas
  - Test drag functionality - benface follows cursor smoothly
  - Verify circular borders appear on drag start and disappear on drag end
  - Test dropping benface on Dev area navigates to dev.bendoggett.com
  - Test dropping benface on Music area navigates to music.bendoggett.com
  - Verify clicking nav links directly does NOT navigate
  - Check that benface maintains position after drag
  - Run Playwright tests and ensure all pass
  - Check visual layout matches design specifications
  - _Requirements: 2.4, 2.5, 3.1, 3.2, 3.3, 3.4, 5.1, 5.2, 5.3, 5.4, 6.1, 6.2, 6.3, 6.4, 6.5, 7.1, 7.2, 7.3, 7.4, 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 9.1, 9.2, 9.3, 9.4, 9.5_
