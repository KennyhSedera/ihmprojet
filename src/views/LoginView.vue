<template>
    <div class="fill-height">
        <v-img class="" height="662" src="sary (1).jpeg">
            <v-card class="mx-auto text-center body rounded-lg" style="position: relative; top: 130px;" :max-width="currentWidth" :height="currentHeight">
                <v-window v-model="step">
                <v-window-item :value="1">
                    <v-form v-model="valid" ref="form">
                    <v-row>
                        <nav class="col-12 mt-2">
                            <span class="font-weight-black pa-2 text-h5">Se connecter</span>
                            <v-text-field
                                v-model="useremail"
                                @keyup.enter="connexion"
                                name="useremail"
                                label="Adresse mail"
                                class="mt-4 mx-10"
                                :rules="[rules.required]"
                                prepend-inner-icon="mdi-email"
                            ></v-text-field>
                            <v-text-field
                                class=" mx-10"
                                v-model="password"
                                @keyup.enter="connexion"
                                label="Mot de passe"
                                :rules="[rules.required]"
                                prepend-inner-icon="mdi-lock"
                                :type="see ? 'text':'password'"
                                :append-icon="see ? 'mdi-eye':'mdi-eye-off'"
                                @click:append="see =! see"
                            ></v-text-field>
                        </nav>
                    </v-row>
                    </v-form>
                    <v-btn color="px-12 col-5 primary" @click="connexion">connecter</v-btn>
                    <v-icon class="ml-4" small @click="reset1" v-if="invalid">fa-refresh</v-icon>
                    <div class="text-left text-caption ml-2 mt-4">Si vous n'avons pas encore de compte, <a @click="step++">créer ici.</a></div>
                </v-window-item>
                <v-window-item :value="2">
                    <span class="font-weight-black pa-2 text-h5">Nouveau compte</span>
                    <v-hover v-slot="{ hover }">
                      <span style="position: relative; left:160px"><v-icon @click="step--; reset2()" :class="hover ? 'error white--text':'white--text'">mdi-close</v-icon></span>
                    </v-hover>
                    <v-form v-model="valid" ref="ref">
                    <v-row>
                        <nav class="col-6 mt-2">
                            <v-text-field
                                v-model="username"
                                @keyup.enter="verifier"
                                label="Votre nom"
                                :rules="[rules.required]"
                                class="mt-4 ml-4"
                                prepend-inner-icon="mdi-account-circle"
                            ></v-text-field>
                            <v-text-field
                                v-model="useremail1"
                                @keyup.enter="verifier"
                                name="useremail"
                                label="Votre e-mail"
                                class="mt-4 ml-4"
                                :rules="[rules.required, rules.useremail]"
                                prepend-inner-icon="mdi-email"
                            ></v-text-field>
                            <v-text-field
                                class=" ml-4"
                                v-model="password1"
                                @keyup.enter="verifier"
                                label="Mot de passe"
                                :rules="[rules.required, rules.min]"
                                prepend-inner-icon="mdi-lock"
                                :type="see1 ? 'text':'password'"
                                :append-icon="see1 ? 'mdi-eye':'mdi-eye-off'"
                                @click:append="see1 =! see1"
                            ></v-text-field>
                        </nav>
                        <nav class="col-6 mt-2">
                            <v-text-field
                                v-model="poste"
                                @keyup.enter="verifier"
                                label="Votre poste"
                                class="mt-4 mr-4"
                                :rules="[rules.required]"
                                prepend-inner-icon="mdi-useremail"
                            ></v-text-field>
                            <v-text-field
                                v-model="phone"
                                @keyup.enter="verifier"
                                label="Numero tel"
                                class="mt-4 mr-4"
                                :rules="[rules.required]"
                                prepend-inner-icon="mdi-phone"
                            ></v-text-field>
                            <v-text-field
                                class=" mr-4"
                                v-model="password2"
                                @keyup.enter="verifier"
                                label="Confirmer mot de passe"
                                prepend-inner-icon="mdi-lock"
                                :rules="[rules.required, rules.confirm]"
                                :type="see2 ? 'text':'password'"
                                :append-icon="see2 ? 'mdi-eye':'mdi-eye-off'"
                                @click:append="see2 =! see2"
                            ></v-text-field>
                        </nav>
                    </v-row>
                    </v-form>
                    <v-btn color="px-12 col-5 primary" @click="verifier">créer</v-btn>
                    <v-icon class="ml-4" v-if="invalid" small @click="reset2">fa-refresh</v-icon>
                </v-window-item>
                </v-window>
            </v-card>

        </v-img>
        
        <v-overlay :value="overlay">
        <v-progress-circular
            indeterminate
            size="64"
        ></v-progress-circular>
        </v-overlay>
        <AlertDialogVue :open="open" :message="errormsg" @close="open=false"/>
        <AlertMessageVue :active="alert" :message="alertMsg" :type="typeAlert"/>
    </div>
