<template>
    <div class="post-top-compo">
        <div @click="cancel">취소</div>
        <div @click="register">등록</div>
    </div>
</template>

<script>
export default {
    methods: {
        cancel() {
            this.$emit('cancel');
        },
        register() {
            this.$emit('register');
        }
    }
}
</script>

<style scoped>
.post-top-compo{
    display: flex;
    justify-content: space-between;
}
.post-top-compo div{
    margin: 10px 10px 0 10px;
    font-weight: 700;
    cursor: pointer;
}
</style>