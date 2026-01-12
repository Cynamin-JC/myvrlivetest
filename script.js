document.addEventListener('DOMContentLoaded', function() {
    const videoUrlInput = document.getElementById('videoUrl');
    const checkBtn = document.getElementById('checkBtn');
    const indicator = document.getElementById('indicator');
    const indicatorText = indicator.querySelector('.indicator-text');
    const videoPreview = document.getElementById('videoPreview');
    const videoPlayer = document.getElementById('videoPlayer');

    // Configuration constants
    const CHECK_TIMEOUT_MS = 10000;
    const SUPPORTED_FORMATS = ['.mp4'];

    // Check link when button is clicked
    checkBtn.addEventListener('click', function() {
        const url = videoUrlInput.value.trim();
        if (url) {
            checkVideoLink(url);
        } else {
            showIndicator('offline', 'Please enter a video URL');
        }
    });

    // Check link when Enter is pressed
    videoUrlInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const url = videoUrlInput.value.trim();
            if (url) {
                checkVideoLink(url);
            }
        }
    });

    function checkVideoLink(url) {
        // Show checking state
        showIndicator('checking', 'Checking link...');
        videoPreview.classList.add('hidden');

        // Validate URL format
        const urlObj = isValidUrl(url);
        if (!urlObj) {
            showIndicator('offline', 'Invalid URL format');
            return;
        }

        // Check if URL ends with supported format by examining pathname
        const pathname = urlObj.pathname.toLowerCase();
        const hasValidFormat = SUPPORTED_FORMATS.some(format => 
            pathname.endsWith(format)
        );
        if (!hasValidFormat) {
            showIndicator('offline', 'URL must point to an .mp4 file');
            return;
        }

        // Try to load the video
        const testVideo = document.createElement('video');
        
        let loaded = false;
        let errored = false;

        // Set a timeout for the check
        const timeout = setTimeout(() => {
            if (!loaded && !errored) {
                showIndicator('offline', 'Link is not responding or offline');
                cleanupVideo(testVideo);
            }
        }, CHECK_TIMEOUT_MS);

        testVideo.addEventListener('loadedmetadata', function() {
            loaded = true;
            clearTimeout(timeout);
            showIndicator('live', 'Video link is live!');
            loadVideoPreview(url);
            cleanupVideo(testVideo);
        });

        testVideo.addEventListener('error', function() {
            errored = true;
            clearTimeout(timeout);
            showIndicator('offline', 'Video link is not accessible or offline');
            cleanupVideo(testVideo);
        });

        // Start loading the video
        testVideo.src = url;
        testVideo.load();
    }

    function cleanupVideo(videoElement) {
        // Clean up video element to prevent memory leaks
        try {
            videoElement.src = '';
            videoElement.load();
            if (videoElement.parentNode) {
                videoElement.remove();
            }
        } catch (e) {
            // Safely ignore cleanup errors
        }
    }

    function showIndicator(status, message) {
        indicator.classList.remove('hidden', 'live', 'offline', 'checking');
        indicator.classList.add(status);
        indicatorText.textContent = message;
    }

    function loadVideoPreview(url) {
        videoPlayer.src = url;
        videoPreview.classList.remove('hidden');
    }

    function isValidUrl(string) {
        try {
            const url = new URL(string);
            // Only allow http and https protocols for security
            if (url.protocol !== 'http:' && url.protocol !== 'https:') {
                return null;
            }
            return url;
        } catch (_) {
            return null;
        }
    }
});
