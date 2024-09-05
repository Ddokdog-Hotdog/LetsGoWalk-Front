<template>
    <div class="post-write-compo">
        <post-top-compo/>
        <board-type-compo/>
        <post-input-compo/>
    </div>
</template>

<script>
import PostTopCompo from "./PostTopCompo.vue"
import BoardTypeCompo from "./BoardTypeCompo.vue"
import PostInputCompo from "./PostInputCompo.vue"

export default {
    components: {
        PostTopCompo,
        BoardTypeCompo,
        PostInputCompo,
    },
    data(){
        return {
            name: "PostWrtieCompo",
            
        }
    }
}
</script>

<style scoped>
.post-write-compo{
    height: 100%;
}
</style>