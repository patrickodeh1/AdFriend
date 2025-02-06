document.addEventListener("DOMContentLoaded", async () => {
  // Get stored settings, with defaults.
  const { customMessages = [], theme = "default", widgetType = "default" } =
    await chrome.storage.sync.get(["customMessages", "theme", "widgetType"]);

  // Clone the custom messages array for manipulation.
  let messages = [...customMessages];

  const messagesContainer = document.getElementById("messagesContainer");
  const themeSelect = document.getElementById("themeSelect");
  const widgetTypeSelect = document.getElementById("widgetTypeSelect");

  // Function to render message inputs.
  function loadMessages() {
    messagesContainer.innerHTML = "";
    messages.forEach((message, index) => {
      const div = document.createElement("div");
      div.className = "message-input";
      div.innerHTML = `
        <input type="text" value="${message}" class="form-control" data-index="${index}">
        <button class="btn remove-btn" data-index="${index}">🗑</button>
      `;
      messagesContainer.appendChild(div);
    });
  }

  // Add new message input.
  document.getElementById("addMessage").addEventListener("click", () => {
    messages.push("");
    loadMessages();
  });

  // Remove message input.
  messagesContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-btn")) {
      const index = parseInt(e.target.dataset.index);
      messages.splice(index, 1);
      loadMessages();
    }
  });

  // Save settings when button is clicked.
  document.getElementById("saveSettings").addEventListener("click", async () => {
    const inputs = Array.from(document.querySelectorAll(".message-input input"));
    const updatedMessages = inputs
      .map((input) => input.value.trim())
      .filter(Boolean);
    await chrome.storage.sync.set({
      customMessages: updatedMessages,
      theme: themeSelect.value,
      widgetType: widgetTypeSelect.value
    });
    alert("Settings saved!");
  });

  // Initialize the selects and load existing messages.
  themeSelect.value = theme;
  widgetTypeSelect.value = widgetType;
  loadMessages();
});
