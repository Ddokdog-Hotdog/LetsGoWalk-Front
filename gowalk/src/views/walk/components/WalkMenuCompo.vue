<template>
    <nav class="menu-compo">
        <button
            v-for="item in items"
            :key="item.id"
            :class="{ selected: isSelected(item.route) }"
            @click="goToRoute(item.route)"
        >
            {{ item.label }}
        </button>
    </nav>
</template>

<script>
export default {
    name: "WalkMenuCompo",
    data() {
        return {
            items: [
                { id: "1", label: "나의 산책", route: "/walk" },
                { id: "2", label: "산책캘린더", route: "/walk/summary" },
                { id: "3", label: "핫플레이스", route: "/walk/hotplace" },
                { id: "4", label: "주변산책", route: "/walk/nearby" },
            ],
        };
    },
    methods: {
        isSelected(route) {
            const isSelected = this.$route.path === route;
            console.log(`Route ${route} selected: ${isSelected}`);
            return isSelected;
        },
        goToRoute(route) {
            if (this.$route.path !== route) {
                this.$router.push(route).catch((err) => {
                    console.error("Navigation failed:", err);
                });
            }
        },
    },
};
</script>

<style scoped>
.menu-compo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 5px;
    height: 40px;
}

.menu-compo button {
    border: 1px solid #ceeedf;
    border-radius: 30px;
    width: 24%;
    height: 29px;
    line-height: 29px;
    background-color: white;
    color: #3cbc83;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
}

.menu-compo button.selected {
    background-color: #3cbc83;
    color: white;
}
</style>
