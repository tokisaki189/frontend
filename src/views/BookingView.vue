/* eslint-disable */

<template>
  <p>book here</p>
  <div class="container">
    <form action="" class="flight-search">
      <div class="city-input">
        <input
          type="text"
          list="city"
          v-model="departure"
          placeholder="Departure City"
        />
        <input
          type="text"
          list="city"
          v-model="arrival"
          placeholder="Arrival City"
        />
        <datalist id="city" class="recommend">
          <option v-for="city in cities" :key="city">
            {{ city.city_name }}
          </option>
        </datalist>
        <button @click.prevent="FlightSearch">Search for flight</button>
      </div>
    </form>
    <table class="flight-list">
      <tr>
        <th>Plane</th>
        <th>Departure</th>
        <th>Arrival</th>
      </tr>
      <tr v-for="flight in flightlist" :key="flight">
        <td>{{ flight.planes }}</td>
        <td>{{ flight.departure_city }}</td>
        <td>{{ flight.arrival_city }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import api from "../api";
export default {
  components: {},
  setup() {
    let departure = ref("");
    let arrival = ref("");
    let cities = ref();
    let flightlist = ref();
    onMounted(() => {
      api
        .get("/cities")
        .then((response) => {
          cities.value = response.data;
          console.log(cities.value);
        })
        .catch((error) => {
          console.error(error);
        });
    });
    function FlightSearch() {
      api
        .post("/flightsearch", {
          departure: departure.value,
          arrival: arrival.value,
        })
        .then((response) => {
          this.flightlist = response.data;
          console.log(this.flightlist);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    return {
      departure,
      arrival,
      cities,
      FlightSearch,
      flightlist,
    };
  },
};
</script>
<style scoped>
::-webkit-datetime-edit {
  padding: 0.5em;
}
::-webkit-datetime-edit-fields-wrapper {
  background: silver;
}
::-webkit-datetime-edit-text {
  color: red;
  padding: 0 0.3em;
}
::-webkit-datetime-edit-month-field {
  color: blue;
}
::-webkit-datetime-edit-day-field {
  color: green;
}
::-webkit-datetime-edit-year-field {
  color: purple;
}
::-webkit-inner-spin-button {
  display: none;
}
:-webkit-calendar-picker-indicator {
  font-size: larger;
}
.city-input {
  margin: auto;
  padding: auto;
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  gap: 2rem;
}
.city-input input {
  height: 3rem;
  width: 15rem;
}
.flight-list {
  margin: auto;
  padding: auto;
  width: 50%;
}
.recommend {
  width: 1000px;
}
</style>
