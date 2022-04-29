<script lang="ts">
	import * as THREE from 'three';
	import * as SC from 'svelte-cubed';
	import { createEventDispatcher } from 'svelte';

	export let cameraWidth;
	export let velocity;

	const dispatch = createEventDispatcher();

	const vehicleColors = [0xeb4034, 0xebdc34, 0x5ceb34, 0x34dfeb, 0xe534eb, 0xeb7734];
	const colorIndex = Math.floor(Math.random() * vehicleColors.length);

	let xOffset = 0;

	$: xInit = -cameraWidth;
	let x;

	SC.onFrame(() => {
		if (xInit >= -x) {
			dispatch('remove');
			return;
		}
		xOffset += 1;
		x = xInit + xOffset * velocity;
	});
</script>

<SC.Group position={[x, 0, 0]}>
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
		material={new THREE.MeshStandardMaterial({ color: vehicleColors[colorIndex] })}
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
