<template>
    <div class="modal-overlay" v-if="isVisible" @click.self="closeModal">
        <transition name="slide-up">
            <div class="modal-content">
                <img :src="require('@/assets/icon/modal-line.png')" alt="Modal line" />
                <!-- 모달 내부 내용 -->
                <slot>
                    <p>모달 내용</p>
                </slot>
                <!-- 예시: 모달 창 닫기 버튼 -->
                <!-- <button class="close-button" @click="closeModal">Close</button> -->
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
    },
    methods: {
        closeModal() {
            this.$emit("close");
        },
    },
};
</script>

<style scoped>
/* 모달 스타일 */
/* 어두운 배경 */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5); /* 배경 어두운 색 */
    display: flex;
    justify-content: center;
    align-items: flex-end; /* 아래에서 위로 모달 창이 올라오기 위해 설정 */
    z-index: 1000;
}

/* 모달 창 스타일 */
.modal-content {
    width: 100%;
    max-width: 500px;
    background-color: white;
    border-radius: 12px 12px 0 0;
    padding: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

/* 모달 슬라이드 업 애니메이션 */
.slide-up-enter-active,
.slide-up-leave-active {
    transition: transform 1s ease; /* 1초에 걸쳐 올라오도록 설정 */
}
.slide-up-enter {
    transform: translateY(100%);
}
.slide-up-leave-to {
    transform: translateY(100%);
}

/* 닫기 버튼 */
.close-button {
    background: red;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
}
</style>
