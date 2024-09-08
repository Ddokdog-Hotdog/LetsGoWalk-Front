<template>
    <div class="post-detail-content-compo">
        {{ content }}
    </div>
</template>

<script>
export default {
    props: {
        content: String
    }
}
</script>

<style scoped>
.post-detail-content-compo{
    margin: 20px 0 0 20px;
    text-align: left;
}
</style>