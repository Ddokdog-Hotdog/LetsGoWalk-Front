<template>
    <div class="comment-list-compo">
        <div v-if="comments && comments.length > 0">
            <div v-for="comment in comments" :key="comment.id" class="comment-list-compo-container" :class="{'is-reply': comment.commentsId}">
                <div>
                    <img class="user-profile" :src="comment.profileImg || defaultProfileUrl" alt="profile" @error="handleImageError">
                </div>
                <div class="comment-list-content-info">
                    <div class="comment-list-userinfo">
                        <div>{{ comment.nickname }}</div>
                        <div class="comment-list-userinfo-createdAt">{{ formatDate(comment.createdAt) }}</div>
                    </div>
                    <div>{{ comment.content }}</div>
                    <div class="comment-list-compo-container-count" v-if="!comment.commentsId">
                        <div>
                            <img :src="commentSrc" alt="comments">
                        </div>
                        <div>{{ comment.count }}</div>
                    </div>
                    <comment-list-compo v-if="comment.children && comment.children.length" :comments="comment.children"/>
                </div>
            </div>
        </div>
        <div v-else>No comments to display.</div>
    </div>
</template>

<script>
export default {
    name: "CommentListCompo",
    props: {
        comments: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            commentSrc: require("@/assets/postListCompo/comment.png"),
            defaultProfileUrl: require("@/assets/icon/default-dog-icon.png")
        };
    },
    methods: {
        handleImageError(event) {
            event.target.src = this.defaultProfileUrl;
        },
        formatDate(dateStr) {
            const date = new Date(dateStr);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const formatted = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
            return formatted;
        },
        
    }
}
</script>

<style scoped>
.user-profile {
    width: 50px;
    height: 50px;
    border-radius: 70%;
}
.comment-list-compo-container{
    width: 100%;
    display: flex;
    margin:  0 0 10px 10px;
}
.comment-list-content-info{
    text-align: left;
    margin:  0 0 0 10px;
    padding: 0 30px 0 0;
    /* max-width: 90%; */
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