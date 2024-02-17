function sendData() {
    const dataField = document.getElementById('dataField').value;

    fetch('/postendpoint', { // Ensure the URL matches your Python endpoint
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: dataField }),
    })
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch((error) => console.error('Error:', error));
}

