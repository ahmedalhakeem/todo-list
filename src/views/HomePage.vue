<template>
    <div id="home-page">
        <v-container @click="generateRandomTodoFn">
            {{ getName }}
            <v-row>
                <v-col class="mx-auto pink darken-3 white--text" cols="4">
                    <h1 class="text-center">website Todo</h1>
                </v-col>
            </v-row>
            <v-row>
                <v-col class="white mx-auto" cols="4">
                    <div v-for="(todo, index) in getTodos.todos" :key="index">
                        <v-checkbox
                            class="d-inline-block"
                            v-model="todo.completed"
                        ></v-checkbox>
                        {{ todo.todo }}
                    </div>
                    <template>
                        <div class="text-center">
                            <v-dialog v-model="dialog" width="500">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                        color="red lighten-2"
                                        dark
                                        v-bind="attrs"
                                        v-on="on"
                                    >
                                        open dialog
                                    </v-btn>
                                </template>

                                <v-card>
                                    <v-card-title
                                        class="text-h5 grey lighten-2"
                                    >
                                        Privacy Policy
                                    </v-card-title>

                                    <v-text-field
                                        label="Enter a new todo"
                                        v-model="newTodo"
                                    ></v-text-field>

                                    <v-divider></v-divider>

                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn
                                            color="primary"
                                            text
                                            @click="
                                                addnewTodoFn(), (dialog = false)
                                            "
                                        >
                                            Add new todo
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </div>
                    </template>
                </v-col>
            </v-row>
            <v-row>
                <h1>Get Random</h1>
                <v-col cols="3">
                    <v-card>
                        <span>{{ getRandom.todo }}</span>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

//import { mapActions, mapGetters } from "vuex";
export default {
    name: "HomePage",
    computed: {
        ...mapGetters(["getTodos", "getName", "getRandom"]),
    },
    data: () => {
        return { newTodo: "" };
    },
    mounted() {
        if (localStorage.todo) {
            this.todos = JSON.parse(localStorage.todo);
        }
    },
    watch: {
        todos(newone) {
            localStorage.todo = JSON.stringify(newone);
        },
    },

    created() {
        this.fetchTodos();
        this.fetchRandom();
        this.addnewTodo();
    },
    methods: {
        ...mapActions(["fetchTodos", "fetchRandom", "addNewTodo"]),
        generateRandomTodoFn() {
            console.log("s");
            this.fetchRandom();
        },
        addnewTodoFn() {
            var payload = {
                todo: this.newTodo,
                completed: false,
                userId: 2,
            };
            this.addNewTodo(payload);
        },
    },
};
</script>
<style lang="scss" scoped></style>
