<template>
    <div>
        <comment-top-compo :comment-count="comments.length" />
        <comment-list-compo :comments="comments" />
        <comment-input-compo />
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
        }
    },

}
</script>

<style>

</style>