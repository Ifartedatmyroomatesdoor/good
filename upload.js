document.getElementById('upload-form').addEventListener('submit', (e) => {
    e.preventDefault();

    console.log('Upload form submitted.'); // Debugging log

    const fileInput = document.getElementById('file-input');
    const creatorName = document.getElementById('creator-name').value;
    const customFileName = document.getElementById('custom-file-name').value;
    const file = fileInput.files[0];

    if (!file || !creatorName || !customFileName) {
        alert('Please provide all the necessary details.');
        console.log('Missing file, creator name, or custom file name.'); // Debugging log
        return;
    }

    console.log('Starting file upload...'); // Debugging log

    // Call function to handle Google Drive file upload
    uploadFileToGoogleDrive(file, customFileName, creatorName);
});

async function uploadFileToGoogleDrive(file, customFileName, creatorName) {
    console.log('Preparing to upload file to Google Drive...'); // Debugging log

    const CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID'; // Replace with actual Client ID
    const API_KEY = 'YOUR_GOOGLE_API_KEY'; // Replace with actual API Key
    const SCOPES = 'https://www.googleapis.com/auth/drive.file';

    gapi.load('client:auth2', () => {
        gapi.client.init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            scope: SCOPES,
        }).then(() => {
            console.log('Google API client initialized. Signing in...'); // Debugging log

            gapi.auth2.getAuthInstance().signIn().then(() => {
                console.log('Signed into Google API successfully.'); // Debugging log

                const metadata = {
                    'name': customFileName, // Set custom file name
                    'mimeType': file.type
                };

                const formData = new FormData();
                formData.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
                formData.append('file', file);

                // Upload file to Google Drive
                console.log('Uploading file to Google Drive...'); // Debugging log

                fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${gapi.auth.getToken().access_token}`,
                    },
                    body: formData,
                }).then(response => response.json())
                .then(data => {
                    console.log('File uploaded to Google Drive. File ID:', data.id); // Debugging log
                    alert('File uploaded successfully');
                    saveFileMetadata(customFileName, data.id, creatorName);  // Save metadata to Firestore
                }).catch(err => {
                    console.error('Error uploading file:', err); // Debugging log for errors
                    alert('Upload failed.');
                });
            }).catch(err => {
                console.error('Error signing in to Google:', err); // Debugging log for sign-in errors
            });
        }).catch(err => {
            console.error('Error initializing Google API client:', err); // Debugging log for API init errors
        });
    });
}

// Save metadata (custom file name, file ID, creator) to Firestore
function saveFileMetadata(customFileName, fileId, creatorName) {
    console.log('Saving file metadata to Firestore...'); // Debugging log

    db.collection('files').add({
        name: customFileName,
        driveId: fileId,
        creator: creatorName,
        uploadedAt: firebase.firestore.FieldValue.serverTimestamp(),
    }).then(() => {
        console.log('File metadata saved successfully.'); // Debugging log
        alert('File metadata saved successfully');
        // Redirect to collections after upload
        window.location.href = 'collections.html';
    }).catch(err => {
        console.error('Error saving file metadata to Firestore:', err); // Debugging log for Firestore errors
        alert('Failed to save file metadata.');
    });
}
