<template>
    <div>
        <div class="my-nav-bar">
            <v-app-bar style="background: white">
                <v-spacer></v-spacer>
                <span>
                    <v-text-field
                            dense
                            style="margin-top: 26px;min-width: 320px"
                            class="test"
                            placeholder="商品搜索"
                            outlined
                            color="red darken-2"></v-text-field>
                </span>
                <v-btn style="margin: 5px;color: white;" color="red darken-2">搜索</v-btn>
                <v-spacer></v-spacer>
                <span v-if="!loginStatus" class="global-hover" @click="$router.push({path: '/login'})">未登录</span>
                <span v-else class="global-hover">
                    <v-avatar @click="$router.push({path: '/personal'})">
                        <v-img :src="$store.getters.getUserInfo.avatar"></v-img>
                    </v-avatar>
                </span>
            </v-app-bar>
        </div>
    </div>
</template>

<script>
    import {checkLoginStatus} from "../utils/common";

    export default {
        data() {
            return {
                tooltip: false
            }
        },
        methods: {},
        computed: {
            loginStatus() {
                return checkLoginStatus();
            }
        }
    }
</script>

<style scoped>
</style>
