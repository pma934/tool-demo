<template>
  <div id="table" ref="table"></div>
</template>

<script>
export default {
  name: "Three",
  components: {},
  props: {},
  data() {
    return {};
  },
  mounted() {
    console.log(this.$three.MeshBasicMaterial);
    var scene = new this.$three.Scene();
    var camera = new this.$three.PerspectiveCamera(75, 2 / 1, 0.1, 100);

    var renderer = new this.$three.WebGLRenderer();
    renderer.setSize(
      this.$refs.table.clientWidth,
      this.$refs.table.clientHeight
    );
    this.$refs.table.appendChild(renderer.domElement);

    var geometry = new this.$three.BoxGeometry();
    var material = new this.$three.MeshBasicMaterial({ color: 0x0000ff });
    var cube = new this.$three.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    renderer.render(scene, camera);

    function animate() {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    }

    animate();
  }
};
</script>

<style scoped>
#table {
  width: 100%;
  height: calc(100vh - 94px);
  border: 1px solid #2e63d6;
  box-sizing: border-box;
}
</style>
