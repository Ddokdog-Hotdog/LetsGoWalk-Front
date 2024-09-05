<template>
    <v-app id="app">
        <div class="app-container">
            <div class="content-wrapper">
                <topCompo />
                <mainCompo />
                <bottomCompo v-if="!$route.meta.hideBottom" />
            </div>
        </div>
    </v-app>
</template>

<script>
import topCompo from '@/components/layout/TopCompo.vue';
import mainCompo from '@/components/layout/MainCompo.vue';
import bottomCompo from '@/components/layout/BottomCompo.vue';

export default {
    name: 'App',
    components: {
        topCompo,
        mainCompo,
        bottomCompo,
    },
};
</script>

<style>
html,
body {
    height: 100%;
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
}

#app {
    height: 100%;
    flex-direction: column;
    justify-content: center;
    background-color: white;
}

.app-container {
    width: 100%;
    max-width: 600px; /* 모바일 화면에 맞는 최대 너비 */
    height: 100%;
    min-height: 100vh;
    flex-direction: column;

    /*padding-top: 55px;  상단 네비게이션 바 높이 */
    /*padding-bottom: 55px; /* 하단 네비게이션 바 높이 */
    box-sizing: border-box;
    justify-content: center;
    /* 화면 가운데 위치 조정 */
    margin: auto; /* 중앙 정렬 */
}
.content-wrapper {
    flex: 1;
    margin-top: 54px;
    /*align-items: center; 수직 중앙 정렬 */
    justify-content: center; /* 수평 중앙 정렬 */
    /*padding: 0 16px;  좌우 여백 설정 */
    box-sizing: border-box;
    width: 100%;
    height: 100%;
}
</style>
