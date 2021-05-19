var clock_representation = (function () {
  function rotateA(a) {
    var tmp;
    var n = a.length;
    for (var i = 0; i < n / 2; i++) {
      for (var j = i; j < n - i - 1; j++) {
        tmp = a[i][j];
        a[i][j] = a[j][n - i - 1];
        a[j][n - i - 1] = a[n - i - 1][n - j - 1];
        a[n - i - 1][n - j - 1] = a[n - j - 1][i];
        a[n - j - 1][i] = tmp;
      }
    }
    return a;
  }

  function init_clock(n) {
    var pieces = [
      [],
      []
    ];

    for (var i = 0; i < 1; ++i) {
      for (var j = 0; j < n; ++j) {
        pieces[i][j] = [];
      }
      return pieces;
    }
  }

  function draw(cid, grstate, n, config) {
    var c = document.getElementById(cid);
    var ctx = c.getContext("2d");
    var pi = Math.PI;
    var radius = (c.width / 2);
    var radius_squared = (radius * radius);
    ctx.clearCircle(pi, radius_squared);
    ctx.font = "12px Arial";
    ctx.strokeStyle = config.baseColor;
    ctx.lineWidth = 2;

    for (var i = 0; i < 1; ++i) {
      for (var j = 0; j < n; ++j) {
        for (var k = 0; k < n; ++k) {
          draw_clock(grstate, n, ctx, i, j, k, pi, radius_squared, config);
        }
      }
    }
  }

  function draw_clock(grstate, n, ctx, side, x, y, pi, radius, config) {
    var sidecolors = config.colorScheme;

    ctx.fillStyle = sidecolors[Math.floor(grstate[side][x][y] / n)]
    ctx.fillCircle(pi, radius);
    // ctx.fillStyle = "#000000";
    // ctx.fillText(grstate[side]);
  }

  function move(state, side) {
    state[side] = rotateA(state[side]);
    return state;
  }

  function moves(grstate, mvs, n) {
    for (i = 0; i < mvs.length; ++i) {
      grstate = move(grstate, mvs[i][0], mvs[i][1], n);
    }
    return grstate;
  }

  function apply_alg(moves) {
    var mvs = [];
    for (var i = 0; i < moves.length; ++i) {
      var face = moves[i].replace(/[0-1]/g, "");

      var mgn = moves[i][0] == "0" ? 1 : (moves[i][0] == "1" ? 2 : (moves[i][0] == "2" ? 3 : (moves[i][0] == "3" ? 4 : (moves[i][0] == "4" ? 5 : (moves[i][0] == "5" ? 6 : (moves[i][0] == "6" ? 7 : 0))))));
      moves[i] = moves[i].replace(/[RUDL]/i, "#").split("#");
      face = { "U": 0, "UR": 1, "UL": 2, "D": 3, "DR": 4, "DL": 5, "R": 6, "L": 7, "ALL": 8, "y": 9 }[face];

      for (var j = 0; j < mgn; ++j) {
        mvs.push([face]);
      }
    }
    return mvs;
  }

  return {
    draw,
    move,
    moves,
    init_cube: init_clock,
    apply_alg,
  }
})();