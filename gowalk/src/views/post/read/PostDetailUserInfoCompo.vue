<template>
    <div class="post-detail-userinfo-compo">
        <div class="post-detail-userinfo-compo-profile">
            <img :src="displayedImage" @error="handleImageError" alt="profile">
        </div>
        <div class="post-detail-userinfo-compo-info">
        <div>{{ computedUserInfo.nickname }}</div>
        <div class="post-detail-userinfo-compo-info-detail">
            <div>{{ formattedPostCreatedAt }}</div>
            <div>❤️ {{ likesCount }}</div>
        </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        userInfo: {
            type: Object,
            default: () => ({ nickname: '', profileImage: '' })
        },
            postCreatedAt: {
            type: String,
            default: ''
        },
        likesCount: {
            type: Number,
            default: 0
        }
    },
    computed: {
        computedUserInfo() {
        // 기본값으로 빈 객체를 반환하거나, 필요한 기본 값을 설정합니다.
            return {
                nickname: this.userInfo?.nickname || '익명',
                profileImage: this.userInfo?.profileImage || require("@/assets/icon/default-dog-icon.png")
            };
        },
        displayedImage() {
            // 이미지 경로가 없을 경우 기본 이미지를 사용합니다.
            return this.computedUserInfo.profileImage;
        },
        formattedPostCreatedAt() {
            if (!this.postCreatedAt) return '';
            const date = new Date(this.postCreatedAt);
            return date.toLocaleString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            });
        }
    },
    methods: {
        handleImageError() {
            this.computedUserInfo.profileImage = require("@/assets/icon/default-dog-icon.png");
        }
    }
}
</script>

<style scoped>
.post-detail-userinfo-compo{
    display: flex;
    margin: 10px 0 10px 10px;
}
.post-detail-userinfo-compo-profile img{
    border-radius: 70%;
}
.post-detail-userinfo-compo-info{
    margin: 0 0 0 20px;
    height: 70px;
    align-content: center;
    text-align: left;
}
.post-detail-userinfo-compo-info-detail{
    display: flex;
    color: #666666;
    font-size: 12px
}
.post-detail-userinfo-compo-info-detail div{
    margin: 0 10px 0 0;
}
.post-detail-userinfo-compo-profile{
    align-content: center;
}
.post-detail-userinfo-compo-profile img{
    height: 50px;
    width: 50px;
}
</style>