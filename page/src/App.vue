<template>
  <v-app>
    <!-- Left drawer menu -->
    <v-navigation-drawer app v-model="drawer" temporary>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="blue--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-view-list-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title @click.stop.prevent="openContents()"
              >Contents</v-list-item-title
            >
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-github</v-icon>
            </v-list-item-icon>
            <v-list-item-title @click.stop.prevent="goToGithub()"
              >Github</v-list-item-title
            >
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <!-- Top app bar -->
    <v-card>
      <v-toolbar color="white">
        <v-row>
          <v-col cols="12" sm="1">
            <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
          </v-col>

          <v-col cols="12" sm="5" class="text-right">
            <v-spacer />
            <div class="pa-2 font-josefin d-inline-block">
              {{ LANGUAGES[langCodeFrom].name }}
            </div>
            <v-menu offset-y>
              <template v-slot:activator="{ props }">
                <v-btn icon color="blue" v-bind="props">
                  <v-img
                    class="ma-2"
                    :src="getFlagImgPath(langCodeFrom)"
                    width="35px"
                    height="35px"
                  />
                </v-btn>
              </template>
              <v-list>
                <v-list-item v-for="(item, i) in LANGUAGES" :key="i" link>
                  <v-list-item-title @click="changeLangFrom(item.langCode)">
                    <div class="d-flex">
                      <v-img
                        :src="getFlagImgPath(item.langCode)"
                        min-width="35"
                        max-width="35"
                        height="35"
                      />
                      <div class="ml-4 align-self-center">
                        {{ item.name }}
                      </div>
                    </div>
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-col>

          <v-col cols="12" sm="5">
            <v-menu offset-y>
              <template v-slot:activator="{ props }">
                <v-btn icon color="blue" v-bind="props">
                  <v-img
                    class="ma-2"
                    :src="getFlagImgPath(langCodeTo)"
                    width="35px"
                    height="35px"
                  />
                </v-btn>
              </template>
              <v-list>
                <v-list-item v-for="(item, i) in LANGUAGES" :key="i" link>
                  <v-list-item-title @click="changeLangTo(item.langCode)">
                    <div class="d-flex">
                      <v-img
                        class=""
                        :src="getFlagImgPath(item.langCode)"
                        min-width="35"
                        max-width="35"
                        height="35"
                      />
                      <div class="ml-4 align-self-center">{{ item.name }}</div>
                    </div>
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
            <div class="pa-2 font-josefin d-inline-block">
              {{ LANGUAGES[langCodeTo].name }}
            </div>
            <v-spacer />
          </v-col>
        </v-row>
      </v-toolbar>
    </v-card>

    <v-main>
      <v-container class="pb-15">
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { LANGUAGES } from "@/common/language.helper";
import { DEFAULT_FROM, DEFAULT_TO } from "@/common/language.helper";
import { DEFAULT_PART } from "@/common/helper";

export default {
  name: "App",
  // components: {
  //   Footer,
  // },
  data: () => ({
    LANGUAGES,
    drawer: false,
    group: null,
    tab: null,
  }),
  methods: {
    getFlagImgPath(code) {
      return new URL(`./assets/flags/flag-${code}-h.svg`, import.meta.url).href;
    },
    changeLangFrom(code) {
      this.$router.push({
        path: `/${DEFAULT_PART}/${code}/${this.langCodeTo}`,
      });
    },
    changeLangTo(code) {
      this.$router.push({
        path: `/${DEFAULT_PART}/${this.langCodeFrom}/${code}`,
      });
    },
    goToGithub() {
      window.open("https://github.com/averkij/a-studio", "_blank");
    },
    openContents() {
      this.$router.push({
        path: `/contents`,
      });
    },
  },
  computed: {
    langCodeFrom() {
      let langCode = this.$route.params.from;
      if (this.LANGUAGES[langCode]) {
        return langCode;
      }
      return DEFAULT_FROM;
    },
    langCodeTo() {
      let langCode = this.$route.params.to;
      if (this.LANGUAGES[langCode]) {
        return langCode;
      }
      return DEFAULT_TO;
    },
  },
};
</script>
  