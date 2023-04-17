<template>
  <div class="container">
    <p>{{ flightId }}</p>
    <p>{{ flight.planes }}</p>
    <!-- <p>{{ flight }}</p> -->
    <!-- <p>{{  }}</p>
  <p>{{  }}</p>
  <p>{{  }}</p>
  <p>{{  }}</p>
  <p>{{  }}</p>
  <p>{{  }}</p>
  <p>{{  }}</p> -->
  </div>
</template>
<script>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { onMounted } from "vue";
import api from "../api";
export default {
  setup() {
    let flight = ref("");
    const route = useRoute();
    let flightId = route.query.id;
    onMounted(() => {
      api
        .get("/flight/" + flightId)
        .then((response) => {
          flight.value = response.data[0];
        })
        .catch((error) => {
          console.error(error);
        });
    });

    return {
      flightId,
      flight,
    };
  },
};
</script>
<style scoped>
.container {
  margin-top: 4rem;
}
</style>
