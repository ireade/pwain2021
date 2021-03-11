if (navigator.share) {

    const webShare = document.getElementById('web-share');
    webShare.removeAttribute('hidden');

    webShare.addEventListener('click', async () => {
        navigator.share({
            title: 'An Event Apart Spring Summit',
            text: 'Check out An Event Apart\’s latest conference!',
            url: 'https://aneventapart.com/event/spring-summit-2021',
        });
    });

} else {
    document.getElementById('feat-web-share')
        .insertAdjacentHTML('beforeend', '<p class="error">Feature not available</p>');
}
