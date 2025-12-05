// Image configuration object with paths to all three images
const benfaceImages = {
  default: "/images/ben_boggett.jpg",
  dev: "/images/ben_dev.jpg",
  music: "/images/ben_music.jpg",
};

// Get DOM elements
const benfaceImg = document.querySelector(".benface");
const benfaceContainer = document.querySelector(".benface-container");
const navDev = document.querySelector(".nav-dev");
const navMusic = document.querySelector(".nav-music");
const devSpan = navDev.querySelector("span");
const musicSpan = navMusic.querySelector("span");

// Drag state variables
let isDragging = false;
let offsetX = 0;
let offsetY = 0;

// Preload all images to prevent loading delays
Object.values(benfaceImages).forEach((src) => {
  const img = new Image();
  img.src = src;
});

// Add mouseenter event listeners to navigation links to switch benface image
navDev.addEventListener("mouseenter", () => {
  benfaceImg.src = benfaceImages.dev;
});

navMusic.addEventListener("mouseenter", () => {
  benfaceImg.src = benfaceImages.music;
});

// Add mouseleave event listeners to reset to default image
navDev.addEventListener("mouseleave", () => {
  benfaceImg.src = benfaceImages.default;
});

navMusic.addEventListener("mouseleave", () => {
  benfaceImg.src = benfaceImages.default;
});

// Drag functionality - mousedown event to initiate drag
benfaceContainer.addEventListener("mousedown", (e) => {
  isDragging = true;

  // Calculate cursor offset from benface center on drag start
  const rect = benfaceContainer.getBoundingClientRect();
  offsetX = e.clientX - (rect.left + rect.width / 2);
  offsetY = e.clientY - (rect.top + rect.height / 2);

  // Change cursor to "grabbing" during drag
  benfaceContainer.style.cursor = "grabbing";

  // Add dragging class for shrink effect
  benfaceContainer.classList.add("dragging");

  // Add drop-target class to both nav link spans on drag start
  devSpan.classList.add("drop-target");
  musicSpan.classList.add("drop-target");

  // Shrink benface on mousedown
  benfaceContainer.style.transform = "translate(-50%, -50%) scale(0.93)";

  // Prevent default behavior to avoid text selection
  e.preventDefault();
});

// Drag functionality - mousemove event for drag updates
document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  // Calculate desired position based on cursor
  let x = e.clientX - offsetX;
  let y = e.clientY - offsetY;

  // Get drop-target circle positions and radii
  const devSpanRect = devSpan.getBoundingClientRect();
  const musicSpanRect = musicSpan.getBoundingClientRect();

  const devCircleCenterX = devSpanRect.left + devSpanRect.width / 2;
  const devCircleCenterY = devSpanRect.top + devSpanRect.height / 2;
  const devCircleRadius = devSpanRect.width / 2;

  const musicCircleCenterX = musicSpanRect.left + musicSpanRect.width / 2;
  const musicCircleCenterY = musicSpanRect.top + musicSpanRect.height / 2;
  const musicCircleRadius = musicSpanRect.width / 2;

  // Calculate distance to each circle center
  const distanceToDev = Math.sqrt(
    Math.pow(x - devCircleCenterX, 2) + Math.pow(y - devCircleCenterY, 2)
  );
  const distanceToMusic = Math.sqrt(
    Math.pow(x - musicCircleCenterX, 2) + Math.pow(y - musicCircleCenterY, 2)
  );

  // Magnetic snap threshold (distance at which snap occurs)
  const snapThreshold = 50;

  // Apply magnetic snap if close enough to a circle
  if (distanceToDev < snapThreshold && distanceToDev < distanceToMusic) {
    // Snap to Dev circle center
    x = devCircleCenterX;
    y = devCircleCenterY;
  } else if (distanceToMusic < snapThreshold) {
    // Snap to Music circle center
    x = musicCircleCenterX;
    y = musicCircleCenterY;
  }

  // Use absolute positioning with left/top properties
  benfaceContainer.style.left = `${x}px`;
  benfaceContainer.style.top = `${y}px`;

  // Calculate benface center position after positioning
  const benfaceRect = benfaceContainer.getBoundingClientRect();
  const benfaceCenterX = benfaceRect.left + benfaceRect.width / 2;
  const benfaceCenterY = benfaceRect.top + benfaceRect.height / 2;

  // Check if benface center is inside either circular drop-target
  const isInDevCircle = isPointInCircle(
    benfaceCenterX,
    benfaceCenterY,
    devCircleCenterX,
    devCircleCenterY,
    devCircleRadius
  );

  const isInMusicCircle = isPointInCircle(
    benfaceCenterX,
    benfaceCenterY,
    musicCircleCenterX,
    musicCircleCenterY,
    musicCircleRadius
  );

  // Switch image based on which circle benface is in
  if (isInDevCircle) {
    benfaceImg.src = benfaceImages.dev;
  } else if (isInMusicCircle) {
    benfaceImg.src = benfaceImages.music;
  } else {
    benfaceImg.src = benfaceImages.default;
  }
});

