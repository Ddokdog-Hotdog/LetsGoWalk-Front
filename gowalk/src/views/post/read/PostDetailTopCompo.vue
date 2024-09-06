<template>
    <div class="post-top-compo">
        <back-compo/>
        <div style="margin: 0 0 5px 0;">{{ board.type }}</div>
        <div style="width: 40px;"></div>
    </div>
</template>

<script>
import BackCompo from "../../../components/layout/BackCompo.vue"

export default {
    components: {
        BackCompo
    },
    data() {
        return {
            name: 'PostDetailTopCompo',
            board: {
                type: "자유게시판"
            },
        }
    }
}
</script>

<style scoped>
.post-top-compo{
    display: flex;
    justify-content: space-between;
    background-color: #f1f1f1;
    height: 35px;
    font-size: 15px;
    align-items: flex-end;
}
.post-top-compo div{
    margin: 5px 10px 0 10px;
    font-weight: 700;
}
</style>