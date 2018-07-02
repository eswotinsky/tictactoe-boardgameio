import { Client } from 'boardgame.io/react';
import { Game } from 'boardgame.io/core';

function IsVictory(cells) {
    const positions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];

      for (let pos of positions) {
        const symbol = cells[pos[0]];
        let winner = symbol;
        for (let i of pos) {
          if (cells[i] !== symbol) {
            winner = null;
            break;
          }
        }
        if (winner != null) return true;
      }

      return false;
}

function IsDraw(cells) {
    return cells.filter(c => c === null).length == 0;
}

const TicTacToe = Game({
  setup: () => ({ cells: Array(9).fill(null) }),

  moves: {
    clickCell(G, ctx, id) {
      const cells = [...G.cells]; // don't mutate original state.

      if (cells[id] === null) {
          cells[id] = ctx.currentPlayer;
      }

      return { ...G, cells }; // don't mutate original state.
    },
  },

  flow: {
      endGameIf: (G, ctx) => {
          if (IsVictory(G.cells)) {
              return {winner: ctx.currentPlayer};
          }
          if (IsDraw(G.cells)) {
              return {draw: true};
          }
      },
  },
});

const App = Client({ game: TicTacToe });

export default App;
