const installFeature = document.getElementById('feat-install');
const installButton = document.getElementById('install');
let installPrompt;

// @todo 1 - detect if PWA can be installed
// window.addEventListener('beforeinstallprompt', (event) => {

//     // @todo 2 - intercept default install prompt and show a custom install button
//     // event.preventDefault();
//     // installPrompt = event;
//     // installButton.removeAttribute('hidden');

// });

installButton.addEventListener('click', async (event) => {

    // @todo 3 - show install prompt
    // installPrompt.prompt();

    // @todo 4 - get user choice
    // const { outcome } = await installPrompt.userChoice;
    // if (outcome === "accepted" ) {
    //     installButton.setAttribute('hidden', 'hidden');
    // } else {
    //     installFeature.insertAdjacentHTML('beforeend', '<p>Prompt not accepted</p>');
    // }

    installPrompt = null;
});

// @todo 5 - cleanup
// window.addEventListener('appinstalled', (event) => {
//     installButton.setAttribute('hidden', 'hidden');
//     installPrompt = null;
//     installFeature.insertAdjacentHTML('beforeend', '<p>Install successful (from appinstalled)!</p>');
// });
