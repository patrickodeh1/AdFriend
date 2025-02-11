# AdFriend

AdFriend is a Chrome extension designed to replace online advertisements with positive and uplifting content, enhancing your browsing experience.

## Features

- **Custom Messages**: Personalize the content displayed in place of ads by adding your own messages.
- **Themes**: Choose from various themes to customize the appearance of the replaced content.
- **Widget Types**: Select different widgets such as Motivational Quotes, Quick Polls, Fun Facts, Daily Challenges, Break Timers, or Mindfulness Prompts to display instead of ads.

## Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/patrickodeh1/AdFriend
   ```

2. **Open Chrome and Navigate to the Extensions Page**:

   Enter `chrome://extensions/` in the address bar.

3. **Enable Developer Mode**:

   Toggle the "Developer mode" switch located at the top right corner of the page.

4. **Load the Extension**:

   - Click on the "Load unpacked" button.
   - Select the AdFriend directory from the cloned repository.

## Usage

### Accessing Settings

- Click on the AdFriend icon in the Chrome toolbar.
- Select "Options" to open the settings page.

### Customizing Content

- **Custom Messages**: Add, edit, or remove messages that will replace ads.
- **Themes**: Choose your preferred theme from the dropdown menu.
- **Widget Types**: Select the type of widget to display in place of ads.

### Saving Settings

- After making changes, click the "Save Settings" button to apply them.

## File Structure

- `manifest.json`: Contains the extension's metadata and configuration.
- `background.js`: Handles background processes.
- `content.js`: Manages content script operations.
- `options.html`: The settings page interface.
- `options.js`: Logic for the settings page.
- `styles.css`: Styling for the extension.
- `icons/`: Directory containing the extension's icons.

## Contributing

We welcome contributions to enhance AdFriend. To contribute:

### Fork the Repository

- Click the "Fork" button on the repository's GitHub page.

### Create a New Branch

   ```bash
   git checkout -b feature/YourFeatureName
   ```

### Make Your Changes

- Implement your feature or fix.

### Commit Your Changes

   ```bash
   git commit -m 'Add feature: YourFeatureName'
   ```

### Push to Your Branch

   ```bash
   git push origin feature/YourFeatureName
   ```

### Submit a Pull Request

- Navigate to the original repository and click "New Pull Request."

