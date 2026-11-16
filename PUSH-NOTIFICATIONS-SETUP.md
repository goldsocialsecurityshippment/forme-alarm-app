# FORME Daily Routine — iPhone notification upgrade

This update adds the Progressive Web App foundation:
- Home Screen web-app metadata and manifest
- Service worker registration
- Offline app-shell caching
- Service-worker notification display and tap handling
- Permission request from the in-app button

## Important limitation

This does **not yet send scheduled reminders while the app is closed**. The service worker can display incoming push messages, but a trusted push sender/backend and a user subscription are still required. The timetable currently lives in this device's localStorage, so a backend must be added to securely store schedules and send pushes at the correct local times. Do not put provider REST/API secrets in this repository or in browser JavaScript.

## Test on iPhone

1. Wait for GitHub Pages to redeploy.
2. Remove the old FORME Home Screen shortcut.
3. Open the HTTPS site in Safari and add it to the Home Screen again.
4. Launch it from the new Home Screen icon.
5. Tap **Enable notifications & voice** and allow notifications.
6. Confirm that the test notification appears.

The existing in-app timer and voice announcement still require the app to remain active; iOS may suspend them in the background.
