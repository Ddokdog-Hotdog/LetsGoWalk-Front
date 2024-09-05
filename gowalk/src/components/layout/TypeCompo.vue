<template>
    <div class="type-compo">
        <div v-for="item in items" :key="item.id" :class="{ 'selected': selectedType === item.id }" @click="goToPost(item.id)">
            {{ item.label }}
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
                { id: '3', label: '곧오픈예정' },
                { id: '4', label: '이다모' }
            ]
        }
        
    },
    methods: {
        goToPost(type) {
            if (this.selectedType !== type) {
                this.selectedType = type;
                this.$router.push({ name: 'PostCompo', params: { postType: type } });
            }
        },
    }
}
</script>

<style>
.type-compo{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 5px;
    height: 40px;
    text-align: center;
}
.type-compo div{
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
.type-compo div.selected {
    background-color: #3CBC83;
    color: white;
}
</style>