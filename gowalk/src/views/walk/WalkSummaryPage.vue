<template>
    <div class="map-wrapper">
        <WalkMenuCompo />
        <WalkCalendar @date-selected="testcal" class="overlay-card" />
        <KakaoMap class="kakao-map" />
    </div>
</template>

<script>
import WalkCalendar from "@/views/walk/components/WalkCalendar.vue";
import KakaoMap from "@/views/walk/components/KakaoMap.vue";
import WalkMenuCompo from "@/views/walk/components/WalkMenuCompo.vue";
import { walkStart } from "@/views/walk/util/walkApi";
import { mapActions, mapGetters } from "vuex";

export default {
    name: "WalkSummaryPage",
    components: {
        KakaoMap,
        WalkCalendar,
        WalkMenuCompo,
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
        testcal(selectedDate) {
            console.log(selectedDate);
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
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
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
