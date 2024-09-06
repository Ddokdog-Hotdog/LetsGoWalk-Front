<template>
    <div class="post-detail-good-compo" @click="toggleLike">
        좋아요<div class="heart-icon" :class="{ 'liked': isLiked }">{{ isLiked ? '♥' : '♡' }}</div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            isLiked: false
        }
    },
    methods: {
        toggleLike() {
            this.isLiked = !this.isLiked;
        }
    },

}
</script>

<style scoped>
.post-detail-good-compo{
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #ff8787;
    width: 80px;
    height: 25px;
    text-align: center;
    border-radius: 15px;
    font-size: 13px;
    margin: 0 0 0 41%;
}
.heart-icon {
    margin-right: 5px;
    transition: color 0.3s;
    margin: 0;
}

.liked {
    color: red;
}
</style>