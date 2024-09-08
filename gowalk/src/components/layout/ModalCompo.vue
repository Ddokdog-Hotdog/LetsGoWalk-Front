<template>
    <div class="modal-overlay" v-if="isVisible" @click.self="closeModal">
        <transition name="slide-up">
            <div class="modal-content">
                <img :src="require('@/assets/icon/modal-line.png')" alt="Modal line" />
                <p>{{ message }}</p>
                <button v-if="showConfirmButton" @click="confirmAction">{{ confirmButtonText }}</button>
                <button v-if="showCancelButton" @click="closeModal">{{ cancelButtonText }}</button>
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
            default: "모달 내용",
        },
        showConfirmButton: {
            type: Boolean,
            default: true,
        },
        confirmButtonText: {
            type: String,
            default: "확인",
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
        confirmAction() {
            this.$emit("confirm");
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
    max-width: 500px;
    background-color: white;
    border-radius: 12px 12px 0 0;
    padding: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    transform: translateY(100%); /* 초기 상태: 화면 아래 */
}

/* 슬라이드 업 애니메이션 */
.slide-up-enter-active,
.slide-up-leave-active {
    transition: transform 0.5s ease-in-out;
}

.slide-up-enter,
.slide-up-leave-to {
    transform: translateY(100%); /* 모달이 시작할 때와 사라질 때 아래에 위치 */
}

.slide-up-enter-to,
.slide-up-leave {
    transform: translateY(0); /* 모달이 화면에 위치 */
}
</style>
