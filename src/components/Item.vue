<template>
  <li
    class="item el-row"
    @mouseenter="mous(true)"
    @mouseleave="mous(false)"
    :class="{ mouseStyle: isActive }"
  >
    <div class="el-col-2">
      <input type="checkbox" v-model="isCom" />
    </div>
    <div class="el-col-16">{{ todo.title }}</div>
    <div class="el-col-6 right" v-if="isActive">
      <el-button type="danger" @click="delTodo">删除</el-button>
    </div>
  </li>
  <hr />
</template>
<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { Todo } from "../types/Todo";
export default defineComponent({
  name: "Item",
  props: {
    todo: {
      type: Object as () => Todo,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    delTodos: {
      type: Function,
      required: true,
    },
    updateTodo: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const isActive = ref(false);
    const mous = (flag: boolean) => {
      if (flag) {
        isActive.value = true;
      } else {
        isActive.value = false;
      }
    };
    const delTodo = () => {
      props.delTodos(props.index);
    };
    const isCom = computed({
      get() {
        return props.todo.isCompleted;
      },
      set(val) {
        props.updateTodo(props.todo, val);
        // console.log(props.todo);
        // console.log(val)
      },
    });

    // const isCom = ref(true)
    return {
      mous,
      isActive,
      delTodo,
      isCom,
    };
  },
});
</script>
<style>
.item {
  list-style: none;
  font-size: 34px;
  line-height: 60px;
}
.mouseStyle {
  background-color: pink;
  color: white;
}
</style>
