<template>
    <div style="background: #F4F4F4">
        <TopInfo></TopInfo>
        <NavBar class="my-nav-bar"></NavBar>

        <v-container class="lighten-5">
            <v-row class="justify-center">
                <v-col cols="12" lg="3" xl="2">
                    <v-card style="padding: 30px;" elevation="5" class="mx-auto">
                        <v-img @click="$router.push('/')" class="global-hover" contain height="50"
                               src="http://www.pytap.com/source/1601545428412.png"></v-img>
                        <br>
                        <span style="font-size: 15px;line-height: 43px" class="global-hover normal-font" :key="index"
                              v-for="(item, index) in categoryList">
                            {{item.name}}
                            <span v-if="index !== categoryList.length - 1">/</span>
                        </span>
                    </v-card>
                </v-col>

                <v-col cols="12" lg="6" xl="4">
                    <v-card height="350px" elevation="10" class="mx-auto">
                        <v-carousel cycle :interval="3000" hide-delimiter-background :show-arrows="false"
                                    delimiter-icon="mdi-minus"
                                    height="350">
                            <v-carousel-item class="global-hover"
                                             v-for="(item, index) in carouselProducts" :key="index">
                                <v-row class="fill-height" align="center" justify="center">
                                    <v-img  @click="toProductDetailPage(item.productId, '0')" contain :src="imageUrl(item.showImage)" min="200" max="200" step="1"></v-img>
                                </v-row>
                            </v-carousel-item>
                        </v-carousel>
                    </v-card>
                </v-col>

                <v-col cols="12" lg="3" xl="2">
                    <v-card class="pa-4" elevation="5" outlined tile>
                        <div style="display: flex;flex-direction:row;margin-top: 3px">
                            <div style="">
                                <v-avatar color="indigo" class="rounded-circle">
                                    <v-icon dark>
                                        mdi-account-circle
                                    </v-icon>
                                </v-avatar>
                            </div>
                            <div style="margin-left: 10px">
                                <span class="normal-font">欢迎来到 E-SHOP</span>
                                <p><span class="global-hover">登录</span> | <span class="global-hover">注册</span></p>
                            </div>
                        </div>
                        <v-row justify="center">
                            <div class="ma-4 red--text">注册送积分，戳我查看详情</div>
                        </v-row>
                        <v-row justify="center">
                            <v-chip class="ma-2 white--text v-card--hover" color="success" label>
                                <v-icon left>mdi-server-plus</v-icon>
                                所有店铺
                            </v-chip>
                            <v-chip class="ma-2 white--text v-card--hover" color="indigo darken-3" label>
                                <v-icon left>mdi-fire</v-icon>
                                所有分类
                            </v-chip>
                            <v-chip class="ma-2 white--text v-card--hover" color="pink" label>
                                <v-icon left>mdi-server-plus</v-icon>
                                秒杀商品
                            </v-chip>
                            <v-chip class="ma-2 white--text v-card--hover" color="teal" label>
                                <v-icon left>mdi-server-plus</v-icon>
                                话费充值
                            </v-chip>
                            <v-chip class="ma-2 white--text v-card--hover" color="blue" label>
                                <v-icon left>mdi-wrench</v-icon>
                                天天领券
                            </v-chip>
                            <v-chip class="ma-2 white--text v-card--hover" color="orange" label>
                                <v-icon left>mdi-server-plus</v-icon>
                                商品上新
                            </v-chip>
                            <v-chip class="ma-2 white--text v-card--hover" color="brown" label>
                                <v-icon left>mdi-server-plus</v-icon>
                                商铺推荐
                            </v-chip>
                            <v-chip class="ma-2 white--text v-card--hover" color="#757575" label>
                                <v-icon left>mdi-server-plus</v-icon>
                                合作联系
                            </v-chip>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>

            <v-row justify="center">
                <v-col cols="12" lg="12" xl="8">
                    <v-chip class="ma-0" color="pink" label text-color="white">
                        <v-icon left>mdi-label</v-icon>
                        商品秒杀
                    </v-chip>
                    <span class="pink--text font-weight-bold global-hover">&nbsp;更多 >></span>
                </v-col>
            </v-row>

            <v-row justify="center">
                <v-col :key="index" v-for="(item, index) in flashSaleProducts.slice(0, 2)" cols="12" sm="6" md="6"
                       lg="3" xl="2">
                    <div @click="toProductDetailPage(item.product.id)">
                        <v-card elevation="3" height="472" class="card-hover ma-top-3">
                            <v-img class="ma-2" contain height="275" :src="imageUrl(item.product.showImage)"></v-img>
                            <div class="text-align-center">
                                <v-card-text class="black--text text-align-center font-weight-bold text-overflow-2">
                                    {{item.product.name}}
                                </v-card-text>
                                <v-card-text style="bottom: 10px">
                                    <div class="my-0 subtitle-1 red--text text-decoration-line-through">
                                        原价：$ {{item.product.price}}
                                    </div>
                                    <div class="my-0 subtitle-1 orange--text">
                                        秒杀价：$ {{item.flashSalePrice}}
                                    </div>
                                </v-card-text>
                            </div>
                        </v-card>
                    </div>
                </v-col>

                <v-col cols="12" xs="12" lg="6" xl="4">
                    <v-row justify="center">
                        <v-col class="ma-0 pa-1" :key="index" v-for="(item, index) in flashSaleProducts.slice(2, 8)"
                               md="4">
                            <div @click="toProductDetailPage(item.product.id, '1')">
                                <v-card class="ma-2 pa-2 card-hover" elevation="3">
                                    <v-img contain height="120" :src="imageUrl(item.product.showImage)"></v-img>
                                    <span class="text--black ma-2 d-block" style="text-align: center">
                                  <span class="d-block text-overflow-1 font-weight-bold small-font ma-1">{{item.product.name}}</span>
                                  <span class="my-0 subtitle-0 red--text">
                                    <span class="text-decoration-line-through d-block small-font">原价：$  {{item.product.price}}</span>
                                    <span class="orange--text small-font">秒杀价：$  {{item.flashSalePrice}}</span>
                                  </span>
                                 </span>
                                </v-card>
                            </div>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>

            <v-row justify="center">
                <v-col cols="12" lg="12" xl="8">
                    <v-chip class="ma-0" color="purple" label text-color="white">
                        <v-icon left>mdi-label</v-icon>
                        新品上市
                    </v-chip>
                    <span class="purple--text font-weight-bold global-hover">&nbsp;更多 >></span>
                </v-col>
            </v-row>

            <v-row justify="center">
                <v-col cols="12" xs="12" lg="6" xl="4">
                    <v-row justify="center">
                        <v-col class="ma-0 pa-1" :key="index" v-for="(item, index) in newProducts.slice(2, 8)" md="4">
                            <div @click="toProductDetailPage(item.id, '0')">
                                <v-card class="ma-2 pa-2 card-hover" elevation="3">
                                    <v-img contain height="120" :src="imageUrl(item.showImage)"></v-img>
                                    <span class="text--black ma-2 d-block" style="text-align: center">
                                  <span class="d-block text-overflow-1 font-weight-bold small-font">{{item.name}}</span>
                                  <span class="my-0 subtitle-0 red--text">
                                    <span class="orange--text d-block small-font" style="line-height: 50px">全新价：$  {{item.price}}</span>
                                  </span>
                                </span>
                                </v-card>
                            </div>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col :key="index" v-for="(item, index) in newProducts.slice(0, 2)" cols="12" sm="6" md="6" lg="3"
                       xl="2">
                    <div @click="toProductDetailPage(item.id, '0')">
                        <v-card elevation="3" height="472" class="card-hover ma-top-3">
                            <v-img class="ma-2" contain height="275" :src="imageUrl(item.showImage)"></v-img>
                            <div class="text-align-center">
                                <v-card-text class="black--text text-align-center font-weight-bold text-overflow-2">
                                    {{item.name}}
                                </v-card-text>
                                <v-card-text>
                                    <span class="orange--text d-block"
                                          style="line-height: 60px">全新价：$  {{item.price}}</span>
                                </v-card-text>
                            </div>
                        </v-card>
                    </div>
                </v-col>
            </v-row>

            <v-row justify="center">
                <v-col cols="12" lg="12" xl="8">
                    <v-chip class="ma-0" color="orange" label text-color="white">
                        <v-icon left>mdi-label</v-icon>
                        精选分类
                    </v-chip>
                    <span class="orange--text font-weight-bold global-hover">&nbsp;更多 >></span>
                </v-col>
            </v-row>

            <v-row justify="center">
                <v-col :key="index" v-for="(item, index) in recommendCategories.slice(0, 4)" cols="12" sm="6" md="6"
                       lg="3"
                       xl="2">
                    <v-card class="card-hover">
                        <span class="ma-4 d-block font-weight-bold black--text small-font">
                          <span class="d-block">{{item.name}}</span>
                          <span class="d-block grey--text">{{item.description}}</span>
                        </span>
                        <v-img class="ma-3" contain height="180" :src="item.showImage"></v-img>
                    </v-card>
                </v-col>
            </v-row>

            <v-row justify="center">
                <v-col :key="index" v-for="(item, index) in recommendCategories.slice(4, 8)" cols="12" sm="6" md="6"
                       lg="3"
                       xl="2">
                    <v-card class="card-hover">
                        <span class="ma-4 d-block font-weight-bold black--text small-font">
                          <span class="d-block">{{item.name}}</span>
                          <span class="d-block grey--text">{{item.description}}</span>
                        </span>
                        <v-img class="ma-3" contain height="180" :src="item.showImage"></v-img>
                    </v-card>
                </v-col>
            </v-row>

            <v-row justify="center">
                <v-col cols="12" lg="12" xl="8">
                    <v-chip class="ma-0" color="red" label text-color="white">
                        <v-icon left>mdi-label</v-icon>
                        为您推荐
                    </v-chip>
                    <span class="red--text font-weight-bold global-hover">&nbsp;更多 >></span>
                </v-col>
            </v-row>

            <div v-infinite-scroll="load" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
                <v-row justify="center" :key="index" v-for="(i, index) in Math.ceil(recommendProducts.length/4)">
                    <v-col :key="index" v-for="(item, index) in recommendProducts.slice((i-1)*4, (i-1)*4 + 4)" sm="6"
                           md="6"
                           lg="3" xl="2">
                        <div @click="toProductDetailPage(item.id, '0')">
                            <v-card height="360" class="card-hover">
                                <v-img class="ma-4" contain height="180" :src="imageUrl(item.showImage)"></v-img>
                                <v-card-text class="black--text text-align-center font-weight-bold text-overflow-2">
                                    {{item.name}}
                                </v-card-text>
                                <v-card-text>{{item.description}}</v-card-text>
                                <span class="orange--text ma-0 d-block text-center">价格： $  {{item.price}}</span>
                            </v-card>
                        </div>
                    </v-col>
                </v-row>
            </div>

            <v-row v-if="busy" class="ma-top-5" justify="center">
                <v-icon color="red" large>mdi-bullseye</v-icon>
                <span class="ma-5">正在加载</span>
            </v-row>

        </v-container>

        <Footer></Footer>

        <Top></Top>
    </div>
</template>

<script>
    import Top from "../components/Top";
    import Footer from "../components/Footer";
    import NavBar from "../components/NavBar";
    import TopInfo from "../components/TopInfo";
    import {listProductCategories, listRecommendCategories} from "../api/category";
    import {listCarouselProducts, listFlashSaleProducts, listNewProducts, listRecommendProducts} from "../api/product";

    export default {
        components: {TopInfo, Footer, NavBar, Top},
        data() {
            return {
                colors: [
                    "green",
                    "secondary",
                    "yellow darken-4",
                    "red lighten-2",
                    "orange darken-1",
                ],
                cycle: false,
                page: 1,
                categoryList: [],
                lazyCount: 2,
                busy: false,
                recommendProducts: [],
                flashSaleProducts: [],
                newProducts: [],
                recommendCategories: [],
                carouselProducts: [],
                toTheEnd: false
            }
        },
        methods: {
            toProductDetailPage(productId, flashSale) {
                this.$router.push({path: '/product', query: {id: productId, flashSale: flashSale}})
            },
            imageUrl(images) {
                let pics = (images || "").split(",");
                return pics[0]
            },
            /**
             * 懒加载
             * */
            load() {

                if (this.toTheEnd) {
                    return
                }

                this.busy = true
                setTimeout(() => {

                    listRecommendProducts(this.lazyCount, 4).then(response => {
                        if (response.code === 200) {
                            let temp = response.data.content
                            for (let i = 0; i < temp.length; i++) {
                                this.recommendProducts.push(temp[i])
                            }
                            this.lazyCount += 1;

                            this.toTheEnd = temp.length === 0;

                        } else {
                            this.busy = true
                            this.$notify({
                                position: 'bottom-right',
                                title: 'Error',
                                message: response.message,
                                type: "success"
                            });
                        }
                    })
                    this.busy = false
                }, 1000)

            },
            init() {

                listProductCategories().then(response => {
                    this.categoryList = response.data
                })

                listFlashSaleProducts({pageNum: 0, pageSize: 8, queryParam: null}).then(response => {
                    if (response.code === 200) {
                        this.flashSaleProducts = response.data.content
                    } else {
                        this.$notify({
                            position: 'bottom-right',
                            title: 'Error',
                            message: response.message,
                            type: "success"
                        });
                    }
                })

                listNewProducts(1, 8).then(response => {
                    if (response.code === 200) {
                        this.newProducts = response.data.content
                    } else {
                        this.$notify({
                            position: 'bottom-right',
                            title: 'Error',
                            message: response.message,
                            type: "success"
                        });
                    }
                })

                listRecommendCategories(0, 8).then(response => {
                    if (response.code === 200) {
                        this.recommendCategories = response.data.content
                    } else {
                        this.$notify({
                            position: 'bottom-right',
                            title: 'Error',
                            message: response.message,
                            type: "success"
                        });
                    }
                })

                listRecommendProducts(0, 4).then(response => {
                    if (response.code === 200) {
                        this.recommendProducts = response.data.content
                    } else {
                        this.$notify({
                            position: 'bottom-right',
                            title: 'Error',
                            message: response.message,
                            type: "success"
                        });
                    }
                })

                // 轮播图商品
                listCarouselProducts().then(response => {
                    if (response.code === 200) {
                        this.carouselProducts = response.data.content
                    } else {
                        this.$notify({
                            position: 'bottom-right',
                            title: 'Error',
                            message: response.message,
                            type: "success"
                        });
                    }
                })

            }
        },
        created() {
            this.init();
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
