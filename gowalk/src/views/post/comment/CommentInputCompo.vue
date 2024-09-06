<template>
    <div class="comment-input-compo">
        <div class="comment-input-input">
            <input type="text" placeholder="댓글을 입력하세요.">
        </div>
        <div class="comment-input-button">
            <button>등록</button>
        </div>
        
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.comment-input-input{
    width: 100%;
    margin: 0 0 0 10px;
    border: 1px solid #f1f1f1;
    border-radius: 10px;
    align-content: center;
    text-align: left;
    padding: 5px;

}
.comment-input-compo{
    display: flex;
}
.comment-input-button{
    width: 60px;
    height: 35px;
    background-color: #3cbc83;
    font-size: 14px;
    color: #ffffff;
    font-weight: 700;
    align-content: center;
    border-radius: 10px;
    margin: 0 10px 0 10px;
}
</style>