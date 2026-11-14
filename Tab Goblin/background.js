const DEFAULTS = { important: [], sessions: [] };

function getData(callback) {
  chrome.storage.local.get(DEFAULTS, data => callback({ ...DEFAULTS, ...data }));
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get(DEFAULTS, data => chrome.storage.local.set({ ...DEFAULTS, ...data }));
});

chrome.runtime.onMessage.addListener((message, _sender, respond) => {
  if (message?.type !== 'tab-goblin:restore-session') return;
  const session = message.session;
  if (!session?.windows?.length) { respond({ ok: false, error: 'This saved session is empty.' }); return; }
  (async () => {
    try {
      for (const savedWindow of session.windows) {
        const valid = (savedWindow.tabs || []).filter(t => /^https?:/.test(t.url || ''));
        if (!valid.length) continue;
        const first = valid[0];
        const win = await chrome.windows.create({ url: first.url, focused: false, type: 'normal' });
        const winTabs = await chrome.tabs.query({ windowId: win.id });
        if (winTabs[0] && first.pinned) await chrome.tabs.update(winTabs[0].id, { pinned: true });
        for (const tab of valid.slice(1)) {
          await chrome.tabs.create({ windowId: win.id, url: tab.url, active: false, pinned: !!tab.pinned });
        }
        if (winTabs[0]) {
          const restored = await chrome.tabs.query({ windowId: win.id });
          const activeIndex = valid.findIndex(t => t.active);
          if (restored[activeIndex >= 0 ? activeIndex : 0]) await chrome.tabs.update(restored[activeIndex >= 0 ? activeIndex : 0].id, { active: true });
        }
      }
      respond({ ok: true });
    } catch (error) { respond({ ok: false, error: error.message || 'Could not restore this session.' }); }
  })();
  return true;
});
