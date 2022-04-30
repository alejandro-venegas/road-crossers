<script lang="ts">
	import * as SC from 'svelte-cubed';
	import * as THREE from 'three';

	import { points, position, width } from '$lib/Player.ts';
	import { isOver } from './Game';

	const zInit = 50;
	const playerDimension = 20;
	const playerVelocity = 2.5;
	const targetFromCenter = 50;

	$width = playerDimension;

	let z;
	let target;

	function setPlayer() {
		z = zInit;
		target = -1;
	}
	setPlayer();

	const keysState = {};

	function onKeyEvent(event: KeyboardEvent, isDown: boolean) {
		keysState[event.code] = isDown;
	}

	SC.onFrame(() => {
		if ($isOver) {
			return;
		}
		if (keysState['ArrowUp']) {
			z -= playerVelocity;
		} else if (keysState['ArrowDown']) {
			z += playerVelocity;
		}
		$position = { x: 0, y: 0, z };

		if (target * (z + (target * playerDimension) / 2) >= targetFromCenter) {
			$points += 1;
			target = -target;
		}
	});

	function onIsOverChange(restart: boolean) {
		if (restart) {
			setPlayer();
		}
	}

	$: onIsOverChange(!$isOver);
</script>

<svelte:window
	on:keydown={(event) => onKeyEvent(event, true)}
	on:keyup={(event) => onKeyEvent(event, false)}
/>

<SC.Mesh
	position={[0, 10, z]}
	geometry={new THREE.BoxBufferGeometry(
		playerDimension,
		playerDimension,
		playerDimension
	)}
	material={new THREE.MeshLambertMaterial({ color: 0xffffff })}
	castShadow
/>
