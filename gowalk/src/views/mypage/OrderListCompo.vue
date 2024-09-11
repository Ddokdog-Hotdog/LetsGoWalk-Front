<template>
    <div class="order-list" ref="scrollcheck">
        <backButtonCompo class="back-compo"/>
        <div v-for="(item, index) in purchaseList" :key="index" class="purchase-item">
        <!-- 구매 물품 내용 -->
        <div class="item-wrapper">
            <div class="item-details">
                <img class="item-image" :src="item.PRODUCTTHUMBNAIL" alt="상품 이미지" />
                <div class="item-info">
                
                <p class="seller-name">{{ item.VENDORNAME }}</p>
                <p class="product-name">{{ item.PRODUCTNAME }} / {{ item.QUANTITY }}개</p>
                <p class="price">{{ item.TOTALPRICE | currency }}</p>
                </div>
            </div>    
            <p class="order-date">{{ item.ORDERDATE | day }}</p> <!-- 날짜를 별도 태그로 감쌈 -->
        </div>
        <!-- 환불하기 버튼 -->
        <button class="refund-button" v-if="item.ISREFUNDED === 'N' ? true : false" @click="showConfirmModal(item)">환불 하기</button>
        <button class="refund-complete-button" v-if="item.ISREFUNDED === 'Y' ? true : false">환불 완료</button>
        </div>

        <confirmModalCompo
            :isVisible="isConfirmModalVisible"
            @close="isConfirmModalVisible = false"
            @confirm="handleRefundConfirmation"
            :message="refundMessage">

        </confirmModalCompo>
  </div>
  </template>
  
  <script>
  import confirmModalCompo from "@/components/layout/ConfirmModalCompo.vue";
  import backButtonCompo from "@/components/layout/BackCompo.vue";
  import { shopApiRequest } from "@/views/shop/util/shopApi";

  export default {
    data() {
      return {
        // 예시 구매 목록 데이터
        purchaseList: [],
        isConfirmModalVisible: false, // 모달 표시 여부
        nowRefund: {},
        isContentsExist: true, // 일반 구매 목록 페이징 값이 존재하는지
        debounceTimeout: null,
        page: 1
      };
    },
    mounted: async function() {
        await shopApiRequest.getOrderList(this.page).then((response) => {
            console.log(response.data);
            if(response.data.length >= 1){
                this.page++;
                this.purchaseList = [...response.data];
            }else{
                this.isContentsExist = false;
            }
        }).catch((error) => {
            console.log(error);
        });

        window.addEventListener("scroll", this.debouncedOnScroll); // 스크롤 이벤트 추가
    },
    beforeDestroy() {
        if (this.$refs.scrollcheck && this.debouncedOnScroll) {
            window.removeEventListener("scroll", this.debouncedOnScroll);
        }
    },
    components: {
        confirmModalCompo,
        backButtonCompo,
    },
    methods: {
        debouncedOnScroll() {
            if (this.debounceTimeout) {
                clearTimeout(this.debounceTimeout);
            }
            this.debounceTimeout = setTimeout(() => {
                this.onScroll();
            }, 1000); // 1초 지연
        },
        async onScroll() {
            const container = this.$refs.scrollcheck;
            if (!container) return;
            if (!this.$refs.scrollcheck.scrollHeight) return;

            if (this.$refs.scrollcheck.scrollHeight - (window.innerHeight + window.scrollY) < 1000) {
                console.log("무한 스크롤 이벤트 발생");
                if (this.isContentsExist) {
                    await shopApiRequest
                        .getOrderList(this.page)
                        .then((response) => {
                            console.log(response.data);
                            console.log("반환받은 값 길이 : ", response.data.length);
                            if (response.data.length > 1) {
                                // 반환 받는 게 있는 경우
                                this.page++;
                                this.purchaseList = [...this.purchaseList, ...response.data];
                            } else {
                                // 더이상 서버에 요청하지 않기 위한 장치
                                this.isContentsExist = !this.isContentsExist;
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                } 
            }
        },
        showConfirmModal(product) {
            console.log("환불하기");
            this.nowRefund = product;
            this.isConfirmModalVisible = true; // 모달 표시
        },
        handleRefundConfirmation(confirmed) {
            if (confirmed) {
                // 사용자가 구매를 확정했을 때 실행할 로직
                this.proceedWithRefund();
            }
        },
        proceedWithRefund(){
            console.log("환불 시작");
            console.log("환불 내용 : ", this.nowRefund);

            shopApiRequest.refund({orderItemId: this.nowRefund.ORDERITEMID}).then((response) => {
                console.log(response.data);
                this.nowRefund.ISREFUNDED = 'Y';
            }).catch((error) => {
                console.log(error);
            })
        }
    },
    filters: {
        currency(value) {
            return new Intl.NumberFormat("ko-KR", {
                style: "currency",
                currency: "KRW",
            }).format(value);
        },
        day(value) {
            const date = new Date(value);
            const year = String(date.getFullYear()).slice(2); // 연도 뒤 두 자리
            const month = String(date.getMonth() + 1).padStart(2, '0'); // 월 (1~12)
            const day = String(date.getDate()).padStart(2, '0'); // 일
            const hours = String(date.getHours()).padStart(2, '0'); // 시
            const minutes = String(date.getMinutes()).padStart(2, '0'); // 분
            const seconds = String(date.getSeconds()).padStart(2, '0'); // 초
            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        }
    },
    computed: {
        refundMessage() {
            return this.nowRefund.PRODUCTNAME 
                ? `"${this.nowRefund.PRODUCTNAME} / ${this.nowRefund.QUANTITY}개"를 정말로 환불하시겠습니까?`
                : '정말로 환불하시겠습니까?'; // 상품명이 없을 경우의 기본 메시지
        }
    },
  };
  </script>
  
  <style scoped>
  .back-compo{
    padding-left: 10px;
    margin-bottom: 10px;
  }
  .order-list {
    padding-top:30px;
    padding-bottom:100px;
  }
  .purchase-item {
    background-color: white;
    width: 100%;
    padding: 20px;
    margin-bottom: 10px;
    border-radius: 10px;
  }
  .item-wrapper {
    display: flex;
    justify-content: space-between; /* item-details와 order-date를 양 끝으로 배치 */
    align-items: center; /* 수직 가운데 정렬 */
    }
  .item-details {
    display: flex;
    margin-bottom: 10px;
  }
  
  .item-image {
    width: 80px;
    height: 80px;
    object-fit: cover;
    margin-right: 10px;
  }
  
  .item-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: left; /* 왼쪽 정렬 */
  }
  .order-date {
    /* position: absolute; */
    white-space: nowrap; /* 줄바꿈 방지 */
    font-size: 9px;
    color: gray;
    align-items: top;
    margin-bottom: 80px;
    }
  .seller-name {
    color: gray;
    font-size: 10px;
    margin-bottom:0;
    white-space: nowrap; /* 줄바꿈 방지 */
    }

    .product-name {
    margin: 0;
    font-size: 13px;
    /*white-space: nowrap;  줄바꿈 방지 */
    }

    .price {
    font-size: 18px;
    font-weight: bold;
    margin: 0;
    white-space: nowrap; /* 줄바꿈 방지 */
    }
  
  .refund-button {
    width: 100%;
    padding: 8px;
    background-color: white;
    border: 1px solid red;
    color: red;
    text-align: center;
    border-radius: 5px;
    cursor: pointer;
  }

  .refund-complete-button {
    width: 100%;
    padding: 8px;
    background-color: #white;
    border: 1px solid #838383;
    color: #838383;
    text-align: center;
    border-radius: 5px;
  }
  </style>
  