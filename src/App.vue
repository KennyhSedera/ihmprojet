<template>
  <v-app>
    <Navbarvue v-if="$route.name!='login' && $route.name!='notFound'" />
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>
<script>
import Navbarvue from '@/components/NavBar.vue'

export default {
  components:{
    Navbarvue
  },
  data() {
    return {
      // 
    }
  },
}
</script>