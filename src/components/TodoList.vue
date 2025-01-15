<script setup>
import { ref, onMounted } from 'vue'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import TodoItem from '@/components/TodoItem.vue'
import { useRouter } from 'vue-router'
import { account, databases } from '@/appwrite.js'
import { useAuthStore } from '@/store/auth.store.js'
import { v4 as uuid } from 'uuid'
import { Query } from 'appwrite'
import Loader from '@/components/Loader.vue'

const router = useRouter()
const store = useAuthStore()

const dbId = '6787289c001f4dfc1d88'
const collectionId = '678728ab003b12d25963'

const userId = ref('')
const newTodoTitle = ref('')
const newTodoDesc = ref('')
const name = ref('')
const newName = ref('')
const todos = ref([])
const isLoading = ref(true)

const loadName = async () => {
  try {
    name.value = (await account.get()).name
  } catch (error) {
    console.error(error)
  }
}

const loadTodos = async () => {
  try {
    const user = await account.get()
    userId.value = user.$id
    const response = await databases.listDocuments(dbId, collectionId, [
      Query.equal('userId', user.$id),
    ])
    todos.value = response.documents
    isLoading.value = false
  } catch (e) {
    console.error('Error loading todos:', e)
  }
}

const addTodo = async () => {
  try {
    const user = await account.get()
    await databases.createDocument(dbId, collectionId, uuid(), {
      title: newTodoTitle.value,
      description: newTodoDesc.value,
      userId: user.$id,
    })
    newTodoTitle.value = ''
    newTodoDesc.value = ''
    await loadTodos()
  } catch (e) {
    console.error(e)
  }
}

const removeTodo = async (id) => {
  try {
    await databases.deleteDocument(dbId, collectionId, id)
    todos.value = todos.value.filter((todo) => todo.id !== id)
  } catch (e) {
    console.error('Error removing todo:', e)
  } finally {
    await loadTodos()
  }
}

const toggleTodo = async (todo) => {
  try {
    todo.completed = !todo.completed
    await databases.updateDocument(dbId, collectionId, todo.$id, {
      completed: todo.completed,
    })
  } catch (e) {
    console.error('Error toggling todo:', e)
  }
}

const saveName = async () => {
  try {
    await account.updateName(newName.value)
    name.value = newName.value
  } catch (e) {
    console.error(e)
  }
}

const logout = async () => {
  await account.deleteSession('current')
  store.clear()
  await router.push('/login')
}

onMounted(() => {
  loadTodos()
  loadName()
})
</script>

<template>
  <main
    class="max-w-md mx-auto mt-10 mb-10 px-4 flex flex-col rounded-3xl gap-7 max-[450px]:mt-4 bg-white min-[451px]:border-2 min-[451px]:border-black min-[451px]:p-7 min-[451px]:drop-shadow-2xl"
  >
    <div v-if="isLoading">
      <Loader />
    </div>
    <div v-else class="flex flex-col gap-7">
      <div class="mt-2 flex w-full items-end justify-between">
        <div class="w-full">
          <div class="flex justify-between items-start">
            <p class="font-medium text-xl cursor-pointer" @click="name = ''">
              Hello, {{ name
              }}<Input
                v-if="name === ''"
                placeholder="Enter name"
                v-model="newName"
                @keyup.enter="saveName"
                class="p-1 h-6 w-24 inline"
              />!
            </p>
            <v-icon name="md-logout" scale="1.5" class="mb-2 cursor-pointer" @click="logout" />
          </div>
          <h1 class="text-6xl font-black">Todo List</h1>
        </div>
      </div>
      <div class="text-2xl flex flex-col gap-5">
        <div class="flex flex-col gap-2">
          <Input placeholder="Title" v-model="newTodoTitle" />
          <Input placeholder="Description" v-model="newTodoDesc" />
        </div>
        <Button class="w-full px-4 py-7" @click="addTodo">Add task</Button>
      </div>
      <p v-if="todos.length === 0" class="font-semibold text-2xl text-center">
        You don't have any tasks!
      </p>
      <ul v-else class="flex flex-col gap-5 mt-4">
        <TodoItem
          v-for="todo in todos"
          :key="todo.id"
          :todo="todo"
          @remove="removeTodo(todo.$id)"
          @toggle="toggleTodo(todo)"
        />
      </ul>
    </div>
  </main>
</template>

<style scoped></style>
