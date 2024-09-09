import ShopCompo from "@/views/shop/ShopCompo";
import ShopDetailCompo from "@/views/shop/ShopDetailCompo";
import ShopTestCompo from "@/views/shop/ShopTestCompo";
import ShopDetailTestCompo from "@/views/shop/ShopDetailTestCompo";
import ShopCartCompo from "@/views/shop/ShopCartCompo";
import ShopAfterPaymentCompleteCompo from "@/views/shop/ShopAfterPaymentCompleteCompo";
import ShopAfterPaymentErrorCompo from "@/views/shop/ShopAfterPaymentErrorCompo";

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
    {
        name: "ShopCartCompo",
        path: "/shop/cart",
        component: ShopCartCompo,
    },
    {
        name: "ShopPaymentCompleteCompo",
        path: "/shop/payment/complete",
        component: ShopAfterPaymentCompleteCompo,
    },
    {
        name: "ShopAfterPaymentErrorCompo",
        path: "/shop/payment/error",
        component: ShopAfterPaymentErrorCompo,
    },
];
