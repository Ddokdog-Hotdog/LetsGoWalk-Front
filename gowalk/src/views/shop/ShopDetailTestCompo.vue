<template>
    <div>
        <backButtonCompo />
        <!-- <div>상품번호 : {{ data.id }}</div>
        <div>상품 이름 : {{ data.name }}</div> -->
        상품번호 : {{ data.id }}
    </div>
</template>

<script>
import backButtonCompo from "@/components/layout/BackCompo.vue";

export default {
    props: {
        id: String,
    },
    data() {
        return {
            data: {},
        };
    },
    components: {
        backButtonCompo,
    },
    created() {
        //const { dataObj } = this.$route.query.data; // created 훅에서 history.state를 읽음
        console.log("params : ", this.$route.params.id);
        this.data.id = this.$route.params.id;
        //console.log("dataObj : ", dataObj);
        //this.data = dataObj; // this를 통해 data에 저장
        console.log("data : ", this.data);
    },
};
</script>

<style></style>
