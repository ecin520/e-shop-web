<template>
    <div>

        <div v-if="orderList.length > 0">
            <div v-for="(item, index) in orderList" class="red darken-2" :class="index !== 0 ? 'ma-top-4' : ''">
                <div style="display: flex;justify-content: space-between">
                    <div @click="" class="d-block small-font white--text ma-1 pa-4 global-hover">{{item.shopName}}</div>
                    <div class="d-block small-font white--text ma-1 pa-4">
                        {{getStatus(item.status)}}
                    </div>
                </div>

                <div v-for="(skuProduct, j) in item.products">
                    <v-list subheader>
                        <v-list-item class="my-border" style="background: #fafafa">
                            <v-list-item-avatar size="100" class="rounded-sm">
                                <v-img class="global-hover" @click="orderDetailClick(item)"
                                       :src="skuProduct.skuImage"></v-img>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <p @click="orderDetailClick(item)" class="red--text global-hover ma-1 text-overflow-1">
                                    {{skuProduct.productName}}</p>
                                <p @click="orderDetailClick(item)" style="font-size: 12px"
                                   class="grey--text global-hover ma-1 text-overflow-1">
                                    {{skuProduct.skuName}}</p>
                                <p @click="orderDetailClick(item)" style="font-size: 12px" class="orange--text ma-1">
                                    {{skuProduct.name}}
                                </p>
                            </v-list-item-content>
                            <v-list-item-action>
                                <v-row>
                                    <span class="ma-2 small-font grey--text">¥ {{item.totalPrice/skuProduct.num}} × {{skuProduct.num}}</span>
                                </v-row>
                                <v-row>
                                    <span class="ma-2 small-font orange--text">总价：{{item.totalPrice}}</span>
                                </v-row>
                                <v-row v-if="item.status === 0">
                                    <v-chip @click="pay(item)" class="ma-2 white--text global-hover"
                                            color="red darken-2" label>去付款
                                    </v-chip>
                                </v-row>
                            </v-list-item-action>
                        </v-list-item>
                    </v-list>
                </div>

            </div>
        </div>
        <div v-else>
            <h1 class="orange--text text-center ma-15">暂无订单</h1>
        </div>

    </div>
</template>

<script>
    import {listUserOrders} from "../../../api/order";
    import {pay} from "../../../api/pay";

    export default {
        name: "OrderList",
        data() {
            return {
                orderList: []
            }
        },
        methods: {
            orderDetailClick(orderInfo) {
                this.$router.push({name: 'OrderDetail', query: {orderId: orderInfo.id}})
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
            init() {
                listUserOrders(0, 0).then(response => {
                    this.orderList = response.data.content
                })
            }
        },
        created() {
            this.init()
        },
    }
</script>

<style scoped>

</style>