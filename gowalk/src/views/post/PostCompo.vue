<template>
    <div>
        <type-compo/>
        <post-list-compo/>
    </div>
</template>

<script>
import PostListCompo from "./PostListCompo.vue";
import TypeCompo from "@/components/layout/TypeCompo.vue"

export default {
    components: {
        PostListCompo,
        TypeCompo,
    },
    data() {
        return {
            name: "PostCompo",
        }
    }
};
</script>

<style scoped></style>
