<template>
    <modalCompo :isVisible="isModalVisible" @close="isModalVisible = false">
        <div class="modal-body">
            <!-- 판매업체 -->
            <p class="seller">{{ seller }}</p>

            <!-- 상품명 -->
            <h3 class="product-name">{{ name }}</h3>

            <!-- 가격 및 수량 조절 -->
            <div class="price-quantity">
                <p class="product-price">{{ totalPrice | currency }}</p>
                <div class="quantity-controls">
                    <button @click="decreaseQuantity">-</button>
                    <span>{{ quantity }}</span>
                    <button @click="increaseQuantity">+</button>
                </div>
            </div>

            <!-- 장바구니 및 결제 버튼 -->
            <div class="actions">
                <button class="cart-button">장바구니 담기</button>
                <button class="buy-button">
                    <img :src="require('@/assets/icon/kakao-icon.png')" alt="Kakao Icon" />
                    pay 결제
                </button>
            </div>
        </div>
        <!-- <confirmModalCompo ref="confirmModal" :message="`정말로 구매하시겠습니까?`"></confirmModalCompo> -->
    </modalCompo>
</template>

<script>
import modalCompo from "@/components/layout/ModalCompo.vue";
// import confirmModalCompo from "@/components/layout/ConfirmModalCompo.vue";

export default {
    name: "shopModalCompo",
    props: {
        isVisible: {
            type: Boolean,
            default: false,
        },
        seller: String,
        name: String,
        price: Number,
    },
    data() {
        return {
            isModalVisible: false,
            quantity: 1,
        };
    },
    computed: {
        // 수량에 따른 총 가격 계산
        totalPrice() {
            return this.price * this.quantity;
        },
    },
    methods: {
        closeModal() {
            // this.$emit("close");
            this.isModalVisible = false;
        },
        openModal() {
            this.isModalVisible = true;
        },
        increaseQuantity() {
            this.quantity++;
        },
        decreaseQuantity() {
            if (this.quantity > 1) this.quantity--;
        },
    },
    components: {
        modalCompo,
        // confirmModalCompo,
    },
    filters: {
        currency(value) {
            return new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW" }).format(value);
        },
    },
};
</script>

<style scoped>
.modal-body {
    padding: 20px;
}

.seller {
    font-size: 12px;
    color: #888; /* 회색 */
    margin-bottom: 8px;
    text-align: left; /* 왼쪽 정렬 */
}

.product-name {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 16px;
    text-align: left; /* 왼쪽 정렬 */
}

.price-quantity {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px; /* 아래 간격 */
}

.product-price {
    font-size: 16px;
    text-align: left;
}

.quantity-controls {
    display: flex;
    align-items: center;
}

.quantity-controls button {
    width: 32px;
    height: 20px;
    background-color: white;
    border: 1px solid rgba(0, 0, 0, 0.2); /* 검정색을 20% 불투명하게 */
    border-radius: 5px;
    font-size: 20px;
    cursor: pointer;

    display: flex;
    align-items: center; /* 수직 중앙 정렬 */
    justify-content: center; /* 수평 중앙 정렬 */
    text-align: center;
}

.quantity-controls span {
    margin: 0 8px;
    font-size: 16px;
}

.actions {
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
}

.cart-button,
.buy-button {
    flex: 1;
    padding: 12px 0;
    font-size: 16px;
    border: 1px solid rgba(0, 0, 0, 0.2); /* 검정색을 20% 불투명하게 */
    cursor: pointer;
    border-radius: 50px;
}

.cart-button {
    background-color: #f0f0f0;
    margin-right: 8px;
}

.buy-button {
    background-color: #f7e600;
    color: black;
}
</style>
