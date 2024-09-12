<template>
    <div class="postList" ref="scrollContainer">
        <div class="post-list-compo" v-for="post in posts" :key="post.id" @click="navigateToDetail(post.postid)">
            <div>
                <img :src="postListProfileSrc" alt="Profile Image" class="postListCompoProfile" />
            </div>
            <div class="post-list-compo-detail">
                <h3>{{ post.title }}</h3>
                <div class="post-list-compo-detail-info">
                    <div>
                        <span>{{ post.nickname }}</span>
                    </div>
                    <div>
                        <span>⏱</span><span>{{ formatDate(post.updatedAt) }}</span>
                        <span>💙</span><span>{{ post.likesCount }}</span>
                        <span><img :src="commentSrc" alt="Comments" /></span><span>{{ post.commentsCount }}</span>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="loading">Loading...</div>
    </div>
</template>

<script>
import axios from "@/axios.js";

export default {
    props: {
        postType: Number,
    },
    data() {
        return {
            postListProfileSrc: require("@/assets/postListCompo/postListProfile.png"),
            commentSrc: require("@/assets/postListCompo/comment.png"),
            postCreateButtonSrc: require("@/assets/postListCompo/createPost.png"),
            posts: [],
            currentPage: 0,
            pageSize: 15,
            allDataLoaded: false,
            loading: false,
        };
    },
    mounted() {
        console.log('Mounted:', this.postType);
        if (this.postType !== null) {
            this.fetchPosts();
        }
        window.addEventListener('scroll', this.handleScroll);
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll); // 컴포넌트 제거 시 이벤트 리스너 제거
    },
    watch: {
        postType: {
            immediate: true,
            handler(newVal) {
                if (newVal !== null) {
                    this.resetData();
                }
            }
        }
    },
    methods: {
        formatDate(value) {
            if (!value) return '';
            return new Date(value).toLocaleString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
            });
        },
        resetData() {
            this.posts = [];
            this.currentPage = 0;
            this.allDataLoaded = false;
            this.fetchPosts();
        },
        async fetchPosts() {
            if (this.loading || this.allDataLoaded || !this.postType) {
                console.log('Fetch skipped:', {loading: this.loading, allDataLoaded: this.allDataLoaded, postType: this.postType});
                return;
            }
            this.loading = true;
            console.log('Starting fetch for post type:', this.postType);

            try {
                const response = await axios.get(`/api/post/board/${this.postType}?page=${this.currentPage}&size=${this.pageSize}`);
                console.log('Fetched posts:', response.data);
                if (response.data.length > 0) {
                    this.posts = [...this.posts, ...response.data];
                    this.currentPage++;
                    this.allDataLoaded = response.data.length < this.pageSize;
                } else {
                    this.allDataLoaded = true;
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
            } finally {
                this.loading = false;
                console.log('Fetch completed', {currentPage: this.currentPage, allDataLoaded: this.allDataLoaded});
            }
        },
        handleScroll() {
            const container = this.$refs.scrollContainer;
            if (!container) return;

            const { scrollTop, clientHeight, scrollHeight } = container;

            // 스크롤이 거의 끝에 도달했는지 확인
            if (scrollTop + clientHeight >= scrollHeight - 20) {
                // Debounce to limit how often we call fetchPosts
                clearTimeout(this.debounceTimer);
                this.debounceTimer = setTimeout(() => {
                    if (!this.isFetching && !this.allDataLoaded) {
                        console.log('Triggering scroll fetch');
                        this.fetchPosts();
                    }
                }, 300);
            }
        },
        navigateToDetail(postid) {
            this.$router.push(`/post/${this.postType}/${postid}`);
        }
    }
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
.post-list {
    overflow: auto;
    height: calc(100vh - 100px); /* Adjust height as needed */
}
</style>
