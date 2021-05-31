<template>
    <div>
        <TopInfo></TopInfo>
        <NavBar class="my-nav-bar"></NavBar>

        <v-container>
            <v-row class="ma-top-1" justify="center">
                <v-col :cols="12" lg="9" xl="6">
                    <div style="display: flex;flex-direction: row">
                        <div>
                            <v-select
                                    v-model="selectedAddress"
                                    :items="addressList"
                                    item-text="receiverDetailAddress"
                                    item-value="addressList"
                                    outlined
                                    return-object
                                    style="width: 350px" placeholder="请选择收货地址"
                                    dense>
                            </v-select>
                        </div>
                        <div class="ma-2">
                            <span @click="addAddressClick" class="red--text global-hover">新增地址</span>
                        </div>
                    </div>
                    <v-alert class="grey--text ma-0" color="#FFF2E8">
                        <span class="orange--text d-block">
                            {{selectedAddress.receiverName + ' ' + selectedAddress.receiverTel}}
                        </span>
                        <span>
                            {{selectedAddress.receiverProvince + ' ' + selectedAddress.receiverCity + ' ' + selectedAddress.receiverRegion + ' ' + selectedAddress.receiverDetailAddress}}
                        </span>
                    </v-alert>
                </v-col>
            </v-row>
            <v-row justify="center">
                <v-col :cols="12" lg="9" xl="6">
                    <div>
                        <v-list subheader>
                            <v-list-item class="my-border" style="background: #fafafa">
                                <v-list-item-avatar size="100" class="rounded-sm">
                                    <v-img :src="skuProduct.showImage"></v-img>
                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <p class="red--text global-hover ma-1 text-overflow-1">{{shop.name}}</p>
                                    <p style="font-size: 12px" class="grey--text global-hover ma-1 text-overflow-1">
                                        {{product.name}}</p>
                                    <p style="font-size: 12px" class="orange--text ma-1">
                                        {{skuProduct.name}}
                                    </p>
                                </v-list-item-content>
                                <v-list-item-action>
                                    <v-row>
                                        <span v-if="flashStatus" class="ma-2 small-font grey--text">
                                            <span class="red--text">(秒杀)</span>
                                            ¥ {{flashSaleInfo.flashSalePrice}} × {{productNum}}</span>
                                        <span v-else class="ma-2 small-font grey--text">¥ {{skuProduct.price}} × {{productNum}}</span>
                                    </v-row>
                                    <v-row>
                                        <span style="font-size: 13px"
                                              class="ma-2 grey--text">剩余{{skuProduct.stock}}件</span>
                                    </v-row>
                                    <v-row class="pa-1">
                                        <v-btn class="ma-0 pa-0" width="25" height="25" @click="subProductNum" tile
                                               outlined fab
                                               dark small color="error">
                                            <v-icon>
                                                mdi-minus
                                            </v-icon>
                                        </v-btn>
                                        <label>
                                            <input class="text-align-center my-input-border small-font" disabled
                                                   style="width: 40px;height: 25px;border-left: none; border-right: none;"
                                                   v-model="productNum"/>
                                        </label>
                                        <v-btn class="ma-0 pa-0" width="25" height="25" @click="addProductNum" tile
                                               outlined fab
                                               dark small color="primary">
                                            <v-icon>
                                                mdi-plus
                                            </v-icon>
                                        </v-btn>
                                    </v-row>
                                </v-list-item-action>
                            </v-list-item>
                        </v-list>

                        <div class="ma-top-3">
                            <v-textarea v-model="note" solo placeholder="订单备注" rows="3"></v-textarea>
                        </div>

                        <div>
                            <v-row class="justify-space-between ma-1">
                                <div></div>
                                <div class="grey--text">运费：<span class="red--text">¥ {{0}}</span>
                                </div>
                            </v-row>
                        </div>
                        <div>
                            <v-row class="justify-space-between ma-1">
                                <div></div>
                                <div class="grey--text">促销：<span class="red--text"> - ¥ {{0}}</span>
                                </div>
                            </v-row>
                        </div>
                        <div v-if="flashStatus">
                            <v-row class="justify-space-between ma-1">
                                <div></div>
                                <div class="grey--text">总价：<span class="red--text">¥ {{this.flashSaleInfo.flashSalePrice*this.productNum}}</span>
                                </div>
                            </v-row>
                        </div>
                        <div v-else>
                            <v-row class="justify-space-between ma-1">
                                <div></div>
                                <div class="grey--text">总价：<span class="red--text">¥ {{this.skuProduct.price*this.productNum}}</span>
                                </div>
                            </v-row>
                        </div>

                        <div class="text-right ma-top-3">
                            <v-btn @click="submitOrder" color="red darken-2" class="white--text ma-0 global-hover">
                                提交订单
                            </v-btn>
                        </div>
                    </div>
                </v-col>
            </v-row>

        </v-container>

        <AddressDialog :addressDialog="addressDialog" @closeAddressDialog="closeAddressDialog"></AddressDialog>

        <Footer></Footer>
    </div>
