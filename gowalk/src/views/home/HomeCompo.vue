<template>
    <div class="home">
        <!-- Carousel Section -->
        <div class="carousel-container">
            <div class="carousel-slide">
                <img :src="carouselImages[currentPage]" alt="Carousel Image" id="carousel-img" />
                <div class="carousel-pagination">{{ currentPage + 1 }} / {{ totalPages }}</div>
            </div>
        </div>

        <!-- Walk Time & Distance Section -->
        <div class="walk-info-box">
            <div class="walk-time">
                <p class="walk-title">산책 시간</p>
                <p class="walk-value">1h 35M</p>
            </div>
            <div class="walk-distance">
                <p class="walk-title">산책 거리</p>
                <p class="walk-value">3.00km</p>
            </div>
        </div>
        <p class="calorie-info">몽몽이가 167kcal를 소비했어요</p>

        <!-- Hot Place Section -->
        <div class="hot-place">
            <p class="hot-place-text">오늘 산책, 여기 핫플 어때요?</p>
            <div class="map-placeholder">[지도 영역]</div>
        </div>

        <!-- Quest Section -->
        <div class="quest-section">
            <div class="quest-header">
                <p>퀘스트 완료하고 포인트 받아요</p>
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
                <p>우리 소통해요</p>
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
export default {
    data() {
        return {
            currentPage: 0,
            totalPages: 3,
            carouselImages: [
                require(`@/assets/home/sample-carousel.jpg`),
                require(`@/assets/home/sample-carousel2.jpg`),
                require(`@/assets/home/sample-carousel3.jpg`),
            ],
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
    mounted() {
        this.startCarousel();
    },
    methods: {
        startCarousel() {
            setInterval(() => {
                this.currentPage = (this.currentPage + 1) % this.totalPages;
            }, 2000); // 2초마다 이미지 변경
        },
    },
};
</script>

<style scoped>
.home {
    padding-top: 30px;
    padding-bottom: 100px;
}
.carousel-container {
    /* background-color: lightgray; */
    /* padding: 20px; */
    background-color: white;
    padding: 0px;
    text-align: center;
    position: relative;
    width: 100%;
    height: 500px; /* 캐러셀 높이 고정 */
}
.carousel-slide {
    position: relative;
    width: 100%;
    height: 100%; /* 캐러셀 컨테이너에 꽉 차도록 */
}

.carousel-slide img {
    width: 100%;
    height: auto;
    padding: 0px;
}
#carousel-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}
.carousel-pagination {
    position: absolute;
    bottom: 10px;
    right: 10px;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    padding: 5px 10px;
    border-radius: 10px;
}

.walk-info-box {
    margin-top: 20px;
    padding: 20px;
    background-color: white;
    border: 1px solid lightgray;
    display: flex;
    justify-content: center; /* 가운데 정렬로 변경 */
    gap: 50px; /* 요소 사이의 간격 추가 */
    margin-left: 15px;
    margin-right: 15px;
    border-radius: 30px;
}

.walk-time,
.walk-distance {
    display: flex;
    flex-direction: column;
    justify-content: center; /* 수직 가운데 정렬 */
    text-align: center; /* 텍스트를 가운데 정렬 */
}

.walk-time {
    /*align-items: flex-start;  왼쪽 정렬 */
    align-items: center; /* 산책 시간 가운데 정렬 */
    margin-right: 20px; /* 오른쪽으로 이동 */
}

.walk-distance {
    /*align-items: flex-end;  오른쪽 정렬 */
    align-items: center; /* 산책 거리 가운데 정렬 */
    margin-left: 20px; /* 왼쪽으로 이동 */
}

.walk-value {
    font-size: 24px;
    font-weight: bold;
}

.calorie-info {
    margin-top: 10px;
    text-align: center;
    margin-bottom: 10px;
}

.hot-place {
    margin-top: 20px;
    margin-bottom: 10px;
}

.hot-place-text {
    text-align: left; /* 핫플 문구 왼쪽 정렬 */
    margin-left: 20px;
}

.map-placeholder {
    height: 200px;
    background-color: lightgray;
    margin-top: 10px;
}

.quest-section {
    margin-top: 20px;
    background-color: white;
    /* padding: 10px; */
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 5px;
}

.quest-header {
    display: flex;
    justify-content: space-between;
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
}
.read-more::after {
    content: " >";
}
.walk-title {
    align-items: center;
}
</style>
