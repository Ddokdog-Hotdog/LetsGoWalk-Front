<template>
    <div class="notification-compo">
        <back-compo class="notification-compo-title"/>
    </div>
</template>

<script>
import BackCompo from "../../components/layout/BackCompo.vue"
export default {
    components: {
        BackCompo
    },
    data(){
        return{
            
        }
    }
}
</script>

<style scoped>
.notification-compo{
    padding-top: 25px;
    margin: 0 10px 0 10px;
}
.notification-compo-title{
    font-size: 20px;
}
</style>