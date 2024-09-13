<template>
    <div class="mypage-container">
        <h1>마이페이지</h1>
        <div class="top">
            <div class="user-profile">
                <img :src="computedProfilePictureUrl" alt="Profile" />
                <div class="infomation">
                    <p>{{ memberInfo.nickname }} 님</p>
                    <button @click="goToProfile" class="edit-button">편집</button>
                </div>
            </div>
            <div class="my-point">
                <img src="@/assets/quest/point.png" id="point" />
                <p>보유 포인트</p>
                <p class="point-value">{{ memberInfo.point }}P</p>
                <button class="history-button">내역보기</button>
            </div>
        </div>
        <div class="middle">
            <div id="title">
                <p>우리 멍멍이들</p>
                <button @click="goToAddDog" class="add-button">추가</button>
            </div>
            <div class="pet-profile">
                <div v-if="pets && pets.length > 0">
                    <div v-for="pet in pets" :key="pet.petId" class="pet">
                        <img :src="pet.profileImageUrl || defaultPetImageUrl" alt="Pet" />
                        <p>{{ pet.name }}</p>
                    </div>
                </div>
                <div v-else>
                    <p>등록한 멍멍이가 없어요 !</p>
                </div>
            </div>
        </div>
        <div class="bottom">
            <a href="#">구매내역</a>
            <a href="#">나의 활동</a>
            <a href="#">설정</a>
        </div>
    </div>
</template>

<script>
import axios from "@/axios";

export default {
    data() {
        return {
            memberInfo: {
                nickname: "",
                point: 0,
                profileImageUrl: "",
            },
            pets: [],
            defaultPetImageUrl: require("@/assets/login/dog-profile.png"),
        };
    },
    computed: {
        computedProfilePictureUrl() {
            return this.memberInfo.profileImageUrl || require("@/assets/login/AccountProfile.png");
        },
    },
    mounted() {
        console.log("Component mounted");
        this.loadMyPageInfo();
    },
    methods: {
        async loadMyPageInfo() {
            try {
                const response = await axios.get("/api/mypage", {
                    headers: {
                        Authorization: `Bearer ${this.$store.getters.getAccessToken}`,
                    },
                });
                console.log("Response headers:", response.config.headers); // 헤더 로그 출력
                this.memberInfo = response.data.memberInfo;
                this.pets = response.data.pets;
            } catch (error) {
                console.error("마이페이지 정보 로드 실패:", error);
            }
        },

        goToProfile() {
            this.$router.push("/mypage/profile"); // /profile 경로로 이동
        },

        goToAddDog() {
            this.$router.push("/mypage/addDog"); // /profile 경로로 이동
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
    height: 100%;
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
    height: 25%;
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
.infomation {
    width: 50%;
}
.user-profile p {
    margin-bottom: 10px;
    font-size: 100%;
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
    border-radius: 10px;
    padding: 20px 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 33%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
}
#point {
    width: 30px;
    margin: 0 auto;
}
.my-point p {
    margin: 0;
    font-size: 80%;
    font-weight: bold;
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
    font-size: 70%;
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
