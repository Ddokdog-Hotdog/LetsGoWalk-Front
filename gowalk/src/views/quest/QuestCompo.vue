<template>
    <div class="questPage">
        <div class="carouselBoard"></div>
        <div class="questList">
            <div class="quest">
                <div class="questName">
                    <img src="~@/assets/quest/calendar.png" id="img" />
                    <p id="qusetDescription">출석체크하고 <span class="highlight">10p</span> 받기</p>
                </div>
                <button><img src="~@/assets/quest/get-point.png" id="button" /></button>
            </div>
        </div>

        <ul>
            <li v-for="quest in quests" :key="quest.questId">{{ quest.questName }} - {{ quest.description }}</li>
        </ul>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'QuestList',
    computed: {
        ...mapGetters('quests', ['allQuests']),
    },
    created() {
        this.fetchQuests();
    },
    methods: {
        ...mapActions('quests', ['fetchQuests']),
    },
};
</script>
<style scoped>
.questPage {
    padding-bottom: 10%;
    margin: 0;
    width: 100%;
    height: 100%;
    background-color: #62bd95;
}
.carouselBoard {
    width: 100%;
    background-image: url('~@/assets/carousel/quest-poster.png');
    background-size: cover;
    height: 350px;
}
.questList {
    justify-content: center;
    width: 100%;
}
.quest {
    display: flex;
    width: 80%;
    height: 90px;
    background-color: white;
    margin: 20px auto;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
    transition: box-shadow 0.3s;
    justify-content: space-between;
    align-items: center;
}

.questName {
    margin: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}
#img {
    width: 60px;
}
#qusetDescription {
    margin-bottom: 0;
    margin-left: 10px;
    font-weight: bold;
}
.highlight {
    color: #3cbc83;
}
#button {
    margin: 8px;
    padding-top: 5px;
    width: 150px;
}
</style>
