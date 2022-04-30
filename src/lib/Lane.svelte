<script lang="ts">
	import * as SC from 'svelte-cubed';
	import * as THREE from 'three';
	import { nanoid } from 'nanoid';

	import Car from './Car.svelte';
	import { points } from '$lib/Player.ts';
	import { isOver } from './Game';

	export let cameraWidth: number;
	export let position: number[];
	export let rotation: number[];

	const velocity = 2;
	const initMinInterval = 400;
	const initMaxInterval = 1500;

	let cars;
	let minInterval;
	let maxInterval;

	function setLane() {
		cars = [];
		minInterval = initMinInterval;
		maxInterval = initMaxInterval;
	}

	setLane();

	$: maxInterval -= $points - $points + 20;

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
		if (!isOver) {
			return;
		}
		const currentDate = new Date();
		if (currentDate - lastDate >= interval) {
			interval = randomIntFromInterval(minInterval, maxInterval);
			lastDate = currentDate;

			cars = [...cars, { id: nanoid(), component: Car }];
		}
	});

	function onIsOverChange(restart: boolean) {
		if (restart) {
			setLane();
		}
	}
	$: onIsOverChange(!$isOver);
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
		<svelte:component
			this={car.component}
			{cameraWidth}
			{velocity}
			globalZ={position[2]}
			on:remove={removeCar}
		/>
	{/each}
</SC.Group>
