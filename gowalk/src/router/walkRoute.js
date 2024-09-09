import WalkCompo from "@/views/walk/WalkCompo";
import WalkMainPage from "@/views/walk/WalkMainPage.vue";
import WalkTrackingPage from "@/views/walk/WalkTrackingPage.vue";
import WalkSummaryPage from "@/views/walk/WalkSummaryPage.vue";
import WalkNearbyPage from "@/views/walk/WalkNearbyPage.vue";
import WalkHotplacePage from "@/views/walk/WalkHotplacePage.vue";

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
            {
                name: "WalkSummaryPage",
                path: "summary",
                component: WalkSummaryPage,
            },
            {
                name: "WalkNearbyPage",
                path: "nearby",
                component: WalkNearbyPage,
            },
            {
                name: "WalkHotplacePage",
                path: "hotplace",
                component: WalkHotplacePage,
            },
        ],
    },
];
