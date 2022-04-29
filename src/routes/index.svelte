<script lang="ts">
	import * as SC from 'svelte-cubed';
	import * as THREE from 'three';

	import { nanoid } from 'nanoid';

	import Car from '$lib/Car.svelte';
	import Map from '$lib/Map.svelte';
	import { OrbitControls } from 'svelte-cubed';

	let screenWidth;
	let screenHeight;
	let aspectRatio;
	let cameraWidth;
	let cameraHeight;

	let cars = [];

	$: calculateAspectRatio(screenWidth, screenHeight);

	let canvas;
	let lightTick = 0;

	function calculateAspectRatio(screenWidth, screenHeight) {
		cameraWidth = screenWidth / 2;

		aspectRatio = screenWidth / screenHeight;
		cameraHeight = cameraWidth / aspectRatio;
	}

	setInterval(() => {
		cars = [...cars, { id: nanoid(), component: Car }];
	}, 1000);

	function removeCar() {
		cars.splice(0, 1);

		cars = cars;
	}
</script>

<svelte:window bind:innerWidth={screenWidth} bind:innerHeight={screenHeight} />

<SC.Canvas antialias width={screenWidth} height={screenHeight} shadows>
	<Map width={screenWidth} height={screenHeight} />

	{#each cars as car (car.id)}
		<svelte:component this={car.component} {cameraWidth} on:remove={() => removeCar()} />
	{/each}

	<SC.AmbientLight color={0xffffff} intensity="0.6" />
	<SC.DirectionalLight
		color={0xffffff}
		intensity="0.6"
		position={[100, 300, 450]}
		shadow={{ mapSize: [2048, 2048] }}
	/>s
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
