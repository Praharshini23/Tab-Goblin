# Tab-Goblin
Tab Goblin is a Chrome extension that helps users manage excessive open browser tabs. It tracks inactive tabs, displays them based on how long they have been unused, and puts selected tabs to sleep to reduce memory usage without closing them. It also includes a Keep list to protect important tabs and a session-saving feature 

# Tab Goblin

Tab Goblin is a local-first Chrome and Microsoft Edge extension for keeping a crowded tab bar in check.

## In Chrome or Edge

1. Open `chrome://extensions` in Chrome, or `edge://extensions` in Edge.
2. Turn on **Developer mode**.
3. Choose **Load unpacked** and select the `tab-goblin` project folder.
4. Pin the Goblin extension if you want its quick tab summary in the toolbar.

## Features

- Live count of open tabs across browser windows.
- Finds tabs that have not been active for at least an hour using the browser's `lastAccessed` time.
- **Sleep** discards an inactive page but leaves its tab open; the page reloads when you activate it. The browser decides whether a page can be discarded.
- Star important tabs. Bulk sleep skips starred tabs.
- Save up to 12 named sessions, including their window layout, active tab, and pinned state. Restore a session into new windows.
- Search and filter tabs in the full dashboard.

Tab titles, URLs, saved sessions, and important-tab markers remain in the browser's local extension storage. The extension does not collect browsing data or connect to a server. Browser-internal pages are not included in session snapshots.

