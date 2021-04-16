<template>
  <div class="header">
    <div>
      <input type="checkbox" v-model="allTodos" />
      全选
    </div>
    <div>
      已完成任务 <span class="color-red">{{ count }}</span> /共<span
        class="color-red"
        >{{ todos.length }}</span
      >
    </div>
    <div>
      <el-button type="info" @click="clearAll">清除已选中</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Todo } from "@/types/Todo";
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "Footer",
  props: {
    todos: {
      type: Object as () => Todo[],
      required: true,
    },
    allTodoList: {
      type: Function,
      required: true,
    },
    clearAllTodos:{
      type: Function,
      required: true
    }
  },
  setup(props) {
    const count = computed(() => {
      return props.todos.reduce(
        (pre, todo) => (pre += todo.isCompleted ? 1 : 0),
        0
      );
    });
    const allTodos = computed({
        get(){
            return count.value > 0 && count.value == props.todos.length
        },
        set(val){
           props.allTodoList(val)
        }
    })
    const clearAll = ()=>{
      props.clearAllTodos()
    }
    return {
      count,
      allTodos,
      clearAll
    };
  },
});
</script>
<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  color: white;
}
.header .color-red {
  color: red;
}
</style>