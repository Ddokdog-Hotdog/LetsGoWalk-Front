import shopAxios from "@/views/shop/util/shopAxios";
import { shopURL } from "@/views/shop/util/config";

const handleApiError = (error, errorMessage) => {
    console.error(`${errorMessage}:`, error);
    throw error;
};

// 인기 상품 조회
export const getBestItemList = async () => {
    try {
        return shopAxios.get(shopURL.getBestItemList);
    } catch (error) {
        handleApiError(error, "인기 상품 조회 중 오류 발생");
    }
};

// 쇼핑몰 일반 상품 조회
export const getItemList = async (page) => {
    try {
        return shopAxios.get(shopURL.getItemList + `?page=${page}`);
    } catch (error) {
        handleApiError(error, "일반 상품 조회 중 오류 발생");
    }
};

// 찜 상품 목록 조회
export const getLikesItemList = async (page) => {
    try {
        return shopAxios.get(shopURL.getLikesItemList + `?page=${page}`);
    } catch (error) {
        handleApiError(error, "찜 상품 조회 중 오류 발생");
    }
};

// 찜 누르기
export const insertItemLike = async (object) => {
    try {
        return shopAxios.post(shopURL.insertItemLike + `?productId=${object}`);
    } catch (error) {
        handleApiError(error, "찜 누르기 중 오류 발생");
    }
};

// 찜 해제
export const deleteItemLike = async (object) => {
    try {
        return shopAxios.delete(shopURL.insertItemLike + `?productId=${object}`);
    } catch (error) {
        handleApiError(error, "찜 해제 중 오류 발생");
    }
};

// 상품 상세 페이지
export const getItemDetail = async (object) => {
    try {
        return shopAxios.get(shopURL.getItemDetail + `?productId=${object}`);
    } catch (error) {
        handleApiError(error, "상품 상세페이지 조회 중 오류 발생");
    }
};

// 장바구니 목록 보기
export const getCartItemList = async () => {
    try {
        return shopAxios.get(shopURL.getCartItemList);
    } catch (error) {
        handleApiError(error, "장바구니 목록 조회 중 오류 발생");
    }
};

// 장바구니 담기
export const insertCart = async (object) => {
    try {
        return shopAxios.post(shopURL.insertCart, object);
    } catch (error) {
        handleApiError(error, "장바구니 담기 중 오류 발생");
    }
};

// 장바구니 수정 (수량)
export const updateCart = async (object) => {
    try {
        return shopAxios.put(shopURL.updateCart, object);
    } catch (error) {
        handleApiError(error, "장바구니 수정 중 오류 발생");
    }
};

// 장바구니 제거
export const deleteCart = async (object) => {
    try {
        return shopAxios.delete(shopURL.deleteCart, object);
    } catch (error) {
        handleApiError(error, "장바구니 삭제 중 오류 발생");
    }
};

// 결제
export const mobilePayment = async (object) => {
    try {
        return shopAxios.get(shopURL.mobilePayment, object);
    } catch (error) {
        handleApiError(error, "모바일 결제 중 오류 발생");
    }
};

export const pcPayment = async (object) => {
    try {
        return shopAxios.get(shopURL.pcPayment, object);
    } catch (error) {
        handleApiError(error, "pc 결제 중 오류 발생");
    }
};

// 환불
export const refund = async (object) => {
    try {
        return shopAxios.post(shopURL.refund, object);
    } catch (error) {
        handleApiError(error, "환불 중 오류 발생");
    }
};

// 멤버별 주문 상품 조회
export const getOrderList = async (page) => {
    try {
        return shopAxios.post(shopURL.getOrderList + `?page=${page}`);
    } catch (error) {
        handleApiError(error, "멤버별 주문 상품 조회 중 오류 발생");
    }
};

// admin 월별 통계
export const getOrderListByMonthAdmin = async () => {
    try {
        return shopAxios.get(shopURL.getOrderListByMonthAdmin);
    } catch (error) {
        handleApiError(error, "admin 월별 통계 조회 중 오류 발생");
    }
};

// admin 주문건별 멤버 정보 및 상품 정보
export const getOrderListAdmin = async (page) => {
    try {
        return shopAxios.get(shopURL.getOrderListAdmin + `?page=${page}`);
    } catch (error) {
        handleApiError(error, "admin 주문건별 멤버 정보 및 상품 정보 조회 중 오류 발생");
    }
};

export const shopApiRequest = {
    // 인기 상품 조회
    getBestItemList: getBestItemList,

    // 일반 상품 조회
    getItemList: getItemList,

    // 찜 상품 목록 조회
    getLikesItemList: getLikesItemList,

    // 찜 누르기
    insertItemLike: insertItemLike,

    // 찜 해제
    deleteItemLike: deleteItemLike,

    // 상품 상세 페이지
    getItemDetail: getItemDetail,

    // 장바구니 목록 보기
    getCartItemList: getCartItemList,

    // 장바구니 담기
    insertCart: insertCart,

    // 장바구니 수정 (수량)
    updateCart: updateCart,

    // 장바구니 제거
    deleteCart: deleteCart,

    // 결제
    mobilePayment: mobilePayment,
    pcPayment: pcPayment,

    // 환불
    refund: refund,

    // 멤버별 주문 상품 조회
    getOrderList: getOrderList,

    // admin 월별 통계
    getOrderListByMonthAdmin: getOrderListByMonthAdmin,

    // admin 주문건별 멤버 정보 및 상품 정보
    getOrderListAdmin: getOrderListAdmin,
};
