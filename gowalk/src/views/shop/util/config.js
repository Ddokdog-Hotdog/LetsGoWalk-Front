export const baseURL = process.env.VUE_APP_BASE_URL;
export const token =
    "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkZjRlYzg1YzQ1NzM0YjFlYmFjNDIyZDM2MWQwMjBlNSIsInJvbGUiOiJST0xFX1VTRVIiLCJtZW1iZXJJZCI6IjEiLCJpYXQiOjE3MjUxNjAxODAsImV4cCI6MTcyNjk2MDE4MH0.saLC5NQGZCNhaO0fyPsHGte5xxky0-Mt46IbdrjgzA384uW0ziLSy6UynCKUDO2okBQ3tEn7K2DuQhAuGVlNCQ";

const apiShopProductsURL = "/api/shop/products";
const apiShopOrderItemURL = "/api/shop/orderitem";
const apiShopCartsURL = "/api/shop/carts";
const apiShopPaymentsURL = "/api/shop/payments";
const apiShopAdminOrderURL = "/api/admin/order";

const getShopProductsURL = function (url) {
    return apiShopProductsURL + url;
};

const getShopOrderItemURL = function (url) {
    return apiShopOrderItemURL + url;
};

const getShopCartsURL = function (url) {
    return apiShopCartsURL + url;
};

const getShopPaymentURL = function (url) {
    return apiShopPaymentsURL + url;
};

const getShopAdminOrderURL = function (url) {
    return apiShopAdminOrderURL + url;
};

export const shopURL = {
    // 인기 상품 조회
    getBestItemList: getShopProductsURL("/best"),

    // 일반 상품 조회
    getItemList: getShopProductsURL(""),

    // 찜 상품 목록 조회
    getLikesItemList: getShopProductsURL("/like"),

    // 찜 누르기 및 해제
    like: getShopProductsURL("/like/register"),

    // 상품 상세 페이지
    getItemDetail: getShopProductsURL("/detail"),

    // 장바구니 목록 보기
    getCartItemList: getShopCartsURL(""),

    // 장바구니 담기
    insertCart: getShopCartsURL("/register"),

    // 장바구니 수정 (수량)
    updateCart: getShopCartsURL("/update"),

    // 장바구니 제거
    deleteCart: getShopCartsURL("/delete"),

    // 결제
    mobilePayment: getShopPaymentURL("/ready/mobile/redirect"),
    pcPayment: getShopPaymentURL("/ready/pc/redirect"),

    // 환불
    refund: getShopPaymentURL("/refund"),

    // 멤버별 주문 상품 조회
    getOrderList: getShopOrderItemURL(""),

    // admin 월별 통계
    getOrderListByMonthAdmin: getShopAdminOrderURL("/month"),

    // admin 주문건별 멤버 정보 및 상품 정보
    getOrderListAdmin: getShopAdminOrderURL(""),
};
