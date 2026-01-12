# Video Link Indicator

A Google-style web application that checks if video links (MP4 files) are live and accessible.

## Features

- 🎨 Clean Google-inspired design
- 🔴/🟢 Live indicator showing video availability status
- ✅ URL validation for MP4 links
- 📹 Video preview when link is accessible
- ⚡ Real-time link checking

## How to Use

1. Open `index.html` in a web browser
2. Enter a video URL that points to an `.mp4` file
3. Click "Check Link" or press Enter
4. The indicator will show:
   - 🔵 **Blue (Checking)**: Currently checking the link
   - 🟢 **Green (Live)**: Video link is accessible and live
   - 🔴 **Red (Offline)**: Video link is not accessible or invalid

## Technical Details

The application uses JavaScript's Video API to check if a video URL is accessible by attempting to load its metadata. If the video loads successfully, it displays a green "live" indicator. If it fails or times out (10 seconds), it shows a red "offline" indicator.

## Files

- `index.html` - Main HTML page
- `style.css` - Styling with Google-inspired design
- `script.js` - JavaScript functionality for link checking

## Example Usage

```
Valid MP4 URL: http://example.com/video.mp4
```

The checker will validate:
- URL format is correct
- URL ends with `.mp4`
- Video is accessible and can be loaded
