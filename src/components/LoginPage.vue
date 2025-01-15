<script setup>
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ref } from 'vue'
import { account } from '@/appwrite.js'
import { useAuthStore } from '@/store/auth.store.js'
import { router } from '@/router.js'
import { v4 as uuid } from 'uuid'

const emailRef = ref('')
const passwordRef = ref('')
const nameRef = ref('')

const authStore = useAuthStore()

const login = async () => {
  try {
    if (emailRef.value !== '' && passwordRef.value !== '') {
      await account.createEmailPasswordSession(emailRef.value, passwordRef.value)
      const response = await account.get()
      if (response) {
        authStore.set({
          email: response.email,
          password: response.password,
          status: response.status,
        })
      }

      emailRef.value = ''
      passwordRef.value = ''

      await router.push('/')
    }
  } catch (e) {
    console.error(e)
  }
}

const register = async () => {
  try {
    if (emailRef.value !== '' && nameRef.value !== '' && passwordRef.value !== '') {
      await account.create(uuid(), emailRef.value, passwordRef.value, nameRef.value)
      await login()
    } else {
    }
  } catch (e) {
    console.error(e)
  }
}
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
      <TabsContent value="Log In" class="mt-4">
        <Card class="rounded-3xl">
          <CardContent class="space-y-2 mt-7">
            <div class="space-y-1">
              <Input placeholder="Email" class="py-6" type="email" v-model="emailRef" />
            </div>
            <div class="space-y-1">
              <Input placeholder="Password" class="py-6" type="password" v-model="passwordRef" />
            </div>
          </CardContent>
          <CardFooter>
            <Button class="w-full py-6" @click="login">Login</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="Sign In" class="mt-4">
        <Card class="rounded-3xl">
          <CardContent class="space-y-2 mt-7">
            <div class="space-y-1">
              <Input placeholder="Name" class="py-6" type="email" v-model="nameRef" />
            </div>
            <div class="space-y-1">
              <Input placeholder="Email" class="py-6" type="email" v-model="emailRef" />
            </div>
            <div class="space-y-1">
              <Input placeholder="Password" class="py-6" type="password" v-model="passwordRef" />
            </div>
          </CardContent>
          <CardFooter>
            <Button class="w-full py-6" @click="register">Create account</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
    <p class="text-center mt-32 text-gray-300 font-light">by Eldar Sayranov</p>
  </main>
</template>

<style scoped></style>
