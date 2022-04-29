<script lang="ts">
	import * as SC from 'svelte-cubed';
	import * as THREE from 'three';

	import { points } from '$lib/Player.js';

	const zInit = 50;
	const playerRadius = 10;
	const playerVelocity = 2.5;
	const targetFromCenter = 50;

	let z = zInit;

	let target = -1;

	const keysState = {};

	function onKeyEvent(event: KeyboardEvent, isDown: boolean) {
		keysState[event.code] = isDown;
	}

	SC.onFrame(() => {
		if (keysState['ArrowUp']) {
			z -= playerVelocity;
		} else if (keysState['ArrowDown']) {
			z += playerVelocity;
		}

		if (target * (z - playerRadius) >= targetFromCenter) {
			$points += 1;
			target = -target;
		}
	});
</script>

<svelte:window
	on:keydown={(event) => onKeyEvent(event, true)}
	on:keyup={(event) => onKeyEvent(event, false)}
/>

<SC.Mesh
	position={[0, 10, z]}
	geometry={new THREE.SphereBufferGeometry(playerRadius)}
	material={new THREE.MeshLambertMaterial({ color: 0xffffff })}
	castShadow
/>
