<template>
    <div class="dog-add-container">
        <header class="header">
            <button class="back-button" @click="$router.go(-1)">←</button>
            <h2>강아지 추가</h2>
            >
        </header>

        <div class="form-group">
            <div class="profile-picture-wrapper">
                <img :src="computedProfilePictureUrl" alt="Dog Picture" class="profile-picture" />
                <label class="upload-icon">
                    <input type="file" @change="onFileChange" />
                </label>
            </div>

            <input v-model="name" type="text" placeholder="멍멍이 이름" required class="dog-name-input" />
        </div>

        <form @submit.prevent="submitDogInfo">
            <div class="form-group">
                <label for="breedId">견종</label>
                <input v-model="breedId" type="text" id="breedId" placeholder="선택해 주세요" required />
            </div>

            <div class="form-group">
                <label for="dateOfBirth">생년월일</label>
                <input v-model="dateOfBirth" type="date" id="dateOfBirth" placeholder="예)20200101" required />
            </div>

            <div class="form-group gender-group">
                <label>성별</label>
                <div class="gender-buttons">
                    <button type="button" :class="{ selected: gender === 'Female' }" @click="gender = 'Female'">
                        여아
                    </button>
                    <button type="button" :class="{ selected: gender === 'Male' }" @click="gender = 'Male'">
                        남아
                    </button>
                </div>
            </div>

            <div class="form-group neutered-group">
                <label>중성화 수술 여부</label>
                <div class="neutered-buttons">
                    <button type="button" :class="{ selected: neutering === true }" @click="neutering = true">O</button>
                    <button type="button" :class="{ selected: neutering === false }" @click="neutering = false">
                        X
                    </button>
                </div>
            </div>

            <div class="form-group">
                <label for="weight">몸무게(kg)</label>
                <input v-model="weight" type="number" id="weight" placeholder="0.0" step="0.1" required />
            </div>

            <button type="submit" class="submit-button">추가하기</button>
        </form>
    </div>
</template>

<script>
import axios from "@/axios";

export default {
    data() {
        return {
            name: "",
            breedId: "",
            dateOfBirth: "",
            gender: "",
            weight: "",
            neutering: null,
            profilePictureUrl: "",
            profilePictureFile: null,
        };
    },
    computed: {
        computedProfilePictureUrl() {
            return this.profilePictureUrl && this.profilePictureUrl !== ""
                ? this.profilePictureUrl
                : require("@/assets/login/dog-profile.png");
        },
    },
    methods: {
        onFileChange(event) {
            this.profilePictureFile = event.target.files[0];
            if (this.profilePictureFile) {
                this.profilePictureUrl = URL.createObjectURL(this.profilePictureFile);
            }
        },

        async submitDogInfo() {
            try {
                const formData = new FormData();
                const dogData = {
                    breedId: this.breedId,
                    name: this.name,
                    dateOfBirth: this.dateOfBirth,
                    gender: this.gender,
                    weight: this.weight,
                    neutering: this.neutering,
                    profileImageUrl: this.profilePictureUrl,
                };

                formData.append(
                    "petCreateRequestDTO",
                    new Blob([JSON.stringify(dogData)], { type: "application/json" })
                );

                if (this.profilePictureFile) {
                    formData.append("profileImage", this.profilePictureFile);
                }

                await axios.post("/api/mypage/pets", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

                this.$router.go(-1); // Navigate back after successful submission
            } catch (error) {
                console.error("강아지 추가 실패:", error);
                alert("강아지 추가 중 오류가 발생했습니다. 다시 시도해주세요.");
            }
        },
    },
};
</script>

<style scoped>
.dog-add-container {
    padding: 20px;
    max-width: 600px;
    margin: 0 auto;
    height: 100%;
    background-color: #fff;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
}

.back-button {
    background: none;
    border: none;
    font-size: 1.5em;
    cursor: pointer;
}

.icons {
    display: flex;
    gap: 10px;
}

.icon {
    width: 24px;
    height: 24px;
    cursor: pointer;
}

.profile-picture-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    position: relative;
}

.profile-picture {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
}

.upload-icon {
    position: absolute;
    bottom: 0;
    width: 30px;
    margin-left: 50px;
    height: 30px;
    background-image: url("@/assets/login/ImageChange.png");
    background-size: cover;
    background-position: center;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.upload-icon input[type="file"] {
    opacity: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    cursor: pointer;
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
    text-align: left;
}

.form-group input {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 15px;
    text-align: center;
}

.gender-buttons,
.neutered-buttons {
    display: flex;
    justify-content: space-around;
}

.gender-buttons button,
.neutered-buttons button {
    padding: 10px 0;
    width: 48%;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #fff;
    cursor: pointer;
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25);
}

.gender-buttons button.selected,
.neutered-buttons button.selected {
    background-color: #4caf50;
    color: white;
    font-weight: 700;
}

.submit-button {
    width: 100%;
    padding: 15px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 50px;
    font-size: 1em;
    cursor: pointer;
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    bottom: 20px;
    font-weight: 700;
}

.submit-button:hover {
    background-color: #45a049;
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25);
}
</style>
