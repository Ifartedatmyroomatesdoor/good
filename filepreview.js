// Retrieve stored file details from localStorage
const fileName = localStorage.getItem('file');
const customFileName = localStorage.getItem('customFileName');
const creatorName = localStorage.getItem('creator');

// Display file preview details
document.getElementById('preview-file-name').innerText = fileName;
document.getElementById('preview-custom-file-name').innerText = customFileName;
document.getElementById('preview-creator-name').innerText = creatorName;
