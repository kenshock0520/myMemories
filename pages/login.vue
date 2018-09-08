<template>
  <v-app id="inspire">
    <v-container>
      <v-layout row class="text-xs-center">
        <v-flex xs4 style="">
          <v-card height="700px"></v-card>
        </v-flex>
        <v-flex xs4 class="blue lighten-4">
          <v-container style="position: relative;top: 25%;" class="text-xs-center">
            <v-card flat>
              <v-card-title primary-title>
                <h4>Login</h4>
              </v-card-title>
              <v-form>
              <v-card-actions>
                <v-btn primary large block @click.native="googleSignUp">Google Sign In</v-btn>
              </v-card-actions>
              </v-form>
            </v-card>
          </v-container>
        </v-flex>
        <v-flex xs4 style="">
          <v-card height="700px"></v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  mounted () {
    if (this.$store.state.user) {
      // if non-null user given, go to root page.
      this.$router.push('/')
    }
  },
  methods: {
    googleSignUp () {
      this.$store.dispatch('signInWithGoogle').then(() => {
        console.log('inside then statement on login')
      }).catch((e) => {
        console.log(e.message)
      })
    }
  }
}
</script>

<style lang="css">
.signIn {
}
</style>