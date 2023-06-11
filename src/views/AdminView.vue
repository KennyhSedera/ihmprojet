<template>
    <div class="gardient">
        <v-card-actions class="">
            <v-tabs v-model="tab" right align-with-title>
                <v-tabs-slider color="primary"></v-tabs-slider>
                <v-tab v-for="item in tabs" :key="item" @change="getAll()" class="text-font text-h6 transparent text-capitalize font-weight-black primary--text">
                    {{ item }}
                </v-tab>
                <v-spacer></v-spacer>
            </v-tabs>
            <v-spacer />
            <v-text-field v-model="search" label="Rechercher" clearable class="col-6 col-sm-6 col-md-3" append-icon="mdi-magnify"></v-text-field>
        </v-card-actions>
        <v-row v-if="nouveau && tab==0" class="pa-4" id="create">
            <v-col cols="12" md="1"></v-col>
            <v-col cols="12" md="6">
                <v-card class="mx-auto body">
                    <div class="text-center text-font blue--text">{{title}} produit</div>
                    <v-card-text class="pt-6 text-center" style="position: relative;">
                        <v-form v-model="valid" ref="form">
                            <v-row>
                                <div class="col-12 col-md-6">
                                    <v-autocomplete label="Categorie" :rules="rules" v-model="categorie" placeholder="Categorie" :items="categ" solo/>
                                    <v-text-field label="Prix" :rules="rules" v-model="prix" placeholder="Prix" type="number" solo/>
                                </div>
                                <div class="col-12 col-md-6">
                                    <v-text-field label="Design" :rules="rules" v-model="design" placeholder="Design" solo/>
                                    <v-text-field label="Quantite" :rules="rules" v-model="quantite" placeholder="Quantite" type="number" solo/>
                                </div>
                            </v-row>
                        </v-form>
                        <v-btn class="text-capitalize primary col-3" @click="validate">{{btnTitle}} <v-icon class="ml-2" small>{{iconTitle}}</v-icon></v-btn>
                        <v-icon class="ml-4" v-if="invalid" @click="reset">mdi-refresh</v-icon>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" md="4">
                <v-card :img="previewImage" class="mx-auto" height="320">
                    <v-btn class="body ml-4" style="position:relative; top:85%" small fab>
                        <v-file-input
                        show-size
                        hide-input
                        label="Select Image"
                        accept="image/*"
                        class="mb-4 ml-2 font-icon primary--text"
                        @change="selectImage"
                        prepend-icon="mdi-camera"
                        ></v-file-input>
                    </v-btn>
                </v-card>
            </v-col>
            <v-col cols="12" md="1" sm="0"></v-col>
        </v-row>
                    <div v-if="tab==0" class="text-center text-font primary--text">Produits disponible</div>
                    <div v-if="tab==1" class="text-center text-font primary--text">Produits entrée</div>
                    <div v-if="tab==2" class="text-center text-font primary--text">Produits sortie</div>
        <v-data-iterator
            :items="items"
            :search="search"
            :sort-by="sortBy.toLowerCase()"
            hide-default-footer
        >   
            <template v-slot:default="props">
                <div v-if="tab==0">
                    <v-row class="pa-4">
                        <v-col v-for="n in props.items" :key="n" cols="12" md=3 sm="6" xs="12">
                            <v-hover v-slot={hover}>
                                <v-card class="mx-auto" :elevation="hover ? 12 : 2" :color="hover ? 'gardient':'body'" max-width="600">
                                    <v-img :aspect-ratio="16/9" :src="n.img">
                                        <div class="text-right mt-2">
                                            <v-icon class="red--text font-icon elevation-5" @click="deleteItem(n)">fa-trash</v-icon>
                                            <a href="#create">
                                                <v-icon class="primary--text font-icon elevation-5 mx-2 mt-1" @click="editItem(n)">fa-edit</v-icon>
                                            </a>
                                        </div>
                                    </v-img>
                                    <div>
                                        <v-card-text class="pt-6" style="position: relative;">
                                            <v-btn absolute class="text-h5 font-weight-black body text--font white--text" fab large right top @click="selectId(n)">
                                                {{n.qte}}
                                            </v-btn>
                                            <div class="font-weight-black black--text text-body-1 mb-2">{{n.categorie}}</div>
                                            <h3 class="text-h5 text--font font-weight-black white--text mb-2">{{ n.design }}</h3>
                                        </v-card-text>
                                        <v-expand-transition>
                                            <div v-if="addQte && n.idpro==idselected" class="body card--reveal" style="height: 80px;">
                                                <div class="text-right">
                                                    <v-hover v-slot="{ hover }">
                                                        <v-icon @click="idselected=null; addQte=false" :class="hover?'red white--text':' white--text'">mdi-close</v-icon>
                                                    </v-hover>
                                                </div>
                                                <v-text-field class="col-12" @keypress.enter="addEntree()" @keyup.enter="addEntree()" type="number" v-model="qteentree" label="Quantité entrée"></v-text-field>
                                            </div>
                                        </v-expand-transition>
                                    </div>
                                </v-card>
                            </v-hover>
                        </v-col>
                    </v-row>
                </div>
                <div v-if="tab==1">
                    <v-row class="pa-4">
                        <v-col v-for="n in props.items" :key="n" cols="12" md=3 sm="6" xs="12">
                            <v-hover v-slot={hover}>
                                <v-card :elevation="hover ? 12 : 2" :color="hover ? 'gardient':'body'">
                                    <v-img :aspect-ratio="16/9" :src="n.img">
                                        <div class="text-right mt-2">
                                            <v-icon class="red--text mr-2 font-icon elevation-5" @click="deleteItem(n)">fa-trash</v-icon>
                                        </div>
                                    </v-img>
                                    <v-card-text class="pt-6" style="position: relative;">
                                        <v-btn absolute class="font-weight-black body text--font white--text text-h5 elevation-5" fab large right top>
                                            {{n.qte}}
                                        </v-btn>
                                        <h3 class="text-h5 font-weight-black white--text text--font  mb-2">{{n.design}}</h3>
                                        <div class="text-body-2 black--text text-capitalize font-weight-black"><v-icon>mdi-clock</v-icon> {{setDate(date)}}</div>
                                    </v-card-text>
                                </v-card> 
                            </v-hover>
                        </v-col>
                    </v-row>
                </div>
                <div v-if="tab==2">
                    <v-row class="pa-4">
                        <v-col v-for="n in props.items" :key="n" cols="12" md=3 sm="6" xs="12">
                            <v-hover v-slot={hover}>
                                <v-card :elevation="hover ? 12 : 2" :color="hover ? 'gardient':'body'">
                                    <v-img :aspect-ratio="16/9" :src="n.img">
                                        <div class="text-right mt-2">
                                            <v-icon class="red--text font-icon elevation-5 mr-2" @click="deleteItem(n)">fa-trash</v-icon>
                                        </div>
                                    </v-img>
                                    <v-card-text class="pt-6" style="position: relative;">
                                        <v-btn absolute class="font-weight-black body text--font white--text text-h5 elevation-5" fab large right top>
                                            {{n.qte}}
                                        </v-btn>
                                        <h3 class="text-h5 font-weight-black white--text text--font  mb-2">{{n.design}}</h3>
                                        <div class="text-body-2 black--text text-capitalize font-weight-black"><v-icon>mdi-clock</v-icon> {{setDate(date)}}</div>
                                    </v-card-text>
                                </v-card> 
                            </v-hover>
                        </v-col>
                    </v-row>
                </div>
            </template>
        </v-data-iterator>
        <AlertMessage :active="active" :type="typeAlert" :message="msgAlert"/>
        <ValidateDialog :open="open" @close="open=false" :message="validMsg"/>
        <DeleteDialogVue :open="deldialog" @close="deldialog=false" @accept="deleteProduit()" :message="delMsg"/>
    </div>
</template>
<script>
import AlertMessage from '@/components/AlertMessage'
import ValidateDialog from '@/components/ValidateDialog'
import DeleteDialogVue from '@/components/DeleteDialog.vue'
import produitService from '@/services/produitService'
import UploadService from '@/services/uploadService'
import moment from 'moment'


export default {
    components:{
        AlertMessage,
        ValidateDialog,
        DeleteDialogVue,
    },
    data() {
        return {
            tab:0,
            delMsg:'',
            validMsg:'',
            idselected:1,
            deldialog:false,
            open:false,
            addQte:false,
            nouveau:true,
            active:false,
            typeAlert:'success',
            msgAlert:'',
            currentImage: undefined,
            previewImage: 'sary (3).jpg',
            categ:['Yaourt','Glace','Beurre','Fromage'],
            search:'',
            sortBy: 'idpro',
            keys: [
                'design',
                'categorie',
                'prix',
            ],
            items:[],
            id:0,
            cli:false,
            design:'',
            categorie:'',
            idpro:'',
            rules:[
                v => !!v || 'Cette champ est vide.',
            ],
            valid: true,
            invalid: false,
            quantite:null,
            qteentree:null,
            total:null,
            phone:'+261 ',
            mail:'',
            nom:'',
            adress:'',
            btnTitle:'Enregistrer',
            tabs:['Tous les produits', 'Produits entrée', 'Produits sortie'],
            date:new Date(),
            title:'Nouveau',
            iconTitle:'fa-download',
        }
    },
    methods: {   
        getMax(){
          if (this.items.length<= 0){
            this.idpro= 1
          }else {
            var max  = this.items[this.items.length - 1].idpro
            this.idpro = parseInt(max++)+1
          }
        },
        async getAll(){
            if (this.tab===0) {
                await produitService.getAll()
                .then((res) => {
                    this.items = res.data.produits
                    this.getMax()
                }).catch((err) => {
                    console.log(err);
                });
            } else if(this.tab===1){
                await produitService.getEntree()
                .then((res) => {
                    this.items = res.data.entrees
                }).catch((err) => {
                    console.log(err);
                });
            }else{
                await produitService.getSortie()
                .then((res) => {
                    this.items = res.data.sorties
                }).catch((err) => {
                    console.log(err);
                });
            }
        },
        selectImage(e) {
            this.currentImage = e;
            this.previewImage = URL.createObjectURL(this.currentImage);
        },
        reset(){
            this.$refs.form.reset()
            this.invalid=false
            this.previewImage = 'sary (3).jpg'
            this.title = 'Nouveau'
            this.btnTitle = 'Enregistrer'
            this.iconTitle = 'fa-download'
        },
        async validate () {
            this.$refs.form.validate()
            if (this.valid) {
                if (this.btnTitle == 'Enregistrer') {
                    if (!this.currentImage) {
                        this.active=true
                        this.msgAlert="Auccun photos selectionner !"
                        this.typeAlert='error'
                        setTimeout(() => {
                            this.active=false
                        }, 3000); 
                        return;
                    }
                        await UploadService.upload(this.currentImage)
                        .then(() => {
                            produitService.create({
                                idpro: this.idpro,
                                categories:this.categorie,
                                design:this.design,
                                prix:this.prix,
                                quantite:this.quantite
                            })
                            .then((res) => {
                                if (res.data.error) {
                                    this.active=true
                                    this.msgAlert=res.data.error
                                    this.typeAlert='error'
                                    setTimeout(() => {
                                        this.getAll()
                                        this.active=false
                                    }, 3000);
                                } else {
                                    this.active=true
                                    this.msgAlert=res.data.succee
                                    this.typeAlert='success'
                                    setTimeout(() => {
                                        this.getAll()
                                        this.active=false
                                    }, 3000);
                                }
                                
                            }).catch((err) => {
                                console.log(err);
                            });
                        })
                } else {
                    await produitService.update({
                        categorie:this.categorie,
                        design:this.design,
                        prix:this.prix,
                        quantite:this.quantite
                    }, this.idselected)
                    .then((res) => {
                        if (res.data.error) {
                            this.active=true
                            this.msgAlert=res.data.error
                            this.typeAlert='error'
                            setTimeout(() => {
                                this.getAll()
                                this.active=false
                            }, 3000);
                        } else { 
                            this.active=true
                            this.msgAlert=res.data.succee
                            this.typeAlert='success'
                            setTimeout(() => {
                                this.getAll()
                                this.active=false
                            }, 3000);
                        }
                        
                    }).catch((err) => {
                        console.log(err);
                    });
                }
            }else{
                this.invalid=true
            }
            
        },
        selectId(data){
            this.addQte = true
            this.idselected = data.idpro
        },
        deleteItem(data){
            this.deldialog = true
            this.idselected = data.idpro
            this.delMsg = `Voulez-vous supprimer vraiment la produit '${data.design}' ?`
        },
        editItem(data){
            this.btnTitle = 'Modifier'
            this.title = 'Modifier'
            this.iconTitle = 'fa-edit'
            this.idselected = data.idpro
            this.design = data.design
            this.prix = data.prix
            this.categorie = data.categorie
            this.qte = data.qte
            this.photos = data.img
            this.nouveau = true
        },
        async deleteProduit(){
            if (this.tab===0) {
                await produitService.delete(this.idselected)
                .then((res) => {
                    if (res.data.error) {
                        this.active=true
                        this.msgAlert=res.data.error
                        this.typeAlert='error'
                        setTimeout(() => {
                            this.getAll()
                            this.active=false
                        }, 3000);
                    } else {
                        this.active=true
                        this.msgAlert=res.data.succee
                        this.typeAlert='success'
                        setTimeout(() => {
                            this.getAll()
                            this.active=false
                        }, 3000);
                    }
                }).catch((err) => {
                    console.log(err);
                });
            } else if (this.tab===1){
                await produitService.deleteentree(this.idselected)
                .then((res) => {
                    if (res.data.error) {
                        this.active=true
                        this.msgAlert=res.data.error
                        this.typeAlert='error'
                        setTimeout(() => {
                            this.tab = 1
                            this.active=false
                        }, 3000);
                    } else {
                        this.active=true
                        this.msgAlert=res.data.succee
                        this.typeAlert='success'
                        setTimeout(() => {
                            this.tab = 1
                            this.getAll()
                            this.active=false
                        }, 3000);
                    }
                }).catch((err) => {
                    console.log(err);
                });
            }else{
                await produitService.deletesortie(this.idselected)
                .then((res) => {
                    if (res.data.error) {
                        this.active=true
                        this.msgAlert=res.data.error
                        this.typeAlert='error'
                        setTimeout(() => {
                            this.tab=2
                            this.active=false
                        }, 3000);
                    } else {
                        this.active=true
                        this.msgAlert=res.data.succee
                        this.typeAlert='success'
                        setTimeout(() => {
                            this.tab = 1
                            this.getAll()
                            this.active=false
                        }, 3000);
                    }
                }).catch((err) => {
                    console.log(err);
                });
            }
        },
        async addEntree(){
            await produitService.addEntree({qteentree:this.qteentree}, this.idselected)
            .then((res) => {
                if (res.data.error) {
                    this.active=true
                    this.msgAlert=res.data.error
                    this.typeAlert='error'
                    setTimeout(() => {
                        this.getAll()
                        this.active=false
                    }, 3000);
                } else {
                    this.active=true
                    this.msgAlert=res.data.succee
                    this.typeAlert='success'
                    setTimeout(() => {
                        this.getAll()
                        this.active=false
                        this.addQte=false
                        this.idselected=null
                    }, 3000); 
                }
            }).catch((err) => {
                console.log(err);
            });
        },
        setDate (date) {
         return moment(date).format('dddd Do MMM YYYY ')
        },
    },
    mounted() {
        document.title= this.$route.meta.title
        this.getAll()
    },
}
</script>
<style>
.v-card--reveal {
  bottom: 0;
  justify-content: center;
  align-items: center;
  position: absolute;
  /* opacity:.5; */
  width: 100%;
}
.card--reveal {
  bottom: 0;
  justify-content: center;
  position: absolute;
  width: 100%;
}
</style>