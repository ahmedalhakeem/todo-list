<template>
    <div id="home-page">
        <v-container>
            <v-row>
                <v-col class="mx-auto pink darken-3 white--text" cols="4"
                    ><h1 class="text-center">website Todo</h1>
                </v-col>
            </v-row>
            <v-row>
                <v-col class="white mx-auto" cols="4">
                    <div v-for="(todo, index) in todos" :key="index">
                        <v-checkbox
                            class="d-inline-block"
                            v-model="todo.status"
                        ></v-checkbox>
                        {{ todo.name }}
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
                                                addnewTodo(), (dialog = false)
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
        </v-container>
    </div>
</template>
<script>
export default {
    name: "HomePage",
    data: () => {
        return {
            newTodo: "",
            todos: [
                {
                    name: "styleguide creation",
                    status: true,
                },
                {
                    name: "sendwireframe",
                    status: false,
                },
                {
                    name: "Readibility",
                    status: false,
                },
                {
                    name: "check color",
                    status: false,
                },
            ],
        };
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

    methods: {
        addnewTodo() {
            this.todos.push({ name: this.newTodo, status: false });
        },
    },
};
</script>
<style lang="scss" scoped></style>
