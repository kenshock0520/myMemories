<template>
  <div>
    <div class="message" v-for="(message,index) in messages" :key="message" :class="{own: message.user == userid}">
      <div class="username" v-if="index>0 && messages[index-1].user != message.user">{{ searchUser(message.user) }}</div>
      <div class="username" v-if="index == 0">{{ searchUser(message.user) }}</div>
      <div style="margin-top: 5px"></div>
      <div class="content">
        <div v-html="message.content"></div>
        <div>{{message.date | conversion}}</div>
        <chat-image v-if="message.image" :imgsrc="message.image" @imageLoad="imageLoad"></chat-image>
      </div>
    </div>
  </div>
</template>

<script>
  import Image from '@/components/Chat/Image'
  import * as firebase from 'firebase'
  export default {
    data () {
      return {
        user: []
      }
    },
    props: [
      'messages'
    ],
    components: {
      'chat-image': Image
    },
    mounted () {
      this.getUserInfo()
    },
    computed: {
      userid () {
        return this.$store.state.user.uid
      }
    },
    watch: {
      '$route.params.id' (newId, oldId) {
        this.getUserInfo()
      }
    },
    methods: {
      imageLoad () {
        // this.$emit('imageLoad')
      },
      getUserInfo: function () {
        const that = this
        firebase.database().ref('user').on('value', function (snapshot) {
          that.user = snapshot.val()
        })
      },
      searchUser: function (val) {
        console.log('user:' + val)
        console.log('useraaaa:' + this.user)
        return this.user[val].name
      }
    },
    filters: {
      conversion: function (val) {
        if (!val) return ''
        var dt = new Date(val)
        var y = dt.getFullYear()
        var m = ('00' + (dt.getMonth() + 1)).slice(-2)
        var d = ('00' + dt.getDate()).slice(-2)
        var hh = ('00' + dt.getHours()).slice(-2)
        var mm = ('00' + dt.getMinutes()).slice(-2)
        var ss = ('00' + dt.getSeconds()).slice(-2)
        var result = y + '/' + m + '/' + d + ' ' + hh + ':' + mm + ':' + ss
        return result
      }
    }
  }
</script>

<style>
  span.emoji {
    font-size: 14px;
    vertical-align: middle;
    line-height: 2;
  }
</style>