export const kakaoApiKey = "f8c94299071ba9d6ebf03e7a29358e2f";
export const defaultPosition = [37.5740321, 127.0078127];
export const baseURL = process.env.VUE_APP_BASE_URL;
export const token =
    "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkZjRlYzg1YzQ1NzM0YjFlYmFjNDIyZDM2MWQwMjBlNSIsInJvbGUiOiJST0xFX1VTRVIiLCJtZW1iZXJJZCI6IjEiLCJpYXQiOjE3MjUxNjAxODAsImV4cCI6MTcyNjk2MDE4MH0.saLC5NQGZCNhaO0fyPsHGte5xxky0-Mt46IbdrjgzA384uW0ziLSy6UynCKUDO2okBQ3tEn7K2DuQhAuGVlNCQ";

const apiURL = "/api/walks";

export const walkURL = {
    walkStart: apiURL + "/start",
    getMyPets: "/api/mypage/pets",
    walkUpdate: apiURL + "/update",
    walkEnd: apiURL + "/end",
    walkDaily: apiURL + "/daily",
    walkMonthly: apiURL + "/monthly",
    walkNearby: apiURL + "/nearby",
    walkHotplace: apiURL + "/hotplace",
};
