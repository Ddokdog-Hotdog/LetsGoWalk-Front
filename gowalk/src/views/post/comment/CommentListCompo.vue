<template>
    <div class="comment-list-compo">
        <div v-for="comment in comments" :key="comment.id" class="comment-list-compo-comtainer" :class="{ 'is-reply': comment.isReply }">
            <div>
                <img class="user-profile" :src="ProfileSrc" alt="profile">
            </div>
            <div class="comment-list-content-info">
                <div class="comment-list-userinfo">
                    <div>{{ comment.member.nickname }}</div>
                    <div class="comment-list-userinfo-createdAt">{{ comment.createdAt}}</div>
                </div>
                <div>{{ comment.content }}</div>
                <div class="comment-list-compo-comtainer-count">
                    <div>
                        <img :src="commentSrc" alt="">
                    </div>
                    <div>
                        {{ comment.count}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            ProfileSrc : require("@/assets/writePostCompo/5.png"),
            commentSrc: require("@/assets/postListCompo/comment.png"),
            comments: [
                {
                    id: 1,
                    content: "오늘 저녁은 뭐먹지?",
                    createdAt: "2024-09-06",
                    count: 1,
                    isReply: false,
                    member: {
                        nickname: "jjongs",
                    },
                },
                {
                    id: 2,
                    content: "회가 최고지 !",
                    createdAt: "2024-09-06",
                    count: 1,
                    isReply: true,
                    member: {
                        nickname: "dogdog",
                    },
                },
            ],
        }
    }
}
</script>

<style scoped>
.user-profile {
    width: 50px;
    height: 50px;
    border-radius: 70%;
}
.comment-list-compo-comtainer{
    width: 100%;
    display: flex;
    margin:  0 0 0 10px;
}
.comment-list-content-info{
    text-align: left;
    margin:  0 0 0 10px;
}
.comment-list-userinfo{
    display: flex;
    margin: 0 20px 0 0;
}
.comment-list-userinfo div {
    margin: 0 10px 0 0;
}
.comment-list-userinfo-createdAt{
    font-size: 12px;
    align-content:center;
    color: #7f7f7f;
}
.comment-list-compo-comtainer-count{
    display: flex;
}
.comment-list-compo-comtainer-count div{
    margin: 0 4px 0 0;
}
.is-reply {
    margin-left: 70px;
}
</style>