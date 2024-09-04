import Vue from 'vue';
import VueRouter from 'vue-router';

import MainCompo from '@/components/layout/MainCompo';

import PageNotFoundCompo from '@/components/exception/PageNotFoundCompo.vue';
import walkRoute from './walkRoute';
import shopRoute from './shopRoute';
import postRoute from './postRoute';
import mypageRoute from './mypageRoute';
import questRoute from './questRoute';
import homeRoute from './homeRoute';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        component: MainCompo,
        children: [...homeRoute, ...walkRoute, ...shopRoute, ...mypageRoute, ...postRoute, ...questRoute],
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
