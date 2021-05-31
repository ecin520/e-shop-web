<template>
    <div>
        <TopInfo></TopInfo>
        <NavBar></NavBar>

        <v-container>
            <v-row justify="center">
                <v-col :cols="12" lg="9" xl="6">
                    <div style="display: table;margin: 0 auto;">
                        <span class="green--text d-block font-weight-bold text-h4">
                            <v-icon size="35" color="green">mdi-checkbox-marked-circle-outline</v-icon>
                            支付成功
                        </span>
                        <span class="grey--text d-block  ma-top-3">总价：{{callbackInfo.total_amount}}</span>
                        <span class="grey--text d-block ">订单号：{{callbackInfo.out_trade_no}}</span>
                        <span class="grey--text d-block ">支付流水号：{{callbackInfo.seller_id}}</span>
                        <span class="d-block ma-top-3">
                            <span @click="$router.push({path: '/order-list'})" class="red--text global-hover">查看订单</span>
                            <span @click="$router.push({path: '/'})" class="red--text global-hover ma-6">返回首页</span>
                        </span>
                    </div>
                </v-col>
            </v-row>
        </v-container>



        <Footer></Footer>

    </div>
</template>

<script>
    import TopInfo from "../../components/TopInfo";
    import NavBar from "../../components/NavBar";
    import Footer from "../../components/Footer";

    export default {
        name: "PaySuccess",
        components: {Footer, TopInfo, NavBar},
        data() {
            return {
                callbackInfo: {}
            }
        },
        methods: {
            init() {
                this.callbackInfo = this.$route.query
            }
        },
        created() {
            this.init();
        }
    }
</script>

<style scoped>

</style>