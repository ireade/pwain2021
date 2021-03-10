const notificationPermissionButton = document.getElementById('notification-permission');
const notificationSendButton = document.getElementById('notification-send');

if ('Notification' in window) {

    if (Notification.permission === "granted") {
        notificationPermissionButton.setAttribute('hidden', 'hidden');
    }

    notificationPermissionButton.addEventListener('click', () => {
        Notification.requestPermission();
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
    notificationPermissionButton.setAttribute('hidden', 'hidden');
    notificationSendButton.setAttribute('hidden', 'hidden');
}