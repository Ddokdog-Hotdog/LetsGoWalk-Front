<template>
    <div class="post-detail-userinfo-compo">
        <!-- <div>{{ member.profile }}</div> -->
        <div class="post-detail-userinfo-compo-profile">
            <img :src="postListProfileSrc" alt="profile">
        </div>
        <div class="post-detail-userinfo-compo-info">
            <div>{{ member.nickname }}</div>
            <div class="post-detail-userinfo-compo-info-detail">
                <div>{{ post.createdAt}}</div>
                <div>❤️ {{ post.goods}}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            postListProfileSrc: require("@/assets/postListCompo/postListProfile.png"),
            components: {
                
            },
            member: {
                nickname: "jjongs",
            },
            post : {
                createdAt : "2024.09.06",
                goods: 3,
            },
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
</style>