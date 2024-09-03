<template>
    <main class="main-content">
        <!-- 메인 콘텐츠 -->
        <p>Main content goes here...</p>
        <router-view></router-view>
    </main>
</template>

<script>
export default {};
</script>

<style scoped>
.main-content {
    width: 100%; /* 부모 요소와 동일한 너비 유지 */
    max-width: 100%; /* 화면에 꽉 차게 설정 */
    box-sizing: border-box;
    text-align: center; /* 중앙 정렬을 위한 텍스트 정렬 */
}
</style>
