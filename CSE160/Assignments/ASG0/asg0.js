function main() {
    const canvas = document.getElementById('example');
    const ctx = canvas.getContext('2d');
    clearCanvas(ctx);

    // Show or hide scalar input based on operation
    document.getElementById('operation').addEventListener('change', () => {
        const operation = document.getElementById('operation').value;
        document.getElementById('scalarDiv').style.display = operation === 'scale' ? 'block' : 'none';
    });
}

function clearCanvas(ctx) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 400, 400);
}

function drawVector(ctx, x, y, color = 'white') {
    ctx.beginPath();
    ctx.moveTo(200, 200); // Center of canvas
    ctx.lineTo(200 + x * 20, 200 - y * 20); // Scale vectors for visibility
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
}

function performOperation() {
    const v1 = new Vector3([
        parseFloat(document.getElementById('v1x').value),
        parseFloat(document.getElementById('v1y').value),
        0
    ]);
    const v2 = new Vector3([
        parseFloat(document.getElementById('v2x').value),
        parseFloat(document.getElementById('v2y').value),
        0
    ]);
    const operation = document.getElementById('operation').value;
    const scalar = parseFloat(document.getElementById('scalar').value);

    const canvas = document.getElementById('example');
    const ctx = canvas.getContext('2d');
    clearCanvas(ctx);

    drawVector(ctx, v1.elements[0], v1.elements[1], 'red');
    drawVector(ctx, v2.elements[0], v2.elements[1], 'blue');

    switch (operation) {
        case 'add':
            const addResult = v1.add(v2);
            drawVector(ctx, addResult.elements[0], addResult.elements[1], 'green');
            console.log(`Add Result: ${addResult.elements}`);
            break;
        case 'subtract':
            const subResult = v1.sub(v2);
            drawVector(ctx, subResult.elements[0], subResult.elements[1], 'green');
            console.log(`Subtract Result: ${subResult.elements}`);
            break;
        case 'scale':
            const scaleResult = v1.mul(scalar);
            drawVector(ctx, scaleResult.elements[0], scaleResult.elements[1], 'green');
            console.log(`Scale Result: ${scaleResult.elements}`);
            break;
        case 'angle':
            const dot = Vector3.dot(v1, v2);
            const angle = Math.acos(dot / (v1.magnitude() * v2.magnitude())) * (180 / Math.PI);
            console.log(`Angle between v1 and v2: ${angle.toFixed(2)}°`);
            break;
        case 'area':
            const cross = Vector3.cross(v1, v2);
            const area = cross.magnitude() / 2;
            console.log(`Area of the triangle: ${area.toFixed(2)}`);
            break;
        case 'magnitude':
            console.log(`Magnitude of v1: ${v1.magnitude()}`);
            console.log(`Magnitude of v2: ${v2.magnitude()}`);
            break;
        case 'normalize':
            const norm1 = v1.normalize();
            const norm2 = v2.normalize();
            drawVector(ctx, norm1.elements[0], norm1.elements[1], 'green');
            drawVector(ctx, norm2.elements[0], norm2.elements[1], 'green');
            console.log(`Normalized v1: ${norm1.elements}`);
            console.log(`Normalized v2: ${norm2.elements}`);
            break;
    }
}
