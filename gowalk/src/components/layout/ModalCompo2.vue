<template>
    <div class="modal-overlay" v-show="isVisible" @click.self="closeModal">
        <transition name="slide-up">
            <div class="modal-content">
                <div class="modal-header"></div>
                <div class="message">
                    <p>간단한 로그인하고</p>
                    <P>신책가까 서비스 이용하기♡</P>
                </div>
                <button class="login-button" @click="redirectToLogin">{{ confirmButtonText }}</button>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    name: "modalCompo",
    props: {
        isVisible: {
            type: Boolean,
            default: false,
        },
        message: {
            type: String,
            default: "",
        },
        showConfirmButton: {
            type: Boolean,
            default: true,
        },
        confirmButtonText: {
            type: String,
            default: "간편 로그인 하러가기",
        },
        showCancelButton: {
            type: Boolean,
            default: true,
        },
        cancelButtonText: {
            type: String,
            default: "취소",
        },
    },
    methods: {
        closeModal() {
            this.$emit("close");
        },
        redirectToLogin() {
            this.closeModal();
            if (this.$router.currentRoute.path !== "/login") {
                this.$router.replace("/login").catch((err) => {
                    // NavigationDuplicated 에러를 확인하고 무시
                    if (err.name !== "NavigationDuplicated") {
                        throw err;
                    }
                });
            }
        },
    },
};
</script>

<style scoped>
/* 모달 오버레이 (어두운 배경) */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: flex-end; /* 아래에서 위로 모달이 올라오도록 설정 */
    z-index: 1000;
}

.modal-content {
    width: 100%;
    max-width: 600px;
    height: 30%;
    min-height: 300px;
    background-color: white;
    border-radius: 12px 12px 0 0;
    padding: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    animation: slide-up 0.3s ease-out;
    touch-action: none;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.modal-header {
    height: 10px;
    cursor: grab;
    text-align: center;
}

.message,
.login-button {
    padding: 20px;
    overflow-y: auto;
}

.login-button {
    width: 100%;
    padding: 15px 0;
    margin-top: 20px;
    background-color: black; /* 버튼 배경색 */
    color: white; /* 버튼 텍스트 색상 */
    border: none;
    border-radius: 30px;
    font-size: 16px;
    cursor: pointer;
}
@keyframes slide-up {
    0% {
        transform: translateY(100%);
    }
    100% {
        transform: translateY(0);
    }
}
</style>
