<template>
    <div class="card">
        <div class="stats-container">
            <div class="stat">
                <div class="stat-label">산책 시간</div>
                <div class="stat-value">
                    <span class="number">{{ walkTimeHours }}</span>
                    <span class="unit">h</span>
                    <span class="number">{{ walkTimeMinutes }}</span>
                    <span class="unit">m</span>
                    <span class="number">{{ walkTimeSeconds }}</span>
                    <span class="unit">s</span>
                </div>
            </div>
            <div class="stat">
                <div class="stat-label">산책 거리</div>
                <div class="stat-value">
                    <span class="number">{{ WalkDistance }}</span>
                    <span class="unit">Km</span>
                </div>
            </div>
        </div>
        <hr class="divider" />
        <transition name="slide-fade">
            <div v-if="showCalories" class="dog-calories">
                <div v-for="dog in dogs" :key="dog.pet.petId" class="dog-calorie-item">
                    <span>{{ dog.pet.name }}가 {{ Math.round(dog.caloriesBurned) }}</span>
                    <span class="unit">KCAL</span>
                    <span> 를 소비했어요</span>
                </div>
            </div>
        </transition>
        <button @click="toggleCalories" class="toggle-button">
            {{ showCalories ? "▲" : "▼" }}
        </button>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "ExerciseCard",
    data() {
        return {
            showCalories: false,
            currentTime: Date.now(),
            timer: null,
        };
    },
    computed: {
        ...mapState({
            totalDistance: (state) => state.walkStore.walks.distance,
            dogs: (state) => state.walkStore.walks.dogs,
            startTime: (state) => state.walkStore.walks.startTime,
            isWalking: (state) => state.walkStore.walks.isWalking,
        }),
        duration() {
            if (!this.startTime) return 0;
            return Math.floor((this.currentTime - new Date(this.startTime).getTime()) / 1000);
        },
        walkTimeHours() {
            return Math.floor(this.duration / 3600);
        },
        walkTimeMinutes() {
            return Math.floor((this.duration % 3600) / 60)
                .toString()
                .padStart(2, "0");
        },
        walkTimeSeconds() {
            return (this.duration % 60).toString().padStart(2, "0");
        },
        WalkDistance() {
            return (this.totalDistance / 1000).toFixed(2); // Km
        },
    },
    methods: {
        toggleCalories() {
            this.showCalories = !this.showCalories;
        },
        startTimer() {
            this.timer = setInterval(() => {
                this.currentTime = Date.now();
            }, 1000);
        },
        stopTimer() {
            if (this.timer) {
                clearInterval(this.timer);
                this.timer = null;
            }
        },
    },
    watch: {
        isWalking(newValue) {
            if (newValue) {
                this.startTimer();
            } else {
                this.stopTimer();
            }
        },
    },
    mounted() {
        if (this.isWalking) {
            this.startTimer();
        }
        console.log(this.dogs);
    },
    beforeDestroy() {
        this.stopTimer();
    },
};
</script>

<style scoped>
.card {
    background-color: white;
    border-radius: 10px;
    padding: 20px 20px 0px 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    position: relative;
    overflow: hidden;
    transition: all 0.5s ease-in-out;
    max-height: 300px;
}

.stats-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0px;
}

.stat {
    text-align: center;
}

.stat-label {
    font-size: 0.9rem;
    color: #666;
    margin-bottom: 5px;
}

.stat-value {
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: baseline;
}

.stat-value .number {
    font-size: 1.8rem;
}

.stat-value .unit {
    font-size: 1.3rem;
    margin-left: 2px;
    margin-right: 4px;
}

.divider {
    border: none;
    height: 1px;
    background-color: #e0e0e0;
    margin: 15px 15px 0px 15px;
}

.dog-calories {
    text-align: center;
    font-size: 0.9rem;
    color: #666;
    margin-top: 15px;
    transition: all 0.3s ease-out;
}

.dog-calorie-item {
    margin: 5px 0;
}

.toggle-button {
    display: block;
    margin: 4px auto;
    padding-right: 4px;
    background: none;
    border: none;
    color: #3c3e3f;
    cursor: pointer;
    font-size: 1rem;
    text-align: right;
    width: 100%;
}

.no-data {
    text-align: center;
    font-size: 1rem;
    color: #666;
    margin-top: 15px;
    margin-bottom: 3vh;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: all 0.3s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateY(-20px);
    opacity: 0;
}
</style>
