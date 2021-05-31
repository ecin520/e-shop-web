<template>
    <div>
        <div style="border: 1px solid #DCDFE6;">
            <div class="d-block pa-3" style="background: #f4f7f9">
                <v-avatar>
                    <v-img :src="$store.getters.getUserInfo.avatar"></v-img>
                </v-avatar>
                <span class="ma-3 red--text">{{$store.getters.getUserInfo.username}}</span>
            </div>
            <v-divider></v-divider>
            <div class="ma-3 flex flex-column">
                <v-row class="ma-0" justify="center">
                    <span class="global-hover" style="margin-left: 20px;margin-right: 20px;">优惠券：12</span>
                    <v-divider vertical></v-divider>
                    <span class="global-hover" style="margin-left: 20px;margin-right: 20px;">积分：45</span>
                    <v-divider vertical></v-divider>
                    <span class="global-hover" style="margin-left: 20px;margin-right: 20px;">收藏：25</span>
                </v-row>
            </div>
        </div>

        <div class="ma-top-3" style="border: 1px solid #DCDFE6;">
            <div class="d-block pa-3" style="background: #f4f7f9">
                <span class="ma-2 red--text">我的信息</span>
            </div>
            <v-divider></v-divider>
            <div class="ma-1 pa-3">
                <v-row class="ma-3 grey--text justify-space-between">
                    <div>账户创建时间：</div>
                    <div class="orange--text">{{user.createTime}}</div>
                </v-row>
                <v-row class="ma-3 grey--text justify-space-between">
                    <div>备注：</div>
                    <div class="orange--text justify-space-between">{{user.note}}</div>
                </v-row>
                <v-row class="ma-3 grey--text justify-space-between">
                    <div>昵称：</div>
                    <div class="orange--text justify-space-between">{{user.nickname}}</div>
                </v-row>
                <v-row class="ma-3 grey--text justify-space-between">
                    <div>电话：</div>
                    <div class="orange--text">{{user.telephone}}</div>
                </v-row>
            </div>
        </div>

        <div class="ma-top-3" style="border: 1px solid #DCDFE6;">
            <div class="d-block pa-3" style="background: #f4f7f9">
                <span class="ma-2 red--text">我的喜好</span>
            </div>
            <v-divider></v-divider>
            <div class="ma-1 pa-3">
                <v-chip class="ma-1" outlined label color="red" v-for="i in 8">
                    喜好{{ i }}
                </v-chip>
            </div>
        </div>

        <div class="ma-top-3">
            <v-row justify="center">
                <v-btn @click="logout" color="red darken-2" class="white--text">退出登录</v-btn>
            </v-row>
        </div>
    </div>
</template>

<script>
    import {logout} from "../../../api/status";
    import {getUserByUsername} from "../../../api/user";

    export default {
        name: "PersonalInfo",
        data() {
            return {
                user: null
            }
        },
        methods: {
            logout() {
                logout(this.$store.getters.getToken).then(response => {
                    this.$store.dispatch('logout')
                    this.$router.push({path: '/'})
                })
            },
            init() {
                getUserByUsername(this.$store.getters.getUserInfo.username).then(response => {
                    if (response.code === 200) {
                        this.user = response.data
                    }
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