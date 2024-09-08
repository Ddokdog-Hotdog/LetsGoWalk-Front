<template>
    <div class="post-detail-content-compo">
        {{ post.content }}
    </div>
</template>

<script>
export default {
    data(){
        return {
            post: {
                content: "회에 소주 먹고 싶다멍~"
            }
        }
    }

}
</script>

<style scoped>
.post-detail-content-compo{
    margin: 20px 0 0 20px;
    text-align: left;
}
</style>