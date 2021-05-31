<template>
    <div>
        <TopInfo></TopInfo>
        <NavBar class="my-nav-bar">></NavBar>

        <v-container class="justify-center">
            <v-row justify="center">
                <v-col cols="12" xs="12" lg="6" xl="4">
                    <div class="pa-8 my-border">
                        <v-img contain class="d-block" height="400" :src="currentProductImage"></v-img>
                        <v-row class="ma-5" justify="center">
                            <v-tabs show-arrows>
                                <v-tabs-slider class="d-none" color="teal lighten-3"></v-tabs-slider>
                                <v-tab v-for="(item, index) in splitImages(product.showImage)" :key="index"
                                       :href="'#tab-' + index">
                                    <v-img @click="currentProductImage = item" width="50" height="50"
                                           :src="item"></v-img>
                                </v-tab>
                            </v-tabs>
                        </v-row>
                    </div>
                </v-col>
                <v-col cols="12" xs="12" lg="6" xl="4">
                    <div>
                        <v-card-title class="font-weight-bold">{{product.name}}</v-card-title>

                        <v-alert class="grey--text" color="#FFF2E8">
                            <span v-if="JSON.stringify(flashSaleInfo) !== '{}' && flashSaleInfo !== null">
                                <span class="text-decoration-line-through d-block">原价：￥  {{currentSku.price}}</span>
                                <span class="red--text font-weight-bold text-h5 d-block">秒杀价：￥  {{flashSaleInfo.flashSalePrice}}</span>
                            </span>
                            <span v-else>
                                <span>价格：<span class="red--text font-weight-bold text-h5">￥  {{currentSku.price}}</span></span>
                            </span>
                        </v-alert>

                        <p class="ma-3 grey--text">
                            广东广州 配送至
                            <span class="global-hover">全国</span>
                            <span class="global-hover float-right d-block">免运费</span>
                        </p>

                        <v-row class="ma-0" v-for="(spec, i) in productSpecList" :key="i">
                            <v-col cols="2" xs="3">
                                <span class="ma-0 pa-0 grey--text">{{spec.name}}</span>
                            </v-col>
                            <v-col class="ma-0 pa-0" cols="10" xs="9">
                                <v-chip-group mandatory v-model="spec.selectedSpec" column active-class="red--text">
                                    <v-chip @click.native="selectSpecClick" outlined label color=""
                                            v-for="(specDetail, j) in spec.details" :key="j" :value="specDetail.id">
                                        {{ specDetail.name }}
                                    </v-chip>
                                </v-chip-group>
                            </v-col>
                        </v-row>

                        <v-row class="ma-0">
                            <v-col cols="2" xs="3">
                                <span class="ma-0 pa-0 grey--text">购买数量</span>
                            </v-col>
                            <v-col class="ma-0 pa-1" cols="10" xs="9">

                                <v-row class="ma-top-1">
                                    <v-btn @click="subProductNum" tile outlined width="30" height="30"
                                           class="ma-0 pa-0" fab
                                           dark small color="error">
                                        <v-icon>
                                            mdi-minus
                                        </v-icon>
                                    </v-btn>
                                    <label>
                                        <input class="text-align-center my-input-border"
                                               disabled
                                               style="width: 70px;height: 30px;border-left: none; border-right: none;"
                                               v-model="productNum"/>
                                    </label>
                                    <v-btn @click="addProductNum" tile outlined width="30" height="30"
                                           class="ma-0 pa-0" fab
                                           dark small color="primary">
                                        <v-icon>
                                            mdi-plus
                                        </v-icon>
                                    </v-btn>

                                    <p class="ma-1 grey--text small-font">
                                        剩余<span class="red--text">{{currentSku.stock}}</span>件
                                    </p>

                                </v-row>
                            </v-col>
                        </v-row>

                        <v-row class="ma-0" justify="center">
                            <v-col>
                                <v-btn @click="buyClick" color="red darken-2" class="white--text">
                                    立即购买
                                </v-btn>
                                <v-btn @click="addToCart" color="orange" class="white--text ma-1">
                                    加入购物车
                                </v-btn>
                            </v-col>
                        </v-row>

                    </div>
                </v-col>
            </v-row>

            <v-row justify="center" class="ma-top-1">
                <v-col cols="12" lg="3" xl="2">
<!--                    <p class="font-weight-bold text-center text-h5">店铺信息</p>-->
                    <div class="global-hover" @click="">
                        <div class="pa-3 my-border">
                            <p class="font-weight-bold text-center ma-2 global-hover" @click="">{{shopInfo.name}}</p>
                            <p class="text-center grey--text text-overflow-1">{{shopInfo.description}}</p>
                            <div class="justify-center ma-8">
                                <v-img style="margin: auto" contain width="150" :src="shopInfo.showImage"></v-img>
                            </div>
                            <div>
                                <!--                                <div class="text-center ma-3">-->
                                <!--                                    热度：{{shopInfo.hot}} %-->
                                <!--                                </div>-->
                                <div class="d-block text-center ma-3 grey--text">店铺收藏数：{{shopInfo.collection}}</div>
                            </div>
                            <v-rating class="text-center" disabled v-model="shopInfo.rank">
                                <template v-slot:item="props">
                                    <v-icon class="pa-1" :color="props.isFilled ? 'red' : 'grey'">
                                        mdi-star-circle-outline
                                    </v-icon>
                                </template>
                            </v-rating>
                        </div>
                    </div>
                </v-col>
                <v-col cols="12" lg="6" xl="4" class="">
                    <div class="">
                        <v-tabs color="black"
                                background-color="#f5f5f5" v-model="tab">
                            <v-tab>商品详情</v-tab>
                            <v-tab>商品评论</v-tab>
                        </v-tabs>
                        <div v-if="tab === 0" class="ma-top-3 overflow-auto">
                            <div class="pa-3">
                                <span class="grey--text d-block">
                                    <v-row>
                                        <v-col cols="6" v-for="(item, index) in parameter" :key="index">{{item.key}} : {{item.value}}</v-col>
                                    </v-row>
                                </span>
                            </div>
                            <div class="pa-2">
                                <p class="small-font" v-html="product.description"></p>
                            </div>
                        </div>
                        <div v-if="tab === 1" class="ma-top-3 overflow-auto">

                        </div>
                    </div>
                </v-col>
                <v-col cols="12" lg="3" xl="2">
<!--                    <p class="font-weight-bold text-center text-h5">相似推荐</p>-->
                    <div :key="index" v-for="(item, index) in recommendProducts"
                         @click="toProductDetailPage(item.id, '0')">
                        <div height="380" class="global-hover ma-1 pa-3 my-border">
                            <v-img class="ma-4" contain height="180" :src="splitImages(item.showImage)[0]"></v-img>
                            <v-card-text class="black--text text-align-center font-weight-bold text-overflow-2">
                                {{item.name}}
                            </v-card-text>
                            <v-card-text>{{item.description}}</v-card-text>
                            <span class="orange--text ma-0 d-block text-center">价格： $  {{item.price}}</span>
                        </div>
                        <br>
                    </div>
                </v-col>
            </v-row>

        </v-container>

        <Footer></Footer>

        <Top></Top>

    </div>
</template>

<script>
    import NavBar from "../../components/NavBar";
    import TopInfo from "../../components/TopInfo";
    import Footer from "../../components/Footer";
    import Top from "../../components/Top";
    import {
        getProductWebVO,
        getShopByParam,
        getSkuProductByParam,
        listFlashSaleProducts,
        listRecommendProducts
    } from "../../api/product";
    import {listSpecVOsByCategoryDetailAndProductId} from "../../api/category";
    import {getFlashSaleProductByParam} from "../../api/sale";
    import {checkLoginStatus} from "../../utils/common";
    import {insertCartProduct} from "../../api/cart";

    export default {
        name: "ProductDetail",
        components: {Footer, NavBar, TopInfo, Top},
        data() {
            return {
                tab: null,
                currentProductImage: '',
                productNum: 1,
                colors: ['green', 'purple', 'orange', 'indigo', 'red'],
                rating: 4.5,
                productImages: [],
                productId: null,
                product: {},
                productSpecList: [],
                flashSaleInfo: {},
                shopInfo: {},
                parameter: null,
                selection: null,
                currentSku: {},
                submitSkuInfo: {},
                recommendProducts: []
            }
        },
        methods: {
            addToCart() {
                if (this.productNum === 0) {
                    return
                }
                if (this.loginStatus) {

                    let cartInfo = {}
                    cartInfo.shopId = this.shopInfo.id
                    cartInfo.shopName = this.shopInfo.name
                    cartInfo.skuId = this.currentSku.id
                    cartInfo.productId = this.product.id
                    cartInfo.productName = this.product.name
                    cartInfo.skuName = this.currentSku.name
                    cartInfo.skuImage = this.currentSku.showImage
                    cartInfo.num = this.productNum

                    insertCartProduct(cartInfo).then(response => {
                        if (response.code === 200) {
                            this.$router.push({
                                path: '/cart-confirm',
                                query: {skuProductId: this.currentSku.id, productNum: this.productNum}
                            })
                        }
                    })


                } else {
                    this.$router.push({
                        path: '/login',
                        query: {
                            returnUrl: '/cart-confirm' + '?skuProductId=' +
                                this.currentSku.id + '&productNum=' +
                                this.productNum
                        }
                    })
                }
            },
            buyClick() {
                if (this.productNum === 0) {
                    return
                }
                if (this.loginStatus) {
                    this.$router.push({
                        path: '/confirm',
                        query: {skuProductId: this.currentSku.id, productNum: this.productNum}
                    })
                } else {
                    this.$router.push({
                        path: '/login',
                        query: {
                            returnUrl: '/confirm' + '?skuProductId=' +
                                this.currentSku.id + '&productNum=' +
                                this.productNum
                        }
                    })
                }
            },
            toProductDetailPage(productId, flashSale) {
                this.$router.push({path: '/product', query: {id: productId, flashSale: flashSale}})
            },
            addProductNum() {
                if (this.currentSku.stock !== undefined) {
                    if ((parseInt(this.productNum) + parseInt('1')) <= this.currentSku.stock) {
                        this.productNum = parseInt(this.productNum) + parseInt('1')
                    }
                }
            },
            subProductNum() {
                if (this.currentSku.stock !== undefined) {
                    if ((parseInt(this.productNum) - parseInt('1')) >= 0) {
                        this.productNum = parseInt(this.productNum) - parseInt('1')

                    }
                }
            },
            splitImages(images) {
                return (images || "").split(",")
            },
            selectSpecClick() {
                let specDetails = []

                this.productSpecList.forEach(item => {
                    if (item.selectedSpec === undefined) {
                        return
                    }
                    specDetails.push(item.selectedSpec)
                })

                if (specDetails.length === this.productSpecList.length) {
                    getSkuProductByParam(this.productId, specDetails).then(response => {

                        if (response.code === 200) {
                            this.currentSku = response.data
                            this.currentProductImage = this.currentSku.showImage

                            getFlashSaleProductByParam({skuProductId: this.currentSku.id}).then(response => {
                                if (response.code === 200) {
                                    this.flashSaleInfo = response.data
                                }
                            })
                        }

                    })
                }

            },
            init() {

                this.currentProductImage = this.productImages[0]
                this.productId = this.$route.query.id

                if (this.$route.query.flashSale === 1) {
                    listFlashSaleProducts({productId: this.productId}).then(response => {

                    })
                }

                if (JSON.stringify(this.$route.query) === '{}' || this.$route.query === null) {
                    this.$router.push({path: '/'})
                }

                getProductWebVO({id: this.productId}).then(response => {
                    if (response.code === 200) {
                        this.product = response.data
                        this.currentProductImage = this.splitImages(this.product.showImage)[0]
                        this.parameter = JSON.parse(this.product.parameter)
                        this.currentSku.price = this.product.price

                        listSpecVOsByCategoryDetailAndProductId(this.product.productCategoryDetailId, this.product.id).then(response => {

                            this.productSpecList = response.data

                            for (let i = 0; i < this.productSpecList.length; i++) {
                                this.productSpecList[i].selectedSpec = this.productSpecList[i].details[0].id
                            }

                            this.selectSpecClick();

                        })

                        getShopByParam({id: this.product.shopId}).then(response => {
                            this.shopInfo = response.data
                        })

                    }
                })

                listRecommendProducts(0, 5).then(response => {
                    this.recommendProducts = response.data.content
                })

            }
        },
        mounted() {
            this.init()
        },
        watch: {
            '$route'(to, from) {
                this.init();
            },
        },
        computed: {
            loginStatus() {
                return checkLoginStatus();
            }
        }
    }
</script>

<style scoped>
    input.my-input-border {
        outline: none;
    }
</style>
