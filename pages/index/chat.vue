<template>
  <span>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-list two-line>
            <template v-for="(msg, index) in chatMessages">
              <v-list-tile
                :key="msg.id"
                avatar
              >
                <v-list-tile-avatar>
                    <img
                      :src="$store.state.user.photoURL"
                    >
                  </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>{{msg.contact}}</v-list-tile-title>
                  <v-list-tile-sub-title>{{msg.messages[0]}}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-divider
                :key="index"
              ></v-divider>
            </template>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
    <v-footer app inset style="height: 48px">
      <v-layout row align-center class="pa-4">
        <v-flex xs11>
          <v-text-field v-model="message" @keyup.enter="sendMessage(message)" single-line label="Type a message..."></v-text-field>
        </v-flex>
        <v-flex xs1 align-end style="min-width: 100px">
          <v-btn color="blue" flat @click="sendMessage(message)">send &nbsp; <v-icon>send</v-icon></v-btn>
        </v-flex>
      </v-layout>
    </v-footer>
  </span>
</template>


<script>
import { db } from '~/plugins/firebase'
// import firebase from 'firebase'
export default {
  data () {
    return {
      messageInputHeight: '48px',
      replyMessage: '',
      message: '',
      messages: [],
      username: '',
      userUid: '',
      chatMessages: ''
    }
  },
  methods: {
      sendMessage (value) {
        if (!value) {
          alert('入力してください。')
          return
        }
        var date = new Date()
        var time = date.getTime()
        this.messages.push(value)
        db.ref('messages/' + this.$store.state.user.uid + '/' + time).set({
          messages: this.messages,
          contact: this.$store.state.user.displayName,
          id: time
        })
         this.message = ''
      }
  },
  mounted: function () {
    var data = db.ref('messages/' + this.$store.state.user.uid)
    var self = this
    data.on('value', function (snapshot) {
      self.chatMessages = snapshot.val()
    })
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
ul li {
  list-style-type:none;
  padding: 0;
}
ul {
  padding: 0;
}
</style>