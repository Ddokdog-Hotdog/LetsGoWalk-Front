<template>
    <div>
        <div class="product-detail">
            <backButtonCompo />
            <!-- 상품 상세 이미지 -->
            <div class="product-image-container">
                <img :src="data.THUMBNAILIMAGE" alt="Product Image" class="product-image" />
            </div>

            <!-- 상품 정보 -->
            <div class="product-info">
                <p class="product-seller">{{ data.VENDOR }}</p>
                <h1 class="product-name">{{ data.NAME }}</h1>
                <p class="product-price">{{ data.PRICE | currency }}</p>
            </div>

            <!-- 구분선 -->
            <hr />

            <!-- 상품 상세 정보 -->
            <div class="detail-info">
                <h2 class="info-title">상품정보</h2>
                <img :src="data.DETAILIMAGE" alt="Detail Image" class="detail-image" />
            </div>

            <hr />
            <!-- 좋아요와 구매하기 버튼 -->
            <div class="action-buttons">
                <button class="like-button" @click="toggleLike">
                    <img
                        :src="
                            data.liked
                                ? require('@/assets/icon/heart-active-icon.png')
                                : require('@/assets/icon/heart-icon.png')
                        "
                        alt="Like Icon"
                    />
                </button>
                <button class="buy-button" @click="openModal">
                    구매하기
                    <!-- <img :src="require('@/assets/icon/buy-icon-button.png')" alt="Buy Icon" /> -->
                </button>
            </div>
        </div>

        <shopModalCompo
            ref="shopModal"
            :PRODUCTID="data.PRODUCTID"
            :NAME="data.NAME"
            :VENDOR="data.VENDOR"
            :PRICE="data.PRICE"
            :THUMBNAILIMAGE="data.THUMBNAILIMAGE"
        >
            <!-- 모달에 들어갈 내용 -->
        </shopModalCompo>

        <!-- <confirmModalCompo ref="confirmModal" :message="`정말로 구매하시겠습니까?`"></confirmModalCompo> -->
    </div>
</template>

<script>
import shopModalCompo from "@/views/shop/ShopModalCompo.vue";
import backButtonCompo from "@/components/layout/BackCompo.vue";
import { shopApiRequest } from "@/views/shop/util/shopApi";

export default {
    props: {
        // 여기에 상품id값이 들어감
        id: String,
    },
    data() {
        return {
            data: {
                id: 4,
                name: "Product 4",
                seller: "Seller D",
                price: 39900,
                image: "https://via.placeholder.com/300x300",
                isBest: false,
                liked: false,
                detailImage: "https://via.placeholder.com/300x300",
            },
            isModalVisible: false,
        };
    },
    components: {
        shopModalCompo,
        backButtonCompo,
        // confirmModalCompo,
    },
    methods: {
        toggleLike() {
            this.data.liked = !this.data.liked;
        },
        openModal() {
            // this.isModalVisible = true;
            this.$refs.shopModal.openModal(); // shopModal 열기
        },
    },
    filters: {
        currency(value) {
            return new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW" }).format(value);
        },
    },
    mounted: function () {
        // 상품 상세페이지
        shopApiRequest.getItemDetail(this.id).then((response) => {
            console.log(response.data);
            this.data = response.data.itemDetail;
        });
    },
};
</script>

<style scoped>
.product-detail {
    padding: 16px;
    padding-bottom: 100px;
    padding-top: 30px;
}

.product-image-container {
    width: 100%;
    height: 500px;
    overflow: hidden;
    position: relative;
    padding-top: 10px;
}

.product-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.product-info {
    margin: 16px 0;
    text-align: left; /* 왼쪽 정렬 */
}

.product-seller,
.product-name,
.product-price {
    margin: 8px 0;
}

.product-name {
    font-size: 24px;
    font-weight: bold;
}

.product-price {
    font-size: 18px;
    color: #333;
}

.detail-info {
    margin: 16px 0;
    text-align: left; /* 왼쪽 정렬 */
}

.info-title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 8px;
}

.detail-image {
    width: 100%;
    height: 500px;
    object-fit: contain;
}

.action-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
}

.like-button,
.buy-button {
    border: none;
    cursor: pointer;
}

.like-button {
    width: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
    /* border-right: 1px solid gray; */
}

.buy-button {
    width: 70%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    background-color: black;
    border-radius: 50px;
    min-height: 50px;
}

.buy-button > img {
    max-width: 250px;
}
</style>
