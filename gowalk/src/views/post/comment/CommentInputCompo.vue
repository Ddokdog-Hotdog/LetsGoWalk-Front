<template>
    <div class="comment-input-compo">
        <div class="comment-input-input">
            <input v-model="newComment" type="text" placeholder="댓글을 입력하세요.">
        </div>
        <div class="comment-input-button">
            <button @click="submitComment">등록</button>
        </div>
    </div>
</template>

<script>
import axios from '@/axios.js';

export default {
    data() {
        return {
            newComment: '',
            localComments: [],
        }
    },
    props: {
        postId: {
            type: Number,
            required: true
        },
        parentCommentId: Number,
    },
    methods: {
        submitComment() {
            if (!this.newComment.trim()) {
                alert('댓글 내용을 입력해주세요.');
                return;
            }
            const payload = {
                postId: this.postId,
                contents: this.newComment,
                commentsid: this.parentCommentId, // 댓글의 경우 null, 답글의 경우 해당 댓글의 ID
                createdAt: new Date().toISOString(),
                };
            axios.post('/api/comment/write', payload)
                .then(response => {
                    console.log('Received comment data:', response.data);  // 데이터 구조 확인
                    
                    this.localComments.push({
                        ...response.data,
                    });
                    this.newComment = '';
                    this.$emit('comment-added', {
                        id: response.data.id,
                        content: payload.contents,
                        nickname: response.data.nickname,
                        profileImg: response.data.profileImageUrl,
                        createdAt: response.data.createdAt
                    });
                })
                .catch(error => {
                    console.error('댓글 등록 실패:', error);
                    console.error('현재 localComments 상태:', this.localComments);
                });
        },
    }
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

.comment-input-input input {
    width: 100%;
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