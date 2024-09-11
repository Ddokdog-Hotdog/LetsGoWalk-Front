<template>
    <!-- <div>
        <comment-top-compo :comment-count="comments.length" />
        <comment-list-compo :comments="internalComments" />
        <comment-input-compo :postid="postid" @comment-added="handleNewComment" />
    </div> -->
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
            internalComments: this.comments,
        };
    },
    // methods: {
    //     handleNewComment(newComment) {
    //         // this.internalComments.push(newComment);
    //         this.internalComments = [...this.internalComments, newComment];
    //         this.$emit('update-comment-count', this.internalComments.length);

    //     }
    // },
    methods: {
        //     handleNewComment(newComment) {
        //     console.log('Received new comment:', newComment);
        //     if (!this.internalComments) {
        //         this.internalComments = [];
        //     }
        //     this.internalComments.push(newComment);
        //     console.log('Updated comments:', this.internalComments);
        //     this.$emit('update-comment-count', this.internalComments.length);
        // }
        handleNewComment(newComment) {
            // 기존 배열에 새 댓글을 추가하는 대신 새 배열을 생성합니다
            
            this.internalComments = [...this.internalComments, newComment];
            this.$emit('update-comment-count', this.internalComments.length);
        }
    },
    watch: {
        comments(newValue) {
            this.internalComments = [...newValue];
        }
    }
}
</script>