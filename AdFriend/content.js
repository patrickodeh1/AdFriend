(function () {
  console.log("Extension loaded: Replacing ads with useful widgets...");

  // Default widget configurations.
  const widgets = [
    {
      title: "Motivation",
      messages: [
        "Believe in yourself and all that you are! 💪",
        "Hard work beats talent when talent doesn’t work hard. 🔥",
        "Success is the sum of small efforts, repeated daily. 🚀"
      ]
    },
    {
      title: "Quick Poll",
      messages: [
        "<b>What's your favorite tech stack?</b> <br> <button class='poll-btn'>Frontend</button> <button class='poll-btn'>Backend</button> <button class='poll-btn'>Fullstack</button>",
        "<b>Do you prefer night mode?</b> <br> <button class='poll-btn'>Yes</button> <button class='poll-btn'>No</button>",
        "<b>Would you rather work remotely?</b> <br> <button class='poll-btn'>Yes</button> <button class='poll-btn'>No</button>"
      ]
    },
    {
      title: "Fun Fact",
      messages: [
        "Did you know? Honey never spoils! 🍯",
        "Octopuses have three hearts! 🐙",
        "Bananas are berries, but strawberries aren’t! 🍓"
      ]
    },
    {
      title: "Daily Challenge",
      messages: [
        "Today’s challenge: Avoid social media for 2 hours! ⏳",
        "Today’s challenge: Read 5 pages of a book. 📖",
        "Today’s challenge: Drink 2 liters of water. 💧"
      ]
    }
  ];

  // Define selectors for ad containers.
  const adSelectors = [
    "div.ad-container",
    ".adsbygoogle",
    "ins.adsbygoogle",
    "div[id^='google_ads']",
    "iframe[src*='googlesyndication']"
  ];

  // Function to handle poll button clicks.
  function handlePollButtonClick(event) {
    const button = event.target;
    const pollQuestion = button.parentElement.querySelector("b").textContent;
    const selectedAnswer = button.textContent;
    alert(`You answered "${selectedAnswer}" to "${pollQuestion}"`);
    // Optionally, change the button style to indicate selection.
    button.style.backgroundColor = "#4CAF50";
    button.style.color = "white";
    button.disabled = true;
  }

  // Function to add event listeners to poll buttons.
  function addPollEventListeners(widgetContainer) {
    const pollButtons = widgetContainer.querySelectorAll(".poll-btn");
    pollButtons.forEach(button => {
      button.addEventListener("click", handlePollButtonClick);
    });
  }

  // Main function to replace ads with widgets.
  function replaceAds() {
    const adContainers = document.querySelectorAll(adSelectors.join(", "));
    adContainers.forEach(ad => {
      if (!ad || !ad.isConnected || ad.querySelector(".widget-container")) return;

      // Get container dimensions (defaulting to common ad sizes if necessary).
      const adWidth = ad.offsetWidth || 300;
      const adHeight = ad.offsetHeight || 250;

      // Choose a random widget.
      const widget = widgets[Math.floor(Math.random() * widgets.length)];

      // Determine what message array to use based on widgetType:
      // - "default": use widget.defaultMessages combined with customMessages (if any)
      // - "custom": use customMessages exclusively (if available; else default)
      // - "others": use widget.messages (default only)
      let messagesArray = widget.messages;
      if (settings.widgetType === "default") {
        messagesArray = customMessages.length > 0 ? widget.messages.concat(customMessages) : widget.messages;
      } else if (settings.widgetType === "custom") {
        messagesArray = customMessages.length > 0 ? customMessages : widget.messages;
      } else if (settings.widgetType === "others") {
        messagesArray = widget.messages;
      }

      // Choose a random message from the determined array.
      const randomMessage = messagesArray[Math.floor(Math.random() * messagesArray.length)];

      // Create widget container and apply the selected theme.
      const widgetContainer = document.createElement("div");
      widgetContainer.className = "widget-container theme-" + settings.theme;
      widgetContainer.style.width = `${adWidth}px`;
      widgetContainer.style.height = `${adHeight}px`;
      widgetContainer.innerHTML = `
        <h4 class="widget-title">${widget.title}</h4>
        <p class="widget-message">${randomMessage}</p>
      `;

      // Replace ad content with widget.
      ad.innerHTML = "";
      ad.appendChild(widgetContainer);

      // Add poll event listeners if needed.
      if (widget.title === "Quick Poll") {
        addPollEventListeners(widgetContainer);
      }

      // Fade-in effect.
      setTimeout(() => widgetContainer.classList.add("loaded"), 50);
    });
  }

  // Inject CSS for widget styling and theme support.
  const style = document.createElement("style");
  style.textContent = `
    .widget-container {
      background-color: #f9f9f9;
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 15px;
      text-align: center;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      opacity: 0;
      transition: opacity 0.5s ease-in-out;
    }
    .widget-container.loaded {
      opacity: 1;
    }
    .widget-title {
      font-size: 18px;
      color: #333;
      margin-bottom: 10px;
    }
    .widget-message {
      font-size: 14px;
      color: #666;
    }
    .poll-btn {
      margin: 5px;
      padding: 8px 12px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .poll-btn:hover {
      background-color: #0056b3;
    }
    /* Example theme-specific styles */
    .theme-default {
      /* Default theme styles */
    }
    .theme-dark {
      background-color: #333;
      color: #f9f9f9;
    }
    .theme-dark .widget-title {
      color: #fff;
    }
  `;
  document.head.appendChild(style);

  // Retrieve stored settings from chrome.storage.
  let customMessages = [];
  const settings = {
    widgetType: "default", // options: "default", "custom", "others"
    theme: "default"       // theme option chosen by user
  };

  chrome.storage.sync.get(["customMessages", "widgetType", "theme"], (result) => {
    customMessages = result.customMessages || [];
    settings.widgetType = result.widgetType || "default";
    settings.theme = result.theme || "default";

    // Now run the ad replacement.
    replaceAds();

    // Use a MutationObserver to monitor DOM changes.
    const observer = new MutationObserver(replaceAds);
    observer.observe(document.body, { childList: true, subtree: true });
  });
})();
