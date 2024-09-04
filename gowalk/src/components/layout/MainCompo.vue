<template>
    <main class="main-content">
        <!-- 메인 콘텐츠 -->

        <router-view></router-view>
    </main>
</template>

<script>
export default {};
</script>

<style scoped>
.main-content {
    width: 100%; /* 부모 요소와 동일한 너비 유지 */
    max-width: 600px; /* 화면에 꽉 차게 설정 */
    box-sizing: border-box;
    text-align: center; /* 중앙 정렬을 위한 텍스트 정렬 */
    background-color: #f8f9fa;
    flex: 1; /* 남은 공간을 차지 */
    overflow-y: auto; /* 내용이 넘칠 경우 스크롤 */
    padding: 5px;
    padding-bottom: 40px; /* 하단 네비게이션 바 높이만큼 마진 추가 */
    /*하단 네비게이션 바 높이만큼 마진 추가 */

    height: 100%;
}
</style>
