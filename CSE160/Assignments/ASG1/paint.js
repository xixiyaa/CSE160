//
// paint.js
//
let gl;
let a_Position;
let u_FragColor;

// Store all “painted” shapes or spawned shapes
let g_shapes = [];

// For painting:
let isDragging = false;

// For mini‐game:
let isGameActive = false;    // Will be set to true in part13Game.js
let score = 0;               // Also used by part13Game.js

window.addEventListener('load', main);

function main() {
  // Get canvas
  const canvas = document.getElementById('webgl');
  if (!canvas) {
    console.error('Failed to retrieve the <canvas> element');
    return;
  }

  // Get rendering context
  gl = canvas.getContext('webgl');
  if (!gl) {
    console.error('Failed to get the rendering context for WebGL');
    return;
  }

  // Vertex shader program
  const VSHADER_SOURCE = `
    attribute vec4 a_Position;
    void main() {
      gl_Position = a_Position;
    }
  `;
  // Fragment shader program
  const FSHADER_SOURCE = `
    precision mediump float;
    uniform vec4 u_FragColor;
    void main() {
      gl_FragColor = u_FragColor;
    }
  `;

  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.error('Failed to initialize shaders.');
    return;
  }

  // Get attrib/uniform
  a_Position  = gl.getAttribLocation(gl.program, 'a_Position');
  u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
  if (a_Position < 0 || !u_FragColor) {
    console.error('Failed to get the storage location of a_Position or u_FragColor');
    return;
  }

  // Set clear color to black, and clear
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Register event handlers
  initEventHandlers(canvas);

  // Initial draw
  drawAllShapes();
}

function initEventHandlers(canvas) {
  // Clear button
  const clearBtn = document.getElementById('clearButton');
  if (clearBtn) {
    clearBtn.onclick = function() {
      g_shapes = [];  
      gl.clear(gl.COLOR_BUFFER_BIT);
      drawAllShapes();
    };
  }

  // Mouse down
  canvas.onmousedown = function(ev) {
    if (isGameActive) {
      // If the mini‐game is active, we do "hit detection" instead of painting
      handleClickGame(ev, canvas);
    } else {
      // Normal painting mode
      isDragging = true;
      addShape(ev, canvas);
    }
  };

  // Mouse move
  canvas.onmousemove = function(ev) {
    if (!isGameActive && isDragging) {
      // Only paint if game isn't active
      addShape(ev, canvas);
    }
  };

  // Mouse up
  canvas.onmouseup = function(ev) {
    isDragging = false;
  };
}

/**
 * Reads current UI (shapeType, color, size, etc),
 * converts mouse event to GL coords, saves shape to g_shapes[], draws all.
 */
function addShape(ev, canvas) {
  let {x, y} = convertCoordinatesEventToGL(ev, canvas);

  // Which shape?
  let shapeType = 'square';
  const squareRadio = document.getElementById('squareRadio');
  const triangleRadio = document.getElementById('triangleRadio');
  const circleRadio = document.getElementById('circleRadio');
  if (triangleRadio && triangleRadio.checked) {
    shapeType = 'triangle';
  } else if (circleRadio && circleRadio.checked) {
    shapeType = 'circle';
  }

  // Color from sliders
  const r = parseFloat(document.getElementById('redSlider').value);
  const g = parseFloat(document.getElementById('greenSlider').value);
  const b = parseFloat(document.getElementById('blueSlider').value);

  // Size
  const size = parseFloat(document.getElementById('sizeSlider').value);

  // Segments (for circles)
  const segments = parseInt(document.getElementById('segmentsSlider').value);

  // Store
  g_shapes.push({
    type: shapeType,
    x: x,
    y: y,
    size: size,
    color: [r, g, b, 1.0],
    segments: segments
  });

  drawAllShapes();
}

function convertCoordinatesEventToGL(ev, canvas) {
  const rect = canvas.getBoundingClientRect();
  let x = ev.clientX - rect.left;
  let y = ev.clientY - rect.top;

  // convert to clip space -1..+1
  x = (x - canvas.width/2) / (canvas.width/2);
  y = (canvas.height/2 - y) / (canvas.height/2);

  return {x, y};
}

