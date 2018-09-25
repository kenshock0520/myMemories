<template>
  <v-list subheader>
    <v-btn
      v-if="btnDisp == true"
      fab
      bottom
      right
      color="pink"
      dark
      fixed
      @click="create()"
    >
      <v-icon>add</v-icon>
    </v-btn>
    <v-subheader>Recent Chats</v-subheader>
    <v-list-tile avatar v-for="(chat, index) in chats" v-bind:key="chat.name" nuxt :to="/chat/ + index">
      <v-list-tile-content>
        <v-list-tile-title v-html="chat.name"></v-list-tile-title>
      </v-list-tile-content>
      <v-list-tile-action>
        <v-icon>chat_bubble</v-icon>
      </v-list-tile-action>
    </v-list-tile>
  </v-list>
</template>

<script>
  export default{
    props: [
      'btnDisp'
    ],
    data () {
      return {
        recentChats: 'Recent Chats'
      }
    },
    created () {
      this.$store.dispatch('loadChats')
    },
    computed: {
      chats () {
        return this.$store.getters.chats
      }
    },
    methods: {
      create () {
        this.$router.push('/chat/Create')
      }
    }
  }
</script>