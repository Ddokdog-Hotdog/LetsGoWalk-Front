<template>
    <div class="notification-list-compo">
        <div class="notification-compo-list" v-for="notification in notifications" :key="notification.id">
        <div>
            <img :src="postListProfileSrc" alt="Dog" class="postListCompoProfile" />
        </div>
        <div class="post-list-compo-detail">
            <span>{{ notification.nickname }}</span>
            <span>님이 회원님의 게시글에 댓글을 남겼습니다. :</span>
            <span> {{ notification.content }}</span>
        </div>
        <div>
            <img :src="postImageSrc" alt="" class="notification-list-compo-postimg">
        </div>
    </div>
</div>

</template>

<style scoped>
.notification-list-compo{
    padding-bottom: 68px;
}
.notification-compo-list{
    display: flex;
    position: relative;
    margin: 2%;
    width: 100%;
    height: 65px;

}
.postListCompoProfile{
    border-radius: 70%;
}
.post-list-compo-detail{
    text-align: left;
    margin: 0 10px 0 10px;
    min-width: 60%;
    width: 73%;
    align-content: center;
}
.post-list-compo-detail h3 {
    font-weight: 400;
}
.post-list-compo-detail span {
    color: #7f7f7f;
}
.post-list-compo-detail-info {
    display: flex;
    justify-content: space-between;
}
.notification-list-compo-postimg{
    width: 65px;
    height: 65px;
    margin: 0 10px 0 0;
}
</style>

<script>
export default {
    data(){
        return {
            postListProfileSrc: require("@/assets/postListCompo/postListProfile.png"),
            commentSrc: require("@/assets/postListCompo/comment.png"),
            postImageSrc: require("@/assets/writePostCompo/6.png"),
            notifications: [
                {
                    id: 1,
                    nickname: "jjongs1",
                    content: "집에 가자멍",
                },
                {
                    id: 2,
                    nickname: "jjongs2",
                    content: "집에 가자멍멍",
                },
                {
                    id: 3,
                    nickname: "jjongs3",
                    content: "집에 가자냐옹",
                },
                {
                    id: 4,
                    nickname: "jjongs4",
                    content: "집에 가자모",
                },
                {
                    id: 5,
                    nickname: "jjongs5",
                    content: "집에 가자모모",
                },
                {
                    id: 6,
                    nickname: "jjongs6",
                    content: "집에 마자용",
                },
                {
                    id: 7,
                    nickname: "jjongs7",
                    content: "집에 피카츄",
                },
                {
                    id: 8,
                    nickname: "jjongs8",
                    content: "집에 파산핑",
                },
                {
                    id: 9,
                    nickname: "jjongs8",
                    content: "집에 파산핑",
                },
                {
                    id: 10,
                    nickname: "jjongs8",
                    content: "집에 파산핑",
                },
                {
                    id: 11,
                    nickname: "jjongs8",
                    content: "집에 파산핑",
                },
                {
                    id: 12,
                    nickname: "jjongs8",
                    content: "집에 파산핑",
                },

            ]
        }
    }
}
</script>

