<template>
    <div class="back">
        <button class="back-button" @click="goToBack()">
            <img :src="require('@/assets/icon/backButton-icon.png')" alt="Button 1 Icon" />
        </button>
        <pageTitleCompo />
    </div>
</template>

<script>
import pageTitleCompo from "@/components/layout/PageTitleCompo.vue";

export default {
    name: "backButton",
    components: {
        pageTitleCompo,
    },
    methods: {
        goToBack() {
            this.$router.go(-1);
        },
    },
};
</script>

<style scoped>
.back {
    display: flex;
    align-items: center;
}

.back-button {
    margin-right: 10x;
}

/* .page-title {
    flex: 1; 
    text-align: center; 
    margin-bottom: 5px;
} */
</style>
