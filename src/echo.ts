import Echo from 'laravel-echo'

import Pusher from 'pusher-js'

window.Pusher = Pusher

export const echo = new Echo({
  // authEndPoint: `${import.meta.env.VITE_BACKEND_BASE_URL}/broadcasting/auth`,
  broadcaster: 'pusher',
  key: import.meta.env.VITE_PUSHER_APP_KEY,
  cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
  forceTLS: true
})
