<template>
  <div class="container">
    <p>Plane: {{ plane }}</p>
    <p>From: {{ departureCity }}</p>
    <p>To: {{ arrivalCity }}</p>
    <p>
      Departure Time: {{ formatDate(departureDate) }} at {{ departureTime }}
    </p>
    <p>Arrival Time: {{ formatDate(arrivalDate) }} at {{ arrivalTime }}</p>
    <div class="priceContainer">
      <label for="normal-seat"> Normal </label>
      <input
        type="number"
        v-model="normalQuantity"
        min="0"
        :max="normalSeat"
        id="normal-seat"
      />
      <p>Normal Seat x {{ normalQuantity }}</p>
      <label for="business-seat"> Business</label>
      <input
        type="number"
        v-model="businessQuantity"
        name=""
        id="business=seat"
        min="0"
        :max="businessSeat"
      />
      <p>Business Seat x {{ businessQuantity }}</p>
      <div class="totalPrice">Total Price: {{ totalPrice }}$</div>
    </div>
    <button @click="order()">Order a Ticket</button>
  </div>
  <p>{{ message }}</p>
</template>
<script>
import { onMounted, computed /* onUpdated */ } from "vue";
import api from "../api";
import { useRoute } from "vue-router";
import { ref } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const route = useRoute();
    let store = useStore();
    let isLogin = ref();
    let flightId = route.query.id;
    let flightDetail = ref("");
    let normalQuantity = ref(0);
    let businessQuantity = ref(0);
    let normalPrice = ref("");
    let businessPrice = ref("");
    let plane = ref("");
    let departureCity = ref("");
    let arrivalCity = ref("");
    let departureDate = ref("");
    let departureTime = ref("");
    let arrivalTime = ref("");
    let arrivalDate = ref("");
    let normalSeat = ref("");
    let normalSeatPrice = ref("");
    let businessSeat = ref("");
    let businessSeatPrice = ref("");
    let userId = ref();
    let message = ref("");
    onMounted(() => {
      userId.value = store.state.userID;
      api
        .get("/orderflight/" + flightId, {})
        .then((response) => {
          flightDetail.value = response.data;
          plane.value = flightDetail.value[0].planes;
          departureCity.value = flightDetail.value[0].departure_city;
          departureDate.value = flightDetail.value[0].departure_date;
          arrivalDate.value = flightDetail.value[0].arrival_date;
          departureTime.value = flightDetail.value[0].departure_time;
          arrivalTime.value = flightDetail.value[0].arrival_time;
          arrivalCity.value = flightDetail.value[0].arrival_city;
          normalPrice.value = flightDetail.value[0].normal_seat_price;
          businessPrice.value = flightDetail.value[0].business_seat_price;
          normalSeat.value = flightDetail.value[0].normal_seat;
          businessSeat.value = flightDetail.value[0].business_seat;
        })
        .catch((error) => {
          console.error(error);
        });
      //   const token = Cookies.get("token");
      //   if (token) {
      //     user.value = jwtDecode(token);
      //     userId.value = user.value.id;
      //     console.log(userId.value);
      //     api
      //       .get("/userprofile/" + userId.value, {})
      //       .then((response) => {
      //         userInfo.value = response.data;
      //         console.log(userInfo.value);
      //       })
      //       .catch((error) => {
      //         console.log(error);
      //       });
      //   }
    });
    function order() {
      let text = "Are you sure";
      if (confirm(text) == true) {
        api
          .post("/order/" + flightId, {
            userId: userId.value,
            normalSeatOrder: normalQuantity.value,
            businessSeatOrder: businessQuantity.value,
            totalPaid: totalPrice.value,
          })
          .then((response) => {
            message.value = response.data.message;
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        console.log("cancelled");
      }
    }
    // console.log(normalPrice);
    let totalPrice = computed(() => {
      let result =
        normalQuantity.value * normalPrice.value +
        businessQuantity.value * businessPrice.value;
      return isNaN(result) ? 0 : result;
    });
    function formatDate(date) {
      let dateObj = new Date(date);
      const year = dateObj.getFullYear();
      const month = dateObj.getMonth() + 1;
      const day = dateObj.getDate();
      return `${day}-${month}-${year}`;
    }
    // onUpdated(() => {
    //   console.log(totalPrice.value);
    // });
    return {
      flightId,
      flightDetail,
      totalPrice,
      normalQuantity,
      businessQuantity,
      normalPrice,
      businessPrice,
      plane,
      departureCity,
      arrivalCity,
      departureDate,
      departureTime,
      arrivalTime,
      arrivalDate,
      normalSeat,
      normalSeatPrice,
      businessSeat,
      businessSeatPrice,
      order,
      formatDate,
      message,
      isLogin,
    };
  },
};
</script>
<style scoped>
.container {
  margin-top: 10rem;
}
.priceContainer {
  display: flex;
  flex-direction: column;
  width: 30%;
  margin: auto;
  padding: auto;
}
.totalPrice {
  color: red;
  font-size: larger;
}
input[type="number"],
select {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
p {
  font-size: large;
  color: rgb(0, 165, 110);
}
</style>
