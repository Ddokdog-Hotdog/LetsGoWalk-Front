<template>
    <div class="home">
        <CarouselCompo></CarouselCompo>

        <!-- 로그인을 했으며, 강아지가 있으며, 오늘 산책을 한 경우 -->
        <WalkInfoCompo v-if="isLogined && haveDog && todayWalk"></WalkInfoCompo>

        <!-- 로그인을 했으며, 강아지가 있으며, 오늘 산책을 하지 않은 경우 -->
        <TodayNoWalkCompo v-if="isLogined && haveDog && !todayWalk"></TodayNoWalkCompo>

        <!-- 로그인을 했으며, 강아지를 등록하지 않은 경우 -->
        <NoDogCompo v-if="isLogined && !haveDog"></NoDogCompo>

        <!-- Hot Place Section -->
        <div class="hot-place">
            <p class="hot-place-text"><span class="word-border">오늘 <span class="word-color-green word-border">산책</span>, 여기 핫플 어때요?</span> <img id="leaf-icon" src="@/assets/home/leaf-icon.png"/></p>
            <div class="map-placeholder">
                <KakaoMap id="kakao-map" :enable-hotplace="true"> </KakaoMap>
            </div>
        </div>
        <!-- Quest Section -->
        <div class="quest-section">
            <div class="quest-header">
                <p><span class="word-border"><span class="word-color-green word-border">퀘스트</span> 완료하고 포인트 받아요</span></p>
                <p class="read-more" @click="goToQuest">더보기</p>
            </div>
            <div class="quest-buttons">
                <button @click="goToQuest">
                    <img src="@/assets/home/check-icon.png" />
                </button>
                <button @click="goToWalk">
                    <img src="@/assets/home/walk-icon.png" />
                </button>
                <button @click="goToWrite">
                    <img src="@/assets/home/post-icon.png" />
                </button>
            </div>
        </div>

        <!-- Community Section -->
        <div class="community-section">
            <div class="community-header">
                <p><span class="word-border">우리 <span class="word-color-pink word-border">소통</span>해요 ♡</span></p>
            </div>
            <div class="post-list">
                <div class="post-item" v-for="(post, index) in posts" :key="index" @click="goToDetail(post)">
                    <img :src="post.img" alt="Post Image" class="post-img"/>
                    <div class="post-details">
                        <p class="post-title">{{ post.title }}</p>
                        <p class="post-info">
                            {{ post.nickname }}
                            ·
                            {{ post.createdAt | day}} · 좋아요 {{ post.likesCount }} · 댓글 {{ post.commentsCount }}
                        </p>
                    </div>
                </div>
            </div>
            <div v-if="posts.length == 0">
                현재 등록된 게시글이 없습니다.
            </div>
            <div class="more-community" v-if="posts.length >= 1">
                <p class="read-more" @click="goToPost">커뮤니티 더보기</p>
            </div>
        </div>
    </div>
</template>

<script>
import KakaoMap from "@/views/walk/components/KakaoMap.vue";
import WalkInfoCompo from "@/views/home/components/WalkInfoCompo.vue";
import TodayNoWalkCompo from "@/views/home/components/TodayNoWalkCompo.vue";
import NoDogCompo from "@/views/home/components/NoDogCompo.vue";
import CarouselCompo from "@/views/home/components/CarouselCompo.vue";
import axios from "@/axios.js"; 

export default {
    data() {
        return {
            posts: [],
            isLogined: false, // 로그인 여부
            haveDog: false, // 강아지 여부
            todayWalk: false, // 오늘 산책 여부
        };
    },
    mounted: async function(){
        
        // 메인 화면 게시글 최신 3개글 가져오기
        await axios.get("/api/post/board/1?page=0&size=3").then((response) => {
            console.log("게시글 목록");
            console.log((response.data));
            this.posts = [...response.data];
        }).catch((error) => {
            console.log(error);
        });        

        // 강아지 여부 체크
        await axios.get("/api/mypage/pets").then((response) => {
            console.log("강아지 목록 : ", response.data);
            // 강아지 여부를 가지고 올 수 있다는 것은 로그인이 되었다는 의미
            this.isLogined = true;
            if(response.data.length >= 1){
                this.haveDog = true;
            }
            if(this.$store.getters["walkStore/dailyWalks"] > 0){
                // 산책 여부 체크
                this.todayWalk = true;
            }
        }).catch((error) => {
            console.log(error);
        })
        console.log("isLogined : ", this.isLogined);
        console.log("havedog : ", this.haveDog);
        console.log("todayWalk : ", this.todayWalk);

    },
    components: {
        KakaoMap,
        WalkInfoCompo,
        TodayNoWalkCompo,
        NoDogCompo,
        CarouselCompo,
    },
    methods: {
        goToPost(){
            this.$router.push("/post/1");
        },
        goToQuest(){
            this.$router.push("/quest");
        },
        goToDetail(post){
            this.$router.push(`/post/${post.boardid}/${post.postid}`);
        },
        goToWalk(){
            this.$router.push("/walk");
        },
        goToWrite(){
            this.$router.push("/post/write");
        }
    },
    filters: {
        day(value) {
            const date = new Date(value);
            const year = String(date.getFullYear()).slice(2); // 연도 뒤 두 자리
            const month = String(date.getMonth() + 1).padStart(2, '0'); // 월 (1~12)
            const day = String(date.getDate()).padStart(2, '0'); // 일
            const hours = String(date.getHours()).padStart(2, '0'); // 시
            const minutes = String(date.getMinutes()).padStart(2, '0'); // 분
            const seconds = String(date.getSeconds()).padStart(2, '0'); // 초
            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        },
    }
};
</script>

