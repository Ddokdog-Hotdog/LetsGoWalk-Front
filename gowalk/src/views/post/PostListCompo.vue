<template>
    <div class="postList">
        <div class="post-list-compo" v-for="post in posts" :key="post.nickname">
            <div>
                <img :src="postListProfileSrc" alt="Dog" class="postListCompoProfile" />
            </div>
            <div class="post-list-compo-detail">
                <h3>{{ post.title }}</h3>
                <div class="post-list-compo-detail-info">
                    <div>
                        <span>{{ post.nickname }}</span>
                    </div>
                    <div>
                        <span>⏱</span><span>{{ post.timeAgo }}분 전 </span> <span>💙</span
                        ><span>{{ post.goods }}</span> <span><img :src="commentSrc" /> </span
                        ><span>{{ post.comments }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            postListProfileSrc: require("@/assets/postListCompo/postListProfile.png"),
            commentSrc: require("@/assets/postListCompo/comment.png"),
            postCreateButtonSrc: require("@/assets/postListCompo/createPost.png"),
            posts: [
                {
                    title: "강아지와 산책",
                    nickname: "doglover123",
                    timeAgo: 30,
                    goods: 85,
                    comments: 12,
                },
                {
                    title: "강아지와 산책",
                    nickname: "doglover123",
                    timeAgo: 30,
                    goods: 85,
                    comments: 12,
                },
                {
                    title: "강아지와 산책",
                    nickname: "doglover123",
                    timeAgo: 30,
                    goods: 85,
                    comments: 12,
                },
                {
                    title: "강아지와 산책",
                    nickname: "doglover123",
                    timeAgo: 30,
                    goods: 85,
                    comments: 12,
                },
                {
                    title: "강아지와 산책",
                    nickname: "doglover123",
                    timeAgo: 30,
                    goods: 85,
                    comments: 12,
                },
                {
                    title: "강아지와 산책",
                    nickname: "doglover123",
                    timeAgo: 30,
                    goods: 85,
                    comments: 12,
                },
                {
                    title: "강아지와 산책",
                    nickname: "doglover123",
                    timeAgo: 30,
                    goods: 85,
                    comments: 12,
                },
                {
                    title: "강아지와 산책",
                    nickname: "doglover123",
                    timeAgo: 30,
                    goods: 85,
                    comments: 12,
                },
                {
                    title: "강아지와 산책",
                    nickname: "doglover123",
                    timeAgo: 30,
                    goods: 85,
                    comments: 12,
                },
                {
                    title: "강아지와 산책",
                    nickname: "doglover123",
                    timeAgo: 30,
                    goods: 85,
                    comments: 12,
                },
                {
                    title: "강아지와 산책",
                    nickname: "doglover123",
                    timeAgo: 30,
                    goods: 85,
                    comments: 12,
                },
                {
                    title: "강아지와 산책",
                    nickname: "doglover123",
                    timeAgo: 30,
                    goods: 85,
                    comments: 12,
                },
                {
                    title: "강아지와 산책",
                    nickname: "doglover123",
                    timeAgo: 30,
                    goods: 85,
                    comments: 12,
                },
                {
                    title: "강아지와 산책",
                    nickname: "doglover123",
                    timeAgo: 30,
                    goods: 85,
                    comments: 12,
                },
            ],
        };
    },
};
</script>

<style scoped>
.post-list-compo {
    display: flex;
    position: relative;
    margin: 2%;
    width: 100%;
    height: 65px;
}
.post-list-compo-detail {
    text-align: left;
    margin: 0 0 0 10px;
    width: 75%;
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
</style>
