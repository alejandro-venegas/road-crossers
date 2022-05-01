<script lang="ts">
	import * as SC from 'svelte-cubed';
	import * as THREE from 'three';

	import Map from '$lib/Map.svelte';
	import { points } from '$lib/Player.ts';
	import Road from '$lib/Road.svelte';
	import Player from '$lib/Player.svelte';
	import { isOver } from '$lib/Game.ts';
	import Button from '../lib/Button.svelte';

	let screenWidth;
	let screenHeight;
	let aspectRatio;
	let cameraWidth;
	let cameraHeight;

	$: calculateAspectRatio(screenWidth, screenHeight);

	function calculateAspectRatio(screenWidth, screenHeight) {
		cameraWidth = screenWidth / 2;

		aspectRatio = screenWidth / screenHeight;
		cameraHeight = cameraWidth / aspectRatio;
	}

	function onRestartClick() {
		$isOver = false;
		$points = 0;
	}
</script>

<svelte:window bind:innerWidth={screenWidth} bind:innerHeight={screenHeight} />

<SC.Canvas antialias width={screenWidth} height={screenHeight} shadows>
	<Map width={screenWidth} height={screenHeight} />

	<Player />

	<Road {cameraWidth} />

	<SC.AmbientLight color={0xffffff} intensity="0.6" />
	<SC.DirectionalLight
		color={0xffffff}
		intensity="0.6"
		position={[100, 300, 450]}
		shadow={{ mapSize: [2048, 2048] }}
	/>
	<SC.OrthographicCamera
		left={cameraWidth / -2}
		right={cameraWidth / 2}
		top={cameraHeight / 2}
		bottom={cameraHeight / -2}
		position={[2000, 2000, 3000]}
		target={[0, 0, 0]}
		far={20000}
		near={0}
	/>
	<SC.OrbitControls />
</SC.Canvas>
{#if $isOver}
	<article class="game-over-dialog box">
		<h1>Game Over</h1>
		<Button on:click={onRestartClick}>RESTART</Button>
	</article>
{/if}

<div class="controls">
	<article class="box section points">
		<h2>Points</h2>
		<p>{$points}</p>
	</article>
	<article class="box section">
		<h2>Controls</h2>
		<p>Forwards: [↑]</p>
		<p>Backwards: [↓]</p>
		<p>POV: Left Click + Drag</p>
		<p>Camera: Right Click + Drag</p>
		<p>Zoom: Scroll</p>
	</article>
</div>

<style>
	* {
		font-family: sans-serif;
	}

	.box {
		padding: 10px;
		background-color: rgba(255, 255, 255, 0.5);
		border-radius: 16px;
	}
	.controls {
		position: absolute;
		top: 10px;
		right: 10px;
		display: flex;
		align-items: flex-start;
	}
	.controls .section {
		margin: 0.5rem;
	}
	.points {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.points p {
		font-size: 2rem;
		margin: 0;
	}

	.game-over-dialog {
		position: absolute;
		top: 2rem;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.game-over-dialog h1 {
		font-size: 2rem;
	}
</style>
