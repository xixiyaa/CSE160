// //
// // drawPicture12.js
// //
// // A simple Part 12 example that draws a small “scene” of multiple shapes
// // whenever the user clicks the “Draw a Picture” button.
// //

// (function() {
//     window.addEventListener('load', initPart12);
  
//     function initPart12() {
//       const btn = document.getElementById('drawPictureButton');
//       if (!btn) return;
//       btn.onclick = drawScene;
//     }
  
//     function drawScene() {
//       // We'll just push a few shapes into g_shapes (defined in paint.js) at preset positions.
//       // For example, a house shape: a square + a triangle on top, plus a circle for the sun.
  
//       // The “house”
//       g_shapes.push({
//         type: 'square',
//         x: 0.0, y: -0.4,
//         size: 0.4,
//         color: [0.7, 0.4, 0.2, 1.0], // brown-ish
//         segments: 0
//       });
//       g_shapes.push({
//         type: 'triangle',
//         x: 0.0, y: -0.2,
//         size: 0.3,
//         color: [0.8, 0.2, 0.2, 1.0], // red-ish roof
//         segments: 0
//       });
  
//       // The “sun”
//       g_shapes.push({
//         type: 'circle',
//         x: 0.6,  y: 0.6,
//         size: 0.15,
//         color: [1.0, 1.0, 0.0, 1.0], // bright yellow
//         segments: 30
//       });
  
//       // Now just re-draw
//       drawAllShapes();
//     }
  
//   })();
  



//
// drawPicture12.js
//
// Part 12 example: draw a house plus a Christmas tree with multiple
// triangle “layers” and ornaments.  We push each shape into g_shapes
// (defined in paint.js) and then call drawAllShapes().
//

(function() {
    window.addEventListener('load', initPart12);
  
    function initPart12() {
      const btn = document.getElementById('drawPictureButton');
      if (!btn) return; // in case there's no button
      btn.onclick = drawScene;
    }
  
    function drawScene() {
      // Clear any existing shapes, if you like:
      // g_shapes = [];
  
      // 1) House body (square)
      g_shapes.push({
        type: 'square',
        x: -0.6, y: -0.4,
        size: 0.4,
        color: [0.7, 0.4, 0.2, 1.0],  // brownish
        segments: 0
      });
  
      // 2) House roof (1 triangle)
      g_shapes.push({
        type: 'triangle',
        x: -0.6, y: -0.2,
        size: 0.3,
        color: [0.8, 0.2, 0.2, 1.0],  // reddish
        segments: 0
      });
      // (Now we have 1 triangle so far.)
  
      // 3) Christmas tree trunk (square)
      g_shapes.push({
        type: 'square',
        x:  0.3, y: -0.50,
        size: 0.07,
        color: [0.5, 0.3, 0.1, 1.0],  // brown
        segments: 0
      });
  
      // 4) Tree “layers” (4 triangles, from bottom to top)
      g_shapes.push({
        type: 'triangle',
        x: 0.3, y: -0.42,
        size: 0.15,
        color: [0.0, 0.7, 0.0, 1.0],
        segments: 0
      });
      g_shapes.push({
        type: 'triangle',
        x: 0.3, y: -0.28,
        size: 0.12,
        color: [0.0, 0.7, 0.0, 1.0],
        segments: 0
      });
      g_shapes.push({
        type: 'triangle',
        x: 0.3, y: -0.17,
        size: 0.09,
        color: [0.0, 0.7, 0.0, 1.0],
        segments: 0
      });
      g_shapes.push({
        type: 'triangle',
        x: 0.3, y: -0.08,
        size: 0.06,
        color: [0.0, 0.7, 0.0, 1.0],
        segments: 0
      });
      // (That’s 4 more triangles, total 5 so far.)
  
      // 5) Star on top of the tree (2 triangles)
      g_shapes.push({
        type: 'triangle',
        x: 0.3, y: 0.02,
        size: 0.04,
        color: [1.0, 1.0, 0.0, 1.0], // yellow
        segments: 0
      });
      g_shapes.push({
        type: 'triangle',
        x: 0.3, y: 0.06,
        size: 0.04,
        color: [1.0, 1.0, 0.0, 1.0], // yellow
        segments: 0
      });
      // (Now 5 + 2 = 7 triangles total.)
  
      // 6) Ornaments (5 triangles, each a small red triangle)
      // Feel free to add more or tweak positions to reach 12 total triangles.
      g_shapes.push({
        type: 'triangle',
        x: 0.25, y: -0.30,
        size: 0.03,
        color: [1.0, 0.0, 0.0, 1.0], // red
        segments: 0
      });
      g_shapes.push({
        type: 'triangle',
        x: 0.35, y: -0.35,
        size: 0.03,
        color: [1.0, 0.0, 0.0, 1.0],
        segments: 0
      });
      g_shapes.push({
        type: 'triangle',
        x: 0.28, y: -0.22,
        size: 0.03,
        color: [1.0, 0.0, 0.0, 1.0],
        segments: 0
      });
      g_shapes.push({
        type: 'triangle',
        x: 0.34, y: -0.13,
        size: 0.03,
        color: [1.0, 0.0, 0.0, 1.0],
        segments: 0
      });
      g_shapes.push({
        type: 'triangle',
        x: 0.31, y: -0.28,
        size: 0.03,
        color: [1.0, 0.0, 0.0, 1.0],
        segments: 0
      });
      // (That’s 5 more triangles, total now 12 triangles.)
  
      // Finally, redraw everything:
      drawAllShapes();
    }
  })();
  