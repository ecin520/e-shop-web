<template>
    <div>
        <TopInfo></TopInfo>
        <NavBar class="my-nav-bar"></NavBar>

        <v-container>
            <v-row class="ma-top-1" justify="center">

                <v-col :cols="12" lg="9" xl="6">
                    <span class="green--text d-block text-h6 ma-1 font-weight-bold">
                        <v-icon color="green">mdi-checkbox-marked-circle-outline</v-icon>
                        加入购物车成功
                    </span>
                    <v-list-item class="my-border ma-top-4" style="background: #fafafa">
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
                                <span v-else
                                      class="ma-2 small-font grey--text">¥ {{skuProduct.price}} × {{productNum}}</span>
                            </v-row>
                            <v-row>
                                        <span style="font-size: 13px"
                                              class="ma-2 grey--text">剩余{{skuProduct.stock}}件</span>
                            </v-row>
                        </v-list-item-action>
                    </v-list-item>
                    <div class="flex-justify-space-between ma-top-4">
                        <div></div>
                        <div>
                            <span @click="$router.push({path: '/'})" class="orange--text font-weight-bold ma-4 global-hover">返回首页</span>
                            <v-chip @click="$router.push({path: '/cart-list'})" class="white--text global-hover"
                                    color="red darken-2" label>查看购物车
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
    import {getProductByParam, getShopByParam, getSkuProductById} from "../../api/product";
    import {getFlashSaleProductByParam} from "../../api/sale";

    export default {
        components: {Footer, TopInfo, NavBar},
        data() {
            return {
                productId: null,
                skuProductId: null,
                productNum: null,
                note: '',
                product: {},
                skuProduct: {},
                shop: {},
                flashSaleInfo: {},
                flashStatus: false,
            }
        },
        methods: {
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

            }
        },
        created() {
            this.init();
        }
    }
</script>

<style scoped>

</style>