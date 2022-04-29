<script lang="ts">
    import * as THREE from 'three';
    import * as SC from 'svelte-cubed';

    export let width = window.innerWidth;
    export let height = window.innerHeight;


</script>



<SC.Group >
    <SC.Mesh geometry={new THREE.PlaneGeometry(width *2, height *2)}
             material={new THREE.MeshStandardMaterial({color: 0x00cc00})}
             rotation={[-90 * Math.PI / 180, 0, 0]}
             receiveShadow={true}


    />
    <SC.Primitive
            object={new THREE.GridHelper(width, 30, 0x444444, 0x555555)}
            position={[0, 0.001, 0]}
            receiveShadow
    />
</SC.Group>