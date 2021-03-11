
if ('contacts' in navigator) {

    const getContacts = document.getElementById('get-contacts');
    getContacts.removeAttribute('hidden');

    getContacts.addEventListener('click', async () => {

        const contacts = await navigator.contacts.select(
            ['name', 'email', 'tel', 'icon'],
            {multiple: true}
        );

        alert(contacts[0].name)

        document.getElementById('sample-contact').innerHTML = `
            <p>Name: ${contacts[0].name}</p>
            <p>Email: ${contacts[0].email}</p>
            <p>Tel: ${contacts[0].tel}</p>
            <p><img src="${icon}" alt=""></p>
        `;
    });


} else {
    document.getElementById('feat-contact-picker')
        .insertAdjacentHTML('beforeend', '<p class="error">Feature not available</p>');
}
