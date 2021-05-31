<template>
    <div>
        <div :style="index !== 0 ? 'margin-top: 10px' : 'margin-top: 0'" v-for="(item, index) in addressList"
             class="my-border pa-3">
            <div style="display: flex; justify-content: space-between">
                <p class="font-weight-bold">{{item.receiverName}}</p>
                <p>
                    <span @click="confirmDialog = true;receiverAddress = item;">
                        <v-icon class="global-hover">mdi-delete</v-icon>
                    </span>
                    <span @click="updateAddressClick(item)">
                        <v-icon class="global-hover">mdi-square-edit-outline</v-icon>
                    </span>
                </p>
            </div>
            <p class="small-font">收货人：{{item.receiverName}}</p>
            <p class="small-font">收货地址：{{item.receiverProvince}} {{item.receiverCity}} {{item.receiverRegion}}</p>
            <p class="small-font">详细地址：{{item.receiverDetailAddress}}</p>
            <p class="small-font">手机号码：{{item.receiverTel}}</p>
            <p class="small-font">默认收货地址：<span class="orange--text">{{item.defaultStatus === 1 ? '是' : '否'}}</span></p>
        </div>
        <div class="text-center">
            <v-btn v-if="loginStatus" color="red darken-2" class="ma-3 white--text" @click="addAddressClick">新增收货地址
            </v-btn>
        </div>

        <v-dialog v-model="addressDialog" width="700" hide-overlay>
            <v-card>
                <v-card-title class="headline grey lighten-2" style="display: flex;justify-content: space-between">
                    <div>地址编辑</div>
                    <div>
                        <v-icon @click="addressDialog = false" dark color="red">mdi-close</v-icon>
                    </div>
                </v-card-title>
                <div class="pa-7">
                    <v-row>
                        <v-col>
                            <v-text-field
                                    v-model="receiverAddress.receiverName"
                                    dense
                                    style=""
                                    placeholder=""
                                    label="收货人姓名"
                                    outlined
                                    color="red darken-2"
                            ></v-text-field>
                        </v-col>
                        <v-col>
                            <v-text-field
                                    v-model="receiverAddress.receiverTel"
                                    dense
                                    style=""
                                    placeholder=""
                                    label="电话"
                                    outlined
                                    color="red darken-2"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-select @change="provinceChange" v-model="receiverAddress.receiverProvince" :items="china"
                                      item-text="name" label="省份" dense solo></v-select>
                        </v-col>
                        <v-col>
                            <v-select @change="cityChange" v-model="receiverAddress.receiverCity" :items="cityList"
                                      item-text="name" label="市" dense solo></v-select>
                        </v-col>
                        <v-col>
                            <v-select v-model="receiverAddress.receiverRegion" :items="regionList" item-text="name"
                                      label="县\区" dense solo></v-select>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-textarea
                                    v-model="receiverAddress.receiverDetailAddress"
                                    filled
                                    auto-grow
                                    label="详细地址"
                                    rows="4"
                                    row-height="30"
                                    outlined
                                    color="red darken-2"
                            ></v-textarea>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-text-field
                                    v-model="receiverAddress.receiverPostcode"
                                    dense
                                    style="max-width: 310px;margin-top: 10px;"
                                    placeholder=""
                                    label="邮政编码"
                                    outlined
                                    color="red darken-2"
                            ></v-text-field>
                        </v-col>
                        <v-col>
                            <div>
                                <v-checkbox label="默认收货地址"
                                            :false-value="0"
                                            :true-value="1"
                                            v-model="receiverAddress.defaultStatus">
                                </v-checkbox>
                            </div>
                        </v-col>
                    </v-row>
                    <v-row justify="center">
                        <v-btn @click="submitAddress" color="red darken-2" class="white--text">提交</v-btn>
                    </v-row>
                </div>
            </v-card>
        </v-dialog>

        <v-dialog v-model="confirmDialog" max-width="290" hide-overlay>
            <v-card class="pa-4">
                <v-card-title>是否确认操作？</v-card-title>
                <v-card-actions class="justify-center">
                    <v-btn @click="deleteAddress" color="red" class="white--text">确认</v-btn>
                    <v-btn @click="confirmDialog = false">取消</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </div>
</template>

<script>
    import {
        deleteReceiverAddressById,
        insertReceiverAddress,
        listReceiverAddresses,
        updateReceiverAddress
    } from "../../../api/address";
    import {checkLoginStatus} from "../../../utils/common";

    export default {
        name: "ReceiveAddress",
        data() {
            return {
                user: null,
                items: ['Foo', 'Bar', 'Fizz', 'Buzz', '123', '爱上帝', '爱上啊', 'Fo2o', 'B3ar', 'Fi1zz', 'Buz3z', '1123', '爱上3帝', '爱1上啊'],
                addressDialog: false,
                china: [],
                provinceList: [],
                cityList: [],
                regionList: [],
                receiverAddress: {
                    id: null,
                    userId: null,
                    receiverTel: null,
                    receiverName: null,
                    receiverProvince: null,
                    receiverCity: null,
                    receiverRegion: null,
                    receiverDetailAddress: null,
                    receiverPostcode: null,
                    defaultStatus: 0
                },
                insertOrUpdate: false,
                addressList: [],
                confirmDialog: false
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
                this.insertOrUpdate = true
                this.addressDialog = true

                this.receiverAddress = {
                    id: null,
                    receiverTel: null,
                    receiverName: null,
                    receiverProvince: null,
                    receiverCity: null,
                    receiverRegion: null,
                    receiverDetailAddress: null,
                    receiverPostcode: null,
                    defaultStatus: null
                }
            },
            updateAddressClick(item) {
                this.insertOrUpdate = false
                this.addressDialog = true

                this.provinceChange(item.receiverProvince)
                this.cityChange(item.receiverCity)

                this.receiverAddress = item

            },
            deleteAddress() {
                deleteReceiverAddressById(this.receiverAddress.id).then(response => {
                    if (response.code === 200) {
                        this.confirmDialog = false;
                        this.init();
                    }
                })
            },
            submitAddress() {
                if (this.receiverAddress.defaultStatus === null) {
                    this.receiverAddress.defaultStatus = 0;
                }

                if (this.insertOrUpdate) {

                    insertReceiverAddress(this.receiverAddress).then(response => {
                        if (response.code === 200) {
                            this.addressDialog = false
                            this.init()
                        }
                    })
                } else {
                    updateReceiverAddress(this.receiverAddress).then(response => {
                        if (response.code === 200) {
                            this.addressDialog = false
                            this.init()
                        }
                    })
                }
            },
            init() {

                listReceiverAddresses({}).then(response => {
                    if (response.code === 200) {
                        this.addressList = response.data
                    }
                })

                this.$axios.get('./json/city_code.json').then(response => {
                    this.china = response.data
                }).catch(error => {
                    console.log(error)
                });

            }
        },
        created() {
            this.init();
        },
        computed: {
            loginStatus() {
                return checkLoginStatus();
            }
        }
    }
</script>

<style scoped>

</style>