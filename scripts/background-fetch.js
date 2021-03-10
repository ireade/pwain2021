document.getElementById('background-fetch').addEventListener('click', () => {
        
    navigator.serviceWorker.ready.then(async (registration) => {
        const videoFetch = await registration.backgroundFetch.fetch('video-fetch', ['/media/audio.mp4'], {
            title: 'Funny Video',
            icons: [{ sizes: '300x300', src: '/images/icon-256.png', type: 'image/png', }],
            downloadTotal: 60 * 1024 * 1024,
        });

        videoFetch.addEventListener('progress', () => {
            const percent = Math.round(videoFetch.downloaded / videoFetch.downloadTotal * 100);
            document.getElementById('background-fetch-progress').textContent = `Download progress: ${percent}%`;
        });
    });

  });