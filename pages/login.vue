<template>
  <div class="columns" v-if="dialog">
    <v-dialog v-model='dialog' persistent=''>
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
    </v-dialog>
  </div>
  <div class="loading-wrapper" v-else>
    <div class="text-xs-center">
      <v-dialog
        :value= true
        hide-overlay
        persistent
        width="300"
      >
        <v-card
          color="primary"
          dark
        >
          <v-card-text>
            Please stand by
            <v-progress-linear
              indeterminate
              color="white"
              class="mb-0"
            ></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dialog: false
    }
  },
  mounted () {
    if (this.$store.state.user) {
      this.dialog = false
      // if non-null user given, go to root page.
      this.$router.push('/')
    } else {
      this.dialog = true
    }
  },
  methods: {
    googleSignUp () {
      this.dialog = false
      this.$store.dispatch('signInWithGoogle').then(() => {
        console.log('inside then statement on login')
      }).catch((e) => {
        console.log(e.message)
      })
    },
    update () {
      this.dialog = true
    }
  }
}
</script>

<style lang="css">
body{
  background: #666 !important;
}
</style>