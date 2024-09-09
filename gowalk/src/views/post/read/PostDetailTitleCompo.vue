<template>
    <div class="post-detail-title-compo">
        {{ title }}
    </div>
</template>

<script>
export default {
    props: {
        title: String
    }
}
</script>

<style scoped>
.post-detail-title-compo{
    margin: 10px 0 10px 15px;
    text-align: left;
}
</style>