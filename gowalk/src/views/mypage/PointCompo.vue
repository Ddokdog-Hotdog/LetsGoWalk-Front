<template>
    <div class="point-page">
        <div class="header">
            <button class="back-button" @click="$router.go(-1)">〈</button>
            <h3>포인트 내역</h3>
            <p></p>
        </div>
        <div class="total-point">
            <div class="main">
                <img src="@/assets/quest/point.png" />
                <p id="point">보유 포인트</p>
                <strong id="score">{{ totalPoints }}P</strong>
            </div>
        </div>
        <div class="point-list">
            <div v-for="point in points" :key="point.id" class="point-item">
                <div class="point-contents">
                    <h4>
                        <strong>{{ point.description }}</strong>
                    </h4>
                    <p>{{ point.date }}</p>
                </div>
                <p :class="{ plus: point.type === 'plus', minus: point.type === 'minus' }">
                    <strong> {{ point.amount < 0 ? "" : "+" }}{{ point.amount }}P</strong>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "@/axios"; // axios 인스턴스를 가져옵니다.

export default {
    data() {
        return {
            points: [],
            totalPoints: 0,
        };
    },
    methods: {
        fetchPoints() {
            axios
                .get("/api/points", {
                    params: { memberId: this.$store.state.memberId },
                })
                .then((response) => {
                    this.points = response.data;
                    this.calculateTotalPoints();
                })
                .catch((error) => {
                    console.error("포인트 정보를 불러오는 데 실패했습니다.", error);
                });
        },
        calculateTotalPoints() {
            this.totalPoints = this.points.reduce((sum, point) => {
                return sum + (point.type === "plus" ? point.amount : -point.amount);
            }, 0);
        },
    },
    created() {
        this.fetchPoints();
    },
};
</script>

<style scoped>
.point-page {
    max-width: 600px;
    margin: 0 auto;
    background: #f8f8f8;
    padding: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
}

.total-point {
    margin: 10px auto;
    width: 90%;
    font-size: 16px;
    background-color: #fff0d8;
    border-radius: 10%;
    padding: 30px;
}

.total-point img {
    width: 70px;
}

.total-point #score {
    color: #ff9900;
}
.point-list {
    list-style: none;
    padding: 0 15px;
}

.point-contents {
    padding-top: 5px;
    text-align: left;
}

.point-contents p {
    margin: 0;
    padding-top: 5px;
    color: #838383;
}
.point-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #eaeaea;
}

.point-item:last-child {
    border-bottom: none;
}

.plus {
    color: #ff9900;
}

.minus {
    color: #838383;
}
</style>
