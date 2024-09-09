<template>
    <modalCompo :isVisible="isModalVisible" @close="isModalVisible = false">
        <div class="modal-body">
            <!-- 판매업체 -->
            <p class="seller">{{ VENDOR }}</p>

            <!-- 상품명 -->
            <h3 class="product-name">{{ NAME }}</h3>

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
                <button class="cart-button" @click="confirmAddToCart">장바구니 담기</button>
                <button class="buy-button" @click="pay">
                    <img src="@/assets/icon/kakao-icon.png" alt="Kakao Icon" />
                    pay 결제
                </button>
            </div>
        </div>
        <!-- confirmModalCompo 모달 -->
        <confirmModalCompo
            :isVisible="isConfirmVisible"
            @close="closeConfirmModal = false"
            @confirm="handleCartConfirm"
            :message="'정말로 장바구니에 담으시겠습니까?'"
        />

        <!-- 두 번째 모달: 장바구니 담기 성공 -->
        <confirmModalCompo
            :isVisible="isSuccessVisible"
            :message="`장바구니에 담기 성공하였습니다. 
            장바구니로 이동하시겠습니까?`"
            @confirm="goToCart"
            @close="isSuccessVisible = false"
        />
    </modalCompo>
</template>

<script>
import modalCompo from "@/components/layout/ModalCompo.vue";
import confirmModalCompo from "@/components/layout/ConfirmModalCompo.vue";
import { shopApiRequest } from "@/views/shop/util/shopApi";

export default {
    name: "shopModalCompo",
    props: {
        isVisible: {
            type: Boolean,
            default: false,
        },
        PRODUCTID: Number,
        NAME: String,
        VENDOR: String,
        PRICE: Number,
        THUMBNAILIMAGE: String,
    },
    data() {
        return {
            isModalVisible: false,
            quantity: 1,
            isConfirmVisible: false, // Confirm 모달 가시성 상태
            isSuccessVisible: false, // Success modal
        };
    },
    computed: {
        // 수량에 따른 총 가격 계산
        totalPrice() {
            return this.PRICE * this.quantity;
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
        // Confirm Modal 열기
        openConfirmModal() {
            this.isConfirmModalVisible = true;
        },
        // Confirm Modal 닫기
        closeConfirmModal() {
            this.isConfirmModalVisible = false;
        },
        // 장바구니에 상품 담기
        // addToCart() {
        //     // 장바구니에 담는 로직 작성
        //     console.log(`${this.name} 상품이 장바구니에 담겼습니다.`);
        //     this.closeConfirmModal();
        // },
        confirmAddToCart() {
            console.log("구매하기 버튼 클릭");
            this.isConfirmVisible = true; // Show the confirmation modal
        },
        handleCartConfirm(confirmed) {
            if (confirmed) {
                this.addToCart(); // Add to cart logic
                this.isConfirmVisible = false; // Close first modal
                this.isSuccessVisible = true; // Show success modal
            }
        },
        addToCart() {
            // Logic to add the item to the cart
            shopApiRequest
                .insertCart({ productId: this.PRODUCTID, quantity: this.quantity })
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
            console.log("장바구니에 추가");
        },
        goToCart() {
            this.isSuccessVisible = false;
            console.log("장바구니로 이동");
            this.$router.push("/shop/cart"); // Navigate to the cart page
        },
        pay() {
            console.log("모달창에서의 id : ", this.id);
            // 바로 결제
            this.$router.push({
                path: "/shop/cart",
                query: {
                    PRODUCTID: this.PRODUCTID,
                    VENDOR: this.VENDOR,
                    NAME: this.NAME,
                    PRICE: this.PRICE,
                    quantity: this.quantity,
                    THUMBNAILIMAGE: this.THUMBNAILIMAGE,
                },
            });
        },
    },
    components: {
        modalCompo,
        confirmModalCompo,
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
