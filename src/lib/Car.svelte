<script lang="ts">
    import * as THREE from 'three';
    import * as SC from 'svelte-cubed';
    const vehicleColors = [0xa52523, 0xbdb638, 0x78b141];
</script>

<SC.Group castShadow={true}>
    <SC.Mesh  geometry={new THREE.BoxBufferGeometry(10, 10, 36)}
              material={new THREE.MeshLambertMaterial({color: 0x333333 })}
              position={[-18, 5, 0]}
              castShadow
    />
    <SC.Mesh  geometry={new THREE.BoxBufferGeometry(10, 10, 36)}
              material={new THREE.MeshLambertMaterial({color: 0x333333 })}
              position={[18, 5, 0]}
              castShadow
    />
    <SC.Mesh  geometry={new THREE.BoxBufferGeometry(70, 10, 30)}
              material={new THREE.MeshLambertMaterial({color: vehicleColors[0] })}
              position={[0, 10, 0]}
              castShadow={true}
    />
    <SC.Mesh  geometry={new THREE.BoxBufferGeometry(40, 10, 25)}
              material={new THREE.MeshLambertMaterial({color: 0xFFFFFFF })}
              position={[-5, 20, 0]}
              castShadow={true}
    />

</SC.Group>