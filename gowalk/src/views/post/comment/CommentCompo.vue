<template>
    <div>
        <comment-top-compo :comment-count="internalComments.length" />
        <comment-list-compo :comments="internalComments" />
        <comment-input-compo :postid="postid" @comment-added="handleNewComment" />
    </div>
</template>

<script>
import CommentInputCompo from "./CommentInputCompo.vue"
import CommentListCompo from "./CommentListCompo.vue"
import CommentTopCompo from "./CommentTopCompo.vue"

export default {
    components: {
        CommentTopCompo,
        CommentListCompo,
        CommentInputCompo,
    },
    props: {
        comments: {
            type: Array,
            default: () => []
        },
        postid: Number,
    },
    data() {
        return {
            internalComments: [],
        };
    },
    created() {
        this.initializeComments();
    },
    methods: {
        initializeComments() {
            this.internalComments = Array.isArray(this.comments) ? [...this.comments] : [];
        },
        handleNewComment(newComment) {
            // 서버에서 받은 댓글 데이터를 internalComments 배열에 추가
            this.internalComments.push(newComment);
            console.log("newComment : "+ newComment.nickname)
            
            this.$emit('update-comment-count', this.internalComments.length);
        },
    },
    watch: {
        comments(newValue) {
            this.internalComments = Array.isArray(newValue) ? [...newValue] : [];
        }
    }
}
</script>