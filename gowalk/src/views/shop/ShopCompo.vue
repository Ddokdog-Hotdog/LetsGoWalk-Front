<template>
    <div class="shop">
        <div class="product-list">
            <div
                class="product-item"
                v-for="product in nowLike === false ? products : likeProducts"
                :key="product.PRODUCTID"
                @click="goToProduct(product.PRODUCTID)"
            >
                <div class="product-image-container">
                    <img :src="product.THUMBNAILIMAGE" alt="Product Image" class="product-image" />

                    <div v-if="product.isBest" class="best-icon">BEST</div>
                    <!-- 좋아요(찜) 버튼 -->
                    <div
                        class="heart-icon"
                        :class="{ liked: product.ISLIKE === 'N' ? false : true }"
                        @click.stop="toggleLike(product)"
                    >
                        ♥
                    </div>
                </div>

                <div class="product-info">
                    <p class="product-seller">{{ product.VENDOR }}</p>
                    <h3 class="product-name">{{ product.NAME }}</h3>
                    <p class="product-price">{{ product.PRICE | currency }}</p>
                </div>
            </div>

            <!-- 고정 버튼들 -->
        </div>
        <div class="btn">
            <button class="floating-button button1" @click="goCart()">
                <img :src="require('@/assets/icon/cart-icon.png')" alt="Button 1 Icon" />
            </button>
            <button class="floating-button button2" @click="seeLike()">
                <img
                    :src="
                        nowLike === false
                            ? require('@/assets/icon/heart-icon.png')
                            : require('@/assets/icon/heart-active-icon.png')
                    "
                    alt="Button 2 Icon"
                />
            </button>
        </div>
        <button @click="simulateApiCall">API 요청</button>
        <!-- 스피너 컴포넌트 -->
        <spinnerCompo :isVisible="loading" />
    </div>
</template>

<script>
import spinnerCompo from "@/components/layout/SpinnerCompo.vue"; // 스피너 컴포넌트 import
import { shopApiRequest } from "@/views/shop/util/shopApi";

