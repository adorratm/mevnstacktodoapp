<template>
  <div>
    <h1>All Todos</h1>
    <button @click="newTodo()">New Todo</button>
    <br />
    <input type="text" placeholder="Author" v-model="state.newAuthor" />
    <span>Test: {{ state.newAuthor }}</span>
    <br />
    <input type="text" placeholder="Todo" v-model="state.newTodoItem" />
    <span>Test: {{ state.newTodoItem }}</span>
    <br />

    <div v-for="todo in state.todos" :key="todo._id">
      <router-link :to="`/todo/${todo._id}`">
        <h4>
          <b>{{ todo.author }}</b>
        </h4>
        <p>{{ todo.todo }}</p>
        <button class="btn btn-sm btn-primary me-3">Update</button>
      </router-link>
      <button class="btn btn-sm btn-danger" @click="deleteTodo(todo._id)">
        Delete
      </button>
    </div>
  </div>
</template>

<script>
import todocrud from "../modules/todocrud";
import { onMounted } from "vue";
export default {
  setup() {
    const { state, GetAllTodos, newTodo, updateTodo, deleteTodo } = todocrud();

    onMounted(() => {
      GetAllTodos();
    });

    return { state, GetAllTodos, newTodo, updateTodo, deleteTodo };
  },
};
</script>

<style lang="scss" scoped>
</style>