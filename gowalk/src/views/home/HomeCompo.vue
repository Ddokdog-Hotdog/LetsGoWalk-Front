<template>
    <div class="home">
        <CarouselCompo></CarouselCompo>

        <!-- 로그인을 했으며, 오늘 산책을 한 경우 -->
        <WalkInfoCompo v-if="true"></WalkInfoCompo>

        <!-- 로그인을 했으며, 오늘 산책을 하지 않은 경우 -->
        <TodayNoWalkCompo v-if="false"></TodayNoWalkCompo>

        <!-- 로그인을 했으며, 강아지를 등록하지 않은 경우 -->
        <NoDogCompo v-if="false"></NoDogCompo>

        <!-- Hot Place Section -->
        <div class="hot-place">
            <p class="hot-place-text"><span class="word-border">오늘 <span class="word-color-green word-border">산책</span>, 여기 핫플 어때요?</span> <img id="leaf-icon" src="@/assets/home/leaf-icon.png"/></p>
            <div class="map-placeholder">
                <KakaoMap id="kakao-map"> </KakaoMap>
            </div>
        </div>
        <!-- Quest Section -->
        <div class="quest-section">
            <div class="quest-header">
                <p><span class="word-border"><span class="word-color-green word-border">퀘스트</span> 완료하고 포인트 받아요</span></p>
                <p class="read-more">더보기</p>
            </div>
            <div class="quest-buttons">
                <button>
                    <img src="@/assets/home/check-icon.png" />
                </button>
                <button>
                    <img src="@/assets/home/walk-icon.png" />
                </button>
                <button>
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
                <div class="post-item" v-for="(post, index) in posts" :key="index">
                    <img :src="post.image" alt="Post Image" />
                    <div class="post-details">
                        <p class="post-title">{{ post.title }}</p>
                        <p class="post-info">
                            {{ post.author }}
                            ·
                            {{ post.time }} · 좋아요 {{ post.likes }} · 댓글 {{ post.comments }}
                        </p>
                    </div>
                </div>
            </div>
            <div class="more-community">
                <p class="read-more">커뮤니티 더보기</p>
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

export default {
    data() {
        return {
            posts: [
                {
                    image: require(`@/assets/home/temp-post.png`),
                    title: "오산완 인증이요 ~",
                    author: "작성자닉네임",
                    time: "23분 전",
                    likes: 23,
                    comments: 1,
                },
                {
                    image: require(`@/assets/home/temp-post.png`),
                    title: "오산완 인증이요 ~",
                    author: "작성자닉네임",
                    time: "23분 전",
                    likes: 23,
                    comments: 1,
                },
                {
                    image: require(`@/assets/home/temp-post.png`),
                    title: "오산완 인증이요 ~",
                    author: "작성자닉네임",
                    time: "23분 전",
                    likes: 23,
                    comments: 1,
                },
            ],
        };
    },
    components: {
        KakaoMap,
        WalkInfoCompo,
        TodayNoWalkCompo,
        NoDogCompo,
        CarouselCompo,
    },
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
}

.post-item img {
    width: 20%; /* 게시글 이미지 너비 20% */
    height: auto;
    object-fit: cover;
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
    .post-item img {
        width: 30%; /* 작은 화면에서는 30%로 */
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