export default {
    name: "ProductList",

    data() {
        return {
            products: [
                {
                    id: 1,
                    name: "Product 1",
                    seller: "Seller A",
                    price: 29900,
                    image: "https://via.placeholder.com/300x300",
                    isBest: true,
                    liked: false, // 좋아요 상태 추가
                },
                {
                    id: 2,
                    name: "Product 2",
                    seller: "Seller B",
                    price: 49900,
                    image: "https://via.placeholder.com/300x300",
                    isBest: false,
                    liked: false,
                },
                {
                    id: 3,
                    name: "Product 3",
                    seller: "Seller C",
                    price: 19900,
                    image: "https://via.placeholder.com/300x300",
                    isBest: true,
                    liked: false,
                },
                {
                    id: 4,
                    name: "Product 4",
                    seller: "Seller D",
                    price: 39900,
                    image: "https://via.placeholder.com/300x300",
                    isBest: false,
                    liked: false,
                },
                {
                    id: 4,
                    name: "Product 4",
                    seller: "Seller D",
                    price: 39900,
                    image: "https://via.placeholder.com/300x300",
                    isBest: false,
                    liked: false,
                },
                {
                    id: 4,
                    name: "Product 4",
                    seller: "Seller D",
                    price: 39900,
                    image: "https://via.placeholder.com/300x300",
                    isBest: false,
                    liked: false,
                },
                {
                    id: 4,
                    name: "Product 4",
                    seller: "Seller D",
                    price: 39900,
                    image: "https://via.placeholder.com/300x300",
                    isBest: false,
                    liked: false,
                },
                {
                    id: 4,
                    name: "Product 4",
                    seller: "Seller D",
                    price: 39900,
                    image: "https://via.placeholder.com/300x300",
                    isBest: false,
                    liked: false,
                },
            ],
            likeProducts: [
                {
                    id: 1,
                    name: "Product 1",
                    seller: "Seller A",
                    price: 29900,
                    image: "https://via.placeholder.com/300x300",

                    liked: true, // 좋아요 상태 추가
                },
                {
                    id: 2,
                    name: "Product 2",
                    seller: "Seller B",
                    price: 49900,
                    image: "https://via.placeholder.com/300x300",

                    liked: true,
                },
                {
                    id: 3,
                    name: "Product 3",
                    seller: "Seller C",
                    price: 19900,
                    image: "https://via.placeholder.com/300x300",

                    liked: true,
                },
                {
                    id: 4,
                    name: "Product 4",
                    seller: "Seller D",
                    price: 39900,
                    image: "https://via.placeholder.com/300x300",

                    liked: true,
                },
                {
                    id: 4,
                    name: "Product 4",
                    seller: "Seller D",
                    price: 39900,
                    image: "https://via.placeholder.com/300x300",

                    liked: true,
                },
                {
                    id: 4,
                    name: "Product 4",
                    seller: "Seller D",
                    price: 39900,
                    image: "https://via.placeholder.com/300x300",

                    liked: true,
                },
                {
                    id: 4,
                    name: "Product 4",
                    seller: "Seller D",
                    price: 39900,
                    image: "https://via.placeholder.com/300x300",

                    liked: true,
                },
                {
                    id: 4,
                    name: "Product 4",
                    seller: "Seller D",
                    price: 39900,
                    image: "https://via.placeholder.com/300x300",

                    liked: true,
                },
            ],
            nowLike: false, // 현재 좋아요 상품만을 보는지 체크해주는 변수
            likePage: 0, // 좋아요 상품 목록 페이지
            page: 0, // 일반 상품 목록 페이지
            loading: false, // 스피너 표시 여부
        };
    },
    mounted: function () {
        // 일반 상품 조회
        shopApiRequest.getItemList(this.page).then((response) => {
            // data = response.data;

            console.log(response.data);
            this.products = response.data.itemList;
            this.page++;
        });
    },
    methods: {
        toggleLike(product) {
            product.liked = !product.liked; // 좋아요 상태를 토글합니다.
        },
        goToProduct(productId) {
            this.$router.push(`/shop/item/${productId}`);
        },
        goCart() {
            this.$router.push(`/shop/cart`);
        },
        seeLike() {
            this.nowLike = !this.nowLike;
        },
        // 2초 지연 함수 (API 요청 시뮬레이션)
        simulateApiCall() {
            this.loading = true; // API 요청 시작 시 스피너 표시

            // 2초 후 스피너를 숨기고 작업 완료
            setTimeout(() => {
                this.loading = false;
            }, 2000);
        },
    },
    filters: {
        currency(value) {
            return new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW" }).format(value);
        },
    },
    components: {
        spinnerCompo,
    },
};
</script>

<style scoped>
.shop {
    padding-bottom: 68px;
    padding-top: 25px;
}
.product-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    padding: 16px;
}

.product-item {
    border: 1px solid #ddd;
    padding: 0;
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    cursor: pointer;
}

.product-image-container {
    position: relative;
    width: 100%;
    padding-top: 100%; /* 정사각형 비율을 유지하기 위해 */
}

.product-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain; /* 이미지가 꽉 차도록 */
}

.best-icon {
    position: absolute;
    top: 8px;
    left: 8px;
    background-color: #ff4747;
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
}

.heart-icon {
    position: absolute;
    bottom: 8px;
    right: 8px;
    font-size: 20px;
    color: grey;
    cursor: pointer;
    transition: color 0.3s ease; /* 색상 전환 효과 추가 */
}

.heart-icon.liked {
    color: red; /* 좋아요가 활성화되었을 때 하트의 색상을 빨간색으로 변경 */
}

.product-info {
    padding: 16px;
    text-align: left;
}

.product-seller {
    font-size: 12px;
    color: #888;
    margin-bottom: 4px;
}

.product-name {
    font-size: 16px;
    font-weight: bold;
    margin: 4px 0;
}

.product-price {
    font-size: 14px;
    color: #333;
}
.floating-button {
    position: fixed; /* fixed를 사용하여 버튼을 화면에 고정 */
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: white;
    color: white;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.floating-button:hover {
    /* background-color: #0056b3; */
    background-color: #007bff;
}

/* 첫 번째 버튼: bottom-navbar 위에 배치 */
.button1 {
    bottom: 80px; /* bottom-navbar 위에 위치하도록 조정 */
    /* right: 20px; */
}

/* 두 번째 버튼: 첫 번째 버튼 아래에 위치 */
.button2 {
    bottom: 140px; /* 첫 번째 버튼 아래에 위치하도록 조정 */
    /* right: 20px; */
}
.btn {
    float: right;
    margin-right: 60px;
}
</style>
