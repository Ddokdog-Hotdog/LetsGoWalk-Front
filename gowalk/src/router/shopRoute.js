import ShopCompo from "@/views/shop/ShopCompo";
import ShopDetailCompo from "@/views/shop/ShopDetailCompo";
import ShopTestCompo from "@/views/shop/ShopTestCompo";

export default [
    {
        name: "ShopCompo",
        path: "/shop",
        component: ShopCompo,
    },
    {
        name: "ShopDetailCompo",
        path: "/shop/item/:id",
        component: ShopDetailCompo,
        props: true,
    },
    {
        name: "ShopTestCompo",
        path: "/shop/test",
        component: ShopTestCompo,
    },
];
