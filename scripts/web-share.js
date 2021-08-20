if (navigator.share) {

    const webShare = document.getElementById('web-share');
    webShare.removeAttribute('hidden');

    webShare.addEventListener('click', async () => {
        navigator.share({
            title: 'PWA in 2021',
            text: 'Try out this demo app of web capabilities!',
            url: 'https://pwain2021.netlify.app',
        });
    });

} else {
    document.getElementById('feat-web-share')
        .insertAdjacentHTML('beforeend', '<p class="error">Feature not available</p>');
}
