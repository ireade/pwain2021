if ('serviceWorker' in navigator) {

    navigator.serviceWorker.ready.then(async (registration) => {

        if ('periodicSync' in registration) {

            const periodicBackgroundSync = document.getElementById('periodic-background-sync');
            periodicBackgroundSync.removeAttribute('hidden');

            periodicBackgroundSync.addEventListener('click', () => {

                // @todo 1 - register 'periodic-sync-demo'
                registration.periodicSync.register('periodic-sync-demo', {
                    minInterval: 24 * 60 * 60 * 1000, // Once a day
                });

            });

        } else {
            document.getElementById('feat-periodic-background-sync')
                .insertAdjacentHTML('beforeend', '<p class="error">Feature not available</p>');
        }

    });

} else {
    document.getElementById('feat-periodic-background-sync')
        .insertAdjacentHTML('beforeend', '<p class="error">Feature not available</p>');
}
