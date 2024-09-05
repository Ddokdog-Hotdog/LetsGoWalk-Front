<template>
    <router-link to="/post/write">
        <div class="post-create-btn">
            <img class="createPost" :src="postCreateButtonSrc">
        </div>
    </router-link>
</template>

<script>
export default {
    data() {
        return {
            postCreateButtonSrc: require("@/assets/postListCompo/createPost.png"),
        }
    }

}
</script>

<style scoped>
.post-create-btn{
    float: right;
    margin-right: 60px;
}
.createPost{
    position: fixed; /* fixed를 사용하여 버튼을 화면에 고정 */
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: white;
    color: white;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    transition: background-color 0.3s ease;
    bottom: 80px;
}
</style>