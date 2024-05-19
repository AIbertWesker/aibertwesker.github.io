function closestPowerOfTwo(n) {
    return Math.pow(2, Math.floor(Math.log(n) / Math.log(2)));
}

function applyFFT() {
    const imagePreview = document.getElementById('imagePreview');
    const imageAfter = document.getElementById('imageAfter');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const redProcent = parseInt(document.getElementById('redprocent').value, 10);
    const greenProcent = parseInt(document.getElementById('greenprocent').value, 10);
    const blueProcent = parseInt(document.getElementById('blueprocent').value, 10);


    canvas.width = imagePreview.naturalWidth;
    canvas.height = imagePreview.naturalHeight;
    ctx.drawImage(imagePreview, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const width = imageData.width;
    const height = imageData.height;

    for (let i = 0; i < data.length; i += 4) {
        data[i] = Math.max(data[i] * redProcent / 100, 0); // Red
        data[i + 1] = Math.max(data[i + 1] * greenProcent / 100, 0); // Green
        data[i + 2] = Math.max(data[i + 2] * blueProcent / 100, 0); // Blue
    }

    ctx.putImageData(imageData, 0, 0, 0, 0, imageData.width, imageData.height);
    imageAfter.src = canvas.toDataURL();
};

document.getElementById('fileButton').addEventListener('click', function () {
    document.getElementById('fileInput').click();
});

document.getElementById('fileInput').addEventListener('change', function (event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        const imagePreview = document.getElementById('imagePreview');
        imagePreview.src = e.target.result;
    };

    reader.readAsDataURL(file);
});
