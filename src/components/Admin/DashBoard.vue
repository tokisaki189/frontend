<template>
  <p>Dash Board</p>
  <div class="outer">
    <div class="container">
      <div class="total">
        <div>
          <p>Total Revenue Today</p>
          <count-up :end-val="today" class="count-up"></count-up>
        </div>
        <div>
          <p>Total Revenue This Month</p>
          <count-up :end-val="thismonth" class="count-up"></count-up>
        </div>
      </div>
    </div>
    <div class="chart-container">
      <div class="chart">
        <Bar v-if="isDataReady" :options="chartOptions" :data="chartData" />
        <div v-else class="load-container">
          <BeatLoader
            :loading="loading"
            :color="'#56c1ff'"
            :size="size"
          ></BeatLoader>
        </div>
        <div class="year-chart-container">
          <Line v-if="isDataReady" :options="chartOptions" :data="yearChart" />
          <div v-else class="load-container">
            <BeatLoader
              :loading="loading"
              :color="'#56c1ff'"
              :size="size"
            ></BeatLoader>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, onMounted } from "vue";
import api from "../../api";
import BeatLoader from "vue-spinner/src/BeatLoader.vue";
import { Bar, Line } from "vue-chartjs";
import CountUp from "vue-countup-v3";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
ChartJS.register(
  Title,
  Tooltip,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

export default {
  name: "DashBoard",
  components: { Bar, BeatLoader, CountUp, Line },
  setup() {
    let dateData = ref([]);
    let today = ref("");
    let thismonth = ref("");
    let isDataReady = ref(false);
    let yearData = ref([]);
    setTimeout(() => {
      isDataReady.value = true;
    }, 1000);
    let chartData = ref({
      labels: [
        "1st",
        "2nd",
        "3rd",
        "4th",
        "5th",
        "6th",
        "7th",
        "8th",
        "9th",
        "10th",
        "11th",
        "12th",
        "13th",
        "14th",
        "15th",
        "16th",
        "17th",
        "18th",
        "19th",
        "20th",
        "21th",
        "22th",
        "23th",
        "24th",
        "25th",
        "26th",
        "27th",
        "28th",
        "29th",
        "30th",
      ],
      datasets: [
        {
          data: [],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(128, 0, 0, 0.2)",
            "rgba(0, 128, 0, 0.2)",
            "rgba(0, 0, 128, 0.2)",
            "rgba(128, 128, 0, 0.2)",
            "rgba(128, 0, 128, 0.2)",
            "rgba(0, 128, 128, 0.2)",
            "rgba(255, 0, 0, 0.2)",
            "rgba(0, 255, 0, 0.2)",
            "rgba(0, 0, 255, 0.2)",
            "rgba(255, 255, 0, 0.2)",
            "rgba(255, 0, 255, 0.2)",
            "rgba(0, 255, 255, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(128, 0, 0, 1)",
            "rgba(0, 128, 0, 1)",
            "rgba(0, 0, 128, 1)",
            "rgba(128, 128, 0, 1)",
            "rgba(128, 0, 128, 1)",
            "rgba(0, 128, 128, 1)",
            "rgba(255, 0, 0, 1)",
            "rgba(0, 255, 0, 1)",
            "rgba(0, 0, 255, 1)",
            "rgba(255, 255, 0, 1)",
            "rgba(255, 0, 255, 1)",
            "rgba(192, 192, 192, 1)",
          ],
          borderWidth: 1,
        },
      ],
    });
    let yearChart = ref({
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          data: [],
          backgroundColor: "red",
          borderColor: "#f87979",
          borderWidth: 2, // Set the line width
        },
      ],
    });
    let chartOptions = {
      responsive: true,
      title: {
        display: true,
        text: "My Chart Title", // Set the title text
        fontSize: 16, // Set the font size of the title
        fontColor: "black", // Set the font color of the title
      },
    };
    onMounted(() => {
      api
        .get("/statistic/today")
        .then((response) => {
          today.value = response.data.result;
        })
        .catch((error) => {
          console.error(error);
        });
      api
        .get("/statistic/thismonth")
        .then((response) => {
          thismonth.value = response.data.result;
        })
        .catch((error) => {
          console.error(error);
        });
      api
        .get("/statistic/total")
        .then((response) => {
          dateData.value = response.data;
          const maxDay = Math.max(...dateData.value.map((item) => item.day));
          const sumArray = Array.from({ length: maxDay }, () => 0);
          dateData.value.forEach((item) => {
            sumArray[item.day - 1] = Number(item.total_price_sum);
          });
          chartData.value.datasets[0].data = sumArray;
        })
        .catch((error) => {
          console.error(error);
        });
    });
    api
      .get("/statistics/year")
      .then((response) => {
        yearData.value = response.data;
        console.log(yearData.value);
        const maxMonth = Math.max(...yearData.value.map((item) => item.month));
        const sumArray = Array.from({ length: maxMonth }, () => 0);
        yearData.value.forEach((item) => {
          sumArray[item.month - 1] = Number(item.total_price_sum);
        });
        yearChart.value.datasets[0].data = sumArray;
        console.log(sumArray);
      })
      .catch((error) => {
        console.error(error);
      });
    return {
      chartData,
      chartOptions,
      today,
      thismonth,
      isDataReady,
      yearData,
      yearChart,
    };
  },
};
</script>
<style scoped>
.container {
  display: flex;
}
.chart {
  width: 90rem;
  height: 40rem;
}
.chart-container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background-color: white;
  border-radius: 1rem;
}
.year-chart-container {
  margin-top: 1rem;
  width: 60rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background-color: white;
  padding-left: 1rem;
  border-radius: 1rem;
}
.total {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  width: 100%;
  padding-left: 2rem;
}
.total div {
  width: 10rem;
  background-color: rgb(255, 255, 255);
  border-radius: 1rem;
  /* box-shadow: 10px 10px 50px rgb(167, 167, 167); */
  color: gray;
  padding-top: 1rem;
}
.load-container {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
}
.outer {
  display: flex;
  flex-direction: row;
  gap: 1rem;
}
.count-up {
  font-size: xx-large;
  height: 4rem;
}
</style>
