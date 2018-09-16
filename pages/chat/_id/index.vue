<template>
  <span>
    <v-layout ref="chatMessages" row>
      <v-flex xs12>
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
                  <v-list-tile-sub-title>{{msg.message}}</v-list-tile-sub-title>
                  <v-list-tile-sub-title>{{msg.id | conversion}}</v-list-tile-sub-title>
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
    <v-footer app inset>
      <v-layout row>
        <v-flex xs12 style="position: relative;">
          <emoji-picker :show="emojiPanel" @close="toggleEmojiPanel" @click="addMessage"></emoji-picker>
          <div class="typer">
            <v-btn icon class="blue--text emoji-panel" @click="toggleEmojiPanel">
              <v-icon>mood</v-icon>
            </v-btn>
            <v-text-field v-model="message" @keyup.enter="sendMessage(message)" box label="Type a message..."></v-text-field>
            <v-btn color="blue" flat @click="sendMessage(message)">send &nbsp; <v-icon>send</v-icon></v-btn>
          </div>
        </v-flex>
      </v-layout>
    </v-footer>
  </span>
</template>


<script>
import { db } from '~/plugins/firebase'
// import firebase from 'firebase'
import EmojiPicker from '@/components/Chat/EmojiPicker'
export default {
  data () {
    return {
      messageInputHeight: '48px',
      replyMessage: '',
      message: '',
      messages: [],
      username: '',
      userUid: '',
      chatMessages: '',
      emojiPanel: false
    }
  },
  components: {
    'emoji-picker': EmojiPicker
  },
  methods: {
      sendMessage (value) {
        if (!value) {
          alert('入力してください。')
          return
        }
        var date = new Date()
        var time = date.getTime()
        db.ref('messages/' + this.$store.state.user.uid + '/' + time).set({
          message: value,
          contact: this.$store.state.user.displayName,
          id: time
       })
         this.message = ''
      },
      toggleEmojiPanel () {
        this.emojiPanel = !this.emojiPanel
      },
      addMessage (emoji) {
        this.message += emoji.value
      }
  },
  mounted: function () {
    var data = db.ref('messages/' + this.$store.state.user.uid)
    var self = this
    data.on('value', function (snapshot) {
      self.chatMessages = snapshot.val()
    })
  },
  filters: {
    conversion: function (ms) {
      if (!ms) return ''
      var dt = new Date(ms)
      var y = dt.getFullYear()
      var m = ('00' + (dt.getMonth() + 1)).slice(-2)
      var d = ('00' + dt.getDate()).slice(-2)
      var hh = ('00' + dt.getHours()).slice(-2)
      var mm = ('00' + dt.getMinutes()).slice(-2)
      var ss = ('00' + dt.getSeconds()).slice(-2)
      var result = y + '/' + m + '/' + d + ' ' + hh + ':' + mm + ':' + ss
      return result
    }
  },
  watch: {
    chatMessages () {
      this.$nextTick(function () {
         console.log('nextTick:' + this.$refs.chatMessages.offsetHeight)
         window.scrollTo(0, this.$refs.chatMessages.offsetHeight)
      })
    }
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
span.emoji {
    font-size: 20px;
    vertical-align: middle;
    line-height: 2;
}
.typer{
  box-sizing: border-box;
  display: flex;
  align-items: center;
  bottom: 0;
  height: 5.8rem;
  width: 100%;
  background-color: #fff;
  box-shadow: 0 -5px 10px -5px rgba(0,0,0,.2);
}
.chat-container{
  box-sizing: border-box;
  height: calc(100vh - 9.5rem);
  overflow-y: auto;
  padding: 10px;
  background-color: #f2f2f2;
}
.chat-container .content{
  padding: 8px;
  background-color: lightgreen;
  border-radius: 10px;
  display:inline-block;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,0.2), 0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.12);
  max-width: 50%;
  word-wrap: break-word;
}
@media (max-width: 480px) {
  .chat-container .content{
    max-width: 60%;
  }
}
</style>