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
import { db } from '~/plugins/firebase'
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
      this.registUser()
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
    },
    registUser () {
      db.ref('user/' + this.$store.state.user.uid).set({
        id: this.$store.state.user.uid,
        name: this.$store.state.user.displayName,
        email: this.$store.state.user.email,
        photUrl: this.$store.state.user.photoURL
      })
    }
  }
}
</script>

<style lang="css">
.v-overlay--active:before {
  opacity: 1.0 !important;
}
.v-overlay:before {
  background-color: #156fdb;
  bottom: 0;
  content: '';
  height: 100%;
  left: 0;
  opacity: 0;
  position: absolute;
  right: 0;
  top: 0;
  transition: inherit;
  transition-delay: 150ms;
  width: 100%;
}
</style>