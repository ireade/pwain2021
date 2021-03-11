
if ('contacts' in navigator) {

    const getContacts = document.getElementById('get-contacts');
    getContacts.removeAttribute('hidden');

    getContacts.addEventListener('click', async () => {

        const contacts = await navigator.contacts.select(
            ['name', 'email', 'tel'],
            {multiple: true}
        );

        if (!contacts[0]) return;

        const name = contacts[0].name[0];
        const email = contacts[0].email[0];
        const tel = contacts[0].tel[0];

        document.getElementById('sample-contact').innerHTML = `
            <p>Name: ${name}</p>
            <p>Email: ${email}</p>
            <p>Tel: ${tel}</p>
            <br>
            <p>${JSON.stringify(contacts[0])}</p>
        `;
    });

} else {
    document.getElementById('feat-contact-picker')
        .insertAdjacentHTML('beforeend', '<p class="error">Feature not available</p>');
}
