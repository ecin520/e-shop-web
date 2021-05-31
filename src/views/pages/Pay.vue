<template>
    <div v-html="payInfo">
        {{payInfo}}
    </div>
</template>

<script>
    export default {
        name: "Pay",
        data() {
            return {
                payInfo: ''
            }
        },
        mounted() {
            this.payInfo = this.$route.query.payInfo;
            this.$nextTick(()=> {
                document.forms[0].submit()
            })
        }
    }
</script>

<style scoped>

</style>