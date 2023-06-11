<template>
    <div class="gardient">
        <v-card-actions>
            <v-spacer />
            <v-text-field
                v-model="search"
                clearable
                append-icon="mdi-magnify"
                label="Rechercher"
                class="col-6 col-md-3"
            ></v-text-field>
        </v-card-actions>
        <div class="text-center text-font primary--text">Produits disponible</div>
        <v-data-iterator
            :items="items"
            :search="search"
            :sort-by="sortBy.toLowerCase()"
            hide-default-footer
        > 
            <template v-slot:default="props">
            <v-row class="pa-4">
                <v-col v-for="n in props.items" :key="n" cols="12" md=3 sm="6" xs="12">
                    <v-hover v-slot="{ hover }">
                        <v-card class="mx-auto" :elevation="hover ? 12 : 2" :color="hover ? 'gardient':'body'" max-width="600">
                            <v-img :aspect-ratio="16/9" :src="n.img">
                                <v-expand-transition>
                                    <div v-if="hover" class="d-flex transition-fast-in-fast-out body font-weight-black v-card--reveal text-font primary--text text-h3" style="height: 100%;">
                                        {{ n.prix }} Ar
                                    </div>
                                </v-expand-transition>
                            </v-img>
                            <v-divider />
                            <v-card-text class="pt-6" style="position: relative;">
                                <a href="#contact">
                                    <v-btn absolute class="body font-icon blue--text" fab large right top @click="selectId(n)">
                                        <v-icon>mdi-cart</v-icon>
                                    </v-btn>
                                </a>
                                <div class="font-weight-black primary--text text-h5 text-font mb-2">{{ n.categorie }}</div>
                                <h3 class="text-h4 text--font font-weight-black white--text mb-2">{{ n.design }}</h3>
                            </v-card-text>
                        </v-card>
                    </v-hover>
                </v-col>
            </v-row>
            </template>
        </v-data-iterator>
        <div id="contact" v-if="design!=''">
            <div class="text-right mr-4">
                <v-hover v-slot="{ hover }">
                    <v-icon @click="design='', reset()" style="position:relative; top:50px" :class="hover?'grey lighten-1 blue--text':' blue--text'">mdi-close</v-icon>
                </v-hover>
            </div>
            <div class="text-center text-font primary--text">Faire de(s) commande(s)</div>
            <v-row class="pa-4 ">
                <v-col md="6">
                    <v-img src="sary (3).jpg" height="360"/>
                </v-col>
                <v-col md="6">
                    <v-card class="mx-auto pa-4 text-center body" :color="$vuetify.theme.dark?'grey darken-4':''" elevation="2">
                        <div class="text-left primary--text text-h4 text-font" v-if="categorie != ''"><strong>{{ design }}</strong> </div>
                            <v-form ref="form" v-model="valid" lazy-validation>
                                <v-row class="mt-4 mx-2">
                                    <nav class="col-12 col-md-6">
                                        <v-text-field solo :rules="rules" label="nomcli client" v-model="nomcli" prepend-inner-icon="mdi-account-circle" />
                                        <v-text-field solo :rules="rules" label="adressclie mail client" type="emailcli" v-model="mail" prepend-inner-icon="mdi-emailcli" />
                                        <v-text-field solo :rules="rules" label="Quantité produit" type="number" prepend-inner-icon="mdi-cart" v-model="qte" @change="Mnttotal()" @blur="Mnttotal()" @input="Mnttotal()" />
                                    </nav>
                                    <nav class="col-12 col-md-6">
                                        <v-text-field solo :rules="rules" label="adressclie postal client" v-model="adresscli" prepend-inner-icon="mdi-map-marker-multiple" />
                                        <v-text-field solo :rules="rules" label="Contact client" v-model="phone" prepend-inner-icon="mdi-phone" />
                                        <v-text-field solo :rules="rules" label="Montant total" v-model="total" prepend-inner-icon="mdi-currency-usd" />
                                    </nav>
                                </v-row>
                            </v-form>
                        <v-btn class="px-12 primary mr-4 text-capitalize" @click="validate">Commander</v-btn>
                        <v-icon @click="reset" v-if="invalid">mdi-refresh</v-icon>
                    </v-card>
                </v-col>
            </v-row>
        </div>
        <AlertMessage :active="active" :type="alertType" :message="alertMsg"/>
    </div>
</template>
<script>
import moment from 'moment'
import AlertMessage from '@/components/AlertMessage'
import clientService from '@/services/clientService'

export default {
    components:{AlertMessage},
    data() {
        return {
            active:false,
            alertType:'success',
            alertMsg:'',
            search:'',
            sortBy: 'idpro',
            keys: [
                'design',
                'categorie',
                'prix',
            ],
            items:[],
            categories:['Fromage', 'Yaourt', 'Beurre'],
            id:0,
            cli:false,
            design:'',
            categorie:'',
            rules:[
                v => !!v || 'Cette champ est vide.',
            ],
            valid: true,
            invalid: false,
            idcli:null,
            qte:null,
            total:null,
            phone:'+261',
            mail:'',
            nomcli:'',
            adresscli:'',
            date:new Date(),
            clients:[],
        }
    },
    methods: {
        async getClient(){
            await clientService.getAll()
            .then((res) => {
                this.clients=res.data.clients
                this.getMax()
            }).catch((err) => {
                console.log(err);
            });
        },
        selectId(data){
            this.id = data.idpro
            this.design = data.design
            this.categorie = data.categorie
            this.prix = data.prix
            this.cli = true
            this.reset()
        },
        Mnttotal(){
            this.total = this.prix * this.qte
        }, 
        reset(){
            this.$refs.form.reset()
            this.invalid=false
        },
        getMax(){
          if (this.clients.length<= 0){
            this.idcli= 1
          }else {
            var max  = this.clients[this.clients.length - 1].idcli
            this.idcli = parseInt(max++)+1
          }
        },
        async validate () {
            this.$refs.form.validate()
            if (this.valid) {
                await clientService.create({
                    idcli:this.idcli,
                    nomcli: this.nomcli,
                    emailcli:this.mail,
                    phonecli:this.phone,
                    adresscli:this.adresscli,
                    qtecom:this.qte,
                    idpro:this.id,
                    montant:this.total,
                })
                .then((res) => {
                    if (res.data.error) {
                        this.active=true
                        this.alertMsg=res.data.error
                        this.alertType='error'
                        setTimeout(() => {
                            this.active=false
                        }, 3000);
                    } else {
                        this.active=true
                        this.alertMsg=res.data.error
                        this.alertType='error'
                        setTimeout(() => {
                            this.active=false
                        }, 3000);
                    }
                }).catch((err) => {
                    console.log(err);
                });
            }
            this.invalid=true

        },
    }, 
    computed: {
      computedDateFormattedMomentjs () {
        return this.date ? moment(this.date).format('dddd, Do MMM YYYY') : ''
      },
    },
    mounted() {
        document.title= this.$route.meta.title
        this.getClient()
    },
}
</script>
<style>
a{
    text-decoration: none;
}
</style>