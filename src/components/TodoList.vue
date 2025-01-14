<script setup>
import { ref, onMounted } from 'vue'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import TodoItem from "@/components/TodoItem.vue";

const newTodoTitle = ref('')
const newTodoDesc = ref('')
const name = ref(localStorage.getItem('name') ? JSON.parse(localStorage.getItem('name')) : '')
const newName = ref('')
const todos = ref(localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [])

const addTodo = () => {
  if ((newTodoTitle.value.trim()) && (newTodoDesc.value.trim())) {
    todos.value.push({
      id: Date.now(),
      title: newTodoTitle.value,
      description: newTodoDesc.value,
      completed: false
    })
    newTodoTitle.value = ''
    newTodoDesc.value = ''
    saveTodos()
  }
}

const removeTodo = (id) => {
  todos.value = todos.value.filter(todo => todo.id !== id)
  saveTodos()
}

const toggleTodo = (todo) => {
  todo.completed = !todo.completed
  saveTodos()
}

const saveTodos = () => {
  localStorage.setItem('todos', JSON.stringify(todos.value))
}

onMounted(() => {
  todos.value = JSON.parse(localStorage.getItem('todos') || '[]')
})

const saveName = () => {
  localStorage.setItem('name', JSON.stringify(newName.value.trim()))
  name.value = newName.value.trim()
}

</script>

<template>
  <main class="max-w-md mx-auto mt-10 mb-10 px-4 flex flex-col rounded-3xl gap-7 max-[450px]:mt-4 bg-white min-[451px]:border-2 min-[451px]:border-black min-[451px]:p-7" >
    <div class="mt-2">
      <p class="font-medium text-xl" @click="name = ''">
        Hello, {{ name }}<Input
            v-if="name === ''"
            placeholder="Enter name"
            v-model="newName"
            @keyup.enter="saveName"
            class="p-1 h-6 w-24 inline"
        />!
      </p>
      <h1 class="text-6xl font-black">Todo List</h1>
    </div>
    <div class="text-2xl flex flex-col gap-5">
      <div class="flex flex-col gap-2">
        <Input placeholder="Title" v-model="newTodoTitle" />
        <Input placeholder="Description" v-model="newTodoDesc" />
      </div>
      <Button class="w-full px-4 py-7" @click="addTodo">Add task</Button>
    </div>
    <p v-if="todos.length === 0" class="font-semibold text-2xl text-center">You don't have any tasks!</p>
    <ul v-else class="flex flex-col gap-5 mt-4">
      <TodoItem
      v-for="todo in todos"
      :key="todo.id"
      :todo="todo"
      @remove="removeTodo"
      @toggle="toggleTodo"
      />
    </ul>
  </main>
</template>

<style scoped>

</style>