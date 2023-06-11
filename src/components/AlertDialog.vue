<template>
    <div>
        <v-dialog
            v-model="dialog"
            width="400px"
            persistent
            transition="dialog-transition"
        >
            <v-card width="100%" class="pa-2 body">
                    <div class="px-4  text-body-1 black--text text-center mb-4 mt-8">{{ message }}</div>
                <v-card-actions class="text-center">
                    <v-spacer></v-spacer>
                    <v-btn class="col-5 text-capitalize" color="body" @click="$emit('close')">ok</v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
export default {
    props:['open', 'message'],
    computed: {
        dialog(){return this.open}
    },
}
</script>