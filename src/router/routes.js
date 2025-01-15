import Layout from '../views/layout/index';
import UserManagement from '../views/userManagement/index';
import UserProfile from '../views/userProfile/index';
import EtfManage from '../views/etfManage/index';
import StockManage from '../views/stockManage/index';

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
            },
            {

                path: 'etfManage',
                name: 'etfManage',
                meta: {
                    title: 'etf管理',
                    auth: false
                },
                component: EtfManage
            },
            {

                path: 'stockManage',
                name: 'stockManage',
                meta: {
                    title: '股票管理',
                    auth: false
                },
                component: StockManage
            }
        ]
    },
]