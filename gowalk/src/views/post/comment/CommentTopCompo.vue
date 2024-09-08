<template>
    <div class="comment-top-compo">
        <div>댓글</div>
        <div>
            <img :src="CommentSrc" alt="comment">
        </div>
        <div>{{ commentCount }}</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            CommentSrc: require("@/assets/postListCompo/comment.png"),
        }
    },
    props: {
        commentCount: {
            type: Number,
            default: 0
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