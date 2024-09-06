<template>
    <div>
        <comment-top-compo/>
        <comment-list-compo/>
        <comment-input-compo/>
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

}
</script>

<style>

</style>