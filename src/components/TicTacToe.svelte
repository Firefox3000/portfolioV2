<script lang="ts">
	let board = [
		['', '', ''],
		['', '', ''],
		['', '', '']
	];

	let gameStatus = 'Winner:';
	let difficulty = 0.5;

	const human = 'X';
	const ai = 'O';

	let currentPlayer = human;

	const scores = {
		O: 1,
		X: -1,
		tie: 0
	};

	function playerClick(x: number, y: number) {
		if (currentPlayer != human) return;

		if (board[x][y] != '') return;

		if (checkWinner(false)) return;

		board[x][y] = human;

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

		if (available.length < 1) {
			return;
		}

		// randomly pick optimal or random move based on difficulty
		const spot = difficulty >= Math.random() ? computerPick() : available[Math.floor(Math.random() * available.length)];
		board[spot[0]][spot[1]] = ai;

		checkWinner(true);
		currentPlayer = human;
	}

	function equals3(a, b, c) {
		return a === b && b === c && a !== '';
	}

	/**
	 * Check if there is a winner
	 * @param draw - if should update ui
	*/
	function checkWinner(draw: boolean) {
		let winner = null;

		for (let i = 0; i < 3; i++) {
			// horizontal
			if (equals3(board[i][0], board[i][1], board[i][2])) {
				winner = board[i][0];
			}

			// vertical
			if (equals3(board[0][i], board[1][i], board[2][i])) {
				winner = board[0][i];
			}
		}

		// diagonals
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
			if (winner === 'tie') {
				gameStatus = 'tie';
			}

			if (winner === 'X' || winner === 'O') {
				gameStatus = `Winner: ${winner}`;
			}
		}
		return winner;
	}

	/** Reset the board */
	function restart() {
		board.forEach((row) => {
			row.forEach((_, i) => {
				row[i] = '';
			});
		});
		board = board;

		currentPlayer = human;
		gameStatus = 'Winner:';
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
					j: i[1]
				};
			}
		}

		currentPlayer = human;
		checkWinner(true);

		return move;
	}

	function alphaBetaMiniMax(board, depth, alpha, beta, isMaximizing) {
		// alpha beta pruning seems to be 10x faster
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

<!-- TODO: animate winning line -->
<section class="ticTacToe">
	<p class="winner h4 text-center">{gameStatus}</p>
	<div class="ticTacToe__grid">
		{#each { length: 3 } as _, x}
			<div class="row">
				{#each { length: 3 } as _, y}
					<div class="col" on:click={() => playerClick(x, y)}>
						{#if board[x][y] == 'X'}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="1em"
								height="1em"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class=""
								><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"
								></line></svg
							>
						{:else if board[x][y] == 'O'}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="1em"
								height="1em"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class=""><circle cx="12" cy="12" r="10"></circle></svg
							>
						{/if}
					</div>
				{/each}
			</div>
		{/each}
		<!-- <div class="absolute bg-pink-400 h-4/5 w-1 left-[16.5%] top-[16.5%] /-rotate-45 origin-top-left" /> -->
	</div>

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

	<button class="button restart mx-auto block" on:click={restart}> Restart game </button>
</section>

<style lang="postcss">
	.ticTacToe {
		padding: 2.25rem 1.5rem;
		background-color: var(--secondary);

		width: 100vw;
		margin: 3rem calc(50% - 50vw);

		&__grid {
			margin: 0 auto 2rem auto;

			display: grid;
			position: relative;
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
