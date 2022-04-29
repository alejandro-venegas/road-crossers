<script lang="ts">
	import * as SC from 'svelte-cubed';
	import * as THREE from 'three';

	import { nanoid } from 'nanoid';

	import Car from '$lib/Car.svelte';
	import Map from '$lib/Map.svelte';
	import { OrbitControls } from 'svelte-cubed';
	import Lane from '../lib/Lane.svelte';

	let screenWidth;
	let screenHeight;
	let aspectRatio;
	let cameraWidth;
	let cameraHeight;

	$: calculateAspectRatio(screenWidth, screenHeight);

	let canvas;
	let lightTick = 0;

	function calculateAspectRatio(screenWidth, screenHeight) {
		cameraWidth = screenWidth / 2;

		aspectRatio = screenWidth / screenHeight;
		cameraHeight = cameraWidth / aspectRatio;
	}
</script>

<svelte:window bind:innerWidth={screenWidth} bind:innerHeight={screenHeight} />

<SC.Canvas antialias width={screenWidth} height={screenHeight} shadows>
	<Map width={screenWidth} height={screenHeight} />

	<Lane {cameraWidth} />

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
