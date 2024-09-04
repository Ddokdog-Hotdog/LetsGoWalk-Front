<template>
    <div>
        <post-list-compo/>
    </div>
</template>

<script>
import PostListCompo from "./PostListCompo.vue";

export default {
    components: {
        PostListCompo,
    },
    data() {
        return {
            name: "PostCompo",
        }
    }
};
</script>
