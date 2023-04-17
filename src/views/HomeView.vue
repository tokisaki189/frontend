/* eslint-disable */

<template>
  <div class="container">
    <form action="" class="flight-search">
      <div class="city-input">
        <input
          type="text"
          list="city"
          v-model="departure"
          placeholder="Departure City"
        />
        <hr />
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
        <button @click.prevent="FlightSearch" class="search-button">
          Search for flight
        </button>
      </div>
    </form>

    <div class="flight-list" v-if="displayedItems">
      <!-- <div>
        <form>
          <label for="cars">sort by </label>
          <select v-model="selectedorder">
            <option value="1">Departure Date Ascending</option>
            <option value="2">Departure Date Descending</option>
            <option value="3">Arrival Date Ascending</option>
            <option value="4">Departure Date Descending</option>
            <option value="5">Business Seats Ascending</option>
            <option value="6">Business Seats Descending</option>
            <option value="7">Normal Seats Ascending</option>
            <option value="8">Normal Seats Descending</option>
          </select>
          <button @click.prevent="sort()">Sort</button>
        </form>
      </div> -->
      <div
        v-for="flight in displayedItems"
        :key="flight"
        class="individual-flight"
      >
        <span
          ><p>Plane:</p>
          <b>{{ flight.planes }}</b></span
        >
        <span
          ><p>Departure from:</p>
          <b>{{ flight.departure_city }}</b></span
        >
        <font-awesome-icon :icon="plane"></font-awesome-icon>
        <span
          ><p>Arrival to:</p>
          <b>{{ flight.arrival_city }}</b></span
        >
        <span
          ><p>Taking off date:</p>
          <b> {{ formatDate(flight.departure_date) }}</b></span
        >
        <span
          ><p>Landing date:</p>
          <b>{{ formatDate(flight.arrival_date) }}</b></span
        >
        <span
          ><p>Normal seats available:</p>
          <b>{{ flight.normal_seat }}</b></span
        >
        <span
          ><p>Business seats available:</p>
          <b> {{ flight.business_seat }}</b></span
        >
        <span>
          <button
            class="detail"
            @click="goToOrder(flight.flight_id)"
            :id="flight.flight_id"
          >
            Order Now
          </button>
        </span>
      </div>
      <div v-if="displayedItems" class="button-container">
        <button @click="previousPage">Previous</button>
        <button @click="nextPage">Next</button>
      </div>
    </div>

    <div v-else>Find the flight in your desire</div>
  </div>

  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.3309818186312!2d105.80198221535656!3d21.218719886641157!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135021539afc453%3A0xe6e0faa3520226b4!2zQ-G6o25nIGjDoG5nIGtow7RuZyBxdeG7kWMgdOG6vyBO4buZaSBCw6Bp!5e0!3m2!1svi!2s!4v1679394147672!5m2!1svi!2s"
    width="600"
    height="450"
    style="border: 0"
    allowfullscreen=""
    loading="lazy"
    referrerpolicy="no-referrer-when-downgrade"
    class="map"
  ></iframe>
</template>

<script>
import FontAwesomeIcon from "@fortawesome/vue-fontawesome";
import { ref, onMounted, computed } from "vue";
import { faPlane } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import router from "../router";

