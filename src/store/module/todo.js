// import axios from "axios";

import axios from "@/axios";
const state = {
    todos: {},
    name: "Ahmed",
    randomTodos: {},
};
const getters = {
    getTodos: (state) => state.todos,
    getName: (state) => state.name,
    getRandom: (state) => state.randomTodos,
};

const actions = {
    async fetchTodos({ commit }) {
        const response = await axios.get("/todos");
        commit("SET_TODOS", response.data);
    },
    async fetchRandom({ commit }) {
        const response = await axios.get("/todos/random");
        commit("SET_RANDOM", response.data);
    },
    async addNewTodo({ commit }, newTodo) {
        console.log("test add a new todo");
        const response = await axios.post("/todos/add", newTodo);
        commit("ADD_TODOS", response.data);
    },
    async updateTodo({ commit }, currentTodo) {
        // console.log("test add a new todo");
        const response = await axios.put(
            "/todos/" + currentTodo.id,
            currentTodo
        );
        commit("UPDATE_TODOS", response.data);
    },
};
const mutations = {
    SET_TODOS: (state, apiData) => (state.todos = apiData),
    SET_RANDOM: (state, data) => (state.randomTodos = data),
    ADD_TODOS: (state, data) => state.todos.todos.push(data),
    // UPDATE_TODOS: (state, data) => {
    //     const index = Object.keys(state.todos);
    //     index.findIndex((t) => console.log(t));
    // },
};
export default {
    state,
    getters,
    actions,
    mutations,
};
