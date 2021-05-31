<template>
    <div>
        <TopInfo></TopInfo>
        <NavBar class="my-nav-bar"></NavBar>

        <v-container>
            <v-row class="ma-top-1" justify="center">
                <v-col :cols="12" lg="9" xl="6">
                    <div v-for="(shop, i) in shopList" :key="i">

                        <div style="display: flex;justify-content: space-between;" class="red darken-2">
                            <div @click="" class="d-block small-font white--text ma-1 pa-4 global-hover">{{shop[0].shopName}}</div>
                        </div>

                        <div class="my-border" style="border-top: none;" v-for="(skuProduct, j) in shop" :key="j">
                            <v-list style="background: #fafafa" subheader>
                                <v-list-item>
                                    <v-checkbox @click="computeTotalPrice" class="" color="red darken-2" v-model="skuProduct.selected"></v-checkbox>
                                    <v-list-item-avatar size="100" class="rounded-sm ma-3">
                                        <v-img class="global-hover" @click="orderDetailClick(item)"
                                               :src="skuProduct.skuImage"></v-img>
                                    </v-list-item-avatar>
                                    <v-list-item-content>
                                        <p class="red--text global-hover ma-1 text-overflow-1">
                                            {{skuProduct.productName}}</p>
                                        <p style="font-size: 12px"
                                           class="grey--text global-hover ma-1 text-overflow-1">
                                            {{skuProduct.skuName}}</p>
                                        <p style="font-size: 12px" class="orange--text ma-1">
                                            {{skuProduct.name}}
                                        </p>
                                        <p style="font-size: 12px" class="orange--text ma-1">
                                            剩余{{skuProduct.stock}}件
                                        </p>
                                    </v-list-item-content>
                                    <v-list-item-action>
                                        <v-row v-if="skuProduct.flashSale">
                                            <span class="ma-2 small-font red--text">秒 杀</span>
                                        </v-row>
                                        <v-row>
                                            <span v-if="skuProduct.flashSale" class="ma-2 small-font red--text">
                                                <span class="text-decoration-line-through grey--text">¥{{skuProduct.price}}</span> ¥{{skuProduct.flashSalePrice}} × {{skuProduct.num}}
                                            </span>
                                            <span v-else class="ma-2 small-font red--text">
                                                ¥{{skuProduct.price}} × {{skuProduct.num}}
                                            </span>
                                        </v-row>
                                        <v-row>
                                            <span v-if="skuProduct.flashSale" class="ma-2 small-font orange--text">¥{{skuProduct.flashSalePrice*skuProduct.num}}</span>
                                            <span v-else class="ma-2 small-font orange--text">¥{{skuProduct.price*skuProduct.num}}</span>
                                        </v-row>
                                    </v-list-item-action>
                                </v-list-item>
                            </v-list>
                        </div>

                        <br>

                    </div>

                    <div v-if="shopList.length !== 0">
                        <v-row class="justify-space-between ma-1">
                            <div></div>
                            <div class="grey--text">总价：<span class="red--text">¥ {{totalPrice}}</span>
                            </div>
                        </v-row>
                    </div>

                    <div v-if="shopList.length !== 0" class="flex-justify-space-between">
                        <div></div>
                        <div>
                            <v-chip @click="pay" class="ma-2 white--text global-hover"
                                    color="red darken-2" label>去付款
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
    import {listCartProducts} from "../../api/cart";
    import {getSkuProductById} from "../../api/product";
    import {getFlashSaleProductByParam} from "../../api/sale";
    export default {
        components: {Footer, TopInfo, NavBar},
        data() {
            return {
                cartProducts: [],
                shopList: [],
                totalPrice: 0
            }
        },
        methods: {
            pay() {

                for (let i = 0; i < this.shopList.length; i++) {
                    for (let j = 0; j < this.shopList[i].length; j++) {
                        if (this.shopList[i][j].selected === true) {
                            console.log(this.shopList[i][j])
                        }
                    }
                }
            },
            computeTotalPrice() {
                this.totalPrice = 0
                for (let i = 0; i < this.shopList.length; i++) {
                    for (let j = 0; j < this.shopList[i].length; j++) {
                        if (this.shopList[i][j].selected === true) {
                            if (this.shopList[i][j].flashSale) {
                                this.totalPrice += this.shopList[i][j].flashSalePrice * this.shopList[i][j].num;
                            } else {
                                this.totalPrice += this.shopList[i][j].price * this.shopList[i][j].num;
                            }
                        }
                    }
                }
            },
            async init() {
                this.shopList = []
                await listCartProducts({}).then(response => {
                    this.cartProducts = response.data
                })

                let set = new Set()
                for (let i = 0; i < this.cartProducts.length; i++) {
                    this.cartProducts[i].selected = false

                    await getSkuProductById(this.cartProducts[i].skuId).then(response => {
                        if (response.code === 200) {
                            let data = response.data;
                            this.cartProducts[i].price = data.price;
                            this.cartProducts[i].stock = data.stock;
                            this.cartProducts[i].flashSale = false;
                            this.cartProducts[i].flashSalePrice = null;

                            getFlashSaleProductByParam({skuProductId: this.cartProducts[i].skuId}).then(response => {
                                if (response.code === 200 && response.data !== null) {
                                    this.cartProducts[i].flashSale = true;
                                    this.cartProducts[i].flashSalePrice = response.data.flashSalePrice;
                                }
                            })

                        }

                    })

                    set.add(this.cartProducts[i].shopId)
                }
                set.forEach((id) => {
                    let shopProducts = this.cartProducts.filter((item) => {
                        return id === item.shopId
                    })
                    this.shopList.push(shopProducts)
                })

            }
        },
        created() {
            this.init();
        }
    }
</script>

<style scoped>

</style>