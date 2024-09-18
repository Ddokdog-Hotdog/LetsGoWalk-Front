<template>
    <div class="comment-list-compo">
        <div v-if="comments && comments.length > 0">
            <div v-for="comment in comments" :key="comment.id" class="comment-list-compo-container" :class="{'is-reply': comment.commentsId}">
                <div>
                    <img class="user-profile" :src="comment.profileImg || defaultProfileUrl" alt="profile" @error="handleImageError">
                </div>
                <div class="comment-list-content-info">
                    <div class="comment-list-userinfo">
                        <div>{{ comment.nickname }}</div>
                        <div class="comment-list-userinfo-createdAt">{{ formatDate(comment.createdAt) }}</div>
                    </div>
                    <div>{{ comment.content }}</div>
                    <div class="comment-list-compo-container-count" v-if="!comment.commentsId && !comment.parentCommentId">
                        <div v-if="!comment.commentsId">
                            <img :src="commentSrc" alt="comments" @click="showReplyInput(comment.id)">
                        </div>
                        <div>{{ comment.count }}</div>
                    </div>
                    <!-- 답글 입력 폼 -->
                    <!-- 조건부 렌더링으로 답글 입력 필드 표시 -->
                    <comment-input-compo v-if="activeReplyId === comment.id" :postId="postId" :parent-comment-id="comment.id" @comment-added="handleNewComment" />
                    <comment-list-compo v-if="comment.children && comment.children.length" :comments="comment.children" :postId="postId" />
                </div>
            </div>
        </div>
        <div v-else>No comments to display.</div>
    </div>
</template>

<script>
import CommentInputCompo from './CommentInputCompo.vue';

export default {
    name: "CommentListCompo",
    components: {
        CommentInputCompo,
    },
    props: {
        comments: {
            type: Array,
            default: () => []
        },
        postId: Number,
    },
    data() {
        return {
            commentSrc: require("@/assets/postListCompo/comment.png"),
            defaultProfileUrl: require("@/assets/icon/default-dog-icon.png"),
            activeReplyId: null, // 활성화된 답글 입력 필드의 댓글 ID
        }
    },
    methods: {
        handleImageError(event) {
            event.target.src = this.defaultProfileUrl;
        },
        formatDate(dateStr) {
            const date = new Date(dateStr);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const formatted = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
            return formatted;
        },
        showReplyInput(commentId) {
            this.activeReplyId = commentId; // 답글 입력 필드 활성화
        },
        handleNewComment(newComment) {
            let parentComment = this.comments.find(comment => comment.id === this.activeReplyId);
            if (parentComment) {
                if (!parentComment.children) {
                    this.$set(parentComment, 'children', []);
                }
                parentComment.children.push(newComment);
                // 시간순으로 정렬
                parentComment.children.sort((a, b) => new Date(new Date(a.createdAt) - b.createdAt));
                this.$set(this.comments, this.comments.indexOf(parentComment), {...parentComment});
            }
            this.activeReplyId = null;
        },
    }
}
</script>

<style scoped>
.user-profile {
    width: 50px;
    height: 50px;
    border-radius: 70%;
}
.comment-list-compo-container{
    width: 100%;
    display: flex;
    margin:  0 0 10px 10px;
}
.comment-list-content-info{
    text-align: left;
    margin:  0 0 0 10px;
    padding: 0 30px 0 0;
    /* max-width: 90%; */
}
.comment-list-userinfo{
    display: flex;
    margin: 0 20px 0 0;
}
.comment-list-userinfo div {
    margin: 0 10px 0 0;
}
.comment-list-userinfo-createdAt{
    font-size: 12px;
    align-content:center;
    color: #7f7f7f;
}
.comment-list-compo-comtainer-count{
    display: flex;
}
.comment-list-compo-comtainer-count div{
    margin: 0 4px 0 0;
}
.is-reply {
    margin-left: 20px;
}
</style>