<template>
    <div>
        <v-dialog
            v-model="dialog"
            width="500px"
            persistent
            transition="dialog-transition"
        >
            <v-card width="100%" class="pa-2 body">
                <v-card-text style="min-height:150px;">
                    <nav class="font-icon text-h4 font-weight-black primary--text px-6">{{ title }}</nav>
                    <div class="text-body-1 black--text text-center mt-10">{{ message }}</div>
                </v-card-text>
                <v-card-actions class="text-center">
                    <v-spacer></v-spacer>
                    <v-btn class="col-5 text-capitalize" color="" @click="$emit('close')">Annuler</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn class="col-5 text-capitalize white--text" color="blue" @click="$emit('accept')">Confirmer</v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
export default {
    props:['open', 'title', 'message'],
    computed: {
        dialog(){return this.open}
    },
}
</script>