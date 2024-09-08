<template>
    <div class="spinner-overlay" v-if="isVisible">
        <div class="spinner-box">
            <p>잠시만 기다려주세요</p>
            <img src="@/assets/spinner/running-dog.gif" alt="Running Dog" class="dog-animation" />
        </div>
    </div>
</template>

<script>
export default {
    name: "SpinnerCompo",
    props: {
        isVisible: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style scoped>
/* 화면 전체를 덮는 반투명 배경 */
.spinner-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5); /* 검정색 반투명 */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

/* 중앙에 흰색 네모 박스 */
.spinner-box {
    background-color: white;
    width: 80%; /* 가로길이 80%로 설정하여 거의 꽉 차게 */
    max-width: 600px; /* 최대 가로 길이 */
    max-height: 300px; /* 높이 설정 */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); /* 약간의 그림자 */
}

/* 텍스트 스타일 */
.spinner-box p {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 20px;
}

/* 강아지 달리기 애니메이션 이미지 */
.dog-animation {
    /* width: 50%; */
    width: auto;
    height: auto;
}
</style>