import api from "../api";
export default {
  components: {
    FontAwesomeIcon,
  },
  setup() {
    let departure = ref("");
    let arrival = ref("");
    let cities = ref();
    let flightlist = ref("");
    let currentPage = ref(0);
    let selectedorder = ref("");
    const pageSize = 5;

    library.add(faPlane);
    onMounted(() => {
      api
        .get("/cities")
        .then((response) => {
          cities.value = response.data;
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
        })
        .catch((error) => {
          console.log(error);
        });
    }
    function formatDate(date) {
      let dateObj = new Date(date);
      const year = dateObj.getFullYear();
      const month = dateObj.getMonth() + 1;
      const day = dateObj.getDate();
      return `${year}-${month}-${day}`;
    }
    function goToOrder(id) {
      router.push({
        name: "order",
        query: {
          id: id,
        },
      });
    }
    const displayedItems = computed(() => {
      const start = currentPage.value * pageSize;
      const end = start + pageSize;
      return flightlist.value.slice(start, end);
    });
    function previousPage() {
      if (currentPage.value > 0) {
        currentPage.value--;
      }
    }

    function nextPage() {
      if (currentPage.value < Math.floor(flightlist.value.length / pageSize)) {
        currentPage.value++;
      }
    }
    function sort() {
      console.log(arrival.value + departure.value);
      console.log(selectedorder);
    }
    return {
      previousPage,
      nextPage,
      displayedItems,
      departure,
      arrival,
      cities,
      FlightSearch,
      flightlist,
      formatDate,
      goToOrder,
      sort,
      selectedorder,
    };
  },
};
</script>
<style scoped>
.map {
  width: 100%;
}
.container {
  padding-top: 10rem;
  background-image: url("../assets/image/wing.png");
  background-repeat: no-repeat;
  width: 100%;
  height: 40rem;
  display: flex;
  gap: 2rem;
  flex-direction: row;
}
.city-input {
  margin: auto;
  padding: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
  gap: 1rem;
  width: 23rem;
  border-radius: 2rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
  background-color: rgba(0, 0, 0, 0.4);
}
.city-input input {
  height: 3rem;
  width: 90%;
  border-radius: 0.5rem;
  padding-left: 0.5rem;
  border: 0.15rem solid rgb(51, 51, 51);
}
.flight-list {
  width: 100%;
  align-self: flex-start;
  margin-right: 2rem;
  display: flex;
  flex-direction: column;
  height: 40rem;
}
/* .recommend {
  width: 1000px;
} */
.flight-search {
  margin-left: 2rem;
  font-size: 3rem;
  color: rgb(255, 255, 255);
}
.search-button {
  appearance: button;
  background-color: #1899d6;
  border: solid transparent;
  border-radius: 16px;
  border-width: 0 0 4px;
  box-sizing: border-box;
  color: #ffffff;
  cursor: pointer;
  display: inline-block;
  font-family: din-round, sans-serif;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.8px;
  line-height: 20px;
  margin: 0;
  outline: none;
  overflow: visible;
  padding: 13px 16px;
  text-align: center;
  text-transform: uppercase;
  touch-action: manipulation;
  transform: translateZ(0);
  transition: filter 0.2s;
  user-select: none;
  -webkit-user-select: none;
  vertical-align: middle;
  white-space: nowrap;
  width: 15rem;
}

.search-button:after {
  background-clip: padding-box;
  background-color: #1cb0f6;
  border: solid transparent;
  border-radius: 16px;
  border-width: 0 0 4px;
  bottom: -4px;
  content: "";
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  z-index: -1;
}

.search-button:main,
.button-19:focus {
  user-select: auto;
}

.search-button:hover:not(:disabled) {
  filter: brightness(1.1);
  -webkit-filter: brightness(1.1);
}

.search-button:disabled {
  cursor: auto;
}
hr {
  width: 90%;
}
.individual-flight {
  display: flex;
  padding-left: 1rem;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 1rem;
  height: 5rem;
  background-color: whitesmoke;
  border-radius: 1rem;
  transition: all 0.2s ease-in-out;
  box-shadow: 5px 5px #c2c2c2;
}
.individual-flight:hover {
  transform: scale(1.05);
}
.detail {
  width: 5rem;
  height: 5rem;
  border: none;
  background-color: #10be84;
  border-radius: 1rem;
}
.detail:hover {
  background-color: #48e6b1;
}
b {
  font-size: large;
}
span {
  display: flex;
  flex-direction: column;
}
iframe {
  border: 1px solid black;
}
.button-container {
  justify-self: flex-end;
  align-self: flex-end;
}
.button-container button {
  width: 5rem;
  height: 2rem;
  bottom: 0;
}
</style>
