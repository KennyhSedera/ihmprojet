<template>
    <div class="gardient">
        <v-card-actions>
            <v-spacer />
            <v-text-field
                v-model="search"
                clearable
                append-icon="mdi-magnify"
                label="Rechercher"
                class="col-md-3 col-6 col-xs-12"
            ></v-text-field>
        </v-card-actions>
        <div class="text-center text-font primary--text">Liste des clients</div>
        <v-data-iterator
            :items="items"
            :search="search"
            :sort-by="sortBy.toLowerCase()"
            hide-default-footer
        > 
            <template v-slot:default="props">
                <v-row class="pa-4">
                    <v-col v-for="c in props.items" :key="c" cols="12" md=3 sm="6" xs="12">
                        <v-hover v-slot={hover}>
                            <v-card class="mx-auto" :color="!hover ? 'body':'gardient'" :elevation="hover ? 12 : 2" max-width="600">
                                <v-img :aspect-ratio="16/9" src="sary (8).jpg" class="pa-2 text-right">
                                    <div class="text-right"><v-icon class="red--text" @click="deleteItem(c)">fa-trash</v-icon></div>
                                </v-img>
                                <v-card-text>
                                    <v-row class="px-4 pt-3">
                                        <div class="font-weight-black text--font white--text text-h5 mb-2">{{c.nom}}</div>
                                        <v-spacer />
                                        <v-avatar style="position: relative; top:-10px" class="font-weight-black body text--font white--text text-h5 elevation-5">15</v-avatar>
                                    </v-row>
                                    <div class="text-body-2 mt-4 black--text font-weight-black"><v-icon>mdi-phone</v-icon>. {{ c.contact }}</div>
                                    <div class="text-body-2 black--text font-weight-black"><v-icon>mdi-email</v-icon>. {{ c.email }}</div>
                                    <div class="text-body-2 black--text font-weight-black"><v-icon>mdi-map-marker-multiple</v-icon>. {{ c.adress }}</div>
                                </v-card-text>
                            </v-card>
                        </v-hover>
                    </v-col>
                </v-row>
            </template>
        </v-data-iterator>
        <DeleteDialog :open="deldialog" :message="delmsg" @close="deldialog=false;getAll()" @accept="deleteClient()" />
        <AlertMessageVue :active="alert" :message="alertmsg" :type="typealert"/>
    </div>
</template>
<script>
import clientService from '@/services/clientService'
import DeleteDialog from '@/components/DeleteDialog.vue';
import AlertMessageVue from '@/components/AlertMessage.vue';

export default {
    components:{DeleteDialog,AlertMessageVue,},
    data() {
        return {
            alert:false,
            alertmsg:'',
            typealert:'success',
            deldialog:false,
            delmsg:'',
            sortBy: 'idcli',
            search: '',
            keys: [
                'nom',
                'contact',
                'email',
                'adress',
            ],
            items:[],
            selected:null,
        }
    },
    methods: {
        async getAll(){
            await clientService.getAll()
            .then((res) => {
                this.items=res.data.clients
            }).catch((err) => {
                console.log(err);
            });
        },
        deleteItem(data){
            this.selected=data.idcli
            this.deldialog=true
            this.delmsg=`Voulez-vous supprimer vraiment la client '${data.nom}' ?`
        },
        async deleteClient(){
            await clientService.delete(this.selected)
            .then((res) => {
                if (res.data.error) {
                    this.alert=true
                    this.alertmsg=res.data.error
                    this.typealert='error'
                    setTimeout(() => {
                        this.alert=false
                    }, 3000);
                } else {
                    this.deldialog=false
                    this.alert=true
                    this.alertmsg=res.data.sucee
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
    },
    computed: {
        
    },
    mounted() {
        document.title= this.$route.meta.title
        this.getAll()
    },
}
</script>