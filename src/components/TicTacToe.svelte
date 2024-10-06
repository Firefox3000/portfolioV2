<script lang="ts">
	import { scale } from 'svelte/transition';

	enum Player {
		Human = 'X',
		Bot = 'O'
	}

	let board: (Player | '')[][] = [
		['', '', ''],
		['', '', ''],
		['', '', '']
	];

	let gameWinner: Player | 'tie' | null = null;
	let difficulty = 0.5;
	let currentPlayer = Player.Human;

	const scores = {
		O: 1,
		X: -1,
		tie: 0
	};

	function playerClick(x: number, y: number) {
		if (currentPlayer == Player.Bot || board[x][y] != '' || checkWinner()) return;

		board[x][y] = Player.Human;

		gameWinner = checkWinner();
		if (gameWinner) return;

		currentPlayer = Player.Bot;

		let available = [];
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				if (board[i][j] == '') {
					available.push([i, j]);
				}
			}
		}

		if (available.length < 1) {
			return;
		}

		// randomly pick optimal or random move based on difficulty
		const spot =
			difficulty >= Math.random()
				? computerPick()
				: available[Math.floor(Math.random() * available.length)];
		board[spot[0]][spot[1]] = Player.Bot;

		gameWinner = checkWinner();
		currentPlayer = Player.Human;
	}

	function equals3(a, b, c) {
		return a === b && b === c && a !== '';
	}

	function checkWinner(): keyof typeof scores | null {
		for (let i = 0; i < 3; i++) {
			// horizontal
			if (equals3(board[i][0], board[i][1], board[i][2])) {
				return board[i][0];
			}

			// vertical
			if (equals3(board[0][i], board[1][i], board[2][i])) {
				return board[0][i];
			}
		}

		// diagonals
		if (equals3(board[0][0], board[1][1], board[2][2])) {
			return board[0][0];
		}

		if (equals3(board[0][2], board[1][1], board[2][0])) {
			return board[0][2];
		}

		let openSpots = 0;
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				if (board[i][j] == '') {
					openSpots++;
				}
			}
		}

		if (openSpots == 0) {
			return 'tie';
		}

		return null;
	}

	// Reset the board
	function restart() {
		board.forEach((row) => {
			row.forEach((_, i) => {
				row[i] = '';
			});
		});
		board = board;

		currentPlayer = Player.Human;
		gameWinner = null;
	}

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
			board[i[0]][i[1]] = Player.Bot;
			const score = alphaBetaMiniMax(board, 0, -Infinity, +Infinity, false);
			board[i[0]][i[1]] = '';

			if (score > bestScore) {
				bestScore = score;
				move = [i[0], i[1]];
			}
		}

		currentPlayer = Player.Human;
		gameWinner = checkWinner();

		return move;
	}

	function alphaBetaMiniMax(board, depth, alpha, beta, isMaximizing) {
		// alpha beta pruning seems to be 10x faster
		const result = checkWinner();
		if (result !== null) {
			return scores[result];
		}

		let bestScore = isMaximizing ? -Infinity : +Infinity;

		const moves = [];
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				if (board[i][j] == '') {
					moves.push([i, j]);
				}
			}
		}

		for (const i of moves) {
			board[i[0]][i[1]] = isMaximizing ? Player.Bot : Player.Human;
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

<!-- TODO: animate winning line -->
<section class="ticTacToe">
	<div class="ticTacToe__grid relative mx-auto mt-8 grid grid-rows-3">
		{#each { length: 3 } as _, x}
			<div class="row grid grid-cols-3">
				{#each { length: 3 } as _, y}
					<button class="col" on:click={() => playerClick(x, y)}>
						{#if board[x][y] == Player.Human}
							<svg
								transition:scale={{ duration: 30 }}
								xmlns="http://www.w3.org/2000/svg"
								width="1em"
								height="1em"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<line x1="18" y1="6" x2="6" y2="18"></line>
								<line x1="6" y1="6" x2="18" y2="18"></line>
							</svg>
						{:else if board[x][y] == Player.Bot}
							<svg
								transition:scale={{ duration: 30, delay: 50 }}
								xmlns="http://www.w3.org/2000/svg"
								width="1em"
								height="1em"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<circle cx="12" cy="12" r="10"></circle>
							</svg>
						{/if}
					</button>
				{/each}
			</div>
		{/each}
		<!-- <div class="absolute bg-pink-400 h-4/5 w-1 left-[16.5%] top-[16.5%] /-rotate-45 origin-top-left" /> -->
	</div>

	{#if gameWinner}
		<p class="h4 text-center">
			{gameWinner == 'tie' ? 'Tie!' : `Winner: ${gameWinner}`}
		</p>
	{/if}

	<div class="flex flex-row items-center justify-center gap-4">
		<p>Easy</p>
		<input
			bind:value={difficulty}
			id="slider"
			class="slider"
			type="range"
			min="0"
			max="1"
			step="0.01"
		/>
		<p>Hard</p>
	</div>

	<button class="button restart mx-auto block" on:click={restart}>Restart game</button>
</section>

<style lang="postcss">
	.ticTacToe {
		padding: 2.25rem 1.5rem;
		background-color: var(--secondary);

		width: 100vw;
		margin: 3rem calc(50% - 50vw);

		&__grid {
			width: 85vw;
			max-width: 25rem;
			height: 85vw;
			max-height: 25rem;

			.row {
				div {
					border-color: rgba(0, 0, 0, 0.4);
					border-width: 4px;
					border-style: solid;

					@apply flex items-center justify-center text-5xl;

					/* remove unnecessary grid lines */
					&:first-child {
						border-left: 0;
					}

					&:last-child {
						border-right: 0;
					}
				}

				/* remove unnecessary grid lines */
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

		@screen lg {
			width: auto;
			max-width: 100vw;
			margin-left: -12rem;
			margin-right: -12rem;
		}
	}
</style>
