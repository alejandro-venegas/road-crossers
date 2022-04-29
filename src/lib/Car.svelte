<script lang="ts">
	import * as THREE from 'three';
	import * as SC from 'svelte-cubed';
	import { createEventDispatcher } from 'svelte';

	import { position, width } from '$lib/Player.ts';
	import { isOver } from './Game';

	export let cameraWidth;
	export let velocity;
	export let globalZ;

	let car;

	const dispatch = createEventDispatcher();

	const vehicleColors = [
		0xeb4034, 0xebdc34, 0x5ceb34, 0x34dfeb, 0xe534eb, 0xeb7734
	];
	const colorIndex = Math.floor(Math.random() * vehicleColors.length);

	function aabb(a, b) {
		return (
			a.x < b.x + b.width &&
			a.x + a.width > b.x &&
			a.z < b.z + b.depth &&
			a.z + a.depth > b.z
		);
	}

	let xOffset = 0;

	$: xInit = -cameraWidth;
	let x;

	SC.onFrame(() => {
		if ($isOver) {
			return;
		}
		if (xInit >= -x) {
			dispatch('remove');
			return;
		}
		xOffset += 1;
		x = xInit + xOffset * velocity;

		const playerInfo = {
			x: $position.x - $width / 2,
			z: $position.z - $width / 2,
			width: $width,
			depth: $width
		};

		const carInfo = { x: x - 35, z: globalZ - 15, width: 70, depth: 30 };

		if (aabb(playerInfo, carInfo)) {
			$isOver = true;
		}
	});
</script>

<SC.Group position={[x, 0, 0]} bind:this={car}>
	<SC.Mesh
		geometry={new THREE.BoxBufferGeometry(10, 10, 36)}
		material={new THREE.MeshStandardMaterial({ color: 0x333333 })}
		position={[-18, 5, 0]}
		castShadow
		receiveShadow
	/>
	<SC.Mesh
		geometry={new THREE.BoxBufferGeometry(10, 10, 36)}
		material={new THREE.MeshStandardMaterial({ color: 0x333333 })}
		position={[18, 5, 0]}
		castShadow
		receiveShadow
	/>
	<SC.Mesh
		geometry={new THREE.BoxBufferGeometry(70, 15, 30)}
		material={new THREE.MeshStandardMaterial({
			color: vehicleColors[colorIndex]
		})}
		position={[0, 10, 0]}
		castShadow
		receiveShadow
	/>
	<SC.Mesh
		geometry={new THREE.BoxBufferGeometry(40, 12, 25)}
		material={new THREE.MeshStandardMaterial({ color: 0xc8d7e0 })}
		position={[-5, 22, 0]}
		castShadow
		receiveShadow
	/>
</SC.Group>
