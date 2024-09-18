<template>
    <div class="dog-add-container">
        <header class="header">
            <button class="back-button" @click="$router.go(-1)">〈</button>
            <h3>강아지 정보 수정</h3>
            <p></p>
        </header>

        <div class="name-group">
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
                <input
                    v-model="selectedBreedName"
                    type="text"
                    id="breedId"
                    placeholder="선택해 주세요"
                    readonly
                    @click="openBreedModal"
                />
            </div>
            <div v-if="showBreedModal" class="modal">
                <div class="modal-content">
                    <div class="modal-top">
                        <span class="close" @click="closeBreedModal">&times;</span>
                        <h2>견종 선택</h2>
                        <input v-model="breedSearch" type="text" placeholder="견종 검색" class="breed-search-input" />
                    </div>
                    <div class="modal-list">
                        <ul>
                            <li v-for="breed in filteredBreeds" :key="breed.id" @click="selectBreed(breed)">
                                {{ breed.name }}
                            </li>
                        </ul>
                    </div>
                </div>
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

            <div class="form-bottom">
                <button type="submit" class="submit-button">수정완료</button>
            </div>
        </form>
    </div>
</template>

<script>
import axios from "@/axios";

export default {
    props: ["petId"],
    created() {
        console.log("Pet ID from props:", this.petId);
        this.fetchDogInfo();
    },
    data() {
        return {
            breeds: [],
            showBreedModal: false,
            selectedBreedName: "",
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
        filteredBreeds() {
            const filtered = this.breeds.filter((breed) =>
                breed.name.toLowerCase().includes(this.breedSearch.toLowerCase())
            );
            console.log("Filtered Breeds:", filtered); // 필터링 결과 로깅
            return filtered;
        },
    },
    watch: {
        breedSearch(newSearch) {
            this.fetchBreeds(newSearch); // 검색어가 변경될 때마다 실행
        },
    },
    methods: {
        fetchDogInfo() {
            axios.get(`/api/mypage/pets/profile/${this.petId}`).then((response) => {
                const { name, breedId, dateOfBirth, gender, weight, neutering, profileImageUrl } = response.data;
                this.name = name;
                this.breedId = breedId;
                this.dateOfBirth = dateOfBirth;
                this.gender = gender;
                this.weight = weight;
                this.neutering = neutering;
                this.profilePictureUrl = profileImageUrl;
                this.updateBreedName(breedId);
            });
        },
        openBreedModal() {
            this.showBreedModal = true;
            this.fetchBreeds();
        },
        closeBreedModal() {
            this.showBreedModal = false;
        },
        fetchBreeds(search = "") {
            return axios
                .get(`/api/mypage/pets/breeds`, { params: { search } })
                .then((response) => {
                    this.breeds = response.data;
                })
                .catch((error) => {
                    console.error("견종 리스트 가져오기 실패:", error);
                });
        },

        selectBreed(breed) {
            this.selectedBreedName = breed.name;
            this.breedId = breed.id;
            this.closeBreedModal();
        },

        updateBreedName(breedId) {
            // 견종 리스트가 이미 로드되어 있지 않은 경우, 먼저 로드하고 이름을 업데이트
            if (this.breeds.length === 0) {
                this.fetchBreeds().then(() => {
                    this.setSelectedBreedName(breedId);
                });
            } else {
                this.setSelectedBreedName(breedId);
            }
        },

        setSelectedBreedName(breedId) {
            const breed = this.breeds.find((b) => b.id === breedId);
            if (breed) {
                this.selectedBreedName = breed.name;
            }
        },
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
                    id: this.petId,
                    breedId: this.breedId,
                    name: this.name,
                    dateOfBirth: this.dateOfBirth,
                    gender: this.gender,
                    weight: this.weight,
                    neutering: this.neutering,
                };

                // JSON 데이터를 Blob으로 변환하여 FormData에 추가
                formData.append(
                    "petUpdateRequestDTO",
                    new Blob([JSON.stringify(dogData)], { type: "application/json" })
                );

                // 프로필 이미지 파일이 있다면 추가
                if (this.profilePictureFile) {
                    formData.append("profileImage", this.profilePictureFile);
                }

                // PUT 요청 보내기
                await axios.put("/api/mypage/pets", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

                // 성공적으로 정보를 업데이트한 후 이전 페이지로 돌아감
                this.$router.go(-1);
            } catch (error) {
                console.error("강아지 정보 수정 실패:", error);
                alert("강아지 정보 수정 중 오류가 발생했습니다. 다시 시도해주세요.");
            }
        },
    },
};
</script>

<style scoped>
input::placeholder {
    color: #ccc; /* 연한 회색 */
    opacity: 1; /* 플레이스홀더 텍스트의 투명도 조정 (기본값은 브라우저에
따라 다를 수 있음) */
}

.dog-add-container {
    padding: 30px 20px;
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
    display: flex;
    margin-bottom: 20px;
}

.dog-name-input {
    width: 50%;
    padding: 10px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 50px;
    text-align: center;
    margin-bottom: 20px;
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
    border-radius: 50px;
    text-align: center;
}

.gender-buttons,
.neutered-buttons {
    display: flex;
    width: 70%;
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

.form-bottom {
    padding-top: 50px;
    height: auto;
    text-align: center;
    justify-content: space-around;
}

.submit-button {
    width: 95%;
    max-width: 570px;
    margin: 0 auto;
    padding: 15px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 50px;
    font-size: 1em;
    cursor: pointer;
    position: sticky;
    bottom: 70px;
    font-weight: 700;
}

.submit-button:hover {
    background-color: #45a049;
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25);
}

.modal {
    display: block;
    position: fixed;
    z-index: 1200;
    height: 100%;
    left: 50%;
    transform: translateX(-50%);
    top: 0;
    width: 100%;
    max-width: 600px;
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.4);
}
.modal-top {
    position: sticky; /* 스크롤 시 상단에 고정 */
    top: 0; /* 상단에 붙임 */
    background: white; /* 배경색 지정 */
    padding: 10px 0; /* 패딩 조정 */
    border-bottom: 1px solid #ccc; /* 하단 경계선 */
    z-index: 0; /* 다른 내용물 위에 렌더링 */
}
.modal-content {
    margin: 10% auto; /* 상단 여백 */
    padding: 20px;
    border: 1px solid #888;
    width: 90%; /* 너비 조정 */
    max-height: 80vh; /* 뷰포트 높이의 70%를 최대 높이로 설정 */
    overflow-y: auto; /* 내용이 넘칠 경우 스크롤 */
    background-color: #fefefe;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
}

.modal-list {
    overflow: hidden;
    overflow-y: auto; /* 내용이 넘칠 경우 스크롤 */

    height: calc(100% - 60px); /* modal-top 높이만큼 빼줌 */
}

.close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
}

ul {
    list-style-type: none;
    padding: 0;
    padding-right: 5%;
}

ul li {
    padding: 10px;
    cursor: pointer;
}

ul li:hover {
    background-color: #ddd;
}

.breed-search-input {
    width: 90%; /* 전체 너비 대비 비율 조정 */
    padding: 10px;
    margin: 10px auto; /* 중앙 정렬 */
    display: block; /* 블록 레벨 요소로 만들어 너비 조절을 용이하게 함 */
    border: 1px solid #ccc;
    border-radius: 10px;
    outline: none; /* 포커스 시 외곽선 제거 */
}
</style>
