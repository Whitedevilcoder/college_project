
const form = document.getElementById('templateForm');
const previewBtn = document.getElementById('previewBtn');
const pdfPreview = document.getElementById('pdfPreview');

previewBtn.addEventListener('click', () => {
    const formData = new FormData(form);
    const jsonData = {};
    formData.forEach((value, key) => {
        jsonData[key] = value;
    });
    jsonData.action = 'preview';

    fetch('/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
    })
        .then(response => response.json())
        .then(data => {
            pdfPreview.style.display = 'flex';

            pdfPreview.src = data.preview;
        })
        .catch(err => console.error('Error previewing PDF:', err));
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    form.action = '/generate';
    form.method = 'POST';
    form.submit();
});
