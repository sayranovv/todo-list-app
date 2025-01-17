<script setup>
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { vAutoAnimate } from '@formkit/auto-animate/vue'
import Login from '@/components/Login.vue'
import Signin from '@/components/Signin.vue'
</script>

<template>
  <main
    class="max-w-md mx-auto mt-10 mb-10 px-4 flex flex-col rounded-3xl gap-6 max-[450px]:mt-4 bg-white min-[451px]:border-2 min-[451px]:border-black min-[451px]:p-7 min-[451px]:drop-shadow-2xl"
  >
    <div>
      <h1 class="text-6xl font-black text-center">ToDo List</h1>
      <h2 class="text-center font-semibold mt-2">Welcome!</h2>
    </div>
    <Tabs default-value="Log In" class="w-full drop-shadow-lg">
      <TabsList class="w-full rounded-full">
        <TabsTrigger value="Log In" class="w-1/2 rounded-full"> Log In </TabsTrigger>
        <TabsTrigger value="Sign In" class="w-1/2 rounded-full"> Sign In </TabsTrigger>
      </TabsList>
      <TabsContent value="Log In" class="mt-4" v-auto-animate>
        <Login />
      </TabsContent>
      <TabsContent value="Sign In" class="mt-4" v-auto-animate>
        <Signin />
      </TabsContent>
    </Tabs>
    <p class="text-center mt-32 text-gray-300 font-light">by Eldar Sayranov</p>
  </main>
</template>

<style scoped></style>
