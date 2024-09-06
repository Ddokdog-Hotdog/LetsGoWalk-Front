<template>
    <modalCompo :isVisible="isVisible" @close="closeModal">
        <p></p>
        <p></p>
        <p></p>
        <p>{{ message }}</p>
        <p></p>
        <p></p>
        <p></p>
        <div class="button-group">
            <button @click="confirm" class="confirm-btn">네</button>
            <button @click="closeModal" class="cancel-btn">아니요</button>
        </div>
    </modalCompo>
</template>

<script>
import modalCompo from "@/components/layout/ModalCompo.vue";

export default {
    name: "ConfirmModalCompo",
    props: {
        isVisible: {
            type: Boolean,
            default: false,
        },
        message: {
            type: String,
            default: "message로 넘어온 값이 없으면 이 문구가 출력됩니다.",
        },
    },
    components: {
        modalCompo,
    },
    methods: {
        closeModal() {
            this.$emit("close");
        },
        confirm() {
            this.$emit("confirm", true); // true 값 반환
            this.closeModal();
        },
    },
};
</script>

<style scoped>
.button-group {
    display: flex;
    justify-content: space-between; /* 버튼을 양쪽으로 정렬 */
    margin-top: 20px; /* 위에 내용과 버튼 간의 간격 추가 */
}

.confirm-btn,
.cancel-btn {
    width: 45%; /* 버튼이 너무 크지 않게 조정 */
    padding: 10px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
}

.confirm-btn {
    background-color: white; /* 확인 버튼 색상 */
    color: black;
    border-radius: 50px;
    border: 1px solid rgba(0, 0, 0, 0.2);
}
.cancel-btn {
    background-color: black; /* 취소 버튼 색상 */
    color: white;
    border-radius: 50px;
    border: 1px solid rgba(0, 0, 0, 0.2);
}
</style>
