const { hrtime } = require('process');

const ITERATIONS = 100000;
const RETENTION_MS = 2000;
const FRAME_TIME_MS = 16;

function runBenchmark(name, implementation) {
    let trail = [];
    let currentTime = 0;

    // Warmup
    for (let i = 0; i < 1000; i++) {
        currentTime += FRAME_TIME_MS;
        trail.push({ timestamp: currentTime });
        trail = implementation(trail, currentTime);
    }

    // Reset
    trail = [];
    currentTime = 0;

    // Fill buffer to steady state first
    for (let i = 0; i < (RETENTION_MS / FRAME_TIME_MS) + 10; i++) {
        currentTime += FRAME_TIME_MS;
        trail.push({ timestamp: currentTime });
        trail = implementation(trail, currentTime);
    }

    const start = hrtime.bigint();

    for (let i = 0; i < ITERATIONS; i++) {
        currentTime += FRAME_TIME_MS;
        trail.push({ timestamp: currentTime });
        trail = implementation(trail, currentTime);
    }

    const end = hrtime.bigint();
    const timeInMs = Number(end - start) / 1e6;

    console.log(`${name}: ${timeInMs.toFixed(3)} ms`);
    return timeInMs;
}

// Current Implementation
const filterImpl = (trail, now) => {
    return trail.filter(t => now - t.timestamp < RETENTION_MS);
};

// Optimization: While + Shift
// Note: In the real app, trailRef.current is modified in place.
// The benchmark function expects the array to be returned, but for in-place mods we return the same array.
const shiftImpl = (trail, now) => {
    while (trail.length > 0 && now - trail[0].timestamp >= RETENTION_MS) {
        trail.shift();
    }
    return trail;
};

console.log(`Running benchmark with ${ITERATIONS} iterations...`);
console.log(`Simulated retention: ${RETENTION_MS}ms, Frame time: ${FRAME_TIME_MS}ms`);
console.log('---');

const t1 = runBenchmark("Filter (Current)", filterImpl);
const t2 = runBenchmark("While/Shift (Optimized)", shiftImpl);

const improvement = ((t1 - t2) / t1) * 100;
console.log('---');
console.log(`Improvement: ${improvement.toFixed(2)}%`);
