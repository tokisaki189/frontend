<template>
  <div class="container">
    <p>{{ plane }}</p>
    <p>{{ formatDate(departureDate) }}</p>
    <p>{{ departureCity }}</p>
    <p>{{ departureTime }}</p>
    <p>{{ formatDate(arrivalDate) }}</p>
    <p>{{ arrivalCity }}</p>
    <p>{{ arrivalTime }}</p>
    <div class="edit-container">
      <div class="oldOrder">
        <p>Normal Seat Ordered: {{ normalSeatOrder }}</p>
        <p>Business Seat Ordered: {{ businessSeatOrder }}</p>
        <div class="totalPrice">Total Price: {{ totalPrice }}$</div>
      </div>
      <div class="newOrder">
        <form action="" class="form-edit">
          <div>
            <label for="normal">Change Normal Seat Order</label>
            <input
              type="number"
              name=""
              id="normal"
              v-model="newnormalSeatOrder"
              min="0"
              :max="normalSeat"
            />
          </div>
          <div>
            <label for="business">Change Business Seat Order</label>
            <input
              type="number"
              name=""
              id="business"
              v-model="newbusinessSeatOrder"
              min="0"
              :max="businessSeat"
            />
          </div>
          <p>New Price:{{ newTotalPrice }}</p>
          <button @click="updateOrder()">Update Order</button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { onMounted, ref, computed } from "vue";
import { useRoute } from "vue-router";

import api from "../api";
export default {
  setup() {
    let route = useRoute();
    let id = route.query.id;
    let plane = ref();
    let businessSeatOrder = ref(0);
    let normalSeatOrder = ref(0);
    let newbusinessSeatOrder = ref(0);
    let newnormalSeatOrder = ref(0);
    let totalPrice = ref(0);
    let departureTime = ref();
    let arrivalTime = ref();
    let normalSeat = ref();
    let businessSeat = ref();
    let normalPrice = ref();
    let businessPrice = ref();
    let departureDate = ref();
    let departureCity = ref();
    let arrivalDate = ref();
    let arrivalCity = ref();
    onMounted(() => {
      console.log(id);
      api
        .get("/orderEdit/" + id)
        .then((response) => {
          console.log(response.data);
          plane.value = response.data[0].planes;
          businessSeatOrder.value = response.data[0].business_seat_order;
          normalSeatOrder.value = response.data[0].normal_seat_order;
          normalSeat.value = response.data[0].normal_seat;
          businessSeat.value = response.data[0].business_seat;
          departureTime.value = response.data[0].departure_time;
          arrivalTime.value = response.data[0].arrival_time;
          totalPrice.value = response.data[0].total_price;
          departureDate.value = response.data[0].departure_date;
          departureCity.value = response.data[0].departure_city_name;
          arrivalDate.value = response.data[0].arrival_date;
          arrivalCity.value = response.data[0].arrival_city_name;
          normalPrice.value = response.data[0].normal_seat_price;
          businessPrice.value = response.data[0].business_seat_price;
        })
        .catch((error) => {
          console.error(error);
        });
      console.log(normalPrice.value);
    });
    let newTotalPrice = computed(() => {
      let result =
        newnormalSeatOrder.value * normalPrice.value +
        newbusinessSeatOrder.value * businessPrice.value;
      return isNaN(result) ? 0 : result;
    });
    function formatDate(date) {
      let dateObj = new Date(date);
      const year = dateObj.getFullYear();
      const month = dateObj.getMonth() + 1;
      const day = dateObj.getDate();
      return `${day}-${month}-${year}`;
    }
    function updateOrder() {
      console.log(newbusinessSeatOrder.value + " " + newnormalSeatOrder.value);
      console.log(newTotalPrice.value);
      api.put("/editOrder/" + id, {
        businessSeat: newbusinessSeatOrder.value,
        normalSeat: newnormalSeatOrder.value,
        totalPrice: newTotalPrice.value,
      });
    }
    return {
      formatDate,
      plane,
      businessSeatOrder,
      normalSeatOrder,
      newbusinessSeatOrder,
      newnormalSeatOrder,
      totalPrice,
      updateOrder,
      newTotalPrice,
      departureCity,
      departureDate,
      arrivalDate,
      arrivalCity,
      normalSeat,
      businessSeat,
      normalPrice,
      businessPrice,
      departureTime,
      arrivalTime,
    };
  },
};
</script>
<style scoped>
.container {
  width: 100%;
}
.edit-container {
  display: flex;
  flex-direction: row;
  margin: auto;
  padding: auto;
  justify-content: center;
}
</style>
