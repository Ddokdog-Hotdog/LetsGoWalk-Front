<template>
    <div v-show="isVisible" class="card">
        <template v-if="hasData">
            <div class="stats-container">
                <div class="stat">
                    <div class="stat-label">오늘의 산책 시간</div>
                    <div class="stat-value">
                        <span class="number">{{ walkTimeHours }}</span>
                        <span class="unit">h</span>
                        <span class="number">{{ walkTimeMinutes }}</span>
                        <span class="unit">m</span>
                    </div>
                </div>
                <div class="stat">
                    <div class="stat-label">오늘의 산책 거리</div>
                    <div class="stat-value">
                        <span class="number">{{ dailyWalkDistance }}</span>
                        <span class="unit">Km</span>
                    </div>
                </div>
            </div>
            <hr class="divider" />
            <transition name="slide-fade">
                <div v-if="showCalories" class="dog-calories">
                    <div v-for="(calories, name) in dogCalories" :key="name" class="dog-calorie-item">
                        <span>{{ name }}가 {{ Math.round(calories) }}</span>
                        <span class="unit">KCAL</span>
                        <span> 를 소비했어요</span>
                    </div>
                </div>
            </transition>
            <button @click="toggleCalories" class="toggle-button">
                {{ showCalories ? "▲" : "▼" }}
            </button>
        </template>
        <div v-else class="no-data">오늘 아직 산책을 안했어요 :(</div>
    </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
    name: "ExerciseStatsCard",
    props: {
        isVisible: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            showCalories: false,
        };
    },
    computed: {
        walks() {
            return this.$store.getters["walkStore/dailyWalks"];
        },
        hasData() {
            return this.walks.length > 0;
        },
        dailyWalkTime() {
            return this.walks.reduce((total, walk) => total + walk.duration, 0);
        },
        walkTimeHours() {
            return Math.floor(this.dailyWalkTime / 3600);
        },
        walkTimeMinutes() {
            return Math.floor((this.dailyWalkTime % 3600) / 60)
                .toString()
                .padStart(2, "0");
        },
        dailyWalkDistance() {
            const distance = this.walks.reduce((total, walk) => total + walk.distance, 0);
            return (distance / 1000).toFixed(2); // Km
        },
        dogCalories() {
            const calories = {};
            this.walks.forEach((walk) => {
                walk.dogs.forEach((dog) => {
                    if (calories[dog.pet.name]) {
                        calories[dog.pet.name] += dog.caloriesBurned;
                    } else {
                        calories[dog.pet.name] = dog.caloriesBurned;
                    }
                });
            });
            return calories;
        },
    },
    async created() {
        const now = new Date();
        const today = {
            memberId: 0,
            year: now.getFullYear(),
            month: now.getMonth() + 1,
            day: now.getDate(),
        };
        this.fetchDailyWalks(today);
    },
    methods: {
        ...mapActions("walkStore", ["fetchDailyWalks"]),
        toggleCalories() {
            this.showCalories = !this.showCalories;
        },
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
