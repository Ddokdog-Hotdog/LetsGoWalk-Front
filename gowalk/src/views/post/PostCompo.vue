<template>
    <div class="post-compo">
        <type-compo />
        <post-list-compo :post-type="postType" />
        <post-create-btn />
    </div>
</template>

<script>
import PostListCompo from "./PostListCompo.vue";
import TypeCompo from "@/components/layout/TypeCompo.vue";
import PostCreateBtn from "@/views/post/PostCreateBtn.vue";

export default {
    components: {
        PostListCompo,
        TypeCompo,
        PostCreateBtn,
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
}
</style>
