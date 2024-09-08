<template>
    <main class="main-content">
        <loginModalCompo :isVisible="isLoginModalVisible" @close="closeModal">
            <p>로그인이 필요합니다.</p>
            <button @click="redirectToLogin">로그인 페이지로 이동</button>
        </loginModalCompo>
        <router-view></router-view>
    </main>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import loginModalCompo from "@/views/login/LoginModalCompo.vue";

export default {
    components: {
        loginModalCompo, // 모달 컴포넌트를 사용합니다.
    },

    getters: {
        shouldShowLoginModal: (state) => state.showLoginModal,
    },
    computed: {
        ...mapState({
            isLoginModalVisible: (state) => state.showLoginModal,
        }),
    },
    methods: {
        ...mapMutations(["showLoginModal"]),
        closeModal() {
            this.showLoginModal(false);
        },
        redirectToLogin() {
            this.showLoginModal(false);
            this.$router.push("/login");
        },
    },
    watch: {
        shouldShowLoginModal(newVal) {
            if (newVal) {
                this.$nextTick(() => {
                    const modal = this.$el.querySelector(".modal-content");
                    modal.style.transform = "translateY(0)";
                });
            }
        },
    },
};
</script>

<style scoped>
.main-content {
    width: 100%; /* 부모 요소와 동일한                          너비 유지 */
    max-width: 600px; /* 화면에 꽉 차게 설정 */
    box-sizing: border-box;
    text-align: center; /* 중앙 정렬을 위한 텍스트 정렬 */
    background-color: #f8f9fa;
    /*flex: 1; /* 남은 공간을 차지 */
    /*overflow-y: auto; /* 내용이 넘칠 경우 스크롤 */
    /*padding-bottom: 40px; /* 하단 네비게이션  높이만큼 마진 추가 */
    /*padding-top: 20px;
    /*하단 네비게이션 바 높이만큼 마진 추가 */

    height: 100%;
}
</style>
