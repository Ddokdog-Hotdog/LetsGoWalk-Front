<template>
    <div class="post-detail">
        <post-detail-top-compo :board-type="postDetail.boardType" />
        <post-detail-title-compo :title="postDetail.title" />
        <post-detail-user-info-compo
            :user-info="{nickname: postDetail.nickname, profileImage: postDetail.profileImageUrl}"
            :post-created-at="postDetail.createdAt"
            :likes-count="postDetail.likesCount"
        />
        <post-detail-image-compo :images="postDetail.imgList" />
        <post-detail-content-compo :content="postDetail.contents" />
        <post-detail-good-compo :is-liked="isLiked" :likes-count="likesCount" @toggle-like="toggleLike" />
        <comment-compo :comments="postDetail.comments" :postid="postId" />
    </div>
</template>

<script>
import axios from "@/axios.js"
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
    props: {
        postId: Number
    },
    data() {
        return {
            postDetail: {},
            isLiked: false,
            likesCount: 0,
        };
    },
    methods: {
        fetchPostDetail() {
            axios.get(`/api/post/${this.postId}`)
                .then(response => {
                    console.log(response.data)
                    
                    this.postDetail = response.data;
                    this.isLiked = response.data.isLiked;
                    this.likesCount = response.data.likesCount;
                    console.log("좋아요 제발 체크되라..." + response.data)

                    this.postDetail.comments = response.data.comments || [];
                    console.log("댓글 데이터 존재 여부 확인:", this.postDetail.comments);
                    
                    this.postDetail.comments = this.structureComments(this.postDetail.comments); // 댓글 구조화
                    console.log("Structured comments:", this.postDetail.comments); // 구조화된 댓글 데이터 로깅
                })
                .catch(error => console.error('Error fetching post detail:', error));
        },
        structureComments(comments) {
            let commentMap = {};
            let structuredComments = [];

            // 먼저 모든 댓글을 ID를 키로 하는 맵에 저장하고, 각 댓글에 children 배열을 초기화합니다.
            comments.forEach(comment => {
                comment.children = [];
                commentMap[comment.id] = comment;
            });

            // 댓글을 순회하면서 각 댓글의 parentCommentId가 있으면 해당 부모 댓글의 children 배열에 추가합니다.
            comments.forEach(comment => {
                if (comment.commentsId && commentMap[comment.commentsId]) {
                    commentMap[comment.commentsId].children.push(comment);
                } else {
                    structuredComments.push(comment);
                }
            });

            // structuredComments를 시간 순으로 정렬합니다.
            return structuredComments.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        },
        toggleLike() {
            // UI 즉시 업데이트를 위한 예비 처리
            const wasLiked = this.isLiked;
            this.isLiked = !this.isLiked;
            this.likesCount += this.isLiked ? 1 : -1;

            // 서버 요청
            axios.post(`/api/post/like/${this.postId}`, { likeStatus: this.isLiked })
                .then(response => {
                    // 서버로부터 정확한 좋아요 수를 받아 UI를 업데이트
                    this.likesCount = response.data.likesCount; // 예상 응답 필드명
                })
                .catch(error => {
                    console.error('Error toggling like:', error);
                    // 에러 시 상태 롤백
                    this.isLiked = wasLiked;
                    this.likesCount += wasLiked ? -1 : 1;
                });
        },
    },
    mounted() {
        this.fetchPostDetail();
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