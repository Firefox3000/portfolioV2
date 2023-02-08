<script setup>
let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

const gameStatus = ref('Winner:');
const difficulty = ref(0.5);

const human = 'X';
const ai = 'O';

let currentPlayer = human;

const scores = {
  O: 1,
  X: -1,
  tie: 0,
};

const playerClick = (ev) => {
  if (currentPlayer == human) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (
          ev.currentTarget ==
            document.querySelectorAll('.row')[i].children[j] &&
          board[i][j] == ''
        ) {
          // update board and screen
          document.querySelectorAll('.row')[i].children[j].innerHTML = human;
          board[i][j] = human;

          checkWinner(true);
          currentPlayer = ai;

          let available = [];
          for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
              if (board[i][j] == '') {
                available.push([i, j]);
              }
            }
          }

          if (available.length > 0) {
            console.log(difficulty.value);
            if (difficulty.value >= Math.random()) {
              // ai move
              computerPick();
            } else {
              //random move
              // choose empty spot
              let spot =
                available[Math.floor(Math.random() * available.length)];

              // board and visual
              board[spot[0]][spot[1]] = ai;
              document.querySelectorAll('.row')[spot[0]].children[
                spot[1]
              ].innerHTML = ai;
            }
          }
          checkWinner(true);
          currentPlayer = human;
        }
      }
    }
  }
};

function equals3(a, b, c) {
  return a == b && b == c && a != '';
}

function checkWinner(draw) {
  let winner = null;
  //horizontal && vertical
  for (let i = 0; i < 3; i++) {
    if (equals3(board[i][0], board[i][1], board[i][2])) {
      winner = board[i][0];
    }

    //vertical
    if (equals3(board[0][i], board[1][i], board[2][i])) {
      winner = board[0][i];
    }
  }

  //diagonal
  if (equals3(board[0][0], board[1][1], board[2][2])) {
    winner = board[0][0];
  }

  if (equals3(board[0][2], board[1][1], board[2][0])) {
    winner = board[0][2];
  }

  let openSpots = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == '') {
        openSpots++;
      }
    }
  }

  if (winner == null && openSpots == 0) {
    winner = 'tie';
  }

  if (draw) {
    if (winner == 'X' || winner == 'O' || winner == 'tie') {
      if (winner == 'tie') {
        gameStatus.value = 'tie';
      } else {
        gameStatus.value = `Winner: ${winner}`;
      }
      return;
    }
  }
  return winner;
}

const restart = () => {
  board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];

  currentPlayer = human;
  gameStatus.value = 'Winner:';

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      document.querySelectorAll('.row')[i].children[j].innerHTML = '';
    }
  }
};

function computerPick() {
  let bestScore = -Infinity;

  let moves = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == '') {
        moves.push([i, j]);
      }
    }
  }

  // randomize array for more diverse outcomes
  moves.sort(() => 0.5 - Math.random());
  let move = {};

  for (const i of moves) {
    board[i[0]][i[1]] = ai;
    let score = alphaBetaMiniMax(board, 0, -Infinity, +Infinity, false);
    board[i[0]][i[1]] = '';

    if (score > bestScore) {
      bestScore = score;
      move = {
        i: i[0],
        j: i[1],
      };
    }
  }

  // draw best move
  board[move.i][move.j] = ai;
  document.querySelectorAll('.row')[move.i].children[move.j].innerHTML = ai;

  currentPlayer = human;

  checkWinner(true);
}

function alphaBetaMiniMax(board, depth, alpha, beta, isMaximizing) {
  // alpha beta pruning seems to be 10x faster PogChamp
  let result = checkWinner(false);
  if (result !== null) {
    return scores[result];
  }

  let bestScore = isMaximizing ? -Infinity : +Infinity;

  let moves = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == '') {
        moves.push([i, j]);
      }
    }
  }

  for (const i of moves) {
    board[i[0]][i[1]] = isMaximizing ? ai : human;
    let score = alphaBetaMiniMax(board, depth + 1, alpha, beta, !isMaximizing);
    board[i[0]][i[1]] = '';

    if (isMaximizing) {
      bestScore = Math.max(score, bestScore);
      alpha = Math.max(alpha, score);
    } else {
      bestScore = Math.min(score, bestScore);
      beta = Math.min(beta, score);
    }

    if (alpha >= beta) {
      break;
    }
  }

  return bestScore;
}
</script>

<template>
  <section class="ticTacToe">
    <p class="winner h4">{{ gameStatus }}</p>
    <div class="ticTacToe__grid">
      <div class="row" v-for="x in 3" :key="x">
        <div class="col" @click="playerClick" v-for="y in 3" :key="y"></div>
      </div>
    </div>

    <div class="sliderContainer">
      <p>Easy</p>
      <input
        v-model="difficulty"
        id="slider"
        class="slider"
        type="range"
        min="0"
        max="1"
        step="0.01"
      />
      <p>Hard</p>
    </div>

    <AtomsTextButton class="restart" @click="restart">
      Restart game
    </AtomsTextButton>
  </section>
</template>

<style lang="scss" scoped>
.ticTacToe {
  width: 100vw;

  margin-top: 3rem;
  margin-bottom: 2.4rem;
  margin-left: -1.5rem;

  padding: 2.4rem 1.5rem;
  background-color: var(--secondary);

  &__grid {
    margin: 0 auto 2rem auto;

    display: grid;
    grid-template-rows: repeat(3, 1fr);

    width: 85vw;
    max-width: 25rem;
    height: 85vw;
    max-height: 25rem;

    div {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
    }

    .row {
      div {
        display: flex;

        justify-content: center;
        align-items: center;

        border-color: rgba(0, 0, 0, 0.4);
        border-width: 4px;
        border-style: solid;

        font-size: 3rem;
        font-weight: 400;

        // remove unnecessary grid lines
        &:first-child {
          border-left: 0;
        }

        &:last-child {
          border-right: 0;
        }
      }

      // remove unnecessary grid lines
      &:nth-child(1) div {
        border-top: 0;
      }

      &:nth-child(3) div {
        border-bottom: 0;
      }
    }

    .col:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }

  button {
    margin: 0 auto 1rem auto;
  }

  .h4 {
    text-align: center;
  }

  .sliderContainer {
    margin: 0 auto 1.5rem auto;
    max-width: fit-content;

    display: flex;
    flex-direction: row;
    align-items: center;

    #slider {
      margin: 0 1rem;
    }

    p {
      margin-bottom: 0;
    }
  }

  @media screen and (min-width: 48rem) {
    width: auto;
    margin-left: 0;
  }
}
</style>
