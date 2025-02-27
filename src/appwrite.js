import { Account, Client, Databases } from 'appwrite'

export const client = new Client()

client.setEndpoint('https://cloud.appwrite.io/v1').setProject('vue-todo-list-app')

export const account = new Account(client)
export { ID } from 'appwrite'
export const databases = new Databases(client)
