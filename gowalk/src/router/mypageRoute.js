import MypageCompo from "@/views/mypage/MyPageCompo.vue";

export default [
    {
        name: "MypageCompo",
        path: "/mypage",
        component: MypageCompo,
        children: [
            {
                name: "DefaultMyPage",
                path: "",
                component: MypageCompo,
            },
        ],
        props: true,
        meta: { hideBottom: true },
    },
];
