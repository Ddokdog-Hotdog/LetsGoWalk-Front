<template>
    <div class="profile-edit">
        <h2>내정보수정</h2>

        <div class="profile-picture">
            <img :src="profilePictureUrl" alt="Profile Picture" />
            <input type="file" @change="onFileChange" />
        </div>

        <form @submit.prevent="submitAdditionalInfo">
            <div class="form-group">
                <label for="nickname">닉네임</label>
                <input v-model="nickname" type="text" id="nickname" placeholder="닉네임" required />
                <span v-if="nicknameTaken" class="error-message">*이미 사용중인 닉네임 입니다</span>
            </div>

            <div class="form-group">
                <label for="email">이메일</label>
                <input v-model="email" type="email" id="email" disabled />
            </div>

            <div class="form-group">
                <label for="dateOfBirth">생년월일</label>
                <input v-model="dateOfBirth" type="date" id="dateOfBirth" required />
            </div>

            <div class="form-group gender">
                <label>성별</label>
                <button type="button" :class="{ selected: gender === 'female' }" @click="gender = 'female'">
                    여성
                </button>
                <button type="button" :class="{ selected: gender === 'male' }" @click="gender = 'male'">남성</button>
            </div>

            <div class="form-group">
                <label for="phoneNumber">전화번호</label>
                <input v-model="phoneNumber" type="tel" id="phoneNumber" placeholder="010-0000-0000" required />
            </div>

            <button type="submit" class="submit-button">완료</button>
        </form>
    </div>
</template>

<script>
import axios from "@/axios";

export default {
    data() {
        return {
            profilePictureUrl: "", // 기본 프로필 사진 URL
            nickname: "",
            email: "", // 이메일은 백엔드에서 가져온 후 변경 불가하게
            dateOfBirth: "",
            gender: "",
            phoneNumber: "",
            nicknameTaken: false, // 닉네임 중복 체크 상태
        };
    },
    mounted() {
        // 백엔드에서 사용자 정보 불러오기
        this.loadUserInfo();
    },
    methods: {
        loadUserInfo() {
            axios.get("/register").then((response) => {
                this.profilePictureUrl = response.data.profilePictureUrl;
                this.nickname = response.data.nickname;
                this.email = response.data.email;
                this.dateOfBirth = response.data.dateOfBirth;
                this.gender = response.data.gender;
                this.phoneNumber = response.data.phoneNumber;
            });
        },
        onFileChange(event) {
            const file = event.target.files[0];
            this.uploadProfilePicture(file);
        },
        uploadProfilePicture(file) {
            const formData = new FormData();
            formData.append("file", file);
            axios.post("/api/user/upload-picture", formData).then((response) => {
                this.profilePictureUrl = response.data.profilePictureUrl;
            });
        },
        async submitAdditionalInfo() {
            try {
                await axios.post("/api/user/update-profile", {
                    nickname: this.nickname,
                    dateOfBirth: this.dateOfBirth,
                    gender: this.gender,
                    phoneNumber: this.phoneNumber,
                });
                this.$router.push({ name: "HomePage" });
            } catch (error) {
                if (error.response && error.response.data.error === "NICKNAME_TAKEN") {
                    this.nicknameTaken = true;
                } else {
                    console.error("프로필 업데이트 실패:", error);
                }
            }
        },
    },
};
</script>

<style scoped>
.profile-edit {
    padding: 20px;
}

.profile-picture {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
}

.profile-picture img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
}

.form-group {
    margin-bottom: 15px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
}

.form-group input {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
}

.form-group.gender {
    display: flex;
    justify-content: space-around;
}

.gender button {
    padding: 10px 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f5f5f5;
}

.gender button.selected {
    background-color: #4caf50;
    color: white;
}

.error-message {
    color: red;
    font-size: 0.9em;
}

.submit-button {
    width: 100%;
    padding: 15px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 1em;
    cursor: pointer;
}

.submit-button:hover {
    background-color: #45a049;
}
</style>