<style scoped>
.home {
    padding-top: 30px;
    padding-bottom: 100px;
}

.hot-place {
    margin-top: 20px;
    margin-bottom: 50px;
    height: 100%;
    /* background-color: black; */
}

.hot-place-text {
    text-align: left; /* 핫플 문구 왼쪽 정렬 */
    margin-left: 10px;
    margin-bottom: 0;
}

.map-placeholder {
    height: 200px;
    /* background-color: lightgray; */
    margin-top: 10px;
}

.quest-section {
    margin-top: 20px;
    background-color: white;
    /* padding: 10px; */
    padding-left: 10px;
    padding-right: 10px;
    /* padding-bottom: 5px; */
    margin-bottom: 50px;
}

.quest-header {
    display: flex;
    justify-content: space-between;
    align-items: center; /* 수직 가운데 정렬 */
}
.quest-header > p {
    margin-bottom: 0;
}

.quest-buttons {
    display: flex;
    gap: 10px;
    /* margin-top: 10px; */
}

.quest-buttons button {
    /* padding: 10px;
    background-color: white;
    cursor: pointer;
    font-weight: bold;
    width: 30%; */
    width: 30%; /* 버튼 크기를 고정 */
    height: 100px; /* 고정된 높이 */
    padding: 0; /* 패딩을 없애서 이미지가 꽉 차도록 */
    overflow: hidden; /* 이미지가 넘치지 않도록 */
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    border: none;
    cursor: pointer;
}

.quest-buttons button > img {
    width: 100%; /* 이미지 너비 100%로 설정 */
    height: 100%; /* 이미지 높이 100%로 설정 */
    object-fit: contain; /* 버튼 크기에 맞게 이미지 채우기 */
}

.community-section {
    /* margin-top: 20px; */
    background-color: white;
    /* padding: 10px; */
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 0px;
}

.community-header {
    text-align: left;
}
.community-header > p {
    margin-bottom: 0;
}
.post-list {
    margin-top: 10px;
}

.post-item {
    display: flex;
    margin-bottom: 10px;
    cursor: pointer;
}

.post-img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 10px;
}
.post-details {
    display: flex;
    flex-direction: column;
    justify-content: center; /* 수직 가운데 정렬 */
    margin-left: 10px;
    text-align: left; /* 수평 왼쪽 정렬 */
}

.post-title {
    font-size: 14px;
    font-weight: bold;
}

.post-info {
    font-size: 12px;
    color: gray;
}

.post-time-icon {
    width: 12px;
    height: 12px;
    vertical-align: middle;
    margin-left: 5px;
}

.more-community {
    text-align: right;
    margin-top: 10px;
}

/* 반응형 처리 */
@media (max-width: 768px) {
    .post-img {
        width: 20%; /* 작은 화면에서는 30%로 */
    }
}

.read-more {
    font-size: 13px;
    cursor: pointer;
}
.read-more::after {
    content: " >";
}
.walk-title {
    align-items: center;
    margin-bottom: 0;
}
#kakao-map {
    height: 100%;
}
.word-color-green {
    color: #3CBC83;
}
.word-color-pink {
    color: #FF9191;
}
#leaf-icon{
    height: 1em; /* 텍스트 크기와 높이를 동일하게 */
    width: auto; /* 비율 유지 */
    vertical-align: middle; /* 텍스트와 수평 정렬 */
    /*margin-left: 5px;  텍스트와 약간의 간격 */
}
.word-border{
    font-weight: 1000;
}
</style>
