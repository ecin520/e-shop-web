<template>
    <v-dialog @click:outside="outSideClick" v-model="addressDialog" width="700" hide-overlay>
        <v-card>
            <v-card-title class="headline grey lighten-2" style="display: flex;justify-content: space-between">
                <div>地址编辑</div>
                <div>
                    <v-icon @click="outSideClick" dark color="red">mdi-close</v-icon>
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
</template>

<script>
    import {insertReceiverAddress, updateReceiverAddress} from "../api/address";

    export default {
        name: "AddressDialog",
        props: {
            addressDialog: false
        },
        data() {
            return {
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
            }
        },
        methods: {
            outSideClick() {
                this.$emit('closeAddressDialog', false);
            },
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
            submitAddress() {
                if (this.receiverAddress.defaultStatus === null) {
                    this.receiverAddress.defaultStatus = 0;
                }

                insertReceiverAddress(this.receiverAddress).then(response => {
                    if (response.code === 200) {
                        this.$emit('closeAddressDialog', true);
                        this.init()
                    }
                })

            },
            init() {

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

                this.$axios.get('./json/city_code.json').then(response => {
                    this.china = response.data
                }).catch(error => {
                    console.log(error)
                });
            }
        },
        created() {
            this.init();
        }
    }
</script>

<style scoped>

</style>