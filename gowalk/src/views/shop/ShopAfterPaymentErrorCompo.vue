<template>
    <shopAfterPaymentCompo message="주문 및 결제 도중 오류가 발생했습니다!!" :isError="`true`" />
</template>

<script>
import shopAfterPaymentCompo from "@/views/shop/AfterPayment/ShopAfterPaymentCompo.vue";
export default {
    components: {
        shopAfterPaymentCompo,
    },
};
</script>

<style></style>
