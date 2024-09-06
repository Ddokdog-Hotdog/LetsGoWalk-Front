<template>
    <div>
        <img :src="PostImage1Src" alt="PostImage1">
        <img :src="PostImage2Src" alt="PostImage2">
    </div>
</template>

<script>
export default {
    data(){
        return {
            PostImage1Src : require("@/assets/writePostCompo/5.png"),
            PostImage2Src : require("@/assets/writePostCompo/6.png"),
        }
    }
}
</script>

<style scoped>
    img {
        max-width: 395px;
        max-height: 395px;
    }
</style>