/**
 * Redraw everything in g_shapes[]
 */
function drawAllShapes() {
  gl.clear(gl.COLOR_BUFFER_BIT);
  for (let s of g_shapes) {
    switch (s.type) {
      case 'square':   drawSquare(s);   break;
      case 'triangle': drawTriangle(s); break;
      case 'circle':   drawCircle(s);   break;
    }
  }
}

function drawSquare(s) {
  let half = s.size / 2;
  let x0 = s.x - half, y0 = s.y - half;
  let x1 = s.x + half, y1 = s.y + half;

  const vertices = new Float32Array([
    x0, y1,
    x0, y0,
    x1, y1,
    x1, y0
  ]);

  gl.uniform4f(u_FragColor, s.color[0], s.color[1], s.color[2], s.color[3]);
  let vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_Position);

  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

  gl.deleteBuffer(vertexBuffer);
}

function drawTriangle(s) {
  const angle0 = 90 * Math.PI/180;
  const angle1 = 210 * Math.PI/180;
  const angle2 = 330 * Math.PI/180;

  const x0 = s.x + s.size * Math.cos(angle0);
  const y0 = s.y + s.size * Math.sin(angle0);
  const x1 = s.x + s.size * Math.cos(angle1);
  const y1 = s.y + s.size * Math.sin(angle1);
  const x2 = s.x + s.size * Math.cos(angle2);
  const y2 = s.y + s.size * Math.sin(angle2);

  const vertices = new Float32Array([
    x0, y0,
    x1, y1,
    x2, y2
  ]);

  gl.uniform4f(u_FragColor, s.color[0], s.color[1], s.color[2], s.color[3]);
  let vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_Position);

  gl.drawArrays(gl.TRIANGLES, 0, 3);

  gl.deleteBuffer(vertexBuffer);
}

function drawCircle(s) {
  let vertices = [];
  const angleStep = 2 * Math.PI / s.segments;

  // center vertex first
  vertices.push(s.x);
  vertices.push(s.y);

  // around the circle
  for (let i=0; i<=s.segments; i++) {
    let angle = i * angleStep;
    let xPos = s.x + s.size * Math.cos(angle);
    let yPos = s.y + s.size * Math.sin(angle);
    vertices.push(xPos);
    vertices.push(yPos);
  }

  const vertArray = new Float32Array(vertices);

  gl.uniform4f(u_FragColor, s.color[0], s.color[1], s.color[2], s.color[3]);
  let vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertArray, gl.STATIC_DRAW);

  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_Position);

  gl.drawArrays(gl.TRIANGLE_FAN, 0, s.segments + 2);

  gl.deleteBuffer(vertexBuffer);
}

/**
 * handleClickGame: If user clicks on a shape, remove it + increment score
 */
function handleClickGame(ev, canvas) {
  let {x, y} = convertCoordinatesEventToGL(ev, canvas);

  for (let i = 0; i < g_shapes.length; i++) {
    let s = g_shapes[i];

    if (s.type === 'circle') {
      // distance check
      let dx = x - s.x;
      let dy = y - s.y;
      if (Math.sqrt(dx*dx + dy*dy) <= s.size) {
        score++;
        updateScoreDisplay();
        g_shapes.splice(i, 1);
        drawAllShapes();
        return; // done
      }
    }
    else if (s.type === 'square') {
      // bounding box check
      let half = s.size / 2;
      if (x >= s.x - half && x <= s.x + half &&
          y >= s.y - half && y <= s.y + half) {
        score++;
        updateScoreDisplay();
        g_shapes.splice(i, 1);
        drawAllShapes();
        return;
      }
    }
    else if (s.type === 'triangle') {
      // rough bounding box check for the equilateral triangle
      let half = s.size; 
      if (x >= s.x - half && x <= s.x + half &&
          y >= s.y - half && y <= s.y + half) {
        score++;
        updateScoreDisplay();
        g_shapes.splice(i, 1);
        drawAllShapes();
        return;
      }
    }
  }
}

/**
 * Quick helper to display the score on the page
 */
function updateScoreDisplay() {
  const span = document.getElementById("scoreDisplay");
  if (span) {
    span.textContent = score;
  }
}
