<script lang="ts">
	import * as SC from 'svelte-cubed';

	import Car from '$lib/Car.svelte';
	import Map from '$lib/Map.svelte';

	let canvas;
</script>

<SC.Canvas antialias bind:this={canvas}>
	<Map/>
    <Car/>
	<SC.AmbientLight color={0xFFFFFF} intensity="0.6" />
	<SC.DirectionalLight color={0xFFFFFF} intensity="0.6" position={[20, 30, 100]}/>
	<SC.PerspectiveCamera position={[100, 150, 150]} />
</SC.Canvas>