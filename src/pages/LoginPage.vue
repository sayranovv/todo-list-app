<script setup>
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { vAutoAnimate } from '@formkit/auto-animate/vue'
import loginForm from '@/components/loginForm.vue'
import RegistrationForm from '@/components/RegistrationForm.vue'
</script>

<template>
  <main
    v-auto-animate
    class="max-w-md mx-auto px-4 flex flex-col rounded-3xl gap-6 max-[450px]:h-screen bg-white min-[451px]:border-2 min-[451px]:border-black min-[451px]:p-7 min-[451px]:drop-shadow-2xl justify-between min-[451px]:h-[700px] min-[451px]:mt-10 overflow-hidden"
  >
    <div class="flex flex-col gap-6 max-[450px]:mt-4">
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
          <loginForm />
        </TabsContent>
        <TabsContent value="Sign In" class="mt-4" v-auto-animate>
          <RegistrationForm />
        </TabsContent>
      </Tabs>
    </div>
    <p class="text-center text-gray-300 mb-12 font-light min-[451px]:mb-2">by Eldar Sayranov</p>
  </main>
</template>

<style scoped></style>
