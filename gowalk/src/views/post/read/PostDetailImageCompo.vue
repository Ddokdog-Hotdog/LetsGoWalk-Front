<template>
    <div>
        <img v-for="image in images" :src="image" :alt="'Post Image ' + image" :key="image">
    </div>
</template>

<script>
export default {
    props: {
        images: Array
    }
}
</script>

<style scoped>
    img {
        max-width: 395px;
        max-height: 395px;
    }
</style>