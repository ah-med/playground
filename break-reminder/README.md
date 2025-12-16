# Break Reminder Web App

A web application that helps you take regular breaks for eye rest and movement, following the 20-20-20 rule for eyes and customizable movement intervals.

## Features

- **Eye Breaks**: Reminds you every 20 minutes to look at something 20 feet away for 20 seconds (20-20-20 rule)
- **Movement Breaks**: Reminds you to stand up and move at configurable intervals (30-60 minutes, default 45 minutes)
- **Simultaneous Timers**: Both timers run independently and simultaneously
- **Browser Notifications**: Get notified even when the tab is not active
- **Sound Alerts**: Audio alerts when break time arrives
- **Visual Alerts**: Prominent on-screen alerts with countdown timers
- **State Persistence**: Automatically saves your progress and restores on page reload
- **Configurable Settings**: Adjust movement interval and break duration to your preferences

## Usage

1. **Start the App**: Open `index.html` in a web browser
2. **Configure Settings** (optional):
   - Movement Interval: Set how often you want movement reminders (30-60 minutes)
   - Movement Break Duration: Set how long your movement breaks should be (1-5 minutes)
3. **Click Start**: Begin the timers
4. **Take Breaks**: When an alarm triggers:
   - **Eye Break**: Look at something 20 feet away for 20 seconds, then click "Done"
   - **Movement Break**: Move, walk, or stretch for the configured duration, then click "Done"
5. **Stop Anytime**: Click "Stop" to pause and reset all timers

## How It Works

- **Eyes Timer**: Counts down from 20:00. When it reaches 0, an alarm triggers prompting you to look 20 feet away for 20 seconds.
- **Movement Timer**: Counts down from your configured interval (default 45:00). When it reaches 0, an alarm triggers prompting you to move for the configured duration.
- Both timers run simultaneously and independently.
- When a break completes, that timer resets and continues counting down.
- The app automatically saves your state every 5 seconds and restores it when you reload the page.

## Browser Compatibility

- Modern browsers with support for:
  - ES6 JavaScript
  - CSS Grid and Flexbox
  - Web Notifications API
  - Web Audio API
  - LocalStorage

## Permissions

The app will request notification permission when you first click "Start". This allows you to receive alerts even when the browser tab is not active. You can deny this permission and still use the app with visual and sound alerts.

## Technical Details

- Pure HTML, CSS, and JavaScript (no dependencies)
- Uses timestamp-based timing to handle browser tab inactivity
- State persistence via localStorage
- Responsive design for mobile and desktop

## File Structure

```
break-reminder/
├── index.html      # Main HTML structure
├── style.css       # Styling for all states
├── script.js       # Timer logic and state management
└── README.md       # This file
```

