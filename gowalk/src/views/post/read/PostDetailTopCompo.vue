<template>
    <div class="post-top-compo">
        <back-compo/>
    </div>
</template>

<script>
import BackCompo from "../../../components/layout/BackCompo.vue"

export default {
    components: {
        BackCompo
    },
    props: {
        boardType: String
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