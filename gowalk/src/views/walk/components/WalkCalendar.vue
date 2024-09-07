<template>
    <div class="calendar" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
        <div class="header">
            <button @click="changeMonth(-1)">&lt;</button>
            <span>{{ currentYear }}.{{ currentMonth + 1 }}</span>
            <button @click="changeMonth(1)">&gt;</button>
        </div>
        <div class="calendar-container" :style="{ transform: `translateX(${translateX}px)` }">
            <div class="month-view">
                <div class="weekdays">
                    <span
                        v-for="(day, index) in weekdays"
                        :key="day"
                        :class="{ weekend: index === 0 || index === 6 }"
                        >{{ day }}</span
                    >
                </div>
                <div class="days">
                    <div
                        v-for="{ date, isCurrentMonth, hasWalk } in calendarDays"
                        :key="date.toISOString()"
                        class="day"
                        :class="{
                            'current-month': isCurrentMonth,
                            'has-walk': hasWalk,
                            weekend: date.getDay() === 0 || date.getDay() === 6,
                            sunday: date.getDay() === 0,
                            saturday: date.getDay() === 6,
                            selected: isSelected(date),
                        }"
                        @click="selectDate(date)"
                    >
                        <span class="date-number">{{ date.getDate() }}</span>
                        <img v-if="hasWalk" :src="calendarDayOfWalk" alt="Walk Image" class="paw-icon" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import calendarDayOfWalk from "@/assets/icon/calendar-walkday.png";
export default {
    data() {
        return {
            currentDate: new Date(),
            weekdays: ["일", "월", "화", "수", "목", "금", "토"],
            walkDates: [],
            touchStartX: 0,
            touchEndX: 0,
            translateX: 0,
            selectedDate: null,
            calendarDayOfWalk,
        };
    },
    computed: {
        currentYear() {
            return this.currentDate.getFullYear();
        },
        currentMonth() {
            return this.currentDate.getMonth();
        },
        calendarDays() {
            const year = this.currentYear;
            const month = this.currentMonth;
            const firstDay = new Date(year, month, 1);
            const lastDay = new Date(year, month + 1, 0);

            const days = [];
            const startDay = new Date(firstDay);
            startDay.setDate(startDay.getDate() - startDay.getDay());

            while (startDay <= lastDay) {
                days.push({
                    date: new Date(startDay),
                    isCurrentMonth: startDay.getMonth() === month,
                    hasWalk: this.walkDates.some(
                        (walkDate) =>
                            walkDate.getDate() === startDay.getDate() &&
                            walkDate.getMonth() === startDay.getMonth() &&
                            walkDate.getFullYear() === startDay.getFullYear()
                    ),
                });
                startDay.setDate(startDay.getDate() + 1);
            }

            return days;
        },
    },
    methods: {
        changeMonth(delta) {
            this.currentDate = new Date(this.currentYear, this.currentMonth + delta, 1);
            this.fetchWalkData();
        },
        selectDate(date) {
            this.selectedDate = date;
            this.$emit("date-selected", date);
        },
        isSelected(date) {
            return (
                this.selectedDate &&
                date.getDate() === this.selectedDate.getDate() &&
                date.getMonth() === this.selectedDate.getMonth() &&
                date.getFullYear() === this.selectedDate.getFullYear()
            );
        },
        fetchWalkData() {
            // API 호출 로직 (현재는 임시 데모 데이터 사용)
            this.walkDates = [
                new Date(this.currentYear, this.currentMonth, 3),
                new Date(this.currentYear, this.currentMonth, 5),
                new Date(this.currentYear, this.currentMonth, 7),
                new Date(this.currentYear, this.currentMonth, 10),
            ];
        },
        touchStart(event) {
            this.touchStartX = event.touches[0].clientX;
        },
        touchMove(event) {
            this.touchEndX = event.touches[0].clientX;
            this.translateX = this.touchEndX - this.touchStartX;
        },
        touchEnd() {
            const threshold = 100; // 슬라이드 감지 임계값
            if (this.translateX > threshold) {
                this.changeMonth(-1); // 이전 달
            } else if (this.translateX < -threshold) {
                this.changeMonth(1); // 다음 달
            }
            this.translateX = 0; // 위치 초기화
        },
    },
    created() {
        this.fetchWalkData();
    },
};
</script>

<style scoped>
.calendar {
    margin: auto;
    overflow: hidden;
    background-color: #f0f0f0;
    border-radius: 10px;
    padding-bottom: 2px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.calendar-container {
    transition: transform 0.3s ease;
}
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    font-size: 1.2em;
    font-weight: bold;
}
.weekdays {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    text-align: center;
    font-weight: bold;
    margin-bottom: 10px;
}
.weekdays .weekend {
    color: #ff0000;
}
.weekdays span:last-child {
    color: #0000ff;
}
.days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 1px;
}
.day {
    aspect-ratio: 1.2 / 1;
    position: relative;
    background-color: #ffffff;
    border: 1px solid #e0e0e0;
    transition: background-color 0.2s;
    cursor: pointer;
}
.day:hover {
    background-color: #e6e6e6;
}
.date-number {
    position: absolute;
    top: 5px;
    left: 5px;
    font-size: 0.9em;
}
.current-month {
    font-weight: bold;
}
.has-walk .paw-icon {
    position: absolute;
    width: 50%;
    height: 50%;
    bottom: 5px;
    right: 5px;
    font-size: 1.2em;
}
.weekend {
    font-weight: bold;
}
.sunday {
    color: #ff0000;
}
.saturday {
    color: #0000ff;
}
.selected {
    background-color: #e6f7ff;
    border: 2px solid #1890ff;
}
</style>
