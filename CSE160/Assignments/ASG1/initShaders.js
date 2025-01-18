//
// initShaders.js
//
// Minimal code to compile vertex and fragment shaders from source
// and link them into a single program.
//
function initShaders(gl, vertexSource, fragmentSource) {
    // Compile vertex shader
    var vertShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertShader, vertexSource);
    gl.compileShader(vertShader);
    if (!gl.getShaderParameter(vertShader, gl.COMPILE_STATUS)) {
      var err = gl.getShaderInfoLog(vertShader);
      console.error('Failed to compile vertex shader:', err);
      gl.deleteShader(vertShader);
      return null;
    }
  
    // Compile fragment shader
    var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragShader, fragmentSource);
    gl.compileShader(fragShader);
    if (!gl.getShaderParameter(fragShader, gl.COMPILE_STATUS)) {
      var err = gl.getShaderInfoLog(fragShader);
      console.error('Failed to compile fragment shader:', err);
      gl.deleteShader(fragShader);
      return null;
    }
  
    // Link program
    var program = gl.createProgram();
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      var err = gl.getProgramInfoLog(program);
      console.error('Failed to link program:', err);
      gl.deleteProgram(program);
      gl.deleteShader(fragShader);
      gl.deleteShader(vertShader);
      return null;
    }
  
    // Cleanup shaders (they're linked into the program now)
    gl.deleteShader(vertShader);
    gl.deleteShader(fragShader);
  
    // Use the program
    gl.useProgram(program);
    gl.program = program;
    return true;
  }
  
  /**
   * Helper to grab shader source from <script> elements in the HTML
   * This is used by paint.js to load code from script tags
   */
  function initShadersFromTags(gl, vertexTagId, fragmentTagId) {
    var vertCode = document.getElementById(vertexTagId).textContent;
    var fragCode = document.getElementById(fragmentTagId).textContent;
    return initShaders(gl, vertCode, fragCode);
  }
  