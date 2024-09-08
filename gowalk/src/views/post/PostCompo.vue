<template>
    <div class="post-compo">
        <type-compo @typeSelected="updatePostType" />
        <post-list-compo :key="currentType" :post-type="currentType" />
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
    // props: ["postType"],
    data() {
        return {
            name: "PostCompo",
            postCreateButtonSrc: require("@/assets/postListCompo/createPost.png"),
            currentType: null,
        };
    },
    methods: {
        updatePostType(type) {
            console.log("Received type in updatePostType:", type);
            this.currentType = type;
        }
    },
    mounted(){
        this.$nextTick(() => { // Vue 인스턴스가 업데이트를 완료한 후 실행
        this.updatePostType(this.currentType);
    });
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
