<template>
    <v-container>
       <v-btn v-show="backTopShow" @click="backTop"
               class="to-top transition-swing v-btn v-btn--contained v-btn--fab v-btn--round theme--light v-size--large"
               fab dark color="#D32F2F">
          <span class="v-icon notranslate v-icon--svg theme--light">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="24" width="24" role="img"
                       aria-hidden="true">
            <path style="fill: white;" d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z"></path>
          </svg>
          </span>
        </v-btn>
    </v-container>
</template>

<script>
    export default {
        data() {
            return {
                backTopShow: false
            };
        },
        components: {},
        mounted() {
            window.addEventListener("scroll", this.handleScroll);
        },
        methods: {
            backTop() {
                let back = setInterval(() => {
                    if (document.body.scrollTop || document.documentElement.scrollTop) {
                        document.body.scrollTop -= 50;
                        document.documentElement.scrollTop -= 50;
                    } else {
                        clearInterval(back);
                    }
                });
            },
            handleScroll() {
                if (document.documentElement.scrollTop + document.body.scrollTop > 100) {
                    this.backTopShow = true;
                } else {
                    this.backTopShow = false;
                }
            }
        }
    };
</script>
<style>
    .to-top {
        position: fixed;
        right: 5%;
        bottom: 10%;
    }
</style>
