# Video Link Indicator

A Google-style web application that displays a list of video links with live online/offline indicators. Fully compatible with Google Sites.

## Features

- 🎨 Clean Google-inspired design
- 📋 **Video link list** with status indicators for each link
- 🔴/🟢 **Live indicators** next to each link (online/offline)
- ➕ **Add links** via input field
- 🗑️ **Delete links** from the list
- 🔃 **Manual refresh** for individual links
- ⚡ **Auto-refresh** - rechecks all links every 30 seconds
- 📹 **Video preview** - click any link to play the video
- 🌐 **Google Sites compatible** - single HTML file with inline CSS/JS
- 🔒 Secure URL validation (only http/https protocols)

## How to Use

### For Regular Web Hosting:
1. Open `index.html` in a web browser
2. The premade link (cynamin.live.mp4) will automatically be checked
3. Add more links by entering URLs in the input field and clicking "Add Link"
4. Watch the indicators update automatically

### For Google Sites:
1. Copy the entire contents of `index.html`
2. In Google Sites, add an "Embed" element
3. Paste the HTML code
4. The application will work directly in your Google Site

**Note for Google Sites**: Due to iframe security and CORS restrictions in Google Sites, the indicator uses smart detection that assumes videos are online when they encounter typical CORS errors. This is because the video server is reachable but cross-origin policies prevent full metadata loading. If you see "Online" status, the video link is accessible.

## Status Indicators

- 🔵 **Blue (Checking)**: Currently checking the link status
- 🟢 **Green (Online)**: Video link is accessible and live
- 🔴 **Red (Offline)**: Video link is not accessible

## Example

The application comes with a premade link:
```
https://stream.vrcdn.live/live/cynamin.live.mp4
```

You can add more similar links using the input field.

## Technical Details

- **Video Detection**: Uses a multi-method approach to check video accessibility:
  1. Fetch API with 'no-cors' mode for initial check
  2. Video element metadata loading as fallback
  3. Smart error handling for CORS/iframe restrictions
- **Google Sites Compatibility**: When CORS errors occur (common in Google Sites), the checker assumes the video is online since the URL was reachable
- **Auto-Refresh**: Automatically rechecks all links every 30 seconds to keep status current
- **Timeout**: 10-second timeout per check to prevent hanging
- **CORS Support**: Includes crossOrigin attribute for cross-domain video checking
- **Memory Safe**: Properly cleans up video elements to prevent memory leaks

### Google Sites Compatibility
- All CSS and JavaScript are inline (no external files needed)
- No localStorage or external dependencies
- Works in restricted iframe environments
- ES5-compatible JavaScript for broad browser support

## Browser Compatibility

Works with all modern browsers that support:
- HTML5 Video API
- JavaScript ES5+
- CSS3

## Files

- `index.html` - Complete standalone application (use this for Google Sites)
- `style.css` - Separate CSS file (optional, not needed if using inline version)
- `script.js` - Separate JS file (optional, not needed if using inline version)

**Note**: For Google Sites, only `index.html` is needed as it contains everything inline.
