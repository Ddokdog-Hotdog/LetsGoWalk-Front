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
        postid: {
            type: Number,
            required: true
        }
    },
    methods: {
        submitComment() {
            if (!this.newComment.trim()) {
                alert('댓글 내용을 입력해주세요.');
                return;
            }
            const payload = {
                postid: this.postid,
                contents: this.newComment,
                commentsid: null, // 댓글의 경우 null, 답글의 경우 해당 댓글의 ID
                createdAt: new Date().toISOString(),
            };
            axios.post('/api/comment/write', payload)
                .then(response => {
                    // // 서버에서 생성된 댓글 데이터를 댓글 배열에 추가
                    // this.comments.push(response.data);
                    // this.newComment = '';
                    // // 이벤트를 발생시켜 부모 컴포넌트에도 반영하도록 할 수 있음
                    // this.$emit('comment-added', response.data);
                                    // Vue.set을 사용하여 변경 감지하기
                // Vue.set(this.localComments, this.localComments.length, response.data);

                // 배열에 새 항목 추가 후 전체 배열을 새로 할당
                this.localComments.push(response.data);
                this.localComments = [...this.localComments];

                this.newComment = '';
                this.$emit('comment-added', response.data);
                })
                .catch(error => {
                    console.error('댓글 등록 실패:', error);
                    console.error('현재 localComments 상태:', this.localComments);
                });
    }
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