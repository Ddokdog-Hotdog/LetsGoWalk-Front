<template>
    <nav class="top-nav">
        <a href="/"><img class="mainlogo" :src="logoLogoSrc" alt="mainLogo"></a>
        <a href="/notification"><img class="notification" :src="notificationSrc" alt="notification"></a>
        <a href="/mypage"><img class="myPage" :src="myPageSrc" alt="myPage"></a>
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
    width: 87px;
    height: 22px;
    margin-left: 3vw;
}
.notification {
    margin: 0 0 0 57vw;
}
.myPage {
    margin: 0 0 0 3vw;
}
a {
    margin: 1vh 0 0 0;
    align-items: center;
}
</style>
