<template>
    <div class="gardient pb-4">
        <v-row class="pt-4 px-2">
            <nav class="col-12 col-md-6 col-xs-12"><v-card img="sary (3).jpg" height="400"></v-card></nav>
            <nav class="col-12 col-md-6 col-xs-12"><v-card img="sary (20).jpg" height="400"></v-card></nav>
        </v-row>
        <v-row class="pa-4">
        <v-col md="6">
            <v-row>
                <div class="col-6">
                    <v-hover v-slot="{ hover }">
                        <v-card :elevation="hover ? 12 : 2" class="rounded-lg" :class="{ 'on-hover': hover }">
                            <v-img class="" src="sary (30).jpg" height="160"></v-img>
                        </v-card>
                    </v-hover>
                    <v-hover v-slot="{ hover }">
                        <v-card :elevation="hover ? 12 : 2" class="rounded-lg" :class="{ 'on-hover': hover }">
                            <v-img  class="mt-2" src="logo (3).jpg" height="200"></v-img>
                        </v-card>
                    </v-hover>
                </div>
                <nav class=" col-6">
                    <v-hover v-slot="{ hover }">
                        <v-card :elevation="hover ? 12 : 2" class="rounded-lg" :class="{ 'on-hover': hover }">
                            <v-img src="sary (25).jpg" height="370"></v-img>
                        </v-card>
                    </v-hover>
                </nav>
            </v-row>
        </v-col>
        <v-col md="6" class="">
            <div class="text-center text-font primary--text">Bienvenue</div>
            <div class="text-body-1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora quas autem voluptatibus et neque commodi, sequi modi sunt! Ratione fugiat obcaecati non, dolores eligendi illum dolor cupiditate pariatur molestiae qui.
            </div>
        </v-col>
        </v-row>
        <div class="pt-6">
            <div class="text-center"><v-icon class="font-icon primary--text" size="60px">mdi-silverware</v-icon></div>
            <div class="text-center text-font primary--text">Catégorie Produit</div>
            <v-row class="pa-4">
                <v-col cols="12" class="col-md-3 col-sm-6 px-2 mx-auto mt-2" v-for="n in ns" :key="n">
                    <v-hover v-slot="{ hover }">
                        <v-card :elevation="hover ? 12 : 2" :class="{ 'on-hover': hover }" :color="hover ? 'gardient':'body'" @click="$router.push({name:'produit'})">
                                <v-img class="" :src="hover ? n.img : n.img2" height="200px"></v-img>
                                <nav class="pa-4 text-h5 text-font primary--text font-weight-black">{{ n.title }}</nav>
                                <div class="pa-2">{{n.text}}</div>
                        </v-card>
                    </v-hover>
                </v-col>
            </v-row>
        </div>
        <div class="py-6">
            <div class="text-center"><v-icon class="font-icon primary--text" size="60px">mdi-account-group</v-icon></div>
            <div class="text-center text-font primary--text">Les Chefs</div>
            <v-row>
                <v-col v-for="n in chefs" :key="n" class=" col-md-3 col-sm-6 col-10 px-2 mx-auto">
                    <v-hover v-slot="{ hover }">
                        <v-card :elevation="hover ? 12 : 2" :color="hover ? 'gardient':'body'" :class="{ 'on-hover': hover }" class="mx-md-4 mx-sm-2 px-2">
                            <v-img :aspect-ratio="16/9" class="" :src="n.img" height="320px">
                                <div class="text-right white--text font-weight-black text-h4 text--font mr-4" style="position:relative; top:85%">Rija</div>
                            </v-img>
                            <div class="pa-4">
                                <v-row>
                                    <nav class="col-3"><v-icon class="primary--text">mdi-facebook</v-icon></nav>
                                    <nav class="col-3"><v-icon class="red--text">mdi-email</v-icon></nav>
                                    <nav class="col-3"><v-icon class="primary--text">mdi-phone</v-icon></nav>
                                    <nav class="col-3"><v-icon class="deep-purple--text">mdi-google-plus</v-icon></nav>
                                </v-row>
                            </div>
                        </v-card>
                    </v-hover>
                </v-col>
            </v-row>
        </div>
        <div class="py-6">
            <div class="text-center"><v-icon class="font-icon primary--text" size="60px">mdi-cart</v-icon></div>
            <div class="text-center text-font primary--text">Meilleurs produits</div>
            <v-row class="pa-4">
                <v-col v-for="n in items" :key="n" cols="12" md="3" sm="12">
                    <v-hover v-slot="{ hover }">
                        <v-card class="mx-auto" :elevation="hover ? 12 : 2" :color="hover ? 'gardient':'body'" max-width="600" @click="$router.push({name:'produit'})">
                            <v-img :aspect-ratio="16/9" :src="n.img">
                                <v-expand-transition>
                                    <div v-if="hover" class="d-flex transition-fast-in-fast-out body font-weight-black v-card--reveal text-font primary--text text-h3" style="height: 100%;">
                                        {{ n.prix }} Ar
                                    </div>
                                </v-expand-transition>
                            </v-img>
                            <v-divider />
                            <v-card-text class="pt-6" style="position: relative;">
                                <v-btn absolute class="body font-icon primary--text" fab large right top>
                                    <v-icon>mdi-cart</v-icon>
                                </v-btn>
                                <div class="font-weight-black black--text text-body-1 mb-2">{{ n.categorie }}</div>
                                <h3 class="text-h5 text--font font-weight-black white--text mb-2">{{ n.design }}</h3>
                            </v-card-text>
                        </v-card>
                    </v-hover>
                </v-col>
            </v-row>
        </div>
        <div class="py-6">
            <div class="text-center"><v-icon class="font-icon primary--text" size="60px">mdi-camera</v-icon></div>
            <div class="text-center text-font primary--text">Galerie Photos</div>
            <v-row class="pa-4">
                <v-card class="border col-md-2 col-sm-6 col-12 my-sm-2 my-1" v-for="n in photos" :key="n" :img="n.src" height="200px"></v-card>
            </v-row>
        </div>
        <v-divider></v-divider>
        <div class="body text-center pb-8" height="200">
            <div class="text-font primary--text">Mada laitiers</div> 
            <div class="--text text-body-1"><v-icon>mdi-phone</v-icon>: 0342235884</div> 
            <div class="--text text-body-1"><v-icon>mdi-email</v-icon>: madalaitiers@gmail.com</div> 
            <div class="--text text-body-1"><v-icon>mdi-map-marker-multiple</v-icon>: Totobato Antaninarenima - Antananarivo</div> 
            <div class="--text text-h6 text--secondary">Partenaires officiel:</div> 
            <v-row class="pa-6">
                <v-card v-for="n in logos" :key="n" :img="n" class="mx-md-auto mx-auto my-2 col-md-1 col-5 ml-sm-2 col-xs-12" min-height="80"></v-card>
            </v-row>
        </div>
        <AlertMessage :active="active" :type="alertType" :message="alertMsg"/>
    </div>
