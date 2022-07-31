<template>
  <div>
    <h1>Editing a Todo</h1>
    <div v-for="item in todo" :key="item._id">
      Author:
      <h4>{{ item.author }}</h4>
      TodoItem:
      <p>{{ item.todo }}</p>
    </div>
    <hr />
    <input type="text" placeholder="Author" v-model="state.newAuthor" />
    <span>Test: {{ state.newAuthor }}</span>
    <br />
    <input type="text" placeholder="Todo" v-model="state.newTodoItem" />
    <span>Test: {{ state.newTodoItem }}</span>
    <br />
    <button @click="updateTodo()">Update Todo</button>
    <hr />
  </div>
</template>

<script>
import todocrud from "../modules/todocrud";
import { onMounted } from "vue";
export default {
  setup() {
    const { updateTodo, state, GetSpecificTodo, todo, todoId } = todocrud();
    onMounted(() => {
      GetSpecificTodo();
    });
    return {
      todo,
      todoId,
      updateTodo,
      state,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>