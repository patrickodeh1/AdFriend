document.addEventListener("DOMContentLoaded", async () => {
    const toggle = document.getElementById("toggleEnabled");
    const statusText = document.getElementById("statusText");
  
    // Load the current state.
    const { enabled = true } = await chrome.storage.sync.get("enabled");
    toggle.checked = enabled;
    statusText.textContent = enabled ? "Enabled" : "Disabled";
  
    // Toggle handler: update setting and reload the active tab.
    toggle.addEventListener("change", async () => {
      await chrome.storage.sync.set({ enabled: toggle.checked });
      statusText.textContent = toggle.checked ? "Enabled" : "Disabled";
  
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true
      });
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => location.reload()
      });
    });
  });
  