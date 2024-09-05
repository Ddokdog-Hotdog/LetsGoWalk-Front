import ShopCompo from "@/views/shop/ShopCompo";
import ShopDetailCompo from "@/views/shop/ShopDetailCompo";
import ShopTestCompo from "@/views/shop/ShopTestCompo";
import ShopDetailTestCompo from "@/views/shop/ShopDetailTestCompo";

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
        name: "ShopDetailTestCompo",
        path: "/shop/item/",
        component: ShopDetailTestCompo,
    },
    {
        name: "ShopTestCompo",
        path: "/shop/test",
        component: ShopTestCompo,
    },
];
