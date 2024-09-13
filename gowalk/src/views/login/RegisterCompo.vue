<template>
    <div class="profile-edit-container">
        <h3>회원 정보 입력</h3>

        <div class="profile-picture-wrapper">
            <img :src="computedProfilePictureUrl" alt="Profile Picture" class="profile-picture" />
            <label class="upload-icon">
                <input type="file" @change="onFileChange" />
            </label>
        </div>

        <div class="form-group name-group">
            <input
                v-model="nickname"
                type="text"
                id="nickname"
                placeholder="닉네임"
                required
                @input="checkNicknameAvailability"
            />
            <p v-if="nicknameTaken" class="error-message">*이미 사용중인 닉네임 입니다</p>
        </div>

        <form @submit.prevent="submitAdditionalInfo">
            <div class="form-group">
                <label for="email">이메일</label>
                <input v-model="email" type="email" id="email" disabled />
            </div>

            <div class="form-group">
                <label for="dateOfBirth">생년월일</label>
                <input v-model="dateOfBirth" type="date" id="dateOfBirth" required />
            </div>

            <div class="form-group gender-group">
                <label>성별</label>
                <div class="gender-buttons">
                    <button type="button" :class="{ selected: gender === 'f' }" @click="gender = 'f'">여성</button>
                    <button type="button" :class="{ selected: gender === 'm' }" @click="gender = 'm'">남성</button>
                </div>
            </div>

            <div class="form-group">
                <label for="phoneNumber">전화번호</label>
                <input v-model="phoneNumber" type="tel" id="phoneNumber" placeholder="010-1234-1234" required />
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
            profilePictureUrl: "",
            nickname: "",
            email: "",
            dateOfBirth: "",
            gender: "",
            phoneNumber: "",
            profilePictureFile: null,
            nicknameTaken: false,
            currentNickname: "",
            phoneNumberError: false,
        };
    },
    computed: {
        computedProfilePictureUrl() {
            return this.profilePictureUrl && this.profilePictureUrl !== ""
                ? this.profilePictureUrl
                : require("@/assets/login/AccountProfile.png");
        },
    },

    mounted() {
        this.loadUserInfo();
    },
    methods: {
        async loadUserInfo() {
            try {
                const response = await axios.get("/api/register", {
                    headers: {
                        Authorization: `Bearer ${this.$store.getters.getAccessToken}`,
                    },
                });
                console.log("서버 응답 데이터:", response.data);

                this.profilePictureUrl = response.data.profileImageUrl || "";
                console.log("Profile Picture URL:", this.profilePictureUrl);

                this.nickname = response.data.nickname;
                this.currentNickname = response.data.nickname;
                this.email = response.data.email;
                this.dateOfBirth = response.data.dateOfBirth ? response.data.dateOfBirth.split("T")[0] : "";
                this.gender = response.data.gender || "";
                this.phoneNumber = response.data.phoneNumber || "";
            } catch (error) {
                console.error("유저 정보 로드 실패:", error);
            }
        },
        validatePhoneNumber() {
            const phoneRegex = /^010-\d{3,4}-\d{4}$/; // 전화번호 형식: 010-0000-0000 또는 010-000-0000
            this.phoneNumberError = !phoneRegex.test(this.phoneNumber);
        },
        onFileChange(event) {
            this.profilePictureFile = event.target.files[0];
            if (this.profilePictureFile) {
                this.profilePictureUrl = URL.createObjectURL(this.profilePictureFile);
            }
        },
        async checkNicknameAvailability() {
            if (this.nickname === "" || this.nickname === this.currentNickname) {
                this.nicknameTaken = false;
                return;
            }

            try {
                const response = await axios.get("/api/check-nickname", {
                    params: { nickname: this.nickname },
                });
                this.nicknameTaken = response.data;
            } catch (error) {
                console.error("닉네임 중복 확인 실패:", error);
            }
        },
        async submitAdditionalInfo() {
            if (this.nicknameTaken) {
                alert("이미 사용 중인 닉네임입니다. 다른 닉네임을 선택해주세요.");
                return;
            }
            if (this.phoneNumberError) {
                alert("전화번호 형식이 올바르지 않습니다. 예: 010-0000-0000");
                return;
            }

            try {
                const formData = new FormData();
                const memberUpdateDTO = {
                    nickname: this.nickname,
                    dateOfBirth: this.dateOfBirth,
                    gender: this.gender,
                    phoneNumber: this.phoneNumber,
                };

                //formData.append("memberUpdateDTO", JSON.stringify(memberUpdateDTO));
                formData.append(
                    "memberUpdateDTO",
                    new Blob([JSON.stringify(memberUpdateDTO)], { type: "application/json" })
                );

                if (this.profilePictureFile) {
                    formData.append("profileImage", this.profilePictureFile);
                }

                const response = await axios.put("/api/register", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

                this.profilePictureUrl = response.data.profilePictureUrl;
                this.$router.go(-2);
            } catch (error) {
                if (error.response && error.response.status === 409) {
                    // 닉네임 중복 에러 처리
                    alert(error.response.data); // 사용자에게 오류 메시지 표시
                    this.nicknameTaken = true;
                } else {
                    console.error("프로필 업데이트 실패:", error);
                    alert("프로필 업데이트 중 오류가 발생했습니다. 다시 시도해주세요.");
                }
            }
        },
    },
    watch: {
        phoneNumber() {
            this.validatePhoneNumber(); // 전화번호 변경 시 형식 검증
        },
    },
};
</script>

<style scoped>
.profile-edit-container {
    padding: 20px;
    max-width: 600px;
    margin: 0 auto;
    height: 100%;
    background-color: #fff;
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
    display: flex;
    justify-content: space-around;
}

.name-group {
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.name-group p {
    padding: 10px;
}
.form-group label {
    display: flex;
    margin-bottom: 5px;
    width: 30%;
    text-align: left;
    align-items: center;
}

.form-group input {
    width: 70%;
    padding: 10px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 15px;
    text-align: center;
}
.gender-buttons {
    width: 70%;
    display: flex;
    justify-content: space-around;
}
.gender-buttons button {
    padding: 10px 0;
    width: 48%;

    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #fff;
    cursor: pointer;
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25);
}

.gender-buttons button.selected {
    background-color: #4caf50;
    color: white;
    font-weight: 700;
}

.error-message {
    color: red;
    font-size: 0.9em;
}

#email {
    border: #fff;
}

.submit-button {
    width: 95%;
    max-width: 570px;
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
    bottom: 70px;
    font-weight: 700;
}

.submit-button:hover {
    background-color: #45a049;
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25);
}
</style>
