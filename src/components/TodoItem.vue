<script setup>
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { ref } from 'vue'

const props = defineProps({ todo: Object })
const emit = defineEmits(['remove', 'toggle', 'edit'])

const title = ref(props.todo.title)

const toggleCompletion = () => emit('toggle', props.todo)
const removeTodo = () => emit('remove', props.todo.id)
</script>

<template>
  <li class="flex justify-between items-center gap-5 border-b border-gray-300 pb-6 last:border-0">
    <div class="flex items-center gap-5">
      <Checkbox :checked="todo.completed" @click="toggleCompletion" class="h-8 w-8" />
      <div class="flex flex-col gap-1">
        <h3
          class="text-2xl font-bold leading-none"
          :class="todo.completed ? 'line-through' : ''"
          @click="title = ''"
        >
          {{ title }}
        </h3>
        <p class="leading-none" :class="todo.completed ? 'line-through' : ''">
          {{ todo.description }}
        </p>
      </div>
    </div>
    <Button variant="" @click="removeTodo" class="h-10 w-10 bg-red-400">
      <v-icon name="md-close" />
    </Button>
  </li>
</template>

<style scoped></style>
