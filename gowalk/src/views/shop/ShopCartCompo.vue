<template>
    <div class="cart-page">
        <backButtonCompo />
        <!-- 전체 선택 체크박스 -->
        <hr />
        <div class="select-all">
            <img
                :src="selectAll ? require('@/assets/icon/check-on.png') : require('@/assets/icon/check-off.png')"
                @click="toggleSelectAll"
                class="checkbox-img"
                alt="select all"
            />
            <span>전체 선택</span>
        </div>

        <!-- 장바구니 상품 목록 -->
        <div v-for="(product, index) in cartProducts" :key="index" class="cart-item">
            <div class="cart-item-left">
                <!-- 개별 체크박스 -->
                <img
                    :src="
                        product.checked ? require('@/assets/icon/check-on.png') : require('@/assets/icon/check-off.png')
                    "
                    @click="toggleProductCheck(product)"
                    class="checkbox-img product-checkbox"
                    alt="select product"
                />
                <img :src="product.image" alt="product image" class="product-image" />
            </div>

            <div class="cart-item-info">
                <!-- 상품명 및 가격 -->
                <p class="product-name">{{ product.name }}</p>
                <p class="product-price">{{ product.price | currency }}</p>
            </div>
            <div class="quantity-control">
                <!-- 수량 조절 -->
                <button @click="decreaseQuantity(product)">-</button>

                <span>{{ product.quantity }}</span>

                <button @click="increaseQuantity(product)">+</button>
            </div>

            <div class="cart-item-right">
                <!-- 삭제 버튼 -->
                <button @click="removeFromCart(product)" class="remove-btn">X</button>
            </div>
        </div>

        <!-- 배송 정보 섹션 -->
        <div class="shipping-info">
            <h3>배송 정보</h3>
            <p></p>
            <label for="name">이름</label>
            <input id="name" v-model="shippingInfo.name" type="text" placeholder="이름 입력" />
            <p></p>
            <label for="address">배송지</label>
            <input id="address" v-model="shippingInfo.address" type="text" placeholder="배송지 입력" />
        </div>

        <!-- 결제 정보 섹션 -->
        <div class="payment-info">
            <h3>결제 예상 금액</h3>
            <p></p>
            <div class="payment-row">
                <span>상품 금액</span>
                <span>{{ totalPrice | currency }}</span>
            </div>
            <div class="payment-row point">
                <span>포인트</span>
                <div class="point-container">
                    <input v-model="points" type="text" placeholder="포인트 입력" class="points-input" />
                    <button @click="useAllPoints">전액 사용</button>
                </div>
            </div>
            <p class="right-align">현재 보유 포인트: {{ currentPoints }}P</p>

            <hr />

            <div class="total-payment">
                <strong>총 결제 금액</strong>
                <strong>{{ finalPrice | currency }}</strong>
            </div>
        </div>

        <!-- 구매하기 버튼 -->
        <button class="buy-button">
            <img :src="require('@/assets/icon/kakao-icon.png')" alt="Kakao Icon" />
            pay 결제
        </button>
    </div>
</template>

<script>
import backButtonCompo from "@/components/layout/BackCompo.vue";

export default {
    components: {
        backButtonCompo,
    },
    data() {
        return {
            selectAll: false,
            cartProducts: [
                {
                    id: 1,
                    name: "상품 1",
                    price: 20000,
                    image: "https://via.placeholder.com/100",
                    quantity: 1,
                    checked: false,
                },
                {
                    id: 2,
                    name: "상품 2",
                    price: 15000,
                    image: "https://via.placeholder.com/100",
                    quantity: 1,
                    checked: false,
                },
            ],
            shippingInfo: {
                name: "",
                address: "",
            },
            points: 0,
            currentPoints: 5000,
        };
    },
    computed: {
        totalPrice() {
            return this.cartProducts.reduce((total, product) => {
                return total + (product.checked ? product.price * product.quantity : 0);
            }, 0);
        },
        finalPrice() {
            return Math.max(this.totalPrice - this.points, 0);
        },
    },
    methods: {
        toggleSelectAll() {
            this.selectAll = !this.selectAll;
            this.cartProducts.forEach((product) => (product.checked = this.selectAll));
        },
        toggleProductCheck(product) {
            product.checked = !product.checked;
        },
        increaseQuantity(product) {
            product.quantity += 1;
        },
        decreaseQuantity(product) {
            if (product.quantity > 1) {
                product.quantity -= 1;
            }
        },
        removeFromCart(product) {
            this.cartProducts = this.cartProducts.filter((p) => p.id !== product.id);
        },
        useAllPoints() {
            this.points = this.currentPoints;
        },
        updatePoints() {
            if (this.points > this.currentPoints) {
                this.points = this.currentPoints;
            } else if (this.points < 0) {
                this.points = 0;
            }
        },
    },
    watch: {
        points: "updatePoints",
    },
    filters: {
        currency(value) {
            return new Intl.NumberFormat("ko-KR", {
                style: "currency",
                currency: "KRW",
            }).format(value);
        },
    },
};
</script>

<style scoped>
.cart-page {
    padding: 16px;
    background-color: #f5f5f5;
}

.select-all {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
}

.checkbox-img {
    width: 24px;
    height: 24px;
    margin-right: 8px;
    cursor: pointer;
}

.product-checkbox {
    position: absolute;
    top: 16px;
    left: 16px;
}

.cart-item {
    background-color: #fff;
    border-radius: 8px;
    padding: 16px;
    display: flex;
    align-items: center;
    position: relative;
    margin-bottom: 16px;
}

.cart-item-left {
    display: flex;
    align-items: center;
}

.product-image {
    width: 100px;
    height: 100px;
    object-fit: cover;
    margin-left: 48px; /* Checkbox 크기만큼 왼쪽 여백 */
}

.cart-item-info {
    margin-left: 16px;
    flex-grow: 1;
}

.product-name {
    font-size: 18px; /* 상품명 크기 조정 */
    margin-bottom: 4px;
}

.product-price {
    font-size: 16px; /* 상품 가격 크기 조정 */
    color: gray;
    margin-bottom: 8px;
}

.quantity-control {
    display: flex;
    align-items: center;
    /* margin-left: 16px; */
}

.quantity-control button {
    width: 30px;
    height: 15px;
    text-align: center;
    cursor: pointer;
    border: 1px solid rgba(0, 0, 0, 0.2); /* 검정색을 20% 불투명하게 */
    border-radius: 5px;

    display: flex;
    align-items: center; /* 수직 중앙 정렬 */
    justify-content: center; /* 수평 중앙 정렬 */
    text-align: center;
}

.cart-item-right {
    position: absolute;
    top: 16px;
    right: 16px;
}

.remove-btn {
    background: none;
    border: none;
    font-size: 18px;
    cursor: pointer;
}

.shipping-info,
.payment-info {
    background-color: #fff;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 16px;
    text-align: left;
}

.shipping-info label,
.payment-info span {
    display: block;
    margin-bottom: 8px;
}

.points-input {
    width: 100px; /* 포인트 입력 칸 너비 */
    text-align: right; /* 입력 내용 오른쪽 정렬 */
}

.input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.payment-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
}

.right-align {
    text-align: right;
}

hr {
    border: none;
    border-top: 1px solid #eee;
    margin: 16px 0;
}

.total-payment {
    display: flex;
    justify-content: space-between;
    font-weight: bold;
}

.buy-button {
    width: 100%;
    padding: 16px;
    background-color: yellow;
    color: black;
    border: none;
    border-radius: 50px;
    font-size: 18px;
    cursor: pointer;
}

.point-container {
    display: flex;
    align-items: center;
    gap: 8px; /* 입력 필드와 버튼 사이 간격 */
}
input {
    border: 1px solid #ddd; /* 기본 input 테두리 */
    border-radius: 5px;
    height: 45px;
}
.shipping-info > input {
    width: 100%;
}
</style>
