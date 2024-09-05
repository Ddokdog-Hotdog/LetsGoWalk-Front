import WalkCompo from "@/views/walk/WalkCompo";
import WalkMainPage from "@/views/walk/WalkMainPage.vue";
import WalkTrackingPage from "@/views/walk/WalkTrackingPage.vue";
export default [
    {
        name: "WalkCompo",
        path: "/walk",
        component: WalkCompo,
        children: [
            {
                name: "WalkMainPage",
                path: "",
                component: WalkMainPage,
            },
            {
                name: "WalkTrackingPage",
                path: "onwalk",
                component: WalkTrackingPage,
            },
        ],
    },
];