// Helper function to check if a point is inside a circle
function isPointInCircle(pointX, pointY, circleCenterX, circleCenterY, radius) {
  const distance = Math.sqrt(
    Math.pow(pointX - circleCenterX, 2) + Math.pow(pointY - circleCenterY, 2)
  );
  return distance <= radius;
}

// Drag functionality - mouseup event to end drag
document.addEventListener("mouseup", () => {
  if (!isDragging) return;

  // Calculate benface center coordinates on mouseup
  const benfaceRect = benfaceContainer.getBoundingClientRect();
  const benfaceCenterX = benfaceRect.left + benfaceRect.width / 2;
  const benfaceCenterY = benfaceRect.top + benfaceRect.height / 2;

  // Get bounding rectangles for both drop-target circles
  const devSpanRect = devSpan.getBoundingClientRect();
  const musicSpanRect = musicSpan.getBoundingClientRect();

  // Calculate circle centers and radius (12rem = 192px at default font size)
  const devCircleCenterX = devSpanRect.left + devSpanRect.width / 2;
  const devCircleCenterY = devSpanRect.top + devSpanRect.height / 2;
  const devCircleRadius = devSpanRect.width / 2;

  const musicCircleCenterX = musicSpanRect.left + musicSpanRect.width / 2;
  const musicCircleCenterY = musicSpanRect.top + musicSpanRect.height / 2;
  const musicCircleRadius = musicSpanRect.width / 2;

  // Check if benface center is inside the circular drop-target areas
  const isOverDev = isPointInCircle(
    benfaceCenterX,
    benfaceCenterY,
    devCircleCenterX,
    devCircleCenterY,
    devCircleRadius
  );

  const isOverMusic = isPointInCircle(
    benfaceCenterX,
    benfaceCenterY,
    musicCircleCenterX,
    musicCircleCenterY,
    musicCircleRadius
  );

  // Set isDragging flag to false
  isDragging = false;

  // Reset cursor to "grab" on release
  benfaceContainer.style.cursor = "grab";

  // Reset transform to normal size (remove scale)
  benfaceContainer.style.transform = "translate(-50%, -50%)";

  // Reset image to default when drag ends (unless navigating)
  if (!isOverDev && !isOverMusic) {
    benfaceImg.src = benfaceImages.default;
  }

  // Remove dragging class to restore size
  benfaceContainer.classList.remove("dragging");

  // Remove drop-target class from both nav link spans on drag end
  devSpan.classList.remove("drop-target");
  musicSpan.classList.remove("drop-target");

  // Navigate on valid drop
  // Navigate to dev.bendoggett.com if dropped inside Dev circle
  if (isOverDev) {
    window.location.href = navDev.href;
  }
  // Navigate to music.bendoggett.com if dropped inside Music circle
  else if (isOverMusic) {
    window.location.href = navMusic.href;
  }
  // Do nothing if dropped outside circular drop targets (position is maintained)
});

// Function to show "Drag my face!" message (curved text on benface)
function showDragMessage() {
  const curvedText = document.querySelector(".curved-text");
  if (curvedText) {
    // Show the curved text
    curvedText.classList.add("visible");

    // Hide after 2 seconds
    setTimeout(() => {
      curvedText.classList.remove("visible");
    }, 2000);
  }
}

// Prevent default click navigation and show message
// Add click event listeners to both navigation links
navDev.addEventListener("click", (e) => {
  // Call preventDefault() to disable normal link behavior
  e.preventDefault();
  showDragMessage();
});

navMusic.addEventListener("click", (e) => {
  // Call preventDefault() to disable normal link behavior
  e.preventDefault();
  showDragMessage();
});
// Ensure navigation only works via drag-and-drop

// Touch event handlers for mobile drag support
benfaceContainer.addEventListener("touchstart", (e) => {
  isDragging = true;

  const touch = e.touches[0];
  const rect = benfaceContainer.getBoundingClientRect();
  offsetX = touch.clientX - (rect.left + rect.width / 2);
  offsetY = touch.clientY - (rect.top + rect.height / 2);

  benfaceContainer.classList.add("dragging");
  devSpan.classList.add("drop-target");
  musicSpan.classList.add("drop-target");

  benfaceContainer.style.transform = "translate(-50%, -50%) scale(0.93)";

  e.preventDefault();
});

