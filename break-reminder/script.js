/**
 * Break Reminder App
 * Manages eye breaks (20-20-20 rule) and movement breaks
 */

// State constants
const STATES = {
  START: "start",
  MAIN_TIMER: "mainTimer",
  EYES_ALARM: "eyesAlarm",
  MOVEMENT_ALARM: "movementAlarm",
};

/* For testing */
// Timer constants (in seconds)
// const EYES_INTERVAL = 0.5 * 60; // 0.5 minutes
// const EYES_BREAK_DURATION = 5; // 5 seconds
// const DEFAULT_MOVEMENT_INTERVAL = 0.5 * 60; // 0.5 minutes
// const DEFAULT_MOVEMENT_BREAK_DURATION = 0.2 * 60; // 0.2 minutes

// // Movement interval configuration (in minutes)
// const MIN_MOVEMENT_INTERVAL = 1; // Minimum movement interval in minutes
// const MAX_MOVEMENT_INTERVAL = 3; // Maximum movement interval in minutes
// const MOVEMENT_INTERVAL_STEP = 1; // Step size for movement interval slider
/* For testing ends */

// Timer constants (in seconds)
const EYES_INTERVAL = 20 * 60; // 20 minutes
const EYES_BREAK_DURATION = 20; // 20 seconds
const DEFAULT_MOVEMENT_INTERVAL = 45 * 60; // 45 minutes
const DEFAULT_MOVEMENT_BREAK_DURATION = 2 * 60; // 2 minutes

// Movement interval configuration (in minutes)
const MIN_MOVEMENT_INTERVAL = 30; // Minimum movement interval in minutes
const MAX_MOVEMENT_INTERVAL = 60; // Maximum movement interval in minutes
const MOVEMENT_INTERVAL_STEP = 1; // Step size for movement interval slider

// App state
let currentState = STATES.START;
let eyesTimerRemaining = EYES_INTERVAL;
let movementTimerRemaining = DEFAULT_MOVEMENT_INTERVAL;
let eyesBreakTimerRemaining = EYES_BREAK_DURATION;
let movementBreakTimerRemaining = DEFAULT_MOVEMENT_BREAK_DURATION;

// Timer start times (for handling tab inactivity)
let eyesTimerStartTime = null;
let movementTimerStartTime = null;
let eyesBreakTimerStartTime = null;
let movementBreakTimerStartTime = null;

// Configuration
let movementInterval = DEFAULT_MOVEMENT_INTERVAL;
let movementBreakDuration = DEFAULT_MOVEMENT_BREAK_DURATION;

// Intervals
let eyesTimerInterval = null;
let movementTimerInterval = null;
let eyesBreakInterval = null;
let movementBreakInterval = null;
let soundInterval = null; // For continuous beeping

// DOM elements
const startState = document.getElementById("start-state");
const mainTimerState = document.getElementById("main-timer-state");
const eyesAlarmState = document.getElementById("eyes-alarm-state");
const movementAlarmState = document.getElementById("movement-alarm-state");

const startButton = document.getElementById("start-button");
const stopButton = document.getElementById("stop-button");
const eyesBreakDoneButton = document.getElementById("eyes-break-done-button");
const movementBreakDoneButton = document.getElementById(
  "movement-break-done-button"
);

const eyesTimerDisplay = document.getElementById("eyes-timer-display");
const movementTimerDisplay = document.getElementById("movement-timer-display");
const eyesBreakTimerDisplay = document.getElementById(
  "eyes-break-timer-display"
);
const movementBreakTimerDisplay = document.getElementById(
  "movement-break-timer-display"
);

const movementIntervalSlider = document.getElementById("movement-interval");
const movementIntervalValue = document.getElementById(
  "movement-interval-value"
);
const movementBreakDurationSlider = document.getElementById(
  "movement-break-duration"
);
const movementBreakDurationValue = document.getElementById(
  "movement-break-duration-value"
);

/**
 * Format seconds to MM:SS
 */
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

/**
 * Show a specific state view
 */
