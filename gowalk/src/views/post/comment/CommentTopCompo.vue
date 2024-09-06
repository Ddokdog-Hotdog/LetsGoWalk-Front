<template>
    <div class="comment-top-compo">
        <div>댓글</div>
        <div>
            <img :src="CommentSrc" alt="comment">
        </div>
        <div>{{ comment.count }}</div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            CommentSrc : require("@/assets/postListCompo/comment.png"),
            comment: {
                count : 5,
            }
        }
    }
}
</script>

<style scoped>
.comment-top-compo{
    display: flex;
    margin: 0 10px 0 10px;
    text-align: left;
}
.comment-top-compo div {
    padding: 4px;
}
</style>