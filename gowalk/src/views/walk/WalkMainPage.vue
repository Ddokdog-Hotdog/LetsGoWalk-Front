<template>
    <div class="map-wrapper">
        <KakaoMap class="kakao-map" />
        <div class="overlay-container">
            <TodayExerciseCard class="overlay-card" />
            <WalkStartButton @button-clicked="walkStartButtonClick" class="overlay-button" />
            <PetSelectionModal
                :is-visible="selectModalVisible"
                @close="closeSelectModal"
                @start-walk="vaildAndstartWalk"
            />
        </div>
    </div>
</template>

<script>
import KakaoMap from "@/views/walk/components/KakaoMap.vue";
import WalkStartButton from "@/views/walk/components/button/WalkStartButton.vue";
import TodayExerciseCard from "@/views/walk/components/cards/TodayExerciseCard.vue";
import PetSelectionModal from "@/views/walk/components/modal/PetSelectionModal.vue";
import { walkStart } from "@/views/walk/util/walkApi";
import { mapActions, mapGetters } from "vuex";

export default {
    name: "WalkMainPage",
    components: {
        KakaoMap,
        TodayExerciseCard,
        WalkStartButton,
        PetSelectionModal,
    },
    data() {
        return {
            selectModalVisible: false,
        };
    },
    computed: {
        curLocation() {
            return this.$store.getters["walkStore/getCurLocation"];
        },
        isWalking() {
            return this.$store.getters["walkStore/isWalking"];
        },
    },
    async created() {
        this.isWalking && this.$router.push("/walk/onwalk");
    },
    methods: {
        ...mapActions("walkStore", ["startWalk"]),
        ...mapGetters("walkStore", ["getCurLocation"]),
        walkStartButtonClick() {
            this.selectModalVisible = true;
        },
        closeSelectModal() {
            this.selectModalVisible = false;
            this.selectedPets = [];
        },
        async vaildAndstartWalk(selectedPets) {
            //산책 시작 요청
            const { lat, lng } = this.curLocation;
            const response = await walkStart({
                memberId: 0,
                dogs: selectedPets,
                latitude: lat,
                longitude: lng,
            });
            //Vuex 산책 시작
            this.startWalk(response.data);
            this.$router.push("/walk/onwalk");
        },
    },
};
</script>

<style scoped>
.map-wrapper {
    position: relative;
    width: 100%;
    height: 85vh;
}

.kakao-map {
    width: 100%;
    height: 100%;
}

.overlay-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: auto;
    overflow: hidden;
}

.overlay-card {
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
    z-index: 10;
    pointer-events: auto;
}

.overlay-button {
    position: absolute;
    bottom: 0px;
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
    z-index: 10;
    pointer-events: auto;
}
</style>
