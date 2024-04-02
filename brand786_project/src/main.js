import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import setAuthHeader from './utils/setAuthHeader';

if(localStorage.jwtToken){
    setAuthHeader(localStorage.jwtToken);
}else{
    setAuthHeader(false);
}

createApp(App).use(store).use(router).mount('#app')
