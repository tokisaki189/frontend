import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import store from "@/store";
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/AboutView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginView.vue"),
    beforeEnter: (to, from, next) => {
      if (store.state.isLogin) {
        next("/");
      } else {
        next();
      }
    },
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/RegisterView.vue"),
    beforeEnter: (to, from, next) => {
      if (store.state.isLogin) {
        next("/");
      } else {
        next();
      }
    },
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("../views/AdminPanel.vue"),
    beforeEnter: (to, from, next) => {
      console.log(store.state.isAdmin);
      setTimeout(() => {
        if (!store.state.isLogin || store.state.isAdmin == 0) {
          next("/");
        } else {
          next();
        }
      }, 300);
    },
  },
  {
    path: "/editflight",
    name: "editflight",
    component: () => import("../views/EditFlight.vue"),
    beforeEnter: (to, from, next) => {
      console.log(store.state.isAdmin);
      setTimeout(() => {
        if (!store.state.isLogin || store.state.isAdmin == 0) {
          next("/");
        } else {
          next();
        }
      }, 300);
    },
  },
  {
    path: "/user",
    name: "user",
    component: () => import("../views/UserProfile.vue"),
    beforeEnter: (to, from, next) => {
      setTimeout(() => {
        if (!store.state.isLogin) {
          next("/login");
        } else {
          next();
        }
      }, 500);
    },
  },
  {
    path: "/history",
    name: "history",
    component: () => import("../views/OrderHistory.vue"),
    beforeEnter: (to, from, next) => {
      // setTimeout(() => {
      console.log(store.state.isLogin);
      setTimeout(() => {
        if (!store.state.isLogin || store.state.isAdmin == 0) {
          next("/");
        } else {
          next();
        }
      }, 300);
    },
  },
  {
    path: "/order",
    name: "order",
    component: () => import("../views/OrderView.vue"),
  },
  {
    path: "/edit",
    name: "edit",
    component: () => import("../views/EditView.vue"),
  },
  {
    path: "/loading",
    name: "loading",
    component: () => import("../views/LoadingSpinner.vue"),
  },
  {
    path: "/forget",
    name: "forget",
    component: () => import("../views/ForgetPassword.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;
