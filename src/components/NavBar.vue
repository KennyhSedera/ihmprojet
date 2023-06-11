<template>
    <v-app-bar :class="$vuetify.theme.dark ? 'grey darken-3':'body'" app>
        <img src="téléchargement (16).jfif" width="50" height="50">
        <span class="ml-16 text-md-h2-font primary--text">Mada laitiers</span>
        <v-spacer /> 
        <nav class="text-capitalize primary--text text-font text-md-h5 text-body-2 text-sm-body-1 font-weight-black mr-4">{{ setDate(date) }}</nav>
        <nav class="text-capitalize primary--text text-font text-md-h5 text-body-2 text-sm-body-1 font-weight-black mr-4">{{ timestamp }}</nav> 
        <v-menu v-if="$route.name=='commande' || $route.name=='admin' || $route.name=='client'" bottom left  :close-on-content-click="false" :nudge-width="300" height="10" transition="slide-x-transition" offset-y offset-x>
            <template v-slot:activator="{ on, attrs }">
                <v-badge
                color="error"
                overlap
                :content="items.length"
                v-if="$route.name=='commande' || $route.name=='admin' || $route.name=='client'"
                >
                    <v-icon v-if="$route.name=='commande' || $route.name=='admin' || $route.name=='client'" class="mr-2 font-icon blue--text" v-bind="attrs" v-on="on">mdi-bell</v-icon>
                </v-badge>
            </template>
            <v-card color="body pt-4">
                <div class="text-center font-icon font-weight-black text-h6 primary--text mb-4">Notification <v-icon class="ml-2 primary--text">mdi-bell</v-icon></div>
                <v-divider />
                <v-list class="transparent overflow-x-auto" max-height="300" dense oulined>
                    <v-list-item-group>
                        <v-list-item v-for="(item, i) in items" :key="i">
                            <v-list-item-content>
                                <v-list-item-title>{{ item.title }}</v-list-item-title>
                                <v-list-item-subtitle class="text-md-subtitle-2 text-caption">{{setDate(date)}}</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-card>
        </v-menu>
        <v-icon v-if="$route.name=='commande' || $route.name=='admin' || $route.name=='client'" @click="beforlogout" class="mr-2 ml-4 font-icon blue--text">mdi-logout</v-icon>
        <v-icon v-if="$route.name=='home' || $route.name=='produit'"  class="mr-2 ml-4 font-icon blue--text">mdi-login</v-icon>
        <template v-slot:extension>
            <v-tabs v-model="tab" right align-with-title>
                <v-spacer></v-spacer>
                <v-tabs-slider color="primary"></v-tabs-slider>
                <v-tab v-for="item in items" :key="item" class="text--font text-h6 text-capitalize font-weight-black white--text text-md-right text-sm-left" router :to="item.route">
                    {{ item.title }}
                </v-tab>
            </v-tabs>
        </template>
        <ValidateDialog :open="open" :message="message" :title="title" @close="open=false" @accept="logout" />
    </v-app-bar>
</template>
<script>
import ValidateDialog from './ValidateDialog.vue';
import moment from 'moment';

export default {
    components:{
        ValidateDialog,
    },
    data() {
        return {
            open: false,
            message: '',
            title: '',
            tab: 0,
            items: [
                {route:'/', title: "Accueil"}, 
                {route:'/produit', title: "Produit"},
                {route:'/admin', title: "Admin"},
                {route:'/commande', title: "Commande"},
                {route:'/client', title: "Client"},
            ],
            timestamp: '',
        }
    },
    methods: {
        logout(){
            this.open = false
            setTimeout(() => {
                this.$router.push({path:'/'})
            }, 2000);
        },
        beforlogout(){
            this.open = true
            this.message = 'Voulez-vous se econnecter vraiment ?'
            this.title = 'Deconnecter.'
        },
        setDate (date) {
         return moment(date).format(' Do MMM  ')
        },
        setTime (date) {
         return moment(date).format('hh : mm')
        },
        getNow() {
            const today = new Date();
            const time = today.getHours() + ":" + today.getMinutes();
            this.timestamp = time; 
        },
    },
    mounted() {
        setInterval(() => {
            this.getNow()
        }, 1000);
    },
}
</script>
<style>
.text-md-h2-font{font-weight:300;font-family:'Brush Script MT', cursive; text-shadow: 3px 3px 3px #fff!important}
.v-application .text-md-h2-font{font-size:3.75rem!important;line-height:3.75rem;letter-spacing:-.0083333333em!important}
.text-sm-h2-font{font-weight:300;font-family:'Brush Script MT', cursive; text-shadow: 3px 3px 3px #fff!important}
.v-application .text-sm-h2-font{font-size:2.75rem!important;line-height:2.75rem;letter-spacing:-.0083333333em!important}
</style>