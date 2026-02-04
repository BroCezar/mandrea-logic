
const eventsCount = 10000; // High number of events
const durationMs = 2000; // 2 seconds of scrolling

console.log(`\n--- Scroll Event Listener Benchmark ---`);
console.log(`Simulating ${eventsCount} scroll events over ${durationMs}ms.`);

// --- Baseline ---
let baselineExecutions = 0;
const handleScrollBaseline = () => {
    // This represents the state update logic
    baselineExecutions++;
};

// Simulate events for baseline
// In the baseline, every scroll event triggers the handler immediately.
for (let i = 0; i < eventsCount; i++) {
    handleScrollBaseline();
}

console.log(`\n[Baseline] Handler executions: ${baselineExecutions}`);


// --- Optimized (RAF Pattern) ---
let rafExecutions = 0;
let ticking = false;
let currentTime = 0;
let frameInterval = 16.67; // approx 60fps
let nextFrameTime = frameInterval;

const handleScrollRAF = () => {
    if (!ticking) {
        // We flagged that we want to update
        ticking = true;
    }
};

// Simulate events for RAF pattern
for (let i = 0; i < eventsCount; i++) {
    currentTime = (i / eventsCount) * durationMs;

    // 1. Trigger scroll event (user scrolls)
    handleScrollRAF();

    // 2. Browser "Paint" Loop Simulation
    // If time has passed the next frame marker, the browser renders the frame
    // and executes the requested animation frame callback.
    if (currentTime >= nextFrameTime) {
        if (ticking) {
            // execute the queued work
            rafExecutions++;
            ticking = false;
        }
        nextFrameTime += frameInterval;
    }
}

console.log(`[Optimized - RAF] Handler executions: ${rafExecutions}`);

const reduction = ((baselineExecutions - rafExecutions) / baselineExecutions) * 100;
console.log(`\nReduction in main thread work: ${reduction.toFixed(2)}%`);
