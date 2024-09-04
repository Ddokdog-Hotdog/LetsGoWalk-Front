import Vue from 'vue';
import VueRouter from 'vue-router';

import MainCompo from '@/components/layout/MainCompo';

import PageNotFoundCompo from '@/components/exception/PageNotFoundCompo.vue';
import mypageRoute from './mypageRoute';
import notificationRoute from './notificationRoute';
import postRoute from './postRoute';
import shopRoute from './shopRoute';
import walkRoute from './walkRoute';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        component: MainCompo,
        children: [...walkRoute, ...shopRoute, ...mypageRoute, ...postRoute, ...notificationRoute],
    },
    {
        path: '*',
        component: PageNotFoundCompo,
    },
];

export default new VueRouter({
    mode: 'history',
    routes,
});
