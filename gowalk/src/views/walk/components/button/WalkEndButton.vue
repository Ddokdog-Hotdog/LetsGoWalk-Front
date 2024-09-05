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
            산책종료
        </button>
    </div>
</template>

<script>
export default {
    name: "WalkEndButton",
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
    background-color: #ffffff;
    border: none;
    color: #3cbc83;
    padding: 5px 0px;
    text-align: center;
    display: inline-block;
    font-size: 30px;
    font-weight: bold;
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
