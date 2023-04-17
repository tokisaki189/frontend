<template>
  <div>crud</div>
  <div class="container">
    <form class="form-container">
      <label for="plane">Plane</label>
      <input type="text" name="" id="plane" v-model="plane" required />

      <div class="city-container">
        <label for="departure_city">Departure City</label>
        <select
          type="text"
          name=""
          id="departure_city"
          v-model="departureCity"
          required
        >
          <option v-for="city in cities" :key="city" required>
            {{ city.city_name }}
          </option>
        </select>
        <label for="arrival_city">Arrival City</label>
        <select
          type="text"
          name=""
          id="arrival_city"
          v-model="arrivalCity"
          required
        >
          <option v-for="city in cities" :key="city" required>
            {{ city.city_name }}
          </option>
        </select>
      </div>

      <div class="date-container">
        <label for="departure_date">Departure Date</label>
        <input
          type="date"
          name=""
          id="departure_date"
          v-model="departureDate"
          required
        />
        <label for="arrival_date">Arrival Date</label>
        <input
          type="date"
          name=""
          id="arrival_date"
          v-model="arrivalDate"
          required
        />
      </div>

      <div class="time-container">
        <label for="departure_time">Departure Time</label>
        <input
          type="time"
          name=""
          id="departure_time"
          v-model="departureTime"
          required
        />
        <label for="arrival_time">Arrival Time</label>
        <input
          type="time"
          name=""
          id="arrival_time"
          v-model="arrivalTime"
          required
        />
      </div>

      <div class="seat-container">
        <div class="normal-seat-container">
          <label for="normal_seat">Normal Seat Available</label>
          <input
            type="number"
            name=""
            id="normal_seat"
            v-model="normalSeat"
            required
          />
          <label for="normal_seat_price">Normal Seat Price</label>
          <input
            type="number"
            name=""
            id="normal_seat_price"
            v-model="normalPrice"
            required
          />
        </div>

        <div class="business-seat-container">
          <label for="business_seat">Business Seat Available</label>
          <input
            type="number"
            name=""
            id="business_seat"
            v-model="businessSeat"
            required
          />
          <label for="business_seat_price">Business Seat Price</label>
          <input
            type="number"
            name=""
            id="business_seat_price"
            v-model="businessPrice"
            required
          />
        </div>
      </div>

      <button class="add-flight" @click="addflight">Add Flight</button>
    </form>
  </div>
  <div class="button-container">
    <button @click="previousPage">Previous</button>
    <button @click="nextPage">Next</button>
    <p>{{ page.value + 1 }}</p>
  </div>
  <div class="flight-list-container">
    <table class="flight-list">
      <tr>
        <th>Flight ID</th>
        <th>Plane Name</th>
        <th>Departure City</th>
        <th>Arrival City</th>
        <th>Departure Date</th>
        <th>Arrival Date</th>
        <th>Departure Time</th>
        <th>Arrival Time</th>
        <th>Normal Seats</th>
        <th>Business Seats</th>
        <th>Normal Seat Price</th>
        <th>Business Seat Price</th>
        <th>Operation</th>
      </tr>
      <tr
        class="individual-flight"
        v-for="flight in displayedItems"
        :key="flight"
      >
        <th>{{ flight.flight_id }}</th>
        <th>{{ flight.planes }}</th>
        <th>{{ flight.departure_city }}</th>
        <th>{{ flight.arrival_city }}</th>
        <th>{{ formatDate(flight.departure_date) }}</th>
        <th>{{ formatDate(flight.arrival_date) }}</th>
        <th>{{ flight.departure_time }}</th>
        <th>{{ flight.arrival_time }}</th>
        <th>{{ flight.normal_seat }}</th>
        <th>{{ flight.business_seat }}</th>
        <th>{{ flight.normal_seat_price }}</th>
        <th>{{ flight.business_seat_price }}</th>
        <th>
          <button :id="flight_id" @click="editflight(flight.flight_id)">
            Edit
          </button>
          <button
            :id="flight.flight_id"
            @click="deleteflight(flight.flight_id)"
          >
            Delete
          </button>
        </th>
      </tr>
    </table>
  </div>
