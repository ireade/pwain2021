if ('launchQueue' in window) {

}  else {
    document.getElementById('feat-file-system-access')
        .insertAdjacentHTML('beforeend', '<p class="error">Feature not available (File Handling)</p>');
}