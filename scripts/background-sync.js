if ('SyncManager' in window) {

    const backgroundSync = document.getElementById('background-sync');
    backgroundSync.removeAttribute('hidden');

    backgroundSync.addEventListener('click', () => {

        navigator.serviceWorker.ready.then(async (registration) => {
            await registration.sync.register('do-background-sync');
        });

    });

} else {
    document.getElementById('feat-background-sync')
        .insertAdjacentHTML('beforeend', '<p class="error">Feature not available</p>');
}
