<template>
  <ul class="list">
    <Item
      v-for="(todo, index) in todos"
      :key="todo.id"
      :index="index"
      :todo="todo"
      :delTodos="delTodos"
      :updateTodo="updateTodo"
    />
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Item from "./Item.vue";
import { Todo } from "../types/Todo";
export default defineComponent({
  name: "List",
  props: {
    todos: {
      type: Object as () => Todo[],
      required: true,
    },
    delTodos: {
      type: Function,
      required: true,
    },
    updateTodo:{
      type:Function,
      required: true
    }
  },
  setup() {
    return {
    };
  },
  components: {
    Item,
    
  },
});
</script>
<style scoped>
ul {
  margin: 0;
  padding: 0 20px 0 20px;
}
</style>>
