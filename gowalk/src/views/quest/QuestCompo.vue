<template>
    <div class="questPage">
        <div class="carouselBoard">
            <img src="~@/assets/carousel/quest-poster.png" id="carousel" />
        </div>
        <div class="questList">
            <div v-for="quest in quests" :key="quest.id" class="quest">
                <div class="questName">
                    <img :src="getQuestImage(quest)" id="quest-img" />
                    <p id="questDescription">
                        {{ quest.questName }}하고 <span class="highlight">{{ quest.questPoint }}p</span> 받기
                    </p>
                </div>
                <button
                    class="quest-button"
                    :class="getButtonClass(quest)"
                    :disabled="(quest.isCompleted && quest.reward) || isProcessing"
                    @click="handleQuestButtonClick(quest)"
                >
                    {{ getButtonLabel(quest) }}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "@/axios";
//import { debounce } from "lodash";

export default {
    data() {
        return {
            quests: [],
            isProcessing: false,
        };
    },
    methods: {
        async fetchQuests() {
            try {
                const response = await axios.get("/api/quests", {
                    headers: {
                        Authorization: `Bearer ${this.$store.getters.getAccessToken}`,
                    },
                });
                console.log("Response headers:", response.config.headers);
                this.quests = response.data;
            } catch (error) {
                console.error("퀘스트 정보 로드 실패:", error);
            }
        },
        getQuestImage(quest) {
            switch (quest.questId) {
                case 1:
                    return require("@/assets/quest/calendar.png");
                case 2:
                    return require("@/assets/quest/walking.png");
                case 3:
                    return require("@/assets/quest/posting.png");
                case 4:
                    return require("@/assets/quest/point.png");
                default:
                    return require("@/assets/quest/point.png"); // 기본 이미지 설정
            }
        },
        getButtonLabel(quest) {
            // 퀘스트의 상태에 따라 버튼의 라벨을 변경
            if (quest.completed === true && quest.reward == false) return "포인트받기";
            if (quest.completed === true && quest.reward == true) return "완료";
            return "바로가기";
        },
        getButtonClass(quest) {
            if (quest.completed === true && quest.reward === false) return "orange-button";
            if (quest.completed === true && quest.reward === true) return "gray-button";
            return "yellow-button";
        },

        async handleQuestButtonClick(quest) {
            if (quest.isProcessing) {
                console.log("이미 처리 중입니다.");
                return;
            }
            this.$set(quest, "isProcessing", true); // Vue의 반응성 시스템을 사용하여 상태를 업데이트
            const originalRewardState = quest.reward;
            try {
                if (quest.completed && !quest.reward) {
                    //quest.reward = true;
                    await this.claimReward(quest);
                    window.location.reload();
                } else if (!quest.completed && quest.questId === 2) {
                    this.$router.push("/walk");
                } else if (!quest.completed && quest.questId === 3) {
                    this.$router.push("/post/1");
                }
                this.fetchQuests(); // 상태를 서버에서 최신으로 업데이트
            } catch (error) {
                console.error("퀘스트 처리 중 오류가 발생했습니다:", error);
                quest.reward = originalRewardState;
            } finally {
                this.$set(quest, "isProcessing", false); // 처리 완료 후 상태를 재설정
            }
        },
        completeQuest(questId) {
            try {
                const response = axios.put("/api/quests", null, {
                    params: {
                        questId: questId,
                        memberId: this.$store.state.memberId,
                    },
                    headers: {
                        Authorization: `Bearer ${this.$store.getters.getAccessToken}`,
                        "Content-Type": "application/json", // 필요한 경우 추가
                    },
                });
                console.log("Reward claimed:", response.data);
                this.fetchQuests(); // 퀘스트 상태를 업데이트
            } catch (error) {
                console.error("Error claiming reward:", error.response);
            }
        },
        async claimReward(quest) {
            try {
                const response = await axios.put("/api/quests", null, {
                    params: {
                        questId: quest.questId,
                        memberId: this.$store.state.memberId,
                    },
                    headers: {
                        Authorization: `Bearer ${this.$store.getters.getAccessToken}`,
                        "Content-Type": "application/json", // 필요한 경우 추가
                    },
                });
                console.log("Reward claimed:", response.data);
                //this.fetchQuests(); // 퀘스트 상태를 업데이트
            } catch (error) {
                console.error("Error claiming reward:", error.response);
            }
        },
    },
    created() {
        this.fetchQuests();
    },
};
</script>

<style scoped>
.questPage {
    background-color: #62bd95;
    height: 100%;
    width: 100%;
}
#carousel {
    width: 100%;
}
.questList {
    width: 100%;
    display: flex;
    flex-direction: column;
}

.quest {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 15px;
    background-color: #fff;
    margin: 15px;
}

.questName {
    display: flex;
    align-items: center;
}

#questDescription {
    margin: 0;
}

#quest-img {
    width: 50px;
    height: 50px;
    margin-right: 10px;
}

.highlight {
    font-weight: 800;
    color: #62bd95;
}

.quest-button {
    padding: 5px 10px;
    background-color: #62bd95;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.quest-button.orange-button {
    background-color: #ff851b; /* 주황색 */
}

.quest-button.gray-button {
    background-color: #ccc; /* 회색 */
    cursor: not-allowed;
}

.quest-button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

.quest-button.is-processing {
    background-color: #ccc; /* 처리 중일 때 회색으로 표시 */
    cursor: not-allowed;
}
</style>
