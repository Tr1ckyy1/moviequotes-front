import './styles.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import i18n from './i18n/index'
import ModalItem from '@/ui/modals/ModalItem.vue'
import MessageModal from '@/ui/modals/MessageModal.vue'
import LoadingSpinnerMini from '@/ui/LoadingSpinnerMini.vue'
import LoadingPage from '@/ui/LoadingPage.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.component('ModalItem', ModalItem)
app.component('MessageModal', MessageModal)
app.component('LoadingSpinnerMini', LoadingSpinnerMini)
app.component('LoadingPage', LoadingPage)

app.mount('#app')
