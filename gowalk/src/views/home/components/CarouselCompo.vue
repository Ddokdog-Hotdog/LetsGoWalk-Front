<template>
    <div class="carousel">
        <div class="carousel-container">
            <div class="carousel-slide">
                <img :src="carouselImages[currentPage]" alt="Carousel Image" id="carousel-img" />
                <div class="carousel-pagination">{{ currentPage + 1 }} / {{ totalPages }}</div>
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
}
</script>

<style scoped>
.carousel{
    margin-bottom: 30px;
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
</style>