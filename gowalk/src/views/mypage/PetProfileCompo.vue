<template>
    <div class="dog-view-container">
        <header class="header">
            <button class="back-button" @click="$router.go(-1)">〈</button>
            <h3>강아지 정보</h3>
            <button class="update-button" @click="$router.go(-1)">수정하기</button>
        </header>

        <div class="profile-picture-wrapper">
            <img :src="computedProfilePictureUrl" alt="Dog Picture" class="profile-picture" />
        </div>

        <div class="info-group">
            <div class="info-row">
                <label>이름</label>
                <span>{{ name }}</span>
            </div>
            <div class="info-row">
                <label>견종</label>
                <span>{{ selectedBreedName }}</span>
            </div>
            <div class="info-row">
                <label>생년월일</label>
                <span>{{ dateOfBirth }}</span>
            </div>
            <div class="info-row">
                <label>성별</label>
                <span>{{ displayGender }}</span>
            </div>
            <div class="info-row">
                <label>중성화</label>
                <span>{{ neuteringText }}</span>
            </div>
            <div class="info-row">
                <label>몸무게</label>
                <span>{{ weight }} kg</span>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "@/axios";

export default {
    data() {
        return {
            petId: "", // 강아지 ID
            breeds: [],
            selectedBreedName: "",
            name: "",
            breedId: "",
            dateOfBirth: "",
            gender: "",
            weight: "",
            neutering: null,
            profilePictureUrl: "",
            neuteringText: "",
        };
    },
    computed: {
        computedProfilePictureUrl() {
            return this.profilePictureUrl && this.profilePictureUrl !== ""
                ? this.profilePictureUrl
                : require("@/assets/login/dog-profile.png");
        },
        displayGender() {
            if (this.gender === "Male") {
                return "남아";
            } else if (this.gender === "Female") {
                return "여아";
            } else {
                return "정보 없음"; // 성별 정보가 없을 경우
            }
        },
    },

    created() {
        this.petId = this.$route.params.petId;
        this.fetchDogInfo();
    },
    methods: {
        fetchDogInfo() {
            axios
                .get(`/api/mypage/pets/profile/${this.petId}`)
                .then((response) => {
                    const { name, breedId, dateOfBirth, gender, weight, neutering, profileImageUrl } = response.data;
                    this.name = name;
                    this.breedId = breedId;
                    this.dateOfBirth = dateOfBirth;
                    this.gender = gender;
                    this.weight = weight;
                    this.neutering = neutering;
                    this.profilePictureUrl = profileImageUrl;
                    this.neuteringText = neutering ? "수술 완료" : "미수술";
                    // 견종 이름 가져오기
                    this.fetchBreedName();
                })
                .catch((error) => {
                    console.error("강아지 정보 로드 실패:", error);
                });
        },
        fetchBreedName() {
            axios
                .get(`/api/mypage/pets/breeds/${this.breedId}`)
                .then((response) => {
                    this.selectedBreedName = response.data.name;
                })
                .catch((error) => {
                    console.error("견종 정보 로드 실패:", error);
                });
        },
    },
};
</script>

<style scoped>
.dog-view-container {
    padding: 20px;
    max-width: 600px;
    margin: 0 auto;
    background-color: #fff;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}
.header h3 {
    padding-left: 60px;
}

.update-button {
    color: #929292;
}
.profile-picture-wrapper {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
}

.profile-picture {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
}

.info-group {
    margin: 20px auto;
    width: 90%;
}

.info-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    padding: 10px 0;
}

label {
    font-weight: bold;
}

span {
    font-size: 16px;
}
</style>
