<template>
    <v-snackbar
        v-model="snackbar"
        :color="type"
        top
        right
    >
        <v-alert :type="type">
            {{ message }}
        </v-alert>
    </v-snackbar>
</template>
<script>
export default {
    data() {
        return {
            
        }
    },
    props:['active', 'type', 'message'],
    computed: {
        snackbar(){return this.active}
    },
}
</script>