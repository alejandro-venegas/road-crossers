<script>
	import * as SC from 'svelte-cubed';
	import Car from '$lib/Car.svelte';
</script>

<SC.Canvas>
    <Car/>
	<SC.AmbientLight color={0xFFFFFF} intensity="0.6" />
	<SC.DirectionalLight color={0xFFFFFF} intensity="0.6" position={[20, 30, 100]}/>
	<SC.PerspectiveCamera position={[100, 150, 150]} />
</SC.Canvas>