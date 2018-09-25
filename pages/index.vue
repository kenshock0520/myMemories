<template>
  <v-app id="inspire">
    <v-navigation-drawer
      fixed
      clipped
      app
      v-model="drawer"
    >
      <v-list dense>
        <template v-for="(item, i) in items">
          <v-layout
            row
            v-if="item.heading"
            align-center
            :key="i"
          >
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-flex>
          </v-layout>
          <v-list-group v-else-if="item.children" :key="item.model" v-model="item.model" no-action>
            <v-list-tile slot="item" nuxt :to="item.link">
              <v-list-tile-action>
                <v-icon>{{ item.model ? item.icon : item['icon-alt'] }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
              v-for="(child, i) in item.children"
              :key="i"
            >
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ child.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile v-else :key="item" nuxt :to="item.link">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      color="blue darken-3"
      dark
      app
      clipped-left
      fixed
    >
      <v-toolbar-title :style="$vuetify.breakpoint.smAndUp ? 'width: 300px; min-width: 250px' : 'min-width: 72px'" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-xs-only">MyMemories</span>
      </v-toolbar-title>
      <div class="d-flex align-center" style="margin-left: auto">
        <v-btn icon>
          <v-icon>apps</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>notifications</v-icon>
        </v-btn>
        <v-btn icon large @click.stop="userInfoDialog = !userInfoDialog">
          <v-avatar size="42px">
            <img
              :src='photoURL'
            >
          </v-avatar>
        </v-btn>
      </div>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout
          justify-center
          align-center
        >
          <v-flex text-xs-center>
            <v-fade-transition mode="out-in">
              <nuxt-child />
            </v-fade-transition>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <template>
      <v-layout row justify-center>
        <v-dialog v-model="userInfoDialog" width="800px">
          <v-card>
            <v-card-title
              class="grey lighten-4 py-4 title"
            >
              ユーザー情報
            </v-card-title>
            <v-container grid-list-sm class="pa-4">
              <v-layout row wrap>
                <v-flex xs12 align-center justify-space-between>
                  <v-layout align-center>
                    <v-avatar size="40px" class="mr-3">
                      <img
                        :src='photoURL'
                      >
                    </v-avatar>
                    <v-card-text>{{ displayName }}</v-card-text>
                  </v-layout>
                </v-flex>
                <v-flex xs12 align-center justify-space-between>
                  <v-layout align-center>
                    <v-avatar size="40px" class="mr-3">
                      <v-icon>mail</v-icon>
                    </v-avatar>
                    <v-card-text>{{ email }}</v-card-text>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-container>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="userInfoDialog = false">Cancel</v-btn>  
              <v-btn flat color="primary" @click="googleSignOut">Logout</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
    </template>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      userInfoDialog: false,
      drawer: null,
      items: [
        { icon: 'chat', text: 'chat', link: '/chat/Chats' },
        { icon: 'contacts', text: 'next(test)', link: '/next' },
        { icon: 'history', text: 'test', link: '/test' },
        { icon: 'content_copy', text: 'testUi', link: '/testUi' }
      ]
    }),
    props: {
      source: String
    },
    methods: {
      googleSignOut () {
          this.$store.dispatch('signOut').then(() => {
          }).catch((e) => {
              console.log(e.message)
          })
      }
    },
    computed: {
      photoURL () {
        return this.$store.state.userPhotoURL
      },
      displayName () {
        return this.$store.state.userDisplayName
      },
      email () {
        return this.$store.state.userEmail
      }
    }
  }
</script>
<style scoped>
.container {
    min-height: 0vh;
}
</style>
