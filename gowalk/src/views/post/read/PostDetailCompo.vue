<template>
    <div class="post-detail">
        <post-detail-top-compo/>
        <post-detail-title-compo/>
        <hr>
        <post-detail-user-info-compo/>
        <post-detail-image-compo/>
        <post-detail-content-compo/>
        <post-detail-good-compo/>
        <comment-compo/>
    </div>
</template>

<script>
import PostDetailTitleCompo from "./PostDetailTitleCompo.vue";
import PostDetailTopCompo from "./PostDetailTopCompo.vue"
import PostDetailUserInfoCompo from "@/views/post/read/PostDetailUserInfoCompo.vue";
import PostDetailImageCompo from "./PostDetailImageCompo.vue";
import PostDetailContentCompo from "./PostDetailContentCompo.vue";
import PostDetailGoodCompo from "./PostDetailGoodCompo.vue";
import CommentCompo from "@/views/post/comment/CommentCompo.vue";

export default {
    components: {
        PostDetailTopCompo,
        PostDetailTitleCompo,
        PostDetailUserInfoCompo,
        PostDetailImageCompo,
        PostDetailContentCompo,
        PostDetailGoodCompo,
        CommentCompo,
    },
    data() {
        return {
            post: {
                title: '오늘은 언제 집에 가나멍?',
                content: '정말 언제 집에 갈지 모르겠다멍..비오는데 전에 막걸리 각..'
            }
        }
    }
}
</script>

<style scoped>
.post-detail{
    overflow-y: auto;
    height: auto;
    padding: 27px 0 72px 0;
    background-color: #ffffff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>