import MypageCompo from "@/views/mypage/MyPageCompo.vue";
import ProfileCompo from "@/views/mypage/ProfileCompo.vue";
import AddDogCompo from "@/views/mypage/AddPetCompo.vue";
import OrderListCompo from "@/views/mypage/OrderListCompo";
import PointListCompo from "@/views/mypage/PointCompo.vue";
import DogProfileCompo from "@/views/mypage/PetProfileCompo.vue";
import DogUpdateCompo from "@/views/mypage/PetUpdateCompo.vue";

export default [
    {
        name: "MypageCompo",
        path: "/mypage",
        component: MypageCompo,
        meta: { hideBottom: true },
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
        meta: { hideBottom: true },
    },
    {
        name: "PointListCompo",
        path: "/mypage/point",
        component: PointListCompo,
        meta: { hideBottom: true },
    },
    {
        name: "DogProfile",
        path: "/mypage/dogprofile/:petId",
        component: DogProfileCompo,
        props: true,
        meta: { hideBottom: true },
    },
    {
        name: "DogUpdateCompo",
        path: "/mypage/dogprofile/update/:petId",
        component: DogUpdateCompo,
        props: true,
        meta: { hideBottom: true },
    },
];
