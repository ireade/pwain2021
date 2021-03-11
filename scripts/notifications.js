
if ('Notification' in window) {

    const notificationPermissionButton = document.getElementById('notification-permission');
    const notificationSendButton = document.getElementById('notification-send');

    if (Notification.permission === "granted") {
        notificationPermissionButton.setAttribute('hidden', 'hidden');
        notificationSendButton.removeAttribute('hidden');
    } else {
        notificationPermissionButton.removeAttribute('hidden');
    }

    notificationPermissionButton.addEventListener('click', async () => {
        const permission = await Notification.requestPermission();

        if (permission === "granted") {
            notificationPermissionButton.setAttribute('hidden', 'hidden');
            notificationSendButton.removeAttribute('hidden');
        }
    });

    notificationSendButton.addEventListener('click', () => {
        navigator.serviceWorker.ready.then(function(registration) {
            registration.showNotification(
                'Hello AEA!',
                { body: 'How are you doing?', icon: '/images/icon-256.png' }
            );
        });
    });

} else {
    document.getElementById('feat-notifications')
        .insertAdjacentHTML('beforeend', '<p class="error">Feature not available</p>');
}