<template>
  <div class="header">
    <input
      type="text"
      class="el-input"
      placeholder="请输入内容点击回车添加任务"
      @keyup.enter="addTodo"
      v-model="text"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Header",
  props: {
    addTodos: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const text = ref("");
    const addTodo = () => {
      if(text.value.trim()){
        props.addTodos({ id: Date.now(), title: text.value, isCompleted: false });
        text.value= ""
      }
    };
    return {
      addTodo,
      text,
    };
  },
});
</script>
<style scoped>
.header{
  padding: 0;
}
input {
  font-size: 32px;
  height: 70px;
  box-sizing: border-box;
  text-align: right;
  text-align: left;
}
</style>
