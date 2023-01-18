import axios from "axios";
import store from "../store/index";
import router from "../router";
axios.create();

axios.defaults.baseURL = "https://dummyjson.com";
axios.interceptors.response.use(
    function (response) {
        return response;
    },
    (error) => {
        if (error.response.status == 401 || error.response.status == 403) {
            if (localStorage.getItem("user_token") != null) {
                localStorage.setItem("user_token", null);
                store.dispatch("attempt", null);
                router.push({ name: "Login" });
            }
        }
        return Promise.reject(error);
    }
);
axios.interceptors.request.use(
    function (config) {
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);
export default axios;
