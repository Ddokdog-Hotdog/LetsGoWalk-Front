<template>
    <div class="post-write-compo">
        <post-top-compo @cancel="showConfirmModal" @register="submitPost" />
        <board-type-compo @type-selected="updateBoardType" />
        <post-input-compo @update-title="post.title = $event"
                            @update-contents="post.contents = $event"
                            @update-images="post.images = $event" />
        <confirm-modal-compo
            :isVisible="isConfirmModalVisible"
            @close="isConfirmModalVisible = false"
            @confirm="handleCancelConfirmation"
            :message="`정말로 취소하시겠습니까?`"
        />
    </div>
</template>

<script>
import axios from "@/axios.js"; // axios 인스턴스 가져오기
import PostTopCompo from "./PostTopCompo.vue";
import BoardTypeCompo from "./BoardTypeCompo.vue";
import PostInputCompo from "./PostInputCompo.vue";
import ConfirmModalCompo from "../../../components/layout/ConfirmModalCompo.vue";

export default {
    components: {
        PostTopCompo,
        BoardTypeCompo,
        PostInputCompo,
        ConfirmModalCompo,
    },
    data() {
        return {
            name: "PostWrtieCompo",
            isConfirmModalVisible: false,
            post: {
                title: '',
                contents: '',
                boardType: '1',
                images: [] // 이미지 파일 배열
            }
        };
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
        updateBoardType(type) {
            this.post.boardType = type;
            console.log("Updated boardType:", this.post.boardType);
        },
        submitPost() {
            let formData = new FormData();
            // formData.append('memberid', 5);
            formData.append('title', this.post.title);
            formData.append('contents', this.post.contents);
            formData.append('boardid', this.post.boardType);
            console.log("this.post : " + this.post)
            
            this.post.images.forEach(file => {
                formData.append('mediaUrlList', file);
                console.log('Adding file:', file.name); // 파일 로그 확인
            });

            console.log("FormData 전체 내용 확인 : " + [...formData]); // FormData 전체 내용 확인

            axios.post('/post/write', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => {
                console.log("게시글 등록 성공", response);
                this.$router.push(`/post/${response.data.postid}`);
            }).catch(error => {
                console.error("게시글 등록 실패:", error.response);
            });
        },
    },
};
</script>

<style scoped>
.post-write-compo {
    height: 100%;
}
</style>