</template>
<script>
import AlertMessage from '@/components/AlertMessage'
import produitService from '@/services/produitService'

export default {
    components:{AlertMessage},
    data() {
        return {
            active:false,
            alertType:'success',
            alertMsg:'',
            ns:[
                {id:1, img:'sary (2).jpg', img2:'sary (9).jpg', title:'Fromages', text:'Le podium est occupé par le parmigiano reggiano, le gorgonzola piccante et la burrata, suivis par quatre autres fromages italiens qui trustent le palmarès jusqu\'à la 7ème place. Le mont-d\'or, le beaufort, le neufchâtel et le Saint-Félicien sont tout de même distingués dans le top 40.'},
                {id:2, img:'sary (2).jfif', img2:'images (38).jpg', title:'Yaourt', text:'Le podium est occupé par le parmigiano reggiano, le gorgonzola piccante et la burrata, suivis par quatre autres fromages italiens qui trustent le palmarès jusqu\'à la 7ème place. Le mont-d\'or, le beaufort, le neufchâtel et le Saint-Félicien sont tout de même distingués dans le top 40.'},
                {id:3 ,img:'sary (15).jpg', img2:'sary (10).jpg', title:'Beurres', text:'Le podium est occupé par le parmigiano reggiano, le gorgonzola piccante et la burrata, suivis par quatre autres fromages italiens qui trustent le palmarès jusqu\'à la 7ème place. Le mont-d\'or, le beaufort, le neufchâtel et le Saint-Félicien sont tout de même distingués dans le top 40.'},
                {id:4 ,img:'sary (4).jpeg', img2:'sary (2).jpeg', title:'Glaces', text:'Le podium est occupé par le parmigiano reggiano, le gorgonzola piccante et la burrata, suivis par quatre autres fromages italiens qui trustent le palmarès jusqu\'à la 7ème place. Le mont-d\'or, le beaufort, le neufchâtel et le Saint-Félicien sont tout de même distingués dans le top 40.'},
            ],
            chefs:[
                {img:'chef1.png'},
                {img:'chef2.png'},
                {img:'chef3.png'},
                {img:'chef4.png'},
            ],
            photos:[
                {src:'images (96).jfif'}, 
                {src:'téléchargement (26).jfif'}, 
                {src:'sary (7).jpg'}, 
                {src:'images (17).jfif'}, 
                {src:'images (59).jfif'}, 
                {src:'images (46).jfif'},
            ],
            items:[],
            logos:['logo.jpg', 'logo (1).jpg', 'logo (2).jpg', 'logo (3).jpg', 'logo (4).jpg', 'logo (5).jpg', 'logo (6).jpg', 'logo (7).jpg', ],
        }
    },
    methods: {
        async getproduit(){
            await produitService.topproduit()
            .then((res) => {
                this.items=res.data.produits
            }).catch((err) => {
                console.log(err);
            });
        },
    },
    mounted() {
        document.title= this.$route.meta.title 
        this.getproduit()
    },
}
</script>
<style>
.text-font {
  font-family: 'Brush Script MT', cursive;
  font-size: 60px;
  text-shadow: 3px 3px 3px #fff;
}
.text--font {
  text-shadow: 3px 3px 3px blue;
}
.font-icon {
  text-shadow: 3px 3px 3px #fff;
}
.body{
    background: linear-gradient(to bottom right, #0066ff8f 0%, #ffffff 100%);
}
.gardient{
    background: linear-gradient(to bottom right, #ffffff 0%, #0066ff8f 100%);
}
</style>