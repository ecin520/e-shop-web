<template>
    <div>
        <v-container>
            <v-row class="justify-space-between">
                <div class="ma-0">
                    <v-img @click="$router.push('/')" class="ma-3 global-hover" width="150" height="50"
                           src="http://www.pytap.com/source/1601545428412.png"></v-img>
                </div>
                <div class="ma-0" style="margin-right: 0;">
                    <span class="ma-6 d-block red--text font-weight-bold global-hover">登陆页面改进建议</span>
                </div>
            </v-row>
        </v-container>
        <v-row justify="center">
            <v-col class="pa-0 ma-0">
                <v-parallax height="650" dark
                            src="https://gtms01.alicdn.com/tps/i1/TB1GTCYLXXXXXcHXpXXcoeQ2VXX-2500-600.jpg">
                    <v-container>
                        <v-row justify="center">
                            <v-col></v-col>
                            <v-col md="5" lg="4" xl="3">
                                <v-card width="390" height="420">
                                    <v-tabs v-model="tab">
                                        <v-tab>用户名登录</v-tab>
                                        <v-tab>手机号登录</v-tab>
                                        <v-tab>注册</v-tab>
                                    </v-tabs>
                                    <div v-model="tab">
                                        <div v-if="tab === 0" class="ma-10">

                                            <v-text-field
                                                    dense
                                                    outlined
                                                    placeholder="用户名"
                                                    prepend-inner-icon="mdi-account-circle"
                                                    v-model="loginUser.username"
                                            ></v-text-field>
                                            <v-text-field
                                                    dense
                                                    outlined
                                                    placeholder="密码"
                                                    prepend-inner-icon="mdi-lock-question"
                                                    type="password"
                                                    v-model="loginUser.password"
                                            ></v-text-field>


                                            <v-chip @click="usernameLoginClick"
                                                    class="ma-0 white--text global-hover d-block text-align-center"
                                                    color="red darken-2" label>
                                                登录
                                            </v-chip>

                                            <p class="ma-3 grey--text">
                                                其他方式登录&nbsp;
                                                <v-icon class="global-hover">mdi-wechat</v-icon>
                                                <v-icon class="global-hover">mdi-qqchat</v-icon>
                                            </p>


                                            <p class="text-right global-hover red--text ma-4">忘记密码</p>
                                        </div>
                                        <div v-if="tab === 1" class="ma-10">

                                            <v-text-field
                                                    dense
                                                    outlined
                                                    placeholder="手机号"
                                                    prepend-inner-icon="mdi-cellphone-iphone"
                                                    v-model="loginUser.telephone"
                                            ></v-text-field>
                                            <v-text-field
                                                    dense
                                                    outlined
                                                    placeholder="密码"
                                                    prepend-inner-icon="mdi-lock-question"
                                                    type="password"
                                                    v-model="loginUser.password"
                                            ></v-text-field>

                                            <v-chip @click="telephoneLoginClick"
                                                    class="ma-0 white--text global-hover d-block text-align-center"
                                                    color="red darken-2" label>
                                                登录
                                            </v-chip>

                                            <p class="ma-3 grey--text">
                                                其他方式登录&nbsp;
                                                <v-icon class="global-hover">mdi-wechat</v-icon>
                                                <v-icon class="global-hover">mdi-qqchat</v-icon>
                                            </p>


                                            <p class="text-right global-hover red--text ma-4">忘记密码</p>
                                        </div>
                                        <div v-if="tab === 2" class="ma-10">

                                            <v-text-field
                                                    dense
                                                    outlined
                                                    placeholder="手机号"
                                                    v-model="registerPhone"
                                                    prepend-inner-icon="mdi-cellphone-iphone"
                                            ></v-text-field>
                                            <v-text-field
                                                    dense
                                                    outlined
                                                    placeholder="请输入验证码"
                                                    prepend-inner-icon="mdi-shield-lock"
                                            >
                        <span slot="append">
                          <span style="position: absolute;top: 13px;right: 15px">{{endTime}}</span>
                          <v-icon v-show="!verifyPhoneDisabled" @click="sendMsg" class="global-hover">
                            mdi-android-messages
                          </v-icon>
                        </span>
                                            </v-text-field>
                                            <v-text-field
                                                    dense
                                                    outlined
                                                    placeholder="密码"
                                                    prepend-inner-icon="mdi-lock-question"
                                                    type="password"
                                            ></v-text-field>
                                            <v-chip class="ma-0 white--text global-hover text-align-center"
                                                    color="red darken-2" label>
                                                注册
                                            </v-chip>

                                        </div>
                                    </div>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-parallax>
            </v-col>
        </v-row>
        <Footer></Footer>
    </div>
</template>

<script>
    import Footer from "../../components/Footer";
    import {loginByTelephone, loginByUsername} from "../../api/status";
    import {Encrypt} from "../../utils/secret";

    export default {
        name: "Login",
        components: {Footer},
        data() {
            return {
                registerPhone: null,
                tab: null,
                endTime: null,
                verifyPhoneDisabled: false,
                loginUser: {
                    username: '',
                    password: '',
                    telephone: ''
                },
                returnUrl: null,
                returnParam: null
            }
        },
        methods: {
            sendMsg() {
                if (this.registerPhone === null || this.registerPhone === '') {

                }
                this.endTime = 30
                this.verifyPhoneDisabled = true
                let timer = setInterval(() => {
                    this.endTime -= 1;
                    if (this.endTime <= 0) {
                        this.endTime = null;
                        this.verifyPhoneDisabled = false
                        clearInterval(timer)
                    }
                }, 1000)
            },
            usernameLoginClick() {
                loginByUsername(this.loginUser.username, Encrypt(this.loginUser.password)).then(response => {
                    if (response.code === 200) {
                        this.$store.dispatch("login", {
                            token: response.data.oauth.accessToken,
                            userInfo: response.data.userInfo,
                            rememberMe: true
                        });

                        if (this.returnUrl !== null) {
                            this.$router.push({path: this.returnUrl})
                        } else {
                            this.$router.push({path: '/'})
                        }

                    }
                })
            },
            telephoneLoginClick() {
                loginByTelephone(this.loginUser.telephone, Encrypt(this.loginUser.password)).then(response => {
                    if (response.code === 200) {

                        this.$store.dispatch("login", {
                            token: response.data.oauth.accessToken,
                            userInfo: response.data.userInfo,
                            rememberMe: true
                        });

                        if (this.returnUrl !== null) {
                            this.$router.push({path: this.returnUrl})
                        } else {
                            this.$router.push({path: '/'})
                        }

                    }
                })
            },
            init() {
                if (this.$route.query.returnUrl !== '' && this.$route.query.returnUrl !== undefined && this.$route.query.returnUrl !== null) {
                    this.returnUrl = this.$route.query.returnUrl;
                }

                console.log(this.returnUrl)
            },
        },

        mounted() {
            this.init();
        }
    }
</script>

<style scoped>

</style>
