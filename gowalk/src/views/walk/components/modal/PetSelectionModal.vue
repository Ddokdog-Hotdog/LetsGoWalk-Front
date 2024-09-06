<template>
    <ModalCompo :is-visible="isVisible" @close="closeModal">
        <div class="pet-selection">
            <button class="close-button" @click="closeModal">✕</button>
            <h2>산책할 강아지 선택</h2>
            <div class="pet-list">
                <div
                    v-for="pet in pets"
                    :key="pet.petId"
                    :class="{ selected: selectedPets.includes(pet.petId) }"
                    class="pet-item"
                >
                    <div class="pet-image-container" @click="togglePetSelection(pet.petId)">
                        <img :src="pet.profileImageUrl" :alt="pet.name" class="pet-image" />
                        <div class="check-icon">✓</div>
                    </div>
                    <p class="pet-name">{{ pet.name }}</p>
                </div>
            </div>
            <walk-start-button @button-clicked="startWalk" />
        </div>
        <button class="close-button" @click="closeModal">✕</button>
    </ModalCompo>
</template>

<script>
import ModalCompo from "@/components/layout/ModalCompo.vue";
import WalkStartButton from "@/views/walk/components/button/WalkStartButton.vue";
export default {
    name: "PetSelectionModal",
    components: {
        ModalCompo,
        WalkStartButton,
    },
    props: {
        isVisible: {
            type: Boolean,
            default: false,
        },
        pets: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            selectedPets: [],
        };
    },
    methods: {
        closeModal() {
            this.$emit("close");
            this.selectedPets = [];
        },
        togglePetSelection(petId) {
            const index = this.selectedPets.indexOf(petId);
            if (index === -1) {
                this.selectedPets.push(petId);
            } else {
                this.selectedPets.splice(index, 1);
            }
        },
        startWalk() {
            if (this.selectedPets.length < 1) {
                alert("강아지를 1마리 이상 선택해야합니다.");
                return;
            }
            this.$emit("start-walk", this.selectedPets);
            this.closeModal();
        },
    },
};
</script>

<style scoped>
.pet-selection {
    position: relative;
    padding: 0;
    background: white;
    border-radius: 8px;
    width: 90%;
    max-width: 500px;
    margin: 0 auto;
}

.close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
}

.pet-list {
    display: flex;
    overflow-x: auto;
    margin-top: 20px;
}

.pet-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    margin-right: 2vh;
    position: relative;
    min-width: 50px;
    max-width: 100px;
}

.pet-image-container {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}

.pet-image {
    width: 8vh;
    height: 8vh;
    border-radius: 50%;
    transition: filter 0.3s ease;
}

.selected .pet-image {
    filter: brightness(0.5); /* 이미지 어둡게 처리 */
}

.check-icon {
    position: absolute;
    font-size: 40px;
    color: rgb(255, 255, 255);
    font-weight: bold;
    display: none;
}

.selected .check-icon {
    display: block;
}

.pet-name {
    margin-top: 0px;
    text-align: center;
    font-size: 1.5vh;
}
</style>