document.addEventListener("touchmove", (e) => {
  if (!isDragging) return;

  const touch = e.touches[0];
  let x = touch.clientX - offsetX;
  let y = touch.clientY - offsetY;

  const devSpanRect = devSpan.getBoundingClientRect();
  const musicSpanRect = musicSpan.getBoundingClientRect();

  const devCircleCenterX = devSpanRect.left + devSpanRect.width / 2;
  const devCircleCenterY = devSpanRect.top + devSpanRect.height / 2;
  const devCircleRadius = devSpanRect.width / 2;

  const musicCircleCenterX = musicSpanRect.left + musicSpanRect.width / 2;
  const musicCircleCenterY = musicSpanRect.top + musicSpanRect.height / 2;
  const musicCircleRadius = musicSpanRect.width / 2;

  const distanceToDev = Math.sqrt(
    Math.pow(x - devCircleCenterX, 2) + Math.pow(y - devCircleCenterY, 2)
  );
  const distanceToMusic = Math.sqrt(
    Math.pow(x - musicCircleCenterX, 2) + Math.pow(y - musicCircleCenterY, 2)
  );

  const snapThreshold = 50;

  if (distanceToDev < snapThreshold && distanceToDev < distanceToMusic) {
    x = devCircleCenterX;
    y = devCircleCenterY;
  } else if (distanceToMusic < snapThreshold) {
    x = musicCircleCenterX;
    y = musicCircleCenterY;
  }

  benfaceContainer.style.left = `${x}px`;
  benfaceContainer.style.top = `${y}px`;

  const benfaceRect = benfaceContainer.getBoundingClientRect();
  const benfaceCenterX = benfaceRect.left + benfaceRect.width / 2;
  const benfaceCenterY = benfaceRect.top + benfaceRect.height / 2;

  const isInDevCircle = isPointInCircle(
    benfaceCenterX,
    benfaceCenterY,
    devCircleCenterX,
    devCircleCenterY,
    devCircleRadius
  );

  const isInMusicCircle = isPointInCircle(
    benfaceCenterX,
    benfaceCenterY,
    musicCircleCenterX,
    musicCircleCenterY,
    musicCircleRadius
  );

  if (isInDevCircle) {
    benfaceImg.src = benfaceImages.dev;
  } else if (isInMusicCircle) {
    benfaceImg.src = benfaceImages.music;
  } else {
    benfaceImg.src = benfaceImages.default;
  }

  e.preventDefault();
});

document.addEventListener("touchend", () => {
  if (!isDragging) return;

  const benfaceRect = benfaceContainer.getBoundingClientRect();
  const benfaceCenterX = benfaceRect.left + benfaceRect.width / 2;
  const benfaceCenterY = benfaceRect.top + benfaceRect.height / 2;

  const devSpanRect = devSpan.getBoundingClientRect();
  const musicSpanRect = musicSpan.getBoundingClientRect();

  const devCircleCenterX = devSpanRect.left + devSpanRect.width / 2;
  const devCircleCenterY = devSpanRect.top + devSpanRect.height / 2;
  const devCircleRadius = devSpanRect.width / 2;

  const musicCircleCenterX = musicSpanRect.left + musicSpanRect.width / 2;
  const musicCircleCenterY = musicSpanRect.top + musicSpanRect.height / 2;
  const musicCircleRadius = musicSpanRect.width / 2;

  const isOverDev = isPointInCircle(
    benfaceCenterX,
    benfaceCenterY,
    devCircleCenterX,
    devCircleCenterY,
    devCircleRadius
  );

  const isOverMusic = isPointInCircle(
    benfaceCenterX,
    benfaceCenterY,
    musicCircleCenterX,
    musicCircleCenterY,
    musicCircleRadius
  );

  isDragging = false;

  benfaceContainer.style.transform = "translate(-50%, -50%)";

  if (!isOverDev && !isOverMusic) {
    benfaceImg.src = benfaceImages.default;
  }

  benfaceContainer.classList.remove("dragging");
  devSpan.classList.remove("drop-target");
  musicSpan.classList.remove("drop-target");

  if (isOverDev) {
    window.location.href = navDev.href;
  } else if (isOverMusic) {
    window.location.href = navMusic.href;
  }
});

// Set CSS custom property for actual viewport height (fixes mobile browser UI)
function setViewportHeight() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}

// Set on load and resize
setViewportHeight();

// Handle window resize to recalculate benface position proportionally
let previousWidth = window.innerWidth;
let previousHeight = window.innerHeight;

window.addEventListener("resize", () => {
  // Update viewport height for mobile
  setViewportHeight();

  const currentWidth = window.innerWidth;
  const currentHeight = window.innerHeight;

  // Get current position
  const currentLeft =
    parseFloat(benfaceContainer.style.left) || window.innerWidth / 2;
  const currentTop =
    parseFloat(benfaceContainer.style.top) || window.innerHeight / 2;

  // Calculate proportional position
  const proportionalLeft = (currentLeft / previousWidth) * currentWidth;
  const proportionalTop = (currentTop / previousHeight) * currentHeight;

  // Update position
  benfaceContainer.style.left = `${proportionalLeft}px`;
  benfaceContainer.style.top = `${proportionalTop}px`;

  // Update previous dimensions
  previousWidth = currentWidth;
  previousHeight = currentHeight;
});
