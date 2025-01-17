<script setup>
import { Card, CardContent, CardFooter } from '@/components/ui/card/index.js'
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form/index.js'
import { Button } from '@/components/ui/button/index.js'
import { Input } from '@/components/ui/input/index.js'
import { vAutoAnimate } from '@formkit/auto-animate/vue'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { account } from '@/appwrite.js'
import { router } from '@/router.js'
import { ref } from 'vue'
import * as z from 'zod'

const error = ref(null)

const formSchema = toTypedSchema(
  z.object({
    email: z.string().email(),
    password: z.string().min(8).max(16),
  }),
)

const form = useForm({
  validationSchema: formSchema,
})

const onSubmit = form.handleSubmit(async (values) => {
  try {
    await account.createEmailPasswordSession(values.email, values.password)
    await router.push('/')
  } catch (e) {
    error.value = e.message
  }
})
</script>

<template>
  <form @submit="onSubmit">
    <Card class="rounded-3xl flex flex-col justify-between">
      <CardContent class="space-y-2 mt-7" v-auto-animate>
        <FormField name="email" v-slot="{ field }" class="space-y-1">
          <FormItem v-auto-animate>
            <FormControl>
              <Input v-bind="field" placeholder="Email" class="py-6" type="text" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField name="password" v-slot="{ field }" class="space-y-1">
          <FormItem v-auto-animate>
            <FormControl>
              <Input v-bind="field" placeholder="Password" class="py-6" type="password" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <p v-if="error" class="text-red-400 font-medium mx-2">{{ error }}</p>
      </CardContent>
      <CardFooter>
        <Button class="w-full py-6" type="submit">Login</Button>
      </CardFooter>
    </Card>
  </form>
</template>

<style scoped></style>
