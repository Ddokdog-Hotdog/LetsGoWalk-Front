// import shopAxios from "@/views/shop/util/shopAxios";
import { shopURL } from "@/views/shop/util/config";
import axios from "@/axios";

const handleApiError = (error, errorMessage) => {
    console.error(`${errorMessage}:`, error);
    throw error;
};

// 인기 상품 조회
export const getBestItemList = async () => {
    try {
        return axios.get(shopURL.getBestItemList);
    } catch (error) {
        handleApiError(error, "인기 상품 조회 중 오류 발생");
    }
};

// 쇼핑몰 일반 상품 조회
export const getItemList = async (page) => {
    try {
        return axios.get(shopURL.getItemList + `?page=${page}`);
    } catch (error) {
        handleApiError(error, "일반 상품 조회 중 오류 발생");
    }
};

// 찜 상품 목록 조회
export const getLikesItemList = async (page) => {
    try {
        return axios.get(shopURL.getLikesItemList + `?page=${page}`);
    } catch (error) {
        handleApiError(error, "찜 상품 조회 중 오류 발생");
    }
};

// 찜 누르기
export const insertItemLike = async (object) => {
    try {
        return axios.post(shopURL.like + `?productId=${object}`);
    } catch (error) {
        handleApiError(error, "찜 누르기 중 오류 발생");
    }
};

// 찜 해제
export const deleteItemLike = async (object) => {
    try {
        return axios.delete(shopURL.like + `?productId=${object}`);
    } catch (error) {
        handleApiError(error, "찜 해제 중 오류 발생");
    }
};

// 상품 상세 페이지
export const getItemDetail = async (object) => {
    try {
        return axios.get(shopURL.getItemDetail + `?productId=${object}`);
    } catch (error) {
        handleApiError(error, "상품 상세페이지 조회 중 오류 발생");
    }
};

// 장바구니 목록 보기
export const getCartItemList = async () => {
    try {
        return axios.get(shopURL.getCartItemList);
    } catch (error) {
        handleApiError(error, "장바구니 목록 조회 중 오류 발생");
    }
};

// 장바구니 담기
export const insertCart = async (object) => {
    try {
        return axios.post(shopURL.insertCart, object);
    } catch (error) {
        handleApiError(error, "장바구니 담기 중 오류 발생");
    }
};

// 장바구니 수정 (수량)
export const updateCart = async (object) => {
    try {
        return axios.put(shopURL.updateCart, object);
    } catch (error) {
        handleApiError(error, "장바구니 수정 중 오류 발생");
    }
};

// 장바구니 제거
export const deleteCart = async (object) => {
    try {
        return axios.delete(shopURL.deleteCart, { data: object });
    } catch (error) {
        handleApiError(error, "장바구니 삭제 중 오류 발생");
    }
};

// 결제
export const mobilePayment = async (object) => {
    try {
        return axios.post(shopURL.mobilePayment, object);
    } catch (error) {
        handleApiError(error, "모바일 결제 중 오류 발생");
    }
};

export const pcPayment = async (object) => {
    try {
        return axios.post(shopURL.pcPayment, object);
    } catch (error) {
        handleApiError(error, "pc 결제 중 오류 발생");
    }
};

// 환불
export const refund = async (object) => {
    try {
        return axios.post(shopURL.refund, object);
    } catch (error) {
        handleApiError(error, "환불 중 오류 발생");
    }
};

// 멤버별 주문 상품 조회
export const getOrderList = async (page) => {
    try {
        return axios.get(shopURL.getOrderList + `?page=${page}`);
    } catch (error) {
        handleApiError(error, "멤버별 주문 상품 조회 중 오류 발생");
    }
};

// admin 월별 통계
export const getOrderListByMonthAdmin = async () => {
    try {
        return axios.get(shopURL.getOrderListByMonthAdmin);
    } catch (error) {
        handleApiError(error, "admin 월별 통계 조회 중 오류 발생");
    }
};

// admin 주문건별 멤버 정보 및 상품 정보
export const getOrderListAdmin = async (page) => {
    try {
        return axios.get(shopURL.getOrderListAdmin + `?page=${page}`);
    } catch (error) {
        handleApiError(error, "admin 주문건별 멤버 정보 및 상품 정보 조회 중 오류 발생");
    }
};

export const shopApiRequest = {
    // 인기 상품 조회 => 완료
    getBestItemList: getBestItemList,

    // 일반 상품 조회 => 완료
    getItemList: getItemList,

    // 찜 상품 목록 조회 => 완료
    getLikesItemList: getLikesItemList,

    // 찜 누르기 => 완료
    insertItemLike: insertItemLike,

    // 찜 해제 => 완료
    deleteItemLike: deleteItemLike,

    // 상품 상세 페이지 => 완료
    getItemDetail: getItemDetail,

    // 장바구니 목록 보기 => 완료
    getCartItemList: getCartItemList,

    // 장바구니 담기 => 완료
    insertCart: insertCart,

    // 장바구니 수정 (수량) => 완료
    updateCart: updateCart,

    // 장바구니 제거 => 완료
    deleteCart: deleteCart,

    // 결제 => 완료
    mobilePayment: mobilePayment,
    pcPayment: pcPayment,

    // 환불 => mypage
    refund: refund,

    // 멤버별 주문 상품 조회 => mypage
    getOrderList: getOrderList,

    // admin 월별 통계 => adminPage
    getOrderListByMonthAdmin: getOrderListByMonthAdmin,

    // admin 주문건별 멤버 정보 및 상품 정보 => adminPage
    getOrderListAdmin: getOrderListAdmin,
};
