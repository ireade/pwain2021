


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

        openFile.setAttribute('hidden', 'hidden');
        saveFile.removeAttribute('hidden');
        fileEditor.removeAttribute('hidden');

        saveFile.addEventListener('click', async () => {
            const writable = await fileHandle.createWritable();
            await writable.write(fileEditor.value);
            await writable.close();

            openFile.removeAttribute('hidden');
            saveFile.setAttribute('hidden', 'hidden');
            fileEditor.setAttribute('hidden', 'hidden');
        });

    });


} else {
    document.getElementById('feat-file-system-access')
        .insertAdjacentHTML('beforeend', '<p class="error">Feature not available (File System Acess)</p>');
}


if ('launchQueue' in window) {

    launchQueue.setConsumer((launchParams) => {
        
        // Nothing to do when the queue is empty.
        if (!launchParams.files.length) {
          return;
        }

        console.log(launchParams.files)
        
        for (const fHandle of launchParams.files) {
          console.log(fHandle)
        }
      });


}  else {
    document.getElementById('feat-file-system-access')
        .insertAdjacentHTML('beforeend', '<p class="error">Feature not available (File Handling)</p>');
}