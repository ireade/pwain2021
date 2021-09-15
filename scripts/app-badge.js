
if ('setAppBadge' in navigator) {

    const setAppBadge = document.getElementById('set-app-badge');
    const clearAppBadge = document.getElementById('clear-app-badge');

    setAppBadge.removeAttribute('hidden');
    clearAppBadge.removeAttribute('hidden');

    console.log("here");

    setAppBadge.addEventListener('click', () => {
        // @todo 1 - set app badge to a random number
        const num = Math.floor(Math.random() * 20) + 1;
        console.log(num);
        navigator.setAppBadge(num);
    });

    clearAppBadge.addEventListener('click', () => {
        // @todo 2 - clear app badge
        navigator.clearAppBadge();
    });
} else {
    document.getElementById('feat-app-badge')
        .insertAdjacentHTML('beforeend', '<p class="error">Feature not available</p>');
}



