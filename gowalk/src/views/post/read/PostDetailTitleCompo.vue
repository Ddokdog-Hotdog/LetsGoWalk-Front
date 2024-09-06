<template>
    <div class="post-detail-title-compo">
        {{ post.title }}
    </div>
</template>

<script>
export default {
    data(){
        return {
            post: {
                title : "제목이다멍",
            }
        }
    }

}
</script>

<style scoped>
.post-detail-title-compo{
    margin: 10px 0 10px 15px;
    text-align: left;
}
</style>