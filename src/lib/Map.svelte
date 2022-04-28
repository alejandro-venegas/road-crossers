<script lang="ts">
    import * as THREE from 'three';
    import * as SC from 'svelte-cubed';

    let width = window.innerWidth;
    let height = window.innerHeight;


</script>

<SC.Group>
    <SC.Mesh geometry={new THREE.PlaneBufferGeometry(width, height)}
             material={new THREE.MeshLambertMaterial({color: 0x00cc00})}
             rotation={[-90 * Math.PI / 180, 0, 0]}

    />
</SC.Group>