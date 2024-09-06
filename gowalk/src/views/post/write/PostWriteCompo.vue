<template>
    <div class="post-write-compo">
        <post-top-compo @cancel="showConfirmModal" @register="submitPost"/>
        <board-type-compo/>
        <post-input-compo/>
        <confirm-modal-compo
            :isVisible="isConfirmModalVisible"
            @close="isConfirmModalVisible = false"
            @confirm="handleCancelConfirmation"
            :message="`정말로 취소하시겠습니까?`"
            />
    </div>
</template>

<script>
import PostTopCompo from "./PostTopCompo.vue"
import BoardTypeCompo from "./BoardTypeCompo.vue"
import PostInputCompo from "./PostInputCompo.vue"
import ConfirmModalCompo from "../../../components/layout/ConfirmModalCompo.vue"

export default {
    components: {
        PostTopCompo,
        BoardTypeCompo,
        PostInputCompo,
        ConfirmModalCompo,
    },
    data(){
        return {
            name: "PostWrtieCompo",
            isConfirmModalVisible: false,
        }
    },
    methods: {
        showConfirmModal() {
            this.isConfirmModalVisible = true;
        },
        handleCancelConfirmation(confirmed) {
            if (confirmed) {
                this.$router.go(-1);
            }
            this.isConfirmModalVisible = false;
        },
        submitPost() {
            console.log("게시글 등록 처리");
            this.$router.push('/post/1');
        }
    }
}
</script>

<style scoped>
.post-write-compo{
    height: 100%;
}
</style>