import {defineStore} from "pinia"

const defaultValue = {
    user: {
        email: '',
        name: '',
        status: false,
    }
}

export const useAuthStore = defineStore('auth', {
    state: () => defaultValue,
    getters: { isAuth: state => state.user.status },
    actions: {
        clear() {
            this.$patch(defaultValue)
        },
        set(input) {
            this.$patch({user: input})
        }
    }
})