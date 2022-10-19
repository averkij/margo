
<style>
@import "./assets/main.css";
</style>

<template>
  <v-app>
    <!-- Left drawer menu -->
    <v-navigation-drawer app v-model="drawer" temporary>
      <v-list nav dense>
        <div class="text-button pa-1">Contents</div>
        <v-list-item-group
          v-model="group"
          active-class="blue--text text--accent-4"
        >
          <v-list-item
            v-for="(n, i) in [...Array(PARTS_AMOUNT).keys()]"
            :key="i"
            link
            @click="changePart(n + 1)"
            class="ma-0 pa-0 pl-3"
          >
            {{ n + 1 }}
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <!-- Top app bar -->
    <v-card flat>
      <v-toolbar class="my-toolbar" extended hide-on-scroll flat>
        <v-row>
          <v-col cols="2">
            <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
          </v-col>

          <v-col cols="4" class="text-center">
            <v-spacer />
            <!-- <div class="pa-2 font-josefin d-inline-block">
              {{ LANGUAGES[langCodeFrom].name }}
            </div> -->
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

          <v-col cols="4" class="text-center">
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
            <!-- <div class="pa-2 font-josefin d-inline-block">
              {{ LANGUAGES[langCodeTo].name }}
            </div> -->
            <v-spacer />
          </v-col>
        </v-row>
        <template v-slot:extension>
          <v-container>
            <v-row class="px-lg-14 px-md-1">
              <v-col cols="6" class="text-left px-lg-6 px-md-4 px-sm-2 px-0">
                <v-btn icon color="blue" @click="decreaseFontLeft()">
                  <v-icon color="grey">
                    mdi-format-font-size-decrease
                  </v-icon></v-btn
                >
                <v-btn icon color="blue" @click="increaseFontLeft()">
                  <v-icon color="grey">
                    mdi-format-font-size-increase
                  </v-icon></v-btn
                >
                <v-btn icon color="blue">
                  <v-icon color="grey"> mdi-eye </v-icon></v-btn
                >
              </v-col>
              <v-col cols="6" class="text-left px-lg-6 px-md-0 px-sm-0 px-0">
                <v-btn icon color="blue">
                  <v-icon color="grey">
                    mdi-format-font-size-decrease
                  </v-icon></v-btn
                >
                <v-btn icon color="blue">
                  <v-icon color="grey">
                    mdi-format-font-size-increase
                  </v-icon></v-btn
                >
                <v-btn icon color="blue">
                  <v-icon color="grey"> mdi-eye </v-icon></v-btn
                >
              </v-col>
            </v-row>
          </v-container>
        </template>
      </v-toolbar>
    </v-card>

    <v-main>
      <v-container class="pb-15 pt-8">
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { SettingsHelper } from "@/common/settings.helper";
import { LANGUAGES, DEFAULT_FROM, DEFAULT_TO } from "@/common/language.helper";
import { DEFAULT_PART, PARTS_AMOUNT } from "@/common/helper";

export default {
  name: "App",
  // components: {
  //   Footer,
  // },
  data: () => ({
    LANGUAGES,
    PARTS_AMOUNT,
    fontSizeLeft: "1",
    fontSizeRight: "2",
    drawer: false,
  }),
  mounted() {
    // window.dispatchEvent(
    //   new CustomEvent("localstorage-changed", {
    //     detail: {
    //       storage: this.getFontSizeLeft(),
    //     },
    //   })
    // );
  },
  methods: {
    getFlagImgPath(code) {
      return new URL(`./assets/flags/flag-${code}-h.svg`, import.meta.url).href;
    },
    changePart(n) {
      this.$router.push({
        path: `/${n}/${this.langCodeFrom}/${this.langCodeTo}`,
      });
    },
    changeLangFrom(code) {
      this.$router.push({
        path: `/${this.currPart}/${code}/${this.langCodeTo}`,
      });
    },
    changeLangTo(code) {
      this.$router.push({
        path: `/${this.currPart}/${this.langCodeFrom}/${code}`,
      });
    },
    goToGithub() {
      window.open("https://github.com/averkij/a-studio", "_blank");
    },
    decreaseFontLeft() {
      localStorage.fontSizeLeft = "1";
    },
    increaseFontLeft() {
      localStorage.fontSizeLeft = "2";
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
    currPart() {
      let part_id = this.$route.params.part;
      if (part_id < 1 || part_id > PARTS_AMOUNT) {
        return DEFAULT_PART;
      }
      console.log(part_id);
      return part_id;
    },
  },
};
</script>
  