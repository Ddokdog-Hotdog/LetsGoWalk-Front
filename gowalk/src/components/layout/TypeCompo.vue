<template>
    <div class="type-compo">
        <div v-for="item in items" :key="item.id" :class="{ 'selected': selectedType === item.id }" @click="selectType(item.id)">
            {{ item.label }}
        </div>
    </div>
</template>

<script>
import axios from "@/axios"

export default {
    data() {
        return {
            selectedType: null,
            items: [],
        };
    },
    created() {
        this.fetchBoardTypes();
    },
    methods: {
        async fetchBoardTypes() {
            try {
                const response = await axios.get('/api/post/board');
                this.items = response.data.map(board => ({
                    id: parseInt(board.id),
                    label: board.name
                }));
                if (this.items.length > 0 && !this.selectedType) {
                    this.selectedType = this.items[0].id; // 첫 번째 타입을 기본 선택
                }
            } catch (error) {
                console.error("Error fetching board types:", error);
            }
        },
        selectType(type) {
        if (this.selectedType !== type) {
            this.selectedType = type;
            this.$emit('typeSelected', type);
            // 오류를 catch하고 무시하기
            this.$router.push({ name: 'PostCompo', params: { postType: type } })
                .catch(err => {
                    if (err.name !== 'NavigationDuplicated') {
                        throw err;
                    }
                }
            );
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