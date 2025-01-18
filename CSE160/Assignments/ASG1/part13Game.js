//
// part13Game.js
//
// Simple “whack‐a‐shape” style mini game
// Shapes spawn every X ms, vanish after a short lifespan.
// Clicking on them increments score and removes the shape.
//
let spawnIntervalId = null;
let gameTimerId = null;
const GAME_TIME_MS = 30000;   // 30 seconds
const SHAPE_LIFESPAN = 1000; // 1 second
const SPAWN_INTERVAL = 600;   // spawn shape every 0.6s

(function() {
  window.addEventListener('load', initMiniGame);

  function initMiniGame() {
    const btn = document.getElementById('startGameButton');
    if (!btn) return;
    btn.onclick = startGame;
  }

  function startGame() {
    if (isGameActive) return; // already running?

    // Turn on game mode
    isGameActive = true;
    score = 0;
    updateScoreDisplay();

    // Clear any existing shapes
    g_shapes = [];
    drawAllShapes();

    // spawn shapes periodically
    spawnIntervalId = setInterval(spawnRandomShape, SPAWN_INTERVAL);

    // end game after 30s
    gameTimerId = setTimeout(endGame, GAME_TIME_MS);

    console.log("Mini-Game started!");
  }

  function endGame() {
    isGameActive = false;
    clearInterval(spawnIntervalId);
    spawnIntervalId = null;

    alert("Game Over! Your score: " + score);
  }

  function spawnRandomShape() {
    if (!isGameActive) return;
    // random type
    const types = ['square','triangle','circle'];
    const t = types[Math.floor(Math.random()*types.length)];

    // random color
    let r = Math.random();
    let g = Math.random();
    let b = Math.random();

    // random position
    let x = (Math.random() * 1.8) - 0.9; // range -0.9..+0.9
    let y = (Math.random() * 1.8) - 0.9;

    // random size
    let size = 0.05 + Math.random() * 0.1; // 0.05..0.15

    // random segments (for circle)
    let seg = Math.floor(3 + Math.random()*25);

    let now = Date.now();

    // store new shape
    g_shapes.push({
      type: t,
      x: x,
      y: y,
      size: size,
      color: [r, g, b, 1.0],
      segments: seg,
      createTime: now
    });

    // remove old shapes
    removeOldShapes(now);

    // redraw
    drawAllShapes();
  }

  // remove shapes older than SHAPE_LIFESPAN
  function removeOldShapes(now) {
    g_shapes = g_shapes.filter(s => {
      if (!s.createTime) return true;  // shapes from paint mode or part 12
      return (now - s.createTime) < SHAPE_LIFESPAN;
    });
  }

})();
