import App from './App.vue';
import { createApp } from 'vue';
import {createRouter, createWebHashHistory} from "vue-router";
import Table from './components/Table';
import Add_edit from './components/Add_edit';


const routes = [
    {path: '/', component: Table},
    {path: '/add', component: Add_edit},
    {path: '/edit/:id', component: Add_edit},
    {path: '/home', component: Table},
];


const router = createRouter({
    history: createWebHashHistory(),
    routes
});


createApp(App).use(router).mount('#app');