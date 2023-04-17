<template>
  <div class="container">
    <div class="button-container">
      <p>Dashboard</p>
      <button
        class="tab-menu"
        v-for="(tab, index) in tabs"
        :key="tab"
        @click="
          (selected = tab), (activeTabIndex = index);
          storeSelectedComponent();
        "
      >
        {{ tab }}
      </button>
    </div>
    <div class="component-container">
      <KeepAlive>
        <component :is="selected"></component>
      </KeepAlive>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import FlightCrud from "../components/Admin/FlightCrud.vue";
import OrderApproval from "../components/Admin/FlightApproval.vue";
import DashBoard from "../components/Admin/DashBoard.vue";
import UserAccount from "../components/Admin/UserAccount.vue";

export default {
  components: {
    FlightCrud,
    OrderApproval,
    DashBoard,
    UserAccount,
  },
  setup() {
    let tabs = ["FlightCrud", "OrderApproval", "DashBoard", "UserAccount"];
    let selected = ref(tabs[0]);
    let activeTabIndex = ref(null);

    // Set activeTabIndex based on selected component
    onMounted(() => {
      activeTabIndex.value = tabs.indexOf(selected.value);
    });

    // Store selected component in localStorage when it changes
    const storeSelectedComponent = () => {
      localStorage.setItem("selected", selected.value);
    };

    return {
      tabs,
      selected,
      activeTabIndex,
      storeSelectedComponent,
    };
  },
  created() {
    // Retrieve selected component from localStorage
    const storedSelectedComponent = localStorage.getItem("selected");
    if (
      storedSelectedComponent &&
      this.tabs.includes(storedSelectedComponent)
    ) {
      this.selected = storedSelectedComponent;
    }
  },
};
</script>

<style scoped>
.button-container {
  display: flex;
  flex-direction: column;
  width: 15rem;
  background-color: #2f81b7;
}
.component-container {
  padding-top: 1rem;
  width: 100%;
  height: 100rem;
  background-color: rgb(228, 228, 228);
  box-shadow: 7px 12px #888888;
  overflow: hidden;
}
.tab-menu {
  font-size: larger;
  height: 4rem;
  border: none;
  background-color: #2071a7;
  background: linear-gradient(to right, #2d87c4, #2071a7);
  background-size: 200% 100%;
  transition: background-position 0.5s ease;
  color: white;
  font-size: larger;
  font-weight: bold;
}
.tab-menu:hover {
  /* background-color: #2d87c4; */
  background-position: -100% 0;
}
.container {
  display: flex;
  margin-top: 5rem;
}
.button-container p {
  height: 2rem;
  font-size: x-large;
  margin-top: 1rem;
  color: white;
  font-weight: bold;
}
</style>
