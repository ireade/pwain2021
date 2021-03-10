document.getElementById('web-share').addEventListener('click', async () => {

    if (navigator.share) {
        navigator.share({
            title: 'An Event Apart Spring Summit',
            text: 'Check out An Event Apart\’s latest conference!',
            url: 'https://aneventapart.com/event/spring-summit-2021',
        });
    }

  });