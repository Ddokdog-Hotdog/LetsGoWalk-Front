<template>
    <div>
        <div class="walk-info-box">
            <img src="@/assets/home/gowalk-icon.png">
        </div>
        <p class="calorie-info">오늘 아직 산책을 안했어요 :(</p>
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
    background-color: #3CBC83;
    border: 1px solid lightgray;
    display: flex;
    justify-content: center; /* 가운데 정렬로 변경 */
    gap: 50px; /* 요소 사이의 간격 추가 */
    margin-left: 15px;
    margin-right: 15px;
    border-radius: 20px;
}

.calorie-info {
    margin-top: 10px;
    text-align: center;
    margin-bottom: 50px;
}
</style>