document.addEventListener('DOMContentLoaded', () => {
    const videoPlayer = document.createElement('div');
    videoPlayer.id = 'floating-video-player';

    // Add HTML content for the floating video player
    videoPlayer.innerHTML = `
        <video width="320" height="180" controls>
            <source src="your-video-link.mp4" type="video/mp4">
            Your browser does not support the video tag.
        </video>
        <button id="close-video-player">Close</button>
    `;

    // Style the floating player
    videoPlayer.style.position = 'fixed';
    videoPlayer.style.bottom = '20px';
    videoPlayer.style.right = '20px';
    videoPlayer.style.zIndex = '1000';
    videoPlayer.style.backgroundColor = '#fff';
    videoPlayer.style.boxShadow = '0px 4px 6px rgba(0,0,0,0.1)';
    videoPlayer.style.padding = '10px';
    videoPlayer.style.borderRadius = '8px';

    document.body.appendChild(videoPlayer);

    // Close button functionality
    document.getElementById('close-video-player').addEventListener('click', () => {
        videoPlayer.remove();
    });
});
