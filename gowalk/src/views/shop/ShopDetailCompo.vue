<template>
    <div>
        <backButtonCompo />
        상품번호 : {{ id }}
    </div>
</template>

<script>
import backButtonCompo from "@/components/layout/BackCompo.vue";

export default {
    props: {
        id: String,
    },
    components: {
        backButtonCompo,
    },
};
</script>

<style></style>
