<template>
    <div class="gardient"> 
        <v-card-actions>
            <v-menu
            v-model="menu1"
            :close-on-content-click="false"
            max-width="290"
            >
                
                <template v-slot:activator="{ on, attrs }">
                <v-text-field
                    v-model="date1"
                    label="Date debut"
                    class="col-md-3 col-6 mr-2"
                    v-bind="attrs"
                    v-on="on"
                    @change="getDate()"
                    @blur="getDate()"
                ></v-text-field>
                </template>
                <v-date-picker
                    v-model="date1"
                    @change="menu1 = false"
                ></v-date-picker>
            </v-menu>
            <v-menu
                v-model="menu2"
                :close-on-content-click="false"
                max-width="290"
                >
                <template v-slot:activator="{ on, attrs }">
                <v-text-field
                    v-model="date2"
                    @change="getDate()"
                    @blur="getDate()"
                    label="Date fin"
                    class="col-md-3 col-6"
                    v-bind="attrs"
                    v-on="on"
                ></v-text-field>
                </template>
                <v-date-picker
                    v-model="date2"
                    @change="menu2 = false"
                ></v-date-picker>
            </v-menu>
            <v-spacer />
            <v-text-field
                v-model="search"
                clearable
                append-icon="mdi-magnify"
                label="Rechercher"
                class="col-md-3"
            ></v-text-field>
        </v-card-actions>
        <div class="text-center text-font primary--text">Listes des commande</div>
        <v-data-iterator
            :items="items"
            :search="search"
            :sort-by="sortBy.toLowerCase()"
            hide-default-footer
        > 
            <template v-slot:default="props">
                <v-row class="pa-4">
                    <v-col v-for="n in props.items" :key="n" cols="12" md="3" sm="12">
                        <v-hover v-slot={hover}>
                            <v-card class="mx-auto" :elevation="hover ? 12 : 2" :color="hover ? 'gardient':'body'" max-width="600">
                                <v-img :aspect-ratio="16/9" :src="n.img" class="pa-2 text-right">
                                    <v-icon class="red--text text--font" @click="deleteItem(n)">fa-trash</v-icon>
                                </v-img>
                                <v-card-text>
                                    <v-row class="px-4 pt-3">
                                    <div class="font-weight-black text--font white--text text-h5 mb-2">Glace corner<!--{{n.Produits.libelle}}--></div>
                                    <v-icon v-if="n.livre==true" class="success--text mb-3 ml-2 text--font">mdi-check-circle</v-icon>
                                    <v-icon v-else class="error--text mb-3 ml-2 text--font" @click="payerItem(n)">mdi-close-circle</v-icon>
                                        <v-spacer />
                                        <v-avatar style="position: relative; top:-10px" class="font-weight-black body text--font white--text text-h5 elevation-5">15<!--{{n.Commandes.quantite}}--></v-avatar>
                                    </v-row>
                                    <div class="text-body-2 mt-4 black--text font-weight-black"><v-icon>mdi-phone</v-icon> Kennyh<!--{{ n.Clients.contact }}--></div>
                                    <div class="text-body-2 black--text font-weight-black"><v-icon>mdi-email</v-icon> ken@gmail.com<!--{{ n.Clients.email }}--></div>
                                    <div class="text-body-2 black--text font-weight-black"><v-icon>mdi-map-marker-multiple</v-icon> 0342235884<!--{{ n.Clients.adress }}--></div>
                                    <div class="text-body-2 black--text text-capitalize font-weight-black"><v-icon>mdi-clock</v-icon> {{setDate(n.date)}}</div>
                                </v-card-text>
                            </v-card>
                        </v-hover>
                    </v-col>
                </v-row>
            </template>
        </v-data-iterator>
        <AlertDialogVue :open="open" :message="Msg" @close="reset()"/>
        <DeleteDialog :open="deldialog" :message="delmsg" @close="deldialog=false; getAll()" @accept="deletecmd()"/>
        <AlertMessageVue :active="alert" :message="alertmsg" :type="typealert"/>
        <ValidateDialogVue :open="valid" :message="validmsg" :title="validtitle" @close="valid=false" @accept="payer()"/>
    </div>
</template>
<script>
import moment from 'moment'
import AlertDialogVue from '@/components/AlertDialog.vue'
import DeleteDialog from '@/components/DeleteDialog.vue'
import AlertMessageVue from '@/components/AlertMessage.vue'
import ValidateDialogVue from '@/components/ValidateDialog.vue'
import commandeService from '@/services/commandeService'

export default {
    components:{
        AlertDialogVue, DeleteDialog, AlertMessageVue, ValidateDialogVue,
    },
    data() {
        return {
            Msg:'',
            open:false,
            deldialog:false,
            delmsg:'',
            alert:false,
            alertmsg:'',
            valid:false,
            validmsg:'',
            validtitle:'',
            typealert:'success',
            items:[],
            sortBy: 'id',
            search: '',
            keys: [
                'id',
                'img',
            ],
            date1: (new Date()).toISOString().substr(0, 10),
            date2: (new Date()).toISOString().substr(0, 10),
            menu1:false,
            menu2:false,
            date: new Date(),
            selected:null,
        }
    },
    methods: {
        reset(){
            this.open=false
            this.date1=(new Date()).toISOString().substr(0, 10)
            this.date2=(new Date()).toISOString().substr(0, 10)
        },
        setDate (date) {
         return moment(date).format('dddd Do MMM YYYY ')
        },
        getDate(){
            if(this.date2 > this.date){
                this.open = true
                this.Msg = 'Cette date ne doit pas supperieur d\'aujourd\'hui !'
            }else if(this.date2 > this.date1){
                this.open = true
                this.Msg = 'La date fin ne doit pas supperieur a la date debut !'
            }
        },
        deleteItem(data){
            this.deldialog=true
            this.selected=data.id
            this.delmsg=`Voulez-vous supprimer vraiment la commande du ${data}, le ${this.setDate(data.date)} ?`
        },
        async getAll(){
            await commandeService.getAll()
            .then((res) => {
                this.items = res.data.commandes
            }).catch((err) => {
                console.log(err);
            });
        },
        async deletecmd(){
            await commandeService.delete(this.selected)
            .then((res) => {
                if (res.data.error) {
                    this.alert=true
                    this.alertmsg=res.data.error
                    this.typealert='error'
                    setTimeout(() => {
                        this.alert=false
                    }, 3000);
                } else {
                    this.DeleteDialog=false
                    this.alert=true
                    this.alertmsg=res.data.succee
                    this.typealert='success'
                    setTimeout(() => {
                        this.alert=false
                        this.getAll()
                    }, 3000);
                }
            }).catch((err) => {
                console.log(err);
            });
        },
        payerItem(data){
            this.selected=data.id
            this.valid=true
            this.validtitle='Paiement.'
            this.validmsg=`Payer la commande du ${data}, le ${this.setDate(data.date)} .`
        },
        async payer(){
            await commandeService.payment(this.selected)
            .then((res) => {
                this.valid=false
                this.alert=true
                    this.alertmsg=res.data.succee
                    this.typealert='success'
                    setTimeout(() => {
                        this.alert=false
                        this.getAll()
                    }, 3000);
            }).catch((err) => {
                console.log(err);
            });
        },
    },
    computed: {
      computedDateFormattedMomentjs () {
        return this.date ? moment(this.date).format('dddd, Do MMM YYYY') : ''
      },
    },
    mounted() {
        document.title= this.$route.meta.title
        this.getAll()
    },
}
</script>