<script lang="ts">
	import * as SC from 'svelte-cubed';
	import * as THREE from 'three';
	import { nanoid } from 'nanoid';

	import Car from './Car.svelte';
	import { points } from '$lib/Player.js';

	export let cameraWidth: number;
	export let position: number[];
	export let rotation: number[];

	const velocity = 2;

	let cars = [];
	let minInterval = 400;
	let maxInterval = 1500;

	$: maxInterval -= $points - $points + 20;
	$: console.log(maxInterval);

	function randomIntFromInterval(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	function removeCar() {
		cars.splice(0, 1);

		cars = cars;
	}

	let lastDate = new Date();
	let interval = 0;
	SC.onFrame(() => {
		const currentDate = new Date();
		if (currentDate - lastDate >= interval) {
			interval = randomIntFromInterval(minInterval, maxInterval);
			lastDate = currentDate;

			cars = [...cars, { id: nanoid(), component: Car }];
		}
	});
</script>

<SC.Group {position} {rotation}>
	<SC.Mesh
		geometry={new THREE.PlaneGeometry(cameraWidth * 2, 40)}
		material={new THREE.MeshStandardMaterial({ color: 0x444447 })}
		rotation={[(-90 * Math.PI) / 180, 0, 0]}
		position={[0, 1, 0]}
		receiveShadow
	/>
	{#each cars as car (car.id)}
		<svelte:component this={car.component} {cameraWidth} {velocity} on:remove={removeCar} />
	{/each}
</SC.Group>