</template>

<script>
import AlertDialogVue from '@/components/AlertDialog.vue'
import userService from '@/services/userService'
import AlertMessageVue from '@/components/AlertMessage.vue'

export default {
    components:{AlertDialogVue, AlertMessageVue,},
    data() {
        return {
            alert:false,
            alertMsg:'',
            typeAlert:'success',
            open:false,
            errormsg:'',
            invalid:false,
            valid:false,
            see:false,
            see1:false,
            see2:false,
            step:1,
            useremail: '',
            password: '',
            password1: '',
            password2: '',
            overlay: false,
            rules:{
                required: v => !!v || 'Cette champs ne doit pas etre vide',
                useremail: v => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/
                    return pattern.test(v) || 'Adresse useremail invalidée.'
                },
                min: v => v.length >= 8 || 'Entrer au moins 8 (huit) caracters',
                confirm: () => (this.password1 === this.password2) || 'Les mots de passe doivent-etre identique !'
            },
        }
    },
    watch: {
      overlay (val) {
        val && setTimeout(() => {
            this.overlay = false
            this.reset1()
            this.$router.push({path:'/accueil'})
        }, 3000)
      },
    },
    methods: {
        reset1(){
            this.invalid=false
            this.$refs.form.reset()
        },
        reset2(){
            this.invalid=false
            this.$refs.ref.reset()
        },
        async connexion(){
            this.$refs.form.validate()
            if(this.valid){
                this.invalid = false
                await userService.signup({useremail: this.useremail, password: this.password})
                .then(res =>{
                    if (res.data.error) {
                        this.open=true
                        this.errormsg=res.data.error
                    }
                    else {
                        this.invalid = false
                        localStorage.setItem('username', res.data.User.username); 
                        localStorage.setItem('useremail', res.data.User.useremail);
                        localStorage.setItem('token', res.data.accessToken);
                        localStorage.setItem('iduser', res.data.User.id_user);
                        this.overlay = ! this.overlay
                    }
                })
                .catch((err) =>{
                    console.log(err); 
                })
            }
            this.invalid=true
        },
        async create(){
                await userService.signup({
                    username:this.username,
                    useremail:this.useremail1,
                    userpost:this.poste,
                    password:this.password1,
                    userphone:this.phone,
                    statut:'inactive'
                })
                .then((res) => {
                    if (res.data.error) {
                        this.alert=true
                        this.alertMsg=res.data.error
                        this.typeAlert='error'
                        setTimeout(() => {
                            this.alert=false
                        }, 3000);
                    } else {
                        this.alert=true
                        this.alertMsg=res.data.succee
                        this.typeAlert='success'
                        setTimeout(() => {
                            this.alert=false
                        }, 3000);
                    }
                }).catch((err) => {
                    console.log(err);
                });
        },
        async verifier(){
            this.$refs.ref.validate()
            if(this.valid){
                await userService.verifyuseremail({useremail:this.useremail1})
                .then((res) => {
                    if (res.data.error) {
                        this.open=true
                        this.errormsg=res.data.error
                    } else {
                        this.create()
                    }
                }).catch((err) => {
                    console.log(err);
                });
            }
            this.invalid=true
        },
    },
    mounted() {
        document.title= this.$route.meta.title
    },
    computed: {
      currentWidth () {
        switch (this.step) {
          case 1: return 450
          default: return 550
        }
      },
      currentHeight () {
        switch (this.step) {
          case 1: return 270
          default: return 330
        }
      },
    },
}
</script>

<style>
  .border {
    border: 3px solid black  !important;
  }

  .v-sheet--offset {
    top: 90px;
    left: 100px;
    position: relative;
  }
  .v-btn--offset {
    top: -24px;
    right: 24px;
    position: relative;
  }
</style>