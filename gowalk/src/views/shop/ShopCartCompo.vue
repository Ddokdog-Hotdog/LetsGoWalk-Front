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
                <img :src="product.THUMBNAILIMAGE" alt="product image" class="product-image" />
            </div>

            <div class="cart-item-info">
                <!-- 상품명 및 가격 -->
                <p class="product-name">{{ product.NAME }}</p>
                <p class="product-price">{{ product.PRICE | currency }}</p>
            </div>
            <div class="quantity-control">
                <!-- 수량 조절 -->
                <button @click="decreaseQuantity(product)">-</button>

                <span>{{ product.QUANTITY }}</span>

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
            <!-- 이름 오류 메시지 -->
            <p v-if="validationErrors.name" class="error-message">{{ validationErrors.name }}</p>
            <p></p>
            <label for="address">배송지</label>
            <input id="address" v-model="shippingInfo.address" type="text" placeholder="배송지 입력" />
            <!-- 주소 오류 메시지 -->
            <p v-if="validationErrors.address" class="error-message">{{ validationErrors.address }}</p>
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
                    <button @click="useAllPoints" id="points-use">전액 사용</button>
                </div>
            </div>
            <p class="right-align">현재 보유 포인트: {{ currentPoints }}P</p>

            <hr />

            <div class="total-payment">
                <strong>총 결제 금액</strong>
                <strong>{{ finalPrice | currency }}</strong>
            </div>
        </div>

        <!-- ConfirmModalCompo 추가 -->
        <confirmModalCompo
            :isVisible="isConfirmModalVisible"
            @close="isConfirmModalVisible = false"
            @confirm="handlePurchaseConfirmation"
            :message="`정말로 구매하시겠습니까?`"
        />

        <!-- 구매하기 버튼 -->
        <button class="buy-button" @click="showConfirmModal">
            <img :src="require('@/assets/icon/kakao-icon.png')" alt="Kakao Icon" />
            pay 결제
        </button>
    </div>
</template>

<script>
import backButtonCompo from "@/components/layout/BackCompo.vue";
import confirmModalCompo from "@/components/layout/ConfirmModalCompo.vue";
import { shopApiRequest } from "@/views/shop/util/shopApi";
// import Vue from 'vue';

export default {
    components: {
        backButtonCompo,
        confirmModalCompo,
    },
    data() {
        return {
            selectAll: false,
            cartProducts: [],
            shippingInfo: {
                name: "",
                address: "",
            },
            points: 0,
            currentPoints: 0,
            isConfirmModalVisible: false, // 모달 표시 여부
            validationErrors: {
                // 각 필드에 대한 오류 메시지 저장
                name: "",
                address: "",
            },
        };
    },
    mounted: async function () {
        await shopApiRequest
            .getCartItemList()
            .then((response) => {
                console.log(response.data);
                this.cartProducts = response.data.cartProducts;
                this.cartProducts.forEach((product) => {
                    this.$set(product, "checked", true); // 반응성 보장
                    // product.checked = true; // 각 객체에 checked 속성 추가
                });
                this.currentPoints = response.data.nowPoint;
                if (response.data.recentAddress !== "NO ORDER") {
                    this.shippingInfo.address = response.data.recentAddress;
                }
            })
            .catch((error) => {
                console.log(error);
            });
        console.log("마운트");
        // 쿼리 파라미터에 따라 replaceProductFromQuery 호출
        // 쿼리 파라미터가 있는 경우에만 replaceProductFromQuery 호출
        if (
            this.$route.query.PRODUCTID &&
            this.$route.query.VENDOR &&
            this.$route.query.NAME &&
            this.$route.query.PRICE &&
            this.$route.query.THUMBNAILIMAGE &&
            this.$route.query.quantity
        ) {
            this.replaceProductFromQuery();
        }
    },
    computed: {
        totalPrice() {
            return this.cartProducts.reduce((total, product) => {
                return total + (product.checked ? product.PRICE * product.QUANTITY : 0);
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
            // shopApiRequest.updateCart({cartItemId: product.CARTID,
            //                             productId: product.ID,
            //                             quantity: product.QUANTITY+1})
            // .then((response) => {
            //     console.log(response.data);
            product.QUANTITY += 1;
            // })
        },
        decreaseQuantity(product) {
            if (product.QUANTITY > 1) {
                // shopApiRequest.updateCart({cartItemId: product.CARTID,
                //                         productId: product.ID,
                //                         quantity: product.QUANTITY-1})
                // .then((response) => {
                //     console.log(response.data);
                product.QUANTITY -= 1;
                // })
            }
        },
        removeFromCart(product) {
            shopApiRequest
                .deleteCart({ cartItemId: product.CARTID, productId: product.ID, quantity: product.QUANTITY })
                .then((response) => {
                    console.log(response.data);
                    this.cartProducts = this.cartProducts.filter((p) => p.ID !== product.ID);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        useAllPoints() {
            this.points = this.currentPoints;
        },
        updatePoints() {
            if (isNaN(this.points)) {
                console.log("NaN 발생");
                this.points = 0;
            }
            if (this.points > this.currentPoints) {
                this.points = this.currentPoints;
            } else if (this.points < 0) {
                this.points = 0;
            }
        },
        showConfirmModal() {
            console.log("카카오페이 결제 클릭");
            this.isConfirmModalVisible = true; // 모달 표시
        },
        handlePurchaseConfirmation(confirmed) {
            if (confirmed) {
                // 사용자가 구매를 확정했을 때 실행할 로직
                this.proceedWithPayment();
            }
        },
        proceedWithPayment() {
            // 필드 검증
            if (!this.validateFields()) {
                return; // 검증 실패시 결제 진행 안함
            }
            const paymentUrl = this.isDesktop();

            // 결제 로직을 여기에 작성
            console.log("구매 완료 프로세스 진행");
            // 예: 서버로 결제 요청 보내기, 페이지 이동 등

            let orderItems = [];
            this.cartProducts
                .filter((product) => product.checked === true)
                .forEach((product) =>
                    orderItems.push({
                        cartItemId: product.CARTID,
                        productId: product.ID,
                        productName: product.NAME,
                        quantity: product.QUANTITY,
                    })
                );
            let shopOrderItemDTO = {
                orderItems: orderItems,
                totalAmount: this.finalPrice,
                address: this.shippingInfo.address,
                point: this.points,
            };

            console.log("결제 내용 : ", shopOrderItemDTO);

            if (paymentUrl) {
                // 현재 결제 요청을 pc에서 한 경우
                shopApiRequest
                    .pcPayment(shopOrderItemDTO)
                    .then((response) => {
                        console.log(response.data);
                        // 결제 성공 페이지로 이동
                        // this.$router.push("/shop/payment/complete");
                        // 서버에서 반환된 URL로 리디렉션
                        window.location.href = response.data;
                    })
                    .catch((error) => {
                        console.log(error);
                        // 결제 실패 페이지로 이동
                        this.$router.push("/shop/payment/error");
                    });
            } else {
                // 현재 결제 요청을 모바일에서 한 경우
                shopApiRequest
                    .mobilePayment(shopOrderItemDTO)
                    .then((response) => {
                        console.log(response.data);
                        // 결제 성공 페이지로 이동
                        // this.$router.push("/shop/payment/complete");
                        // 서버에서 반환된 URL로 리디렉션
                        window.location.href = response.data;
                    })
                    .catch((error) => {
                        console.log(error);
                        // 결제 실패 페이지로 이동
                        this.$router.push("/shop/payment/error");
                    });
            }
        },
        replaceProductFromQuery() {
            // query에서 넘어온 값을 이용해 새로운 상품 데이터 만들기
            const newProduct = {
                CARTID: 0,
                ID: Number(this.$route.query.PRODUCTID), // 고유 id 생성
                VENDOR: this.$route.query.VENDOR,
                NAME: this.$route.query.NAME,
                PRICE: Number(this.$route.query.PRICE),
                THUMBNAILIMAGE: this.$route.query.THUMBNAILIMAGE, // 기본 이미지
                QUANTITY: Number(this.$route.query.quantity),
                checked: true,
            };

            // cartProducts 배열에 상품을 추가
            this.cartProducts = [newProduct];
        },
        validateFields() {
            let isValid = true;

            // 이름 검증
            if (!this.shippingInfo.name) {
                this.validationErrors.name = "이름을 입력해주세요.";
                isValid = false;
            } else {
                this.validationErrors.name = "";
            }

            // 배송지 검증
            if (!this.shippingInfo.address) {
                this.validationErrors.address = "배송지를 입력해주세요.";
                isValid = false;
            } else {
                this.validationErrors.address = "";
            }

            return isValid;
        },
        isDesktop() {
            const userAgent = navigator.userAgent;
            // 일반적으로 데스크탑에서 사용하는 브라우저 userAgent에 포함된 키워드를 사용
            return /Windows|Macintosh|Linux/.test(userAgent);
        },
    },
    watch: {
        points: "updatePoints",
        // $route.query가 변경될 때 실행
        // "$route.query": {
        //     immediate: true, // 컴포넌트가 처음 로드될 때도 실행
        //     handler(newQuery) {
        //         // shopModalCompo로부터 데이터를 넘겨받았는지 확인
        //         if (
        //             newQuery.PRODUCTID &&
        //             newQuery.VENDOR &&
        //             newQuery.NAME &&
        //             newQuery.PRICE &&
        //             newQuery.THUMBNAILIMAGE &&
        //             newQuery.quantity
        //         ) {
        //             this.replaceProductFromQuery();
        //         }
        //     },
        // },
    },

    filters: {
        currency(value) {
            return new Intl.NumberFormat("ko-KR", {
                style: "currency",
                currency: "KRW",
            }).format(value);
        },
    },
    // created() {
    //     // 넘어온 query 데이터를 cartProducts에 대체
    //     this.replaceProductFromQuery();
    // },
};
</script>

<style scoped>
.cart-page {
    padding: 16px;
    background-color: #f5f5f5;
    margin-top: 15px;
    padding-bottom: 100px;
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
    object-fit: contain;
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
    background-color: #f7e600;
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
    padding-left: 10px;
    padding-right: 10px;
}
.shipping-info > input {
    width: 100%;
}
#points-use {
    border: 1px solid #ddd;
    border-radius: 15px;
    font-size: 15px;
    background-color: rgba(0, 0, 0, 0.09);
}
.error-message {
    color: red;
    font-size: 12px;
    margin-top: 5px;
}
</style>
