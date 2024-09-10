// Fetch and display uploaded files
function loadCollections() {
    db.collection('files').get().then(querySnapshot => {
        const collectionGrid = document.getElementById('collection-grid');
        collectionGrid.innerHTML = ''; // Clear any previous collections

        querySnapshot.forEach(doc => {
            const fileData = doc.data();
            const collectionItem = document.createElement('div');
            collectionItem.className = 'collection-item';
            collectionItem.innerHTML = `
                <h3>${fileData.name}</h3>
                <p>Uploaded by: ${fileData.creator}</p>
                <a href="https://drive.google.com/file/d/${fileData.driveId}/view" target="_blank">View File</a>
            `;
            collectionGrid.appendChild(collectionItem);
        });
    }).catch(err => {
        console.error('Error fetching collections:', err);
        alert('Failed to load collections.');
    });
}

loadCollections();
