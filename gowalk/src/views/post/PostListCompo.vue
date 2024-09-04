<template>
    <div>
        <div class="postListCompo">
            <img :src="postListProfileSrc" alt="Dog" class="postListCompoProfile"/>
            <div class="postListCompoDetail">
                <h2>오산안 인중이요~</h2>
                <div>
                    <span>작성자닉네임 </span>
                    <span>⏱23분 전 </span>
                    <span>💙 23 </span>
                    <span><span>댓글수: </span> 1</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            postListProfileSrc: require("@/assets/postListCompo/postListProfile.png")
        }
    }

}
</script>

<style scoped>
.postListCompo{
    display: flex;
    align-items: center;
    margin: 0 0 0 3vw;
}
.postListCompoProfile{
    width: 13vw;
    height: 7vh;
}
.postListCompoDetail{
    text-align: left;
    margin: 0 0 0 3vw;
    
}
.postListCompoDetail h2 {
    
}
.postListCompoDetail span{
    color: #7f7f7f;
}
</style>