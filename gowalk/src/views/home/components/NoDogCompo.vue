<template>
    <div>
        <div class="walk-info-box">
            강아지 등록하기
        </div>
        <p class="calorie-info">아직 강아지 등록이 안돼있어요 !</p>
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
    border: 1px solid #3CBC83;
    display: flex;
    justify-content: center; /* 가운데 정렬로 변경 */
    gap: 50px; /* 요소 사이의 간격 추가 */
    margin-left: 15px;
    margin-right: 15px;
    border-radius: 20px;
    font-size:20px;
    color: #3CBC83;
    font-weight: 1000;
    box-shadow: 0 1px 1px rgba(0,0,0,0.11), 
                0 2px 2px rgba(0,0,0,0.11), 
                0 4px 4px rgba(0,0,0,0.11), 
                0 6px 8px rgba(0,0,0,0.11),
                0 8px 16px rgba(0,0,0,0.11);
}

.calorie-info {
    margin-top: 10px;
    text-align: center;
    margin-bottom: 50px;
}
</style>