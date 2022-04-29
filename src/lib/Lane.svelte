<script lang="ts">
	import * as SC from 'svelte-cubed';
	import * as THREE from 'three';
	import { nanoid } from 'nanoid';
	import Car from './Car.svelte';

	export let cameraWidth: number;
	export let position: number[];
	export let rotation: number[];

	let cars = [{ id: nanoid(), component: Car }];

	const velocity = 2;

	function randomIntFromInterval(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	function spawnCar() {
		const number = randomIntFromInterval(300, 1000);
		setTimeout(() => {
			cars = [...cars, { id: nanoid(), component: Car }];
			spawnCar();
		}, number);
	}

	spawnCar();

	function removeCar() {
		cars.splice(0, 1);

		cars = cars;
	}
</script>

<SC.Group {position} {rotation}>
	<SC.Mesh
		geometry={new THREE.PlaneGeometry(cameraWidth * 2, 40)}
		material={new THREE.MeshStandardMaterial({ color: 0x444447 })}
		rotation={[(-90 * Math.PI) / 180, 0, 0]}
		position={[0, 1, 0]}
	/>
	{#each cars as car (car.id)}
		<svelte:component this={car.component} {cameraWidth} {velocity} on:remove={removeCar} />
	{/each}
</SC.Group>
