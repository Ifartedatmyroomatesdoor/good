document.getElementById('upload-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const fileInput = document.getElementById('file-input');
    const creatorName = document.getElementById('creator-name').value;
    const customFileName = document.getElementById('custom-file-name').value;
    const file = fileInput.files[0];

    if (!file || !creatorName || !customFileName) {
        alert('Please provide all the necessary details.');
        return;
    }

    // Call function to handle Google Drive file upload
    uploadFileToGoogleDrive(file, customFileName, creatorName);
});

// Function to handle Google Drive file upload
async function uploadFileToGoogleDrive(file, customFileName, creatorName) {
    const CLIENT_ID = '865778740775-odft7evm2et64cvmpd67cctsubqaou7e.apps.googleusercontent.com';
    const API_KEY = 'AIzaSyAknxCCIpR9cM_PLmcF6pq5xwNyT9VaVOI';
    const SCOPES = 'https://www.googleapis.com/auth/drive.file';

    gapi.load('client:auth2', () => {
        gapi.client.init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            scope: SCOPES,
        }).then(() => {
            gapi.auth2.getAuthInstance().signIn().then(() => {
                const metadata = {
                    'name': customFileName, // Set custom file name
                    'mimeType': file.type,
                    'parents': ['1rXdghmc9xtljJfbQF1Dz8bhFbvhrxsJF']  // Optional: Set the folder to upload to
                };

                const formData = new FormData();
                formData.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
                formData.append('file', file);

                // Upload file to Google Drive
                fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${gapi.auth.getToken().access_token}`,
                    },
                    body: formData,
                }).then(response => response.json())
                .then(data => {
                    alert('File uploaded successfully');
                    saveFileMetadata(customFileName, data.id, creatorName);  // Save metadata to Firestore
                }).catch(err => {
                    console.error('Error uploading file:', err);
                    alert('Upload failed.');
                });
            });
        });
    });
}

// Save metadata (custom file name, file ID, creator) to Firestore
function saveFileMetadata(customFileName, fileId, creatorName) {
    db.collection('files').add({
        name: customFileName,
        driveId: fileId,
        creator: creatorName,
        uploadedAt: firebase.firestore.FieldValue.serverTimestamp(),
    }).then(() => {
        alert('File metadata saved successfully');
        // Redirect to collections after upload
        window.location.href = 'collections.html';
    }).catch(err => {
        console.error('Error saving file metadata:', err);
        alert('Failed to save file metadata.');
    });
}
