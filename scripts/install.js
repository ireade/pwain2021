const installFeature = document.getElementById('feat-install');
const installButton = document.getElementById('install');
let installPrompt;

window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    installPrompt = event;
    installButton.removeAttribute('hidden');
});

installButton.addEventListener('click', async (event) => {
    installPrompt.prompt();

    const { outcome } = await installPrompt.userChoice;
    if (outcome === "accepted" ) {
        installButton.setAttribute('hidden', 'hidden');
    } else {
        installFeature.insertAdjacentHTML('beforeend', '<p>Prompt not accepted</p>');
    }

    installPrompt = null;
});

window.addEventListener('appinstalled', (event) => {
    installButton.setAttribute('hidden', 'hidden');
    installPrompt = null;
    installFeature.insertAdjacentHTML('beforeend', '<p>Install successful (from appinstalled)!</p>');
});
