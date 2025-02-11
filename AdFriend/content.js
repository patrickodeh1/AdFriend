(function () {
  console.log("Extension loaded: Replacing ads with useful widgets...");

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

  const adSelectors = [
    "div.ad-container",
    ".adsbygoogle",
    "ins.adsbygoogle",
    "div[id^='google_ads']",
    "iframe[src*='googlesyndication']"
  ];

  function getRandomFunResponse() {
    const responses = [
      "Great choice! 🚀",
      "Interesting pick! 🤔",
      "That's a popular answer! 🎯",
      "You have good taste! 😎",
      "That’s a bold choice! 💪",
      "Noted! We’ll remember that. 😉"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  function handlePollButtonClick(event) {
    const button = event.target;
    const pollQuestion = button.parentElement.querySelector("b").textContent;
    const selectedAnswer = button.textContent;

    // Show a fun response instead of a generic confirmation
    const responseMessage = getRandomFunResponse();
    alert(`"${selectedAnswer}" to "${pollQuestion}"\n${responseMessage}`);

    button.style.backgroundColor = "#4CAF50";
    button.style.color = "white";
    button.disabled = true;
  }

  function addPollEventListeners(widgetContainer) {
    const pollButtons = widgetContainer.querySelectorAll(".poll-btn");
    pollButtons.forEach(button => {
      button.addEventListener("click", handlePollButtonClick);
    });
  }

  function replaceAds() {
    const adContainers = document.querySelectorAll(adSelectors.join(", "));

    adContainers.forEach(ad => {
      if (!ad || !ad.isConnected) return;

      const adWidth = ad.offsetWidth || 300;
      const adHeight = ad.offsetHeight || 250;

      const widget = widgets[Math.floor(Math.random() * widgets.length)];
      const messagesArray = widget.messages;
      const randomMessage = messagesArray[Math.floor(Math.random() * messagesArray.length)];

      const widgetContainer = document.createElement("div");
      widgetContainer.className = "widget-container theme-" + settings.theme;
      widgetContainer.style.width = `${adWidth}px`;
      widgetContainer.style.height = `${adHeight}px`;
      widgetContainer.innerHTML = `
        <h4 class="widget-title">${widget.title}</h4>
        <p class="widget-message">${randomMessage}</p>
      `;

      if (widget.title === "Quick Poll") {
        addPollEventListeners(widgetContainer);
      }

      widgetContainer.classList.add("loaded");

      // **Replace the entire ad container instead of just clearing it**
      const replacementDiv = document.createElement("div");
      replacementDiv.className = "replacement-widget";
      replacementDiv.appendChild(widgetContainer);

      ad.replaceWith(replacementDiv);
    });
  }

  const style = document.createElement("style");
  style.textContent = `
    .widget-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      background-color: #f9f9f9;
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 15px;
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
      font-size: clamp(12px, 4vw, 16px);
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
    .poll-btn:disabled {
      background-color: #4CAF50;
      cursor: not-allowed;
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

  let customMessages = [];
  const settings = { widgetType: "default", theme: "default" };

  chrome.storage.sync.get(["customMessages", "widgetType", "theme"], (result) => {
    customMessages = result.customMessages || [];
    settings.widgetType = result.widgetType || "default";
    settings.theme = result.theme || "default";

    replaceAds();

    const observer = new MutationObserver(replaceAds);
    observer.observe(document.body, { childList: true, subtree: true });
  });
})();