function showState(state) {
  // Hide all states
  startState.classList.add("hidden");
  mainTimerState.classList.add("hidden");
  eyesAlarmState.classList.add("hidden");
  movementAlarmState.classList.add("hidden");

  // Show the requested state
  switch (state) {
    case STATES.START:
      startState.classList.remove("hidden");
      break;
    case STATES.MAIN_TIMER:
      mainTimerState.classList.remove("hidden");
      break;
    case STATES.EYES_ALARM:
      eyesAlarmState.classList.remove("hidden");
      break;
    case STATES.MOVEMENT_ALARM:
      movementAlarmState.classList.remove("hidden");
      break;
  }
  currentState = state;
  saveState();
}

/**
 * Request notification permission
 */
async function requestNotificationPermission() {
  if ("Notification" in window && Notification.permission === "default") {
    await Notification.requestPermission();
  }
}

/**
 * Show browser notification
 */
function showNotification(title, body) {
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification(title, {
      body: body,
      icon: "/favicon.ico",
      badge: "/favicon.ico",
    });
  }
}

/**
 * Play a single beep sound
 */
function playBeep() {
  try {
    // Create a simple beep sound using Web Audio API
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = "sine";

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 0.5
    );

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  } catch (error) {
    console.warn("Could not play sound:", error);
  }
}

/**
 * Start continuous beeping at 2-second intervals
 */
function startContinuousBeep() {
  // Stop any existing beeping
  stopContinuousBeep();

  // Play immediately
  playBeep();

  // Then repeat every 2 seconds
  soundInterval = setInterval(() => {
    playBeep();
  }, 2000);
}

/**
 * Stop continuous beeping
 */
function stopContinuousBeep() {
  if (soundInterval) {
    clearInterval(soundInterval);
    soundInterval = null;
  }
}

/**
 * Start the eyes timer
 */
function startEyesTimer() {
  const now = Date.now();
  eyesTimerStartTime = now;

  // Clear any existing interval
  if (eyesTimerInterval) {
    clearInterval(eyesTimerInterval);
  }

  // Update timer every second
  eyesTimerInterval = setInterval(() => {
    updateEyesTimer();
  }, 1000);

  // Initial update
  updateEyesTimer();
}

/**
 * Update eyes timer based on elapsed time
 */
function updateEyesTimer() {
  if (!eyesTimerStartTime) return;

  const now = Date.now();
  const elapsed = Math.floor((now - eyesTimerStartTime) / 1000);
  eyesTimerRemaining = Math.max(0, EYES_INTERVAL - elapsed);
  // Only update display if we're in main timer state
  if (currentState === STATES.MAIN_TIMER) {
    eyesTimerDisplay.textContent = formatTime(eyesTimerRemaining);
  }

  // Allow alarm to trigger even if we're in movement alarm state
  if (eyesTimerRemaining === 0 && currentState !== STATES.EYES_ALARM) {
    triggerEyesAlarm();
  }
}

/**
 * Start the movement timer
 */
function startMovementTimer() {
  const now = Date.now();
  movementTimerStartTime = now;

  // Clear any existing interval
  if (movementTimerInterval) {
    clearInterval(movementTimerInterval);
  }

  // Update timer every second
  movementTimerInterval = setInterval(() => {
    updateMovementTimer();
  }, 1000);

  // Initial update
  updateMovementTimer();
}

/**
 * Update movement timer based on elapsed time
 */
function updateMovementTimer() {
  if (!movementTimerStartTime) return;

  const now = Date.now();
  const elapsed = Math.floor((now - movementTimerStartTime) / 1000);
  movementTimerRemaining = Math.max(0, movementInterval - elapsed);
  // Only update display if we're in main timer state
  if (currentState === STATES.MAIN_TIMER) {
    movementTimerDisplay.textContent = formatTime(movementTimerRemaining);
  }

  // Allow alarm to trigger even if we're in eyes alarm state
  if (movementTimerRemaining === 0 && currentState !== STATES.MOVEMENT_ALARM) {
    triggerMovementAlarm();
  }
}

/**
 * Start both main timers
 */
