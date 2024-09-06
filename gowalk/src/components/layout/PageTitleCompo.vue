<template>
    <div class="page-title">
        <small>{{ title }}</small>
    </div>
</template>

<script>
export default {
    name: "PageTitle",
    computed: {
        title() {
            const path = this.$route.path;
            console.log(path);
            if (path.includes("/shop/item")) {
                return "상품 상세 페이지";
            } else if (path === "/shop") {
                return "쇼핑몰";
            } else if (path === "/post/1") {
                return "커뮤니티";
            }
            return "페이지";
        },
    },
};
</script>

<style scoped>
.page-title {
    flex: 1;
    text-align: center;
    margin-bottom: 5px;
}
</style>
