<template>
    <div class="post-list-compo">
        <div>
            <img :src="postListProfileSrc" alt="Dog" class="postListCompoProfile"/>
        </div>
        <div class="post-list-compo-detail">
            <h3>오산완 인중이요~</h3>
            <div class="post-list-compo-detail-info">
                <div>
                    <span>작성자닉네임 </span>
                </div>
                <div>
                    <span>⏱</span><span>분 전 </span>
                    <span>💙</span><span> 23 </span>
                    <span><img :src="commentSrc"> </span><span> 1</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            postListProfileSrc: require("@/assets/postListCompo/postListProfile.png"),
            commentSrc: require("@/assets/postListCompo/comment.png"),
        }
    }

}
</script>

<style scoped>
.post-list-compo{
    display: flex;
    margin: 2%;
    width: 100%;
    height: 65px;
}
.post-list-compo-detail {
    text-align: left;
    margin: 0 0 0 10px;
    width: 75%;
    align-content: center;
}
.post-list-compo-detail h3 {
    font-weight: 400;
}
.post-list-compo-detail span {
    color: #7f7f7f;
}
.post-list-compo-detail-info{
    display: flex;
    justify-content: space-between;
}
</style>