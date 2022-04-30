<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function click() {
		dispatch('click');
	}
</script>

<span on:click={click} class="start-btn"><slot /></span>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

	.start-btn {
		font-size: 1.5rem;
		font-family: 'Press Start 2P', sans-serif;
		text-align: center;
		display: inline-block;
		margin: 5px;
		font-weight: bold;
		padding: 10px 0 10px 10px;
		background-color: lightgray;
		text-shadow: -1px -1px black, 1px 1px white;
		color: gray;
		-webkit-border-radius: 7px;
		-moz-border-radius: 7px;
		-o-border-radius: 7px;
		border-radius: 7px;
		box-shadow: 0 0.2em gray;
		cursor: pointer;
	}

	.start-btn:active {
		box-shadow: none;
		position: relative;
		top: 0.2em;
	}
</style>
