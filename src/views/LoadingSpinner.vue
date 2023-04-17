<template>
  <div class="container">
    <RingLoader :loading="loading" :color="color" :size="size"></RingLoader>
  </div>
</template>
<script>
import RingLoader from "vue-spinner/src/RingLoader.vue";
export default {
  components: {
    RingLoader,
  },
};
</script>
<style>
.container {
  width: 100%;
  height: 30rem;
  padding-top: 20rem;
}
</style>