function startMainTimers() {
  startEyesTimer();
  startMovementTimer();
}

/**
 * Trigger eyes alarm
 */
function triggerEyesAlarm() {
  // Pause only the eyes timer
  clearInterval(eyesTimerInterval);
  eyesTimerInterval = null;

  // Show alarm state
  showState(STATES.EYES_ALARM);

  // Reset eyes timer
  eyesTimerRemaining = EYES_INTERVAL;
  eyesTimerStartTime = null;

  // Reset break timer
  eyesBreakTimerRemaining = EYES_BREAK_DURATION;
  eyesBreakTimerStartTime = Date.now();

  // Show notification and start continuous beeping
  showNotification(
    "Eye Break Time!",
    "Look at something 20 feet away for 20 seconds"
  );
  startContinuousBeep();

  // Start break countdown
  if (eyesBreakInterval) {
    clearInterval(eyesBreakInterval);
  }
  eyesBreakInterval = setInterval(() => {
    updateEyesBreakTimer();
  }, 1000);
  updateEyesBreakTimer();
}

/**
 * Update eyes break timer
 */
function updateEyesBreakTimer() {
  if (eyesBreakTimerStartTime) {
    const now = Date.now();
    const elapsed = Math.floor((now - eyesBreakTimerStartTime) / 1000);
    eyesBreakTimerRemaining = Math.max(0, EYES_BREAK_DURATION - elapsed);
    eyesBreakTimerDisplay.textContent = formatTime(eyesBreakTimerRemaining);

    if (eyesBreakTimerRemaining === 0) {
      clearInterval(eyesBreakInterval);
      eyesBreakInterval = null;
      // Auto-complete after timer ends
      completeEyesBreak();
    }
  }
}

/**
 * Complete eyes break and return to main timer
 */
function completeEyesBreak() {
  clearInterval(eyesBreakInterval);
  eyesBreakInterval = null;

  // Stop continuous beeping
  stopContinuousBeep();

  // Reset and restart only the eyes timer
  eyesTimerRemaining = EYES_INTERVAL;
  startEyesTimer();

  // Return to main timer view (movement timer continues running)
  showState(STATES.MAIN_TIMER);

  // Immediately update movement timer display since it was running in background
  updateMovementTimer();
}

/**
 * Trigger movement alarm
 */
function triggerMovementAlarm() {
  // Pause only the movement timer
  clearInterval(movementTimerInterval);
  movementTimerInterval = null;

  // Show alarm state
  showState(STATES.MOVEMENT_ALARM);

  // Reset movement timer
  movementTimerRemaining = movementInterval;
  movementTimerStartTime = null;

  // Reset break timer
  movementBreakTimerRemaining = movementBreakDuration;
  movementBreakTimerStartTime = Date.now();

  // Show notification and start continuous beeping
  showNotification(
    "Movement Break Time!",
    `Move, walk, or stretch for ${formatTime(movementBreakDuration)}`
  );
  startContinuousBeep();

  // Start break countdown
  if (movementBreakInterval) {
    clearInterval(movementBreakInterval);
  }
  movementBreakInterval = setInterval(() => {
    updateMovementBreakTimer();
  }, 1000);
  updateMovementBreakTimer();
}

/**
 * Update movement break timer
 */
function updateMovementBreakTimer() {
  if (movementBreakTimerStartTime) {
    const now = Date.now();
    const elapsed = Math.floor((now - movementBreakTimerStartTime) / 1000);
    movementBreakTimerRemaining = Math.max(0, movementBreakDuration - elapsed);
    movementBreakTimerDisplay.textContent = formatTime(
      movementBreakTimerRemaining
    );

    if (movementBreakTimerRemaining === 0) {
      clearInterval(movementBreakInterval);
      movementBreakInterval = null;
      // Auto-complete after timer ends
      completeMovementBreak();
    }
  }
}

/**
 * Complete movement break and return to main timer
 */
