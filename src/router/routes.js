import Login from '../views/login/index';
import Home from '../views/home/index';
export default [
    {
        path: '/',
        name: 'root',
        redirect: '/home',
        meta: {
            title: '首页',
            auth: false
        },
        component: Home
    },
    {
        path: '/login',
        name: 'login',
        meta: {
            title: '登录',
            auth: false
        },
        component: Login
    },
    {
        path: '/home',
        name: 'home',
        meta: {
            title: '首页',
            auth: false
        },
        component: Home
    },

]