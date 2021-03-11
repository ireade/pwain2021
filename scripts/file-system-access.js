
if ('showOpenFilePicker' in window) {

    const openFile = document.getElementById('open-file');
    const saveFile = document.getElementById('save-file');
    const fileEditor = document.getElementById('file-editor');

    openFile.removeAttribute('hidden');


    let fileHandle;

    openFile.addEventListener('click', async () => {
        [fileHandle] = await window.showOpenFilePicker({
            multiple: false,
            excludeAcceptAllOption: true,
            types: [{
                description: 'Text files',
                accept: {
                    'text/*': ['.txt', '.html', '.css', '.js', '.csv']
                }
            }]
        });
        const file = await fileHandle.getFile();
        const contents = await file.text();

        fileEditor.value = contents;

        saveFile.removeAttribute('hidden');
        fileEditor.removeAttribute('hidden');

        saveFile.addEventListener('click', async () => {
            const writable = await fileHandle.createWritable();
            await writable.write(fileEditor.value);
            await writable.close();
        });

    });


} else {
    document.getElementById('feat-file-system-access')
        .insertAdjacentHTML('beforeend', '<p class="error">Feature not available</p>');
}