function completeMovementBreak() {
  clearInterval(movementBreakInterval);
  movementBreakInterval = null;

  // Stop continuous beeping
  stopContinuousBeep();

  // Reset and restart only the movement timer
  movementTimerRemaining = movementInterval;
  startMovementTimer();

  // Return to main timer view (eyes timer continues running)
  showState(STATES.MAIN_TIMER);

  // Immediately update eyes timer display since it was running in background
  updateEyesTimer();
}

/**
 * Stop all timers and reset
 */
function stopTimers() {
  clearInterval(eyesTimerInterval);
  clearInterval(movementTimerInterval);
  clearInterval(eyesBreakInterval);
  clearInterval(movementBreakInterval);
  eyesTimerInterval = null;
  movementTimerInterval = null;
  eyesBreakInterval = null;
  movementBreakInterval = null;

  // Stop continuous beeping
  stopContinuousBeep();

  eyesTimerStartTime = null;
  movementTimerStartTime = null;
  eyesBreakTimerStartTime = null;
  movementBreakTimerStartTime = null;

  eyesTimerRemaining = EYES_INTERVAL;
  movementTimerRemaining = movementInterval;
  eyesBreakTimerRemaining = EYES_BREAK_DURATION;
  movementBreakTimerRemaining = movementBreakDuration;

  showState(STATES.START);
  clearState();
}

/**
 * Save state to localStorage
 */
function saveState() {
  const state = {
    currentState: currentState,
    eyesTimerRemaining: eyesTimerRemaining,
    movementTimerRemaining: movementTimerRemaining,
    eyesBreakTimerRemaining: eyesBreakTimerRemaining,
    movementBreakTimerRemaining: movementBreakTimerRemaining,
    eyesTimerStartTime: eyesTimerStartTime,
    movementTimerStartTime: movementTimerStartTime,
    eyesBreakTimerStartTime: eyesBreakTimerStartTime,
    movementBreakTimerStartTime: movementBreakTimerStartTime,
    movementInterval: movementInterval,
    movementBreakDuration: movementBreakDuration,
    timestamp: Date.now(),
  };
  localStorage.setItem("breakReminderState", JSON.stringify(state));
}

/**
 * Load state from localStorage
 */
function loadState() {
  try {
    const saved = localStorage.getItem("breakReminderState");
    if (!saved) return false;

    const state = JSON.parse(saved);

    // Check if state is too old (more than 24 hours)
    const age = Date.now() - state.timestamp;
    if (age > 24 * 60 * 60 * 1000) {
      clearState();
      return false;
    }

    // Restore configuration
    movementInterval = state.movementInterval || DEFAULT_MOVEMENT_INTERVAL;
    movementBreakDuration =
      state.movementBreakDuration || DEFAULT_MOVEMENT_BREAK_DURATION;
    movementIntervalSlider.value = movementInterval / 60;
    movementIntervalValue.textContent = movementInterval / 60;
    movementBreakDurationSlider.value = movementBreakDuration / 60;
    movementBreakDurationValue.textContent = movementBreakDuration / 60;

    // Restore timer states
    currentState = state.currentState;
    eyesTimerRemaining = state.eyesTimerRemaining || EYES_INTERVAL;
    movementTimerRemaining = state.movementTimerRemaining || movementInterval;
    eyesBreakTimerRemaining =
      state.eyesBreakTimerRemaining || EYES_BREAK_DURATION;
    movementBreakTimerRemaining =
      state.movementBreakTimerRemaining || movementBreakDuration;

    // Restore start times and adjust for elapsed time
    if (state.eyesTimerStartTime) {
      const elapsed = Math.floor((Date.now() - state.timestamp) / 1000);
      eyesTimerStartTime =
        Date.now() - (EYES_INTERVAL - eyesTimerRemaining + elapsed) * 1000;
    }
    if (state.movementTimerStartTime) {
      const elapsed = Math.floor((Date.now() - state.timestamp) / 1000);
      movementTimerStartTime =
        Date.now() -
        (movementInterval - movementTimerRemaining + elapsed) * 1000;
    }
    if (state.eyesBreakTimerStartTime) {
      const elapsed = Math.floor((Date.now() - state.timestamp) / 1000);
      eyesBreakTimerStartTime =
        Date.now() -
        (EYES_BREAK_DURATION - eyesBreakTimerRemaining + elapsed) * 1000;
    }
    if (state.movementBreakTimerStartTime) {
      const elapsed = Math.floor((Date.now() - state.timestamp) / 1000);
      movementBreakTimerStartTime =
        Date.now() -
        (movementBreakDuration - movementBreakTimerRemaining + elapsed) * 1000;
    }

    // Restore UI state
    if (currentState === STATES.MAIN_TIMER) {
      showState(STATES.MAIN_TIMER);
      startMainTimers();
    } else if (currentState === STATES.EYES_ALARM) {
      showState(STATES.EYES_ALARM);
      if (eyesBreakInterval) clearInterval(eyesBreakInterval);
      eyesBreakInterval = setInterval(() => {
        updateEyesBreakTimer();
      }, 1000);
    } else if (currentState === STATES.MOVEMENT_ALARM) {
      showState(STATES.MOVEMENT_ALARM);
      if (movementBreakInterval) clearInterval(movementBreakInterval);
      movementBreakInterval = setInterval(() => {
        updateMovementBreakTimer();
      }, 1000);
    } else {
      showState(STATES.START);
    }

    return true;
  } catch (error) {
    console.error("Error loading state:", error);
    clearState();
    return false;
  }
}

/**
 * Clear saved state
 */
function clearState() {
  localStorage.removeItem("breakReminderState");
}

/**
 * Update configuration from sliders
 */
function updateConfiguration() {
  movementInterval = parseInt(movementIntervalSlider.value) * 60;
  movementBreakDuration = parseInt(movementBreakDurationSlider.value) * 60;
  movementIntervalValue.textContent = movementIntervalSlider.value;
  movementBreakDurationValue.textContent = movementBreakDurationSlider.value;

  // Update movement timer display if in main timer state
  if (currentState === STATES.MAIN_TIMER) {
    movementTimerRemaining = movementInterval;
    movementTimerDisplay.textContent = formatTime(movementTimerRemaining);
  }

  // Update movement break timer display if in alarm state
  if (currentState === STATES.MOVEMENT_ALARM) {
    movementBreakTimerRemaining = movementBreakDuration;
    movementBreakTimerDisplay.textContent = formatTime(
      movementBreakTimerRemaining
    );
  }
}

// Event listeners
startButton.addEventListener("click", async () => {
  await requestNotificationPermission();

  // Initialize timers
  eyesTimerRemaining = EYES_INTERVAL;
  movementTimerRemaining = movementInterval;

  showState(STATES.MAIN_TIMER);
  startMainTimers();
});

stopButton.addEventListener("click", stopTimers);

eyesBreakDoneButton.addEventListener("click", completeEyesBreak);

movementBreakDoneButton.addEventListener("click", completeMovementBreak);

movementIntervalSlider.addEventListener("input", updateConfiguration);
movementBreakDurationSlider.addEventListener("input", updateConfiguration);

// Handle visibility change (tab becomes active/inactive)
document.addEventListener("visibilitychange", () => {
  if (!document.hidden && currentState === STATES.MAIN_TIMER) {
    // Tab became active, recalculate timers
    updateEyesTimer();
    updateMovementTimer();
  }
});

// Initialize on load
window.addEventListener("load", () => {
  // Set slider attributes from constants
  movementIntervalSlider.min = MIN_MOVEMENT_INTERVAL;
  movementIntervalSlider.max = MAX_MOVEMENT_INTERVAL;
  movementIntervalSlider.step = MOVEMENT_INTERVAL_STEP;

  // Try to load saved state
  const loaded = loadState();

  if (!loaded) {
    // Set default configuration display
    movementIntervalValue.textContent = movementIntervalSlider.value;
    movementBreakDurationValue.textContent = movementBreakDurationSlider.value;
    showState(STATES.START);
  }
});

// Save state periodically
setInterval(() => {
  if (currentState !== STATES.START) {
    saveState();
  }
}, 5000); // Save every 5 seconds
