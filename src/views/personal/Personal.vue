<template>
    <div style="">
        <TopInfo></TopInfo>
        <NavBar class="my-nav-bar"></NavBar>
        <v-container class="lighten-5">
            <v-row class="justify-center">
                <v-col cols="12" lg="3" xl="2">
                    <div style="border: 1px solid #DCDFE6;">
                        <span @click="personalInfo" class="d-block pa-2 global-hover text-center">个人信息</span>
                        <v-divider></v-divider>
                        <span @click="receiverAddress" class="d-block pa-2 global-hover text-center">收货地址</span>
                        <v-divider></v-divider>
                        <span @click="myOrder" class="d-block pa-2 global-hover text-center">我的订单</span>
                        <v-divider></v-divider>
                        <span @click="$router.push({name: 'PersonInfo'})" class="d-block pa-2 global-hover text-center">我的物流</span>
                        <v-divider></v-divider>
                        <span @click="$router.push({name: 'PersonInfo'})" class="d-block pa-2 global-hover text-center">修改信息</span>
                    </div>
                </v-col>
                <v-col cols="12" lg="6" xl="4">
                    <div v-if="routerCode === 3">
                        <OrderWidget></OrderWidget>
                    </div>
                    <div v-else>
                        <router-view></router-view>
                    </div>

                </v-col>
                <v-col cols="12" lg="3" xl="2">
                    <div style="border: 1px solid #cee4d3;">
                        <!--                        <div>-->
                        <!--                            <v-img :src="$store.getters.getUserInfo.avatar"></v-img>-->
                        <!--                        </div>-->
                        <div class="d-block pa-1" style="background: #6ec783">
                            <span style="color: #606266" class="ma-2 d-block text-center white--text">我的日历</span>
                        </div>
                        <div style="background: #f7fdf9">
                            <span class="text-center d-block" style="color: #55b36c;font-size: 4em">
                                {{$moment().format('DD')}}
                            </span>
                            <span class="text-center d-block" style="color: #55b36c;font-size: 1em"> {{$moment().format('dddd')}} </span>
                            <span class="text-center d-block" style="line-height: 60px; color: #55b36c;font-size: 1em">{{$moment().format('yyyy年MM月')}}</span>
                        </div>
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
    import OrderWidget from "../order/widgets/OrderWidget";
    export default {
        name: "Personal",
        components: {Footer, TopInfo, NavBar, OrderWidget},
        data() {
            return {
                user: null,
                routerCode: 0
            }
        },
        methods: {
            personalInfo() {
                this.routerCode = 1
                this.$router.push({name: 'PersonInfo'})
            },
            receiverAddress() {
                this.routerCode = 2
                this.$router.push({name: 'ReceiveAddress'})
            },
            myOrder() {
              this.routerCode = 3
            },
            init() {

            }
        },
        created() {
            this.init();
        }
    }
</script>

<style scoped>

</style>