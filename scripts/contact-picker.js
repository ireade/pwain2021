
if ('contacts' in navigator) {

    const getContacts = document.getElementById('get-contacts');
    getContacts.removeAttribute('hidden');

    getContacts.addEventListener('click', async () => {

        const contacts = await navigator.contacts.select(
            ['name', 'email', 'tel', 'icon'],
            {multiple: true}
        );

        alert(contacts[0])

        const sample = document.getElementById('sample-contact');
    });


} else {
    document.getElementById('feat-contact-picker')
        .insertAdjacentHTML('beforeend', '<p class="error">Feature not available</p>');
}
