<template>
  <div class="el-container">
    <Header class="el-header" :addTodos="addTodos" />
    <List
      class="el-main"
      :todos="todos"
      :delTodos="delTodos"
      :updateTodo="updateTodo"
    />
    <Footer
      class="el-footer"
      :todos="todos"
      :allTodoList="allTodoList"
      :clearAllTodos="clearAllTodos"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, watch } from "vue";
import Header from "./components/Header.vue";
import List from "./components/List.vue";
import Footer from "./components/Footer.vue";
import { Todo } from "./types/Todo";
import { saveStorage, readStorage } from "./types/storage";
export default defineComponent({
  name: "App",

  setup() {
    const state = reactive<{ todos: Todo[] }>({
      todos: [],
    });
    // 监视 state.todos 数据变化时保存
    watch(() => state.todos, saveStorage, { deep: true });
    // 页面加载之后回调
    onMounted(()=>{
      setTimeout(()=>{
        state.todos = readStorage()
      },2000)
    })

    // 添加todolist
    const addTodos = (todos: Todo) => {
      state.todos.unshift(todos);
    };
    // 删除单个todolist
    const delTodos = (index: number) => {
      if (window.confirm("你确定要删除吗")) {
        state.todos.splice(index, 1);
      }
    };
    // 复选框选中更新
    const updateTodo = (todo: Todo, isCompleted: boolean) => {
      todo.isCompleted = isCompleted;
    };
    // 全选不全选
    const allTodoList = (all: boolean) => {
      state.todos.forEach((todo) => {
        todo.isCompleted = all;
      });
    };
    // 清除已选中
    const clearAllTodos = () => {
      state.todos = state.todos.filter((todo) => !todo.isCompleted);
    };
    return {
      ...toRefs(state),
      addTodos,
      delTodos,
      updateTodo,
      allTodoList,
      clearAllTodos,
    };
  },
  components: {
    Header,
    List,
    Footer,
  },
});
</script>
<style  scoped>
body {
  margin: 0;
}
.el-container {
  display: block;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
</style>
