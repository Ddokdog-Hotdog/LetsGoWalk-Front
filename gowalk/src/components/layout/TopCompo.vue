<template>
    <nav class="top-nav">
        <img class="mainlogo" :src="logoLogoSrc" alt="mainLogo">
        <img class="notification" :src="notificationSrc" alt="notification">
        <img class="myPage" :src="myPageSrc" alt="myPage">
    </nav>
</template>

<script>
export default {
    data() {
        return {
            logoLogoSrc: require("@/assets/topCompo/mainlogo.png"),
            notificationSrc: require("@/assets/topCompo/notification.png"),
            myPageSrc: require("@/assets/topCompo/group.png")
        }
    }
};
</script>

<style scoped>
.top-nav {
    /* position: fixed; */
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 55px; /* 높이 설정 */
    background-color: white;
    color: white;
    display: flex;
    align-items: center;
    /* justify-content: center; */
    z-index: 10;
}
.mainlogo {
    width: 17vw;
    height: 4vh;
    margin-left: 3vw;
}
.notification {
    margin: 0 0 0 60vw;
}
.myPage {
    margin: 0 0 0 3vw;
}
</style>
