<script lang="ts">
	import * as SC from 'svelte-cubed';
	import * as THREE from 'three';
	import Lane from './Lane.svelte';

	export let cameraWidth;
</script>

<SC.Group>
	<Lane {cameraWidth} position={[0, 0, 20]} />
	<Lane {cameraWidth} position={[0, 0, -20]} rotation={[0, Math.PI, 0]} />
</SC.Group>
