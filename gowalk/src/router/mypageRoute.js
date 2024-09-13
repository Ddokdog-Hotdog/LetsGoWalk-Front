import MypageCompo from "@/views/mypage/MyPageCompo.vue";
import ProfileCompo from "@/views/mypage/ProfileCompo.vue";
import AddDogCompo from "@/views/mypage/AddPetCompo.vue";
import OrderListCompo from "@/views/mypage/OrderListCompo";

export default [
    {
        name: "MypageCompo",
        path: "/mypage",
        component: MypageCompo,
    },
    {
        name: "profile",
        path: "/mypage/profile",
        component: ProfileCompo,
        props: true,
        meta: { hideBottom: true },
    },
    {
        name: "adddogprofile",
        path: "/mypage/addDog",
        component: AddDogCompo,
        props: true,
        meta: { hideBottom: true },
    },
    {
        name: "OrderListCompo",
        path: "/mypage/orderlist",
        component: OrderListCompo,
    },
];
