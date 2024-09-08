<template>
    <div class="order-payment-completion">
        <!-- 상단 주문 / 결제 문구 -->
        <h2 class="center-text order-title">주문 / 결제</h2>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <!-- 중간 이미지 -->
        <div class="image-container">
            <img :src="require(`@/assets/topCompo/mainlogo.png`)" alt="Order Complete" class="order-image" />
        </div>

        <!-- 완료 메시지 -->
        <p class="center-text message">{{ message }}</p>

        <!-- 버튼 -->
        <button class="completion-button" @click="handleClick">{{ isError ? errorText : buttonText }}</button>
    </div>
</template>

<script>
export default {
    props: {
        message: {
            type: String,
            default: "주문이 완료되었습니다!",
        },
        buttonText: {
            type: String,
            default: "메인으로 가기",
        },
        isError: {
            type: Boolean,
            default: false,
        },
        errorText: {
            type: String,
            default: "장바구니로 돌아가기",
        },
    },
    methods: {
        handleClick() {
            // 버튼 클릭 시 동작
            if (this.isError) {
                this.$router.push("/shop/cart"); // 장바구니 페이지로 이동
            } else {
                this.$router.push("/"); // 메인 페이지로 이동
            }
        },
    },
};
</script>

<style scoped>
.order-payment-completion {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 100vh;
    padding: 20px;
    background-color: #f9f9f9;
}

.order-title {
    font-size: 24px;
    font-weight: bold;
    color: #333;
    margin-top: 20px; /* 상단에 배치되도록 위쪽 여백 */
    margin-bottom: 40px; /* 이미지와 간격 */
}

.center-text {
    text-align: center;
}

.image-container {
    margin: 40px 0;
}

.order-image {
    width: 150px;
    height: auto;
}

.message {
    font-size: 18px;
    color: #555;
    margin-bottom: 40px;
}

.completion-button {
    padding: 12px 24px;
    background-color: black;
    color: white;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    width: 60%;
    font-size: 16px;
    transition: background-color 0.3s ease;
}
</style>
