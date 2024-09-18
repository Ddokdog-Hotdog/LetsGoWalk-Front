<template>
    <div class="notification-list-compo">
        <div class="notification-compo-list" v-for="notification in notifications" :key="notification.id" :class="{ unread: !notification.read }">

        <div>
            <img :src="postListProfileSrc" alt="Dog" class="postListCompoProfile" />
        </div>
        <div class="post-list-compo-detail">
            <span>{{ notification.commenterNickname }}</span>
            <span>님이 회원님의 게시글에 댓글을 남겼습니다. :</span>
            <span> {{ notification.commentContent }}</span>
        </div>
        <div>
            <img :src="postImageSrc" alt="" class="notification-list-compo-postimg">
        </div>
    </div>
</div>

</template>

<script>
import axios from '@/axios.js';

export default {
    data(){
        return {
            postListProfileSrc: require("@/assets/postListCompo/postListProfile.png"),
            commentSrc: require("@/assets/postListCompo/comment.png"),
            postImageSrc: require("@/assets/writePostCompo/6.png"),
            notifications: [],
        }
    },
    created() {
        this.fetchNotifications();
    },
    beforeDestroy() {
        // 컴포넌트가 파괴되기 전에 읽음 처리를 수행합니다.
        this.markAllAsRead();
    },
    methods: {
        fetchNotifications() {
            axios.get(`/api/notification`, {
                    headers: {
                        Authorization: `Bearer ${this.$store.getters.getAccessToken}`,
                    },
                })
                .then(response => {
                    console.log('Original notification data:', response.data);
                    this.notifications = response.data.reverse();
                })
                .catch(error => {
                    console.error('Error fetching notifications:', error);
                });
        },
        markAllAsRead() {
            axios.patch(`/api/notification/read-all`, {
                    headers: {
                        Authorization: `Bearer ${this.$store.getters.getAccessToken}`,
                    },
                })
                .then(() => {
                    this.notifications = this.notifications.map(notification => ({
                        ...notification,
                        read: true,
                    }));
                    this.$store.dispatch('fetchNotifications');

                })
                .catch(error => {
                    console.error('Error marking all notifications as read:', error);
                });
        }
    },
}
</script>

<style scoped>
.notification-list-compo{
    padding-bottom: 68px;
    background-color: white;
}
.notification-compo-list{
    display: flex;
    position: relative;
    margin: 1%;
    width: 100%;
    height: 70px;

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
.unread {
    background-color: #f0f0f0; /* 새 알림을 구분하기 위한 배경색 */
}
</style>