<template>
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
</template>