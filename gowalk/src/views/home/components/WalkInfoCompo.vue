<template>
        <div>
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
        </div>
</template>

<script>
export default {
    data(){
        return {

        }
    },
    methods: {
        
    }
}
</script>

<style scoped>
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
    margin-bottom: 50px;
}
</style>