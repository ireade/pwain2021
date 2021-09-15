
if ('Notification' in window) {

    const notificationPermissionButton = document.getElementById('notification-permission');
    const notificationSendButton = document.getElementById('notification-send');

    function handleNotificationPermission(permission) {
        if (permission === "granted") {
            notificationPermissionButton.setAttribute('hidden', 'hidden');
            notificationSendButton.removeAttribute('hidden');

            setupNotificationSendButton();
        } else {
            notificationPermissionButton.removeAttribute('hidden');
            notificationSendButton.setAttribute('hidden', 'hidden');

            notificationPermissionButton.addEventListener('click', async () => {
                // @todo 2 - request permission
                const permission = await Notification.requestPermission();
                handleNotificationPermission(permission);
            });
        }
    }

    function setupNotificationSendButton() {
        notificationSendButton.addEventListener('click', () => {
            // @todo 3 - send notification
            navigator.serviceWorker.ready.then(function(registration) {
                registration.showNotification(
                    'Hey MS Web Community',
                    { body: 'How are you doing?', icon: '/images/icon-256.png' }
                );
            });
        });
    }

    // @todo 1 - determine initial permission
    handleNotificationPermission(Notification.permission); 

} else {
    document.getElementById('feat-notifications')
        .insertAdjacentHTML('beforeend', '<p class="error">Feature not available</p>');
}
