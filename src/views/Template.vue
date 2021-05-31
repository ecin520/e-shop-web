<template>
    <div>
        <TopInfo></TopInfo>
        <NavBar class="my-nav-bar"></NavBar>

        <v-container>
            <v-row justify="center">
                <v-col>

                </v-col>
            </v-row>
        </v-container>

        <Footer></Footer>

    </div>
</template>

<script>
    import TopInfo from "../components/TopInfo";
    import NavBar from "../components/NavBar";
    import Footer from "../components/Footer";
    export default {
        components: {Footer, TopInfo, NavBar}
    }
</script>

<style scoped>

</style>