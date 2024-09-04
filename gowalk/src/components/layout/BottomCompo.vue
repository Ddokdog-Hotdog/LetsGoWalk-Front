<template>
    <nav class="bottom-nav">
        <!-- 하단 네비게이션 바 내용 -->
        <div class="container-fluid">
            <div class="row">
                <!-- 각 메뉴 항목을 가로로 나열 -->
                <div class="col text-center" v-for="(item, index) in menuItems" :key="index">
                    <router-link :to="item.routerLink">
                        <img :src="getIconSrc(item)" class="menu-icon" />
                        <div class="menu-text">{{ item.text }}</div>
                    </router-link>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'BottomNav',
    data() {
        return {
            menuItems: [
                {
                    path: '/home',
                    iconSrc: require('@/assets/icon/home-icon.png'),
                    iconActiveSrc: require('@/assets/icon/now-home-icon.png'),
                    text: '홈',
                    routerLink: '/',
                },
                {
                    path: '/walk',
                    iconSrc: require('@/assets/icon/walk-icon.png'),
                    iconActiveSrc: require('@/assets/icon/now-walk-icon.png'),
                    text: '산책',
                    routerLink: '/walk',
                },
                {
                    path: '/quest',
                    iconSrc: require('@/assets/icon/quest-icon.png'),
                    iconActiveSrc: require('@/assets/icon/now-quest-icon.png'),
                    text: '퀘스트',
                    routerLink: '/quest',
                },
                {
                    path: '/post',
                    iconSrc: require('@/assets/icon/post-icon.png'),
                    iconActiveSrc: require('@/assets/icon/now-post-icon.png'),
                    text: '커뮤니티',
                    routerLink: '/post',
                },
                {
                    path: '/shop',
                    iconSrc: require('@/assets/icon/shop-icon.png'),
                    iconActiveSrc: require('@/assets/icon/now-shop-icon.png'),
                    text: '산책용품',
                    routerLink: '/shop',
                },
            ],
        };
    },

    methods: {
        getIconSrc(item) {
            // 현재 경로가 아이템의 경로로 시작하는지 확인하여 아이콘을 변경
            if (this.$route.path === '/' && item.path === '/home') return item.iconActiveSrc;
            return this.$route.path.startsWith(item.path) ? item.iconActiveSrc : item.iconSrc;
        },
    },
};
</script>

<style scoped>
.bottom-nav {
    position: fixed;
    /* position: absolute; */
    bottom: 0;
    width: 100%;
    max-width: 600px;
    height: 67px; /* 높이 설정 */
    background-color: white;
    border-top: 1px solid #ddd; /* 상단 경계선 추가 */
    color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    /* padding: 0; */
    margin: 0;
}
.menu-container {
    display: flex;
    width: 100%;
    height: 100%;
}
.container-fluid {
    width: 90%;
}

.menu-item {
    flex: 1; /* 각 메뉴 항목이 동일한 너비를 가집니다 */
    text-align: center; /* 아이콘과 텍스트를 가운데 정렬 */
    display: flex;
    flex-direction: column; /* 아이콘을 텍스트 위에 배치 */
    align-items: center;
    justify-content: center;
    width: 25%;
}

.menu-icon {
    font-size: 20px; /* 아이콘 크기 */
}

.menu-text {
    font-size: 12px; /* 텍스트 크기 */
    margin-top: 2px;
    white-space: nowrap; /* 텍스트 줄바꿈 방지 */
    color: black;
}

.row .container-fluid {
    width: 100%;
}
.row {
    display: flex;
}
.container-fluid {
    margin-top: 5px;
}
.col {
    padding-top: 0px;
    padding-bottom: 5px;
    justify-content: space-between; /* 항목들을 네비게이션 바 전체에 고르게 배치 */
}
a {
    text-decoration: none;
}
</style>
