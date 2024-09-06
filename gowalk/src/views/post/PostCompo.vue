<template>
    <div class="post-compo">
        <type-compo />
        <post-list-compo :post-type="postType" />
        <post-create-btn />
        <confirm-modal-compo/>
    </div>
</template>

<script>
import PostListCompo from "./read/PostListCompo.vue";
import TypeCompo from "@/components/layout/TypeCompo.vue";
import PostCreateBtn from "@/views/post/PostCreateBtn.vue";
import ConfirmModalCompo from "@/components/layout/ConfirmModalCompo.vue";

export default {
    components: {
        PostListCompo,
        TypeCompo,
        PostCreateBtn,
        ConfirmModalCompo,
    },
    props: ["postType"],
    data() {
        return {
            name: "PostCompo",
            postCreateButtonSrc: require("@/assets/postListCompo/createPost.png"),
        };
    },
};
</script>

<style scoped>
.post-compo {
    padding-bottom: 68px;
    padding-top: 25px;
    overflow-y: auto;
}
</style>
