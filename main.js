const firebaseConfig = {
    apiKey: "AIzaSyDmEc-So0p1YAyL4IAXJfykxT1FpveWZQk",
    authDomain: "danii2-s-archive.firebaseapp.com",
    databaseURL: "https://danii2-s-archive-default-rtdb.firebaseio.com",
    projectId: "danii2-s-archive",
    storageBucket: "danii2-s-archive.appspot.com",
    messagingSenderId: "33435698450",
    appId: "1:33435698450:web:48315e7d5fb743b3955fcb",
    measurementId: "G-YG71QD39G4"
  };

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Handle User Login
document.getElementById('login').addEventListener('click', async () => {
    const email = prompt('Enter your email:');
    const password = prompt('Enter your password:');
    try {
        await auth.signInWithEmailAndPassword(email, password);
        alert('Logged in successfully');
        showUploadSection();
    } catch (error) {
        alert('Login failed: ' + error.message);
    }
});

// Show Upload Section if Authenticated
function showUploadSection() {
    const uploadSection = document.getElementById('upload-section');
    auth.onAuthStateChanged(user => {
        if (user) {
            uploadSection.style.display = 'block';
        } else {
            uploadSection.style.display = 'none';
        }
    });
}

// Handle File Upload
document.getElementById('upload-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];
    
    if (!file) return alert('Please select a file.');

    // Call Google Drive API to upload the file
    uploadFileToGoogleDrive(file)
        .then(response => {
            alert('File uploaded successfully!');
            saveFileMetadata(file.name, response.id);
        })
        .catch(error => {
            console.error('Error uploading file:', error);
            alert('Upload failed.');
        });
});

// Upload file to Google Drive (you need OAuth 2.0)
async function uploadFileToGoogleDrive(file) {
    // Implement Google Drive upload here
    // Use Google API Client to authenticate and upload
}

// Save file metadata to Firebase Firestore
function saveFileMetadata(fileName, fileId) {
    db.collection('files').add({
        name: fileName,
        driveId: fileId,
        uploadedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
}
