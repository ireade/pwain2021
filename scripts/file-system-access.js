

if ('showOpenFilePicker' in window) {

    const openFile = document.getElementById('open-file');
    const saveFile = document.getElementById('save-file');
    const fileEditor = document.getElementById('file-editor');

    openFile.removeAttribute('hidden');

    let fileHandle;

    openFile.addEventListener('click', async () => {
        // @todo 1 - show file picker
        // [fileHandle] = await window.showOpenFilePicker({
        //     multiple: false,
        //     excludeAcceptAllOption: true,
        //     types: [{
        //         description: 'Text files',
        //         accept: {
        //             'text/*': ['.txt', '.html', '.css', '.js', '.csv']
        //         }
        //     }]
        // });

        // @todo 2 - get and display file contents in textarea
        // const file = await fileHandle.getFile();
        // const contents = await file.text();
        // fileEditor.value = contents;

        openFile.setAttribute('hidden', 'hidden');
        saveFile.removeAttribute('hidden');
        fileEditor.removeAttribute('hidden');

        saveFile.addEventListener('click', async () => {
            // @todo 3 - save file
            // const writable = await fileHandle.createWritable();
            // await writable.write(fileEditor.value);
            // await writable.close();

            openFile.removeAttribute('hidden');
            saveFile.setAttribute('hidden', 'hidden');
            fileEditor.setAttribute('hidden', 'hidden');
        });

    });


} else {
    document.getElementById('feat-file-system-access')
        .insertAdjacentHTML('beforeend', '<p class="error">Feature not available (File System Acess)</p>');
}
