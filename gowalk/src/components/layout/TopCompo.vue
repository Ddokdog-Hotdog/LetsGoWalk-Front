<template>
    <nav class="top-nav">
        <div>
            <img class="mainlogo" :src="logoLogoSrc" alt="mainLogo">
        </div>
        <div class="top-nav-right">
            <img class="notification" :src="notificationSrc" alt="notification">
            <img class="myPage" :src="myPageSrc" alt="myPage">
        </div>
        
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
    position: fixed;
    display: flex;
    top: 0;
    width: 100%;
    max-width: 600px;
    margin: auto;
    height: 55px;
    background-color: white;
    color: white;
    display: flex;
    align-items: center;
    justify-content:space-between;
    z-index: 10;
}
.top-nav-right{
    display: flex;
}
.top-nav-right img{
    margin: 0 20px 0 0;
}
.mainlogo {
    width: 32%;
    margin: 0 0 0 2vw;
}
</style>