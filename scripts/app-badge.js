
if ('setAppBadge' in navigator) {

    const setAppBadge = document.getElementById('set-app-badge');
    const clearAppBadge = document.getElementById('clear-app-badge');

    setAppBadge.removeAttribute('hidden');
    clearAppBadge.removeAttribute('hidden');

    setAppBadge.addEventListener('click', () => {
        const num = Math.floor(Math.random() * 20) + 1;
        navigator.setAppBadge(num);
    });

    clearAppBadge.addEventListener('click', () => {
        navigator.clearAppBadge();
    });
} else {
    document.getElementById('feat-app-badge')
        .insertAdjacentHTML('beforeend', '<p class="error">Feature not available</p>');
}



