<template>
    <nav class="top-nav">
        <!-- 상단 네비게이션 바 내용 -->
        <p>Top Navigation</p>
    </nav>
</template>

<script>
export default {};
</script>

<style scoped>
.top-nav {
    /* position: fixed; */
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 55px; /* 높이 설정 */
    background-color: #333;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
}
</style>
