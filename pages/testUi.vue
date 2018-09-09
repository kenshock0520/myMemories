<template>
    <v-dialog :value='true' persistent=''>
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
</template>

<style>
  body{
    background: #666 !important;
  }
</style>

<script>
export default {
  data () {
    return {
      model: {
        username: 'admin',
        password: '123456'
      },
      fields: {
        username: { label: 'Username' },
        password: { label: 'Password', type: 'password' }
      },
      show: true
    }
  },
  methods: {
    onSuccess (data) {
      this.$store.commit('setAuth', data)
      this.$router.replace('/')
    }
  },
  mounted () {
  }
}
</script>