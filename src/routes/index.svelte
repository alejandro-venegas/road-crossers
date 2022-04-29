<script lang="ts">
	import * as SC from 'svelte-cubed';
	import * as THREE from 'three';

	import Map from '$lib/Map.svelte';
	import { points } from '$lib/Player.js';

	import Road from '../lib/Road.svelte';
	import { OrbitControls } from 'svelte-cubed';
	import Player from '../lib/Player.svelte';

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
	<OrbitControls />
</SC.Canvas>

<div class="controls">
	<h2>Controls</h2>
	<p>Up: [↑]</p>
	<p>Down: [↓]</p>
	<p>Points: {$points}</p>
</div>

<style>
	* {
		font-family: sans-serif;
	}
	.controls {
		padding: 10px;
		position: absolute;
		top: 10px;
		right: 10px;
		background-color: rgba(255, 255, 255, 0.5);
	}
</style>
