<template>
    <div class="mypage-container">
        <h1>마이페이지</h1>
        <div class="top">
            <div class="user-profile">
                <img :src="computedProfilePictureUrl" alt="Profile" />
                <div class="info">
                    <p>{{ memberInfo.nickname }} 님</p>
                    <button @click="editProfile" class="edit-button">편집</button>
                </div>
            </div>
            <div class="my-point">
                <p>보유 포인트</p>
                <p class="point-value">{{ memberInfo.point }}P</p>
                <button class="history-button">내역보기</button>
            </div>
        </div>
        <div class="middle">
            <div id="title">
                <p>우리 멍멍이들</p>
                <button class="add-button">추가</button>
            </div>
            <div class="pet-profile">
                <div v-for="pet in pets" :key="pet.petId" class="pet">
                    <img :src="pet.profileImageUrl || defaultPetImageUrl" alt="Pet" />
                    <p>{{ pet.name }}</p>
                </div>
            </div>
        </div>
        <div class="bottom">
            <router-link to="/mypage/orderlist">구매내역</router-link>
            <a href="#">나의 활동</a>
            <a href="#">설정</a>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            memberInfo: {
                nickname: "",
                point: 0,
                profileImageUrl: "",
            },
            pets: [],
            defaultPetImageUrl: "path-to-default-pet-image",
        };
    },
    computed: {
        computedProfilePictureUrl() {
            return this.memberInfo.profileImageUrl || require("@/assets/login/AccountProfile.png");
        },
    },
    mounted() {
        this.loadMyPageInfo();
    },
    methods: {
        async loadMyPageInfo() {
            try {
                const response = await axios.get("http://localhost:8080/api/mypage"); // 올바른 경로로 요청
                this.memberInfo = response.data.memberInfo;
                this.pets = response.data.pets;
            } catch (error) {
                console.error("마이페이지 정보 로드 실패:", error);
            }
        },
        editProfile() {
            // 프로필 편집 로직을 추가하세요.
        },
    },
};
</script>
<style scoped>
.mypage-container {
    width: 100%;
    max-width: 580px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
}
h1 {
    text-align: center;
    font-size: 24px;
    margin-bottom: 20px;
}
.top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    width: 100%;
}
.user-profile {
    text-align: center;
    display: flex;
    align-items: center;
    background-color: #ffffff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 65%;
    height: 100%;
}
.user-profile img {
    min-width: 60px;
    height: auto;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 10px;
    width: 50%;
}
.user-profile p {
    margin: 0;
    font-size: 16px;
    font-weight: bold;
}
.edit-button {
    background-color: #eee;
    border: none;
    padding: 5px 10px;
    border-radius: 20px;
    cursor: pointer;
}
.my-point {
    text-align: center;
    background-color: #fff4e6;
    padding: 10px;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 30%;
    height: 100%;
}
.my-point p {
    margin: 0;
    font-size: 14px;
}
.point-value {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 5px;
}
.history-button {
    background-color: #ffaa00;
    border: none;
    padding: 5px 10px;
    border-radius: 20px;
    color: white;
    cursor: pointer;
}
.middle {
    background-color: #ffffff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
}
#title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
}
.add-button {
    background-color: #eee;
    border: none;
    padding: 5px 10px;
    border-radius: 20px;
    cursor: pointer;
}
.pet-profile {
    display: flex;
    justify-content: space-around;
    text-align: center;
}
.pet {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.pet img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #eee;
    margin-bottom: 5px;
}
.bottom {
    background-color: #ffffff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.bottom a {
    display: block;
    text-decoration: none;
    color: black;
    padding: 15px 0;
    border-bottom: 1px solid #ddd;
}
.bottom a:last-child {
    border-bottom: none;
}
</style>