</template>
<script>
import api from "../../api.js";
import { ref, onMounted, computed } from "vue";
import router from "../../router";

export default {
  name: "FlightCrud",
  setup() {
    let flights = ref("");
    let currentPage = ref(0);
    let page = 1;
    let plane = ref("");
    let departureCity = ref("");
    let arrivalCity = ref("");
    let departureDate = ref("");
    let departureTime = ref("");
    let arrivalTime = ref("");
    let arrivalDate = ref("");
    let normalSeat = ref("");
    let normalPrice = ref("");
    let businessSeat = ref("");
    let businessPrice = ref("");
    let cities = ref();
    const pageSize = 8;
    onMounted(() => {
      api
        .get("/cities")
        .then((response) => {
          cities.value = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
      api
        .get("/flights")
        .then((response) => {
          flights.value = response.data;
          console.log(flights.value);
        })
        .catch((error) => {
          console.error(error);
        });
    });
    function addflight() {
      console.log(" " + businessSeat.value + " " + businessPrice.value);
      api
        .post("/addflight", {
          plane: plane.value,
          departureCity: departureCity.value,
          arrivalCity: arrivalCity.value,
          departureDate: departureDate.value,
          arrivalDate: arrivalDate.value,
          departureTime: departureTime.value,
          arrivalTime: arrivalTime.value,
          normalSeat: normalSeat.value,
          normalPrice: normalPrice.value,
          businessSeat: businessSeat.value,
          businessPrice: businessPrice.value,
        })
        .then((response) => {
          console.log(response.data);
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
    const displayedItems = computed(() => {
      const start = currentPage.value * pageSize;
      const end = start + pageSize;
      return flights.value.slice(start, end);
    });
    function previousPage() {
      if (currentPage.value > 0) {
        currentPage.value--;
      }
    }

    function nextPage() {
      if (currentPage.value < Math.floor(flights.value.length / pageSize)) {
        currentPage.value++;
      }
    }
    function deleteflight(id) {
      let text = "Are you sure";
      if (confirm(text) == true) {
        location.reload();
        api
          .delete("/deleteflight/" + id)
          .then((response) => {
            console.log(response.data);
            location.reload();
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        console.log("cancelled");
      }
    }
    function editflight(id) {
      router.push({
        name: "editflight",
        query: {
          id: id,
        },
      });
    }
    return {
      addflight,
      flights,
      formatDate,
      previousPage,
      nextPage,
      displayedItems,
      plane,
      editflight,
      departureCity,
      arrivalCity,
      departureDate,
      departureTime,
      arrivalTime,
      arrivalDate,
      normalSeat,
      normalPrice,
      businessSeat,
      businessPrice,
      page,
      deleteflight,
      cities,
    };
  },
};
</script>
<style scoped>
.container {
  margin: auto;
  padding: auto;
}
.form-container {
  width: 80%;
  margin: auto;
  padding: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: space-between;
  align-content: space-between;
  justify-content: space-between;
  justify-items: space-between;
}
.form-container input {
  height: 2rem;
}
.form-container label {
  align-self: start;
}
.add-flight {
  width: 5rem;
  height: 3rem;
}
.flight-list-container {
  margin-bottom: 10rem;
}
th,
td {
  padding-bottom: 1rem;
  vertical-align: top;
  border: 1px solid black;
  width: 100px;
}
tr {
  vertical-align: top;
}
tr:nth-child(even) {
  background-color: #d6d6d6;
}
table {
  width: 100%;
  border-spacing: 3px;
  height: 30rem;
}
#plane {
  width: 70%;
}
.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 10px;
}

.form-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.label-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.city-container,
.date-container,
.time-container,
.normal-seat-container,
.business-seat-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.label-container label,
.city-container label,
.date-container label,
.time-container label,
.normal-seat-container label,
.business-seat-container label {
  margin-bottom: 5px;
}

.add-flight {
  grid-column: 1 / -1;
}
</style>
