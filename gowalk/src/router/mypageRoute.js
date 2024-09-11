import MypageCompo from '@/views/mypage/MyPageCompo';
import OrderListCompo from '@/views/mypage/OrderListCompo';

export default [
    {
        name: 'MyPageCompo',
        path: '/mypage',
        component: MypageCompo,
    },
    {
        name: 'OrderListCompo',
        path: '/mypage/orderlist',
        component: OrderListCompo,
    },
];
