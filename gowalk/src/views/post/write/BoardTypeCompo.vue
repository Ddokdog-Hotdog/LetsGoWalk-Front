<template>
    <div>
        <div class="board-type-title">게시판 선택</div>
        <div class="board-type-content-compo">
            <div v-for="item in items" :key="item.id" :class="{ 'selected': selectedType === item.id }" @click="goToPost(item.id)">
                {{ item.label }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            selectedType: "1",
            items: [
                { id: '1', label: '산책인증' },
                { id: '2', label: '정보공유' },
            ]
        }
        
    },
    methods: {
        goToPost(type) {
            if (this.selectedType !== type) {
                this.selectedType = type;
                // this.$router.push({ name: 'PostCompo', params: { postType: type } });
                this.$emit("type-selected", type)
            }
        },
    }
}
</script>

<style>
.board-type-title{
    text-align: left;
    font-size: 13px;
    margin: 10px 0 0 5px;
}
.board-type-content-compo{
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 5px;
    height: 40px;
    text-align: center;
}
.board-type-content-compo div{
    border: 1px solid #ceeedf;
    border-radius: 30px;
    width: 24%;
    height: 29px;
    line-height: 29px;
    background-color: white;
    color: #3CBC83;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
}
.board-type-content-compo div.selected {
    background-color: #3CBC83;
    color: white;
}
</style>