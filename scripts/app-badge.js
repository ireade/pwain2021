
document.getElementById('set-app-badge').addEventListener('click', () => {
    const num = Math.floor(Math.random() * 20) + 1;
    navigator.setAppBadge(num);
});

document.getElementById('clear-app-badge').addEventListener('click', () => {
    navigator.clearAppBadge()
});