</template>

<script>
    import TopInfo from "../../components/TopInfo";
    import NavBar from "../../components/NavBar";
    import Footer from "../../components/Footer";
    import Top from "../../components/Top";
    import {getProductByParam, getShopByParam, getSkuProductById} from "../../api/product";
    import {getFlashSaleProductByParam} from "../../api/sale";
    import {listReceiverAddresses} from "../../api/address";
    import {generateOrder} from "../../api/order";
    import AddressDialog from "../../components/AddressDialog";
    import {pay} from "../../api/pay";

    export default {
        name: "Settlement",
        components: {AddressDialog, Footer, NavBar, TopInfo, Top},
        data() {
            return {
                user: {},
                menu: false,
                productId: null,
                skuProductId: null,
                productNum: null,
                note: '',
                product: {},
                skuProduct: {},
                shop: {},
                flashSaleInfo: {},
                flashStatus: false,
                addressList: [],
                selectedAddress: {},
                addressDialog: false
            }
        },
        methods: {
            provinceChange(value) {
                for (let i = 0; i < this.china.length; i++) {
                    if (this.china[i].name === value) {
                        this.cityList = this.china[i].city
                    }
                }
                this.receiverAddress.region = null
            },
            cityChange(value) {
                for (let i = 0; i < this.cityList.length; i++) {
                    if (this.cityList[i].name === value) {
                        this.regionList = this.cityList[i].area
                    }
                }
            },
            addAddressClick() {
                this.addressDialog = true
            },
            closeAddressDialog(refresh) {
                if (refresh) {
                    this.listAddress()
                }
                this.addressDialog = false;
            },
            addProductNum() {
                if (this.skuProduct.stock !== undefined) {
                    if ((parseInt(this.productNum) + parseInt('1')) <= this.skuProduct.stock) {
                        this.productNum = parseInt(this.productNum) + parseInt('1')
                    }
                }
            },
            subProductNum() {
                if (this.skuProduct.stock !== undefined) {
                    if ((parseInt(this.productNum) - parseInt('1')) >= 0) {
                        this.productNum = parseInt(this.productNum) - parseInt('1')

                    }
                }
            },
            submitOrder() {
                if (!this.flashStatus) {
                    let param = {}
                    param.shopId = this.shop.id;
                    param.shopName = this.shop.name;
                    param.receiverAddressId = this.selectedAddress.id;
                    param.totalPrice = this.skuProduct.price * this.productNum;
                    param.orderType = 0;
                    param.note = this.note;
                    param.orderProducts = [{
                        productId: this.product.id,
                        num: this.productNum,
                        productName: this.product.name,
                        skuId: this.skuProductId,
                        skuName: this.skuProduct.name,
                        skuImage: this.skuProduct.showImage
                    }]

                    generateOrder(param).then(response => {
                        if (response.code === 200) {
                            let info = response.data
                            let payInfo = {}
                            payInfo.orderNo = info.orderNumber
                            payInfo.price = info.totalPrice
                            payInfo.subject = this.shop.name
                            payInfo.body = info.note

                            console.log(payInfo)

                            pay(payInfo).then(response => {
                                console.log(response)
                                // let routerData = this.$router.resolve({path: '/pay', query: {payInfo: response.data}})
                                // window.open(routerData.href);
                                this.$router.push({path: '/pay', query: {payInfo: response.data}})
                            })

                        }
                    })
                }
            },
            listAddress() {
                listReceiverAddresses({}).then(response => {
                    if (response.code === 200) {
                        this.addressList = response.data
                        for (let i = 0; i < this.addressList.length; i++) {
                            if (this.addressList[i].defaultStatus === 1) {
                                this.selectedAddress = this.addressList[i]
                                break;
                            }
                        }
                    }
                })
            },
            init() {
                this.skuProductId = this.$route.query.skuProductId
                this.productNum = this.$route.query.productNum

                getSkuProductById(this.skuProductId).then(response => {
                    this.skuProduct = response.data

                    getProductByParam({id: this.skuProduct.productId}).then(response => {
                        this.product = response.data

                        getShopByParam({id: this.product.shopId}).then(response => {
                            this.shop = response.data
                        })

                        getFlashSaleProductByParam({skuProductId: this.skuProduct.id}).then(response => {
                            if (response.code === 200 && response.data !== null) {
                                this.flashSaleInfo = response.data
                                this.flashStatus = true
                            }
                        })

                    })

                })

                this.listAddress();

            }
        },
        created() {
            this.init();
        }
    }
</script>

<style scoped>

</style>
