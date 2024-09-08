<template>
    <div>
        <notification-top-compo/>
        <notification-list-compo/>
    </div>
</template>

<script>
import NotificationListCompo from "./NotificationListCompo.vue";
import NotificationTopCompo from "./NotificationTopCompo.vue";
export default {
    components: {
        NotificationTopCompo,
        NotificationListCompo,
    },
    data(){
        return {

        }
    },
};
</script>

<style scoped></style>
