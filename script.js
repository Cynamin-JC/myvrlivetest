document.addEventListener('DOMContentLoaded', function() {
    const videoUrlInput = document.getElementById('videoUrl');
    const checkBtn = document.getElementById('checkBtn');
    const indicator = document.getElementById('indicator');
    const indicatorText = indicator.querySelector('.indicator-text');
    const videoPreview = document.getElementById('videoPreview');
    const videoPlayer = document.getElementById('videoPlayer');

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
        if (!isValidUrl(url)) {
            showIndicator('offline', 'Invalid URL format');
            return;
        }

        // Check if URL ends with .mp4
        if (!url.toLowerCase().endsWith('.mp4')) {
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
                testVideo.src = '';
            }
        }, 10000); // 10 second timeout

        testVideo.addEventListener('loadedmetadata', function() {
            loaded = true;
            clearTimeout(timeout);
            showIndicator('live', 'Video link is live!');
            loadVideoPreview(url);
        });

        testVideo.addEventListener('error', function() {
            errored = true;
            clearTimeout(timeout);
            showIndicator('offline', 'Video link is not accessible or offline');
        });

        // Start loading the video
        testVideo.src = url;
        testVideo.load();
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
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }
});
