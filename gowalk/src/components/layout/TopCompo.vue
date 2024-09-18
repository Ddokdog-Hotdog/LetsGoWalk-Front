<template>
    <nav class="top-nav">
        <div>
            <router-link to="/">
                <img class="mainlogo" :src="logoLogoSrc" alt="mainLogo" />
            </router-link>
        </div>
        <div class="top-nav-right">
            <router-link to="/notification">
                <img class="notification" :src="hasUnreadNotifications ? notificationAlertSrc : notificationSrc" alt="notification" />
            </router-link>
            <router-link to="/mypage">
                <img class="myPage" :src="myPageSrc" alt="myPage" />
            </router-link>
        </div>
    </nav>
</template>

<script>
import { mapState } from 'vuex';


export default {
    computed: {
        ...mapState({
            hasUnreadNotifications: state => state.hasUnreadNotifications, // Vuex의 상태를 가져옴
        })
    },
    data() {
        return {
            logoLogoSrc: require('@/assets/topCompo/mainlogo.png'),
            notificationSrc: require('@/assets/topCompo/notification.png'),
            notificationAlertSrc: require('@/assets/topCompo/alarm.png'),
            myPageSrc: require('@/assets/topCompo/group.png'),
        };
    },
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
    max-width: 600px;
    margin: auto;
    height: 55px;
    background-color: white;
    color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 10;
}
.top-nav-right {
    display: flex;
}
.top-nav-right img {
    margin: 0 20px 0 0;
}
.mainlogo {
    width: 32%;
    margin: 0 0 0 2vw;
}
.notification{
    widows: 22.5px;
    height: 25px;
}
</style>
