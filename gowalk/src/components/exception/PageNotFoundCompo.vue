<template>
    <div class="container">
        <img src ="@/assets/icon/404.png" class="error-image"/>
        <button class="button" @click="goToBack">이전으로 돌아가기</button>
    </div>
</template>

<script>
export default {
    methods:{
        goToBack(){
            this.$router.go(-1);
        }
    }
};
</script>

<style scoped>
/* .error-image{
    height: auto;
    width: 100%;
    padding-left: 30px;
    padding-right:30px;
    padding-top: 70px;
}
.button {
    padding: 12px 24px;
    background-color: black;
    color: white;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    width: 60%;
    font-size: 16px;
    transition: background-color 0.3s ease;
    cursor: pointer;
} */
.container {
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    justify-content: flex-start; /* 세로 위쪽으로 배치 */
    align-items: center;
    height: 100%;
    /*height: 100vh; /* Full height to center vertically */
    text-align: center;
    padding-top: 50px; /* 컨텐츠를 위로 올리기 위해 패딩 추가 */
    padding-left: 20px;
    padding-right: 20px;
}

.error-image{
    width: 100%;
    max-width: 600px; /* Max width for larger screens */
    height: auto;
    padding-left: 30px;
    padding-right:30px;
    padding-top:30px;
    margin-bottom: 10px; /* Spacing between image and button */
}

.button {
    padding: 12px 24px;
    background-color: black;
    color: white;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    width: 60%;
    max-width: 300px; /* Button won't stretch too much on larger screens */
    font-size: 16px;
    transition: background-color 0.3s ease;
}

.button:hover {
    background-color: #333; /* Hover effect */
}

/* Media query for smaller screens */
@media (max-width: 768px) {
    .button {
        width: 80%; /* Adjust button width for smaller screens */
    }
}
</style>
