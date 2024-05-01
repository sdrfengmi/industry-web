import Layout from '../views/layout/index';
import UserManagement from '../views/userManagement/index';
import UserProfile from '../views/userProfile/index';
export default [
    {
        path: '/',
        name: 'layout',
        redirect: '/userManagement',
        meta: {
            title: 'Layout',
            auth: false
        },
        component: Layout,
        children: [
            {

                path: 'userManagement',
                name: 'userManagement',
                meta: {
                    title: '用户管理',
                    auth: false
                },
                component: UserManagement
            },
            {

                path: 'userProfile',
                name: 'userProfile',
                meta: {
                    title: '用户画像',
                    auth: false
                },
                component: UserProfile
            }
        ]
    },
]