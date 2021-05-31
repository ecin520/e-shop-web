<template>
    <div>
        <TopInfo></TopInfo>
        <NavBar class="my-nav-bar"></NavBar>

        <v-container v-if="orderInfo !== null">
            <v-row justify="center">
                <v-col :cols="12" lg="9" xl="6">
                    <div class="ma-2">
                        <span class="small-font d-block orange--text">收货人：{{orderInfo.receiverAddress.receiverName}} {{orderInfo.receiverAddress.receiverTel}}</span>
                        <span class="small-font d-block orange--text">收货地址：{{orderInfo.receiverAddress.receiverProvince}} {{orderInfo.receiverAddress.receiverCity}} {{orderInfo.receiverAddress.receiverRegion}} {{orderInfo.receiverAddress.receiverDetailAddress}}</span>
                    </div>
                    <div v-if="orderInfo.status === 0" class="ma-2 green--text">
                        订单关闭时间
                        <span class="red--text ma-3">
                            {{$moment(orderInfo.createTime).add(30, 'minutes').format("YYYY-MM-DD HH:mm:SS")}}
                        </span>
                    </div>
                    <div class="red darken-2 ma-top-4" style="display: flex;justify-content: space-between">
                        <div @click="" class="d-block small-font white--text ma-1 pa-4 global-hover">
                            {{orderInfo.shop.name}}
                        </div>
                        <div class="d-block small-font white--text ma-1 pa-4">
                            {{getStatus(orderInfo.status)}}
                        </div>
                    </div>
                    <div v-for="(skuProduct, j) in orderInfo.products">
                        <v-list subheader>
                            <v-list-item class="my-border" style="background: #fafafa">
                                <v-list-item-avatar size="100" class="rounded-sm">
                                    <v-img class="" :src="skuProduct.skuImage"></v-img>
                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <p class="red--text ma-1 text-overflow-1">{{skuProduct.productName}}</p>
                                    <p style="font-size: 12px" class="grey--text ma-1 text-overflow-1">
                                        {{skuProduct.skuName}}</p>
                                    <p style="font-size: 12px" class="orange--text ma-1">
                                        {{skuProduct.name}}
                                    </p>
                                </v-list-item-content>
                                <v-list-item-action>
                                    <v-row>
                                        <span class="ma-2 small-font grey--text">¥ {{orderInfo.totalPrice/skuProduct.num}} × {{skuProduct.num}}</span>
                                    </v-row>
                                    <v-row>
                                        <span class="ma-2 small-font orange--text">总价：{{orderInfo.totalPrice}}</span>
                                    </v-row>
                                    <v-row v-if="orderInfo.status === 0">
                                        <v-chip @click="pay(orderInfo)" class="ma-2 white--text global-hover"
                                                color="red darken-2" label>去付款
                                        </v-chip>
                                    </v-row>
                                </v-list-item-action>
                            </v-list-item>
                        </v-list>
                    </div>
                    <div class="ma-2">
                        <span class="d-block grey--text">订单信息</span>
                        <div class="ma-top-1">
                            <span class="small-font d-block red--text">支付宝交易号：{{orderInfo.paySerial}}</span>
                            <span class="small-font d-block red--text">订单编号：{{orderInfo.orderNumber}}</span>
                            <span class="small-font d-block red--text">创建时间：{{orderInfo.createTime}}</span>
                            <span class="small-font d-block red--text">交易时间：{{orderInfo.payTime}}</span>
                            <span class="small-font d-block red--text">订单备注：{{orderInfo.note}}</span>
                            <span class="small-font d-block red--text">订单状态：{{getStatus(orderInfo.status)}}</span>
                        </div>
                    </div>
                    <div v-if="orderInfo.delivery !== null" class="ma-2">
                        <span class="d-block grey--text">物流信息</span>
                        <div class="ma-top-1">
                            <span class="small-font d-block red--text">物流公司：{{orderInfo.delivery.deliveryCompany}}</span>
                            <span class="small-font d-block red--text">物流单号：{{orderInfo.delivery.deliveryNumber}}</span>
                            <span class="small-font d-block red--text">物流状态：{{getDeliveryStatus(orderInfo.delivery.deliveryStatus)}}</span>
                            <span class="small-font d-block red--text">物流信息：{{orderInfo.delivery.deliveryInfo}}</span>
                        </div>
                    </div>
                    <div class="ma-2" style="display: flex;justify-content: space-between">
                        <div></div>
                        <div>
                            <v-chip v-if="orderInfo.status !== 3 && orderInfo.status !== 4 && orderInfo.status !== 5"
                                    @click="" class="ma-2 white--text global-hover" color="red darken-2" label>取消订单
                            </v-chip>
                            <v-chip v-if="orderInfo.status === 2" @click="confirmReceive(orderInfo)"
                                    class="ma-2 white--text global-hover" color="success" label>确认收货
                            </v-chip>
                            <v-chip v-if="orderInfo.status === 3" @click=""
                                    class="ma-2 white--text global-hover" color="red darken-2" label>售后
                            </v-chip>
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
    import {pay} from "../../api/pay";
    import {getMemberOrderVO} from "../../api/order";
    import {confirmReceipt} from "../../api/delivery";

    export default {
        name: "OrderDetail",
        components: {Footer, TopInfo, NavBar},
        data() {
            return {
                orderId: null,
                orderInfo: {}
            }
        },
        methods: {
            getDeliveryStatus(key) {
                switch (key) {
                    case 0:
                        return '待揽收';
                    case 1:
                        return '运输中';
                    case 2:
                        return '已送达';
                    case 3:
                        return '运输错误';
                }
            },
            getStatus(key) {
                switch (key) {
                    case 0:
                        return '待付款';
                    case 1:
                        return '待发货';
                    case 2:
                        return '已发货';
                    case 3:
                        return '已完成';
                    case 4:
                        return '已关闭';
                    case 5:
                        return '无效订单';
                }
            },
            pay(order) {
                let payInfo = {}
                payInfo.orderNo = order.orderNumber
                payInfo.price = order.totalPrice
                payInfo.subject = order.shopName
                payInfo.body = order.note


                pay(payInfo).then(response => {
                    console.log(response)
                    this.$router.push({path: '/pay', query: {payInfo: response.data}})
                })
            },
            confirmReceive(orderInfo) {
                confirmReceipt(orderInfo.delivery.deliveryNumber, orderInfo.id, this.$store.getters.getUserInfo.id).then(response => {
                    if (response.code === 200) {
                        orderInfo.status = 3
                        this.init();
                    }
                })
            },
            init() {
                this.orderId = this.$route.query.orderId

                getMemberOrderVO(this.orderId).then(response => {
                    this.orderInfo = response.data
                    console.log(this.orderInfo)
                })

            }
        },
        created() {
            this.init()
        }
    }
</script>

<style scoped>

</style>