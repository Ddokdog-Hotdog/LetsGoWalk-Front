<template>
    <div class="card">
        <div class="stats-container">
            <div class="stat">
                <div class="stat-label">오늘의 산책 시간</div>
                <div class="stat-value">
                    <span class="number">{{ walkTimeHours }}</span
                    ><span class="unit">h</span> <span class="number">{{ walkTimeMinutes }}</span
                    ><span class="unit">m</span>
                </div>
            </div>
            <div class="stat">
                <div class="stat-label">오늘의 산책 거리</div>
                <div class="stat-value">
                    <span class="number">{{ walkDistanceComputed }}</span
                    ><span class="unit">Km</span>
                </div>
            </div>
        </div>
        <hr class="divider" />
        <div class="calories">
            <span>몸무게가 {{ calories }}</span>
            <span class="unit">KCAL</span>
            <span> 를 소비했어요</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "ExerciseStatsCard",
    props: {
        walkTime: {
            type: Number,
            required: true,
        },
        walkDistance: {
            type: Number,
            required: true,
        },
        calories: {
            type: Number,
            required: true,
        },
    },
    computed: {
        walkTimeHours() {
            return Math.floor(this.walkTime / 3600);
        },
        walkTimeMinutes() {
            return Math.floor((this.walkTime % 3600) / 60)
                .toString()
                .padStart(2, "0");
        },
        walkDistanceComputed() {
            return this.walkDistance.toFixed(2);
        },
    },
};
</script>

<style scoped>
.card {
    background-color: white;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.stats-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
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
    margin: 15px 0;
}

.calories {
    text-align: center;
    font-size: 0.9rem;
    color: #666;
    margin-top: 15px;
}

.calories .unit {
    font-size: 0.7rem;
}
</style>
