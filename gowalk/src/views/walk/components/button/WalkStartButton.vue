<template>
    <div class="button-container">
        <button
            @click="handleClick"
            @mousedown="isPressed = true"
            @mouseup="isPressed = false"
            @mouseleave="isPressed = false"
            :class="{ 'button-pressed': isPressed }"
            class="action-button"
        >
            산책가까
        </button>
    </div>
</template>

<script>
export default {
    name: "WalkStartButton",
    data() {
        return {
            isPressed: false,
        };
    },
    methods: {
        handleClick() {
            this.$emit("button-clicked");
        },
    },
};
</script>

<style scoped>
.button-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 10px;
}

.action-button {
    background-color: #3cbc83;
    border: none;
    color: white;
    padding: 5px 0px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 30px;
    cursor: pointer;
    width: 100%;
    border-radius: 35px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.action-button.button-pressed {
    transform: scale(0.95);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
