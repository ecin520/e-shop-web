<template>
    <div>
        <TopInfo></TopInfo>
        <NavBar class="my-nav-bar"></NavBar>

        <v-container>
            <v-row justify="center">
                <v-col :cols="12" lg="9" xl="6">
                    <OrderWidget class=" ma-top-4"></OrderWidget>
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
    import OrderWidget from "./widgets/OrderWidget";

    export default {
        name: "OrderList",
        components: {Footer, TopInfo, NavBar, OrderWidget},
        data() {
            return {

            }
        },
        methods: {

        },
        created() {

        },
    }
</script>

<style scoped>

</style>