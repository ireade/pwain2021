
if ('BackgroundFetchManager' in self) {

    const backgroundFetch = document.getElementById('background-fetch');
    backgroundFetch.removeAttribute('hidden');

    backgroundFetch.addEventListener('click', () => {

        navigator.serviceWorker.ready.then(async (registration) => {

            const videoFetch = await registration.backgroundFetch.fetch('video-fetch', ['/media/video.mp4'], {
                title: 'Funny Video',
                icons: [{ sizes: '300x300', src: '/images/icon-256.png', type: 'image/png', }],
                downloadTotal: 21 * 1024 * 1024,
            });

            videoFetch.addEventListener('progress', (event) => {
                if (!videoFetch.downloadTotal) return;

                const percent = Math.round(videoFetch.downloaded / videoFetch.downloadTotal * 100);
                document.getElementById('background-fetch-progress').textContent = `Download progress: ${percent}%`;
            });

        });

    });

} else {
    document.getElementById('feat-background-fetch')
        .insertAdjacentHTML('beforeend', '<p class="error">Feature not available</p>');
}
