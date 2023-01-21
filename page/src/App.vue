
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
            {{ contents[langCodeFrom][n] }}
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <!-- Top app bar -->
    <v-card flat>
      <v-toolbar class="my-toolbar" extended hide-on-scroll flat>
        <v-row>
          <v-col cols="1">
            <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
          </v-col>

          <v-col cols="5" class="text-center">
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

            <!-- LEFT MENU ADDITIONAL ELEMENTS -->
            <div class="d-none d-md-inline">
              <v-btn icon @click="setFontSizeLeft(FONT_SIZE_SMALL)">
                <v-icon :color="iconFontDecreaseLeftIsActive ? 'blue' : 'grey'">
                  mdi-format-font-size-decrease
                </v-icon></v-btn
              >
              <v-btn icon @click="setFontSizeLeft(FONT_SIZE_LARGE)">
                <v-icon :color="iconFontIncreaseLeftIsActive ? 'blue' : 'grey'">
                  mdi-format-font-size-increase
                </v-icon></v-btn
              >

              <!-- HIGHLIGHTING -->
              <span
                class="
                  text-overline text-grey
                  lighten-5
                  ml-5
                  d-none d-sm-inline
                "
                >Prompt</span
              >
              <v-btn icon color="blue" @click="changeColorPrompt()">
                <v-icon v-if="colorPrompt == '0'">
                  mdi-numeric-1-circle
                </v-icon>
                <v-icon v-else-if="colorPrompt == '1'">
                  mdi-numeric-2-circle
                </v-icon>
                <v-icon v-else-if="colorPrompt == '2'">
                  mdi-numeric-3-circle
                </v-icon>
                <v-icon v-else-if="colorPrompt == '3'">
                  mdi-numeric-4-circle
                </v-icon>
              </v-btn>
            </div>
          </v-col>

          <v-col cols="5" class="text-center">
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
            <!-- LEFT MENU ADDITIONAL ELEMENTS -->
            <div class="d-none d-md-inline">
              <!-- RIGHT TEXT FONT SIZE -->
              <v-btn icon @click="setFontSizeRight(FONT_SIZE_SMALL)">
                <v-icon
                  :color="iconFontDecreaseRightIsActive ? 'blue' : 'grey'"
                >
                  mdi-format-font-size-decrease
                </v-icon></v-btn
              >
              <v-btn icon @click="setFontSizeRight(FONT_SIZE_LARGE)">
                <v-icon
                  :color="iconFontIncreaseRightIsActive ? 'blue' : 'grey'"
                >
                  mdi-format-font-size-increase
                </v-icon></v-btn
              >

              <!-- RIGHT TEXT VISIBILITY -->
              <v-btn icon @click="toggleRightText()">
                <v-icon v-if="showTextRight == '0'" color="grey">
                  mdi-eye-off-outline
                </v-icon>
                <v-icon v-else-if="showTextRight == '1'" color="grey">
                  mdi-eye-outline
                </v-icon>
              </v-btn>

              <!-- LAYOUT MODE -->
              <span
                class="
                  text-overline text-grey
                  lighten-5
                  ml-5
                  d-none d-sm-inline
                "
                >Layout</span
              >
              <v-btn icon @click="changeLayoutMode()" color="green">
                <v-icon v-if="layoutMode == '0'"> mdi-numeric-1-circle </v-icon>
                <v-icon v-if="layoutMode == '1'"> mdi-numeric-2-circle </v-icon>
                <v-icon v-if="layoutMode == '2'"> mdi-numeric-3-circle </v-icon>
              </v-btn>
            </div>
          </v-col>
        </v-row>

        <!-- SECOND ROW MENU -->
        <template v-slot:extension>
          <v-container class="d-md-none">
            <v-row class="px-lg-14 px-md-1">
              <v-col cols="6" class="text-center px-lg-6 px-md-4 px-sm-2 px-0">
                <v-btn icon @click="setFontSizeLeft(FONT_SIZE_SMALL)">
                  <v-icon
                    :color="iconFontDecreaseLeftIsActive ? 'blue' : 'grey'"
                  >
                    mdi-format-font-size-decrease
                  </v-icon></v-btn
                >
                <v-btn icon @click="setFontSizeLeft(FONT_SIZE_LARGE)">
                  <v-icon
                    :color="iconFontIncreaseLeftIsActive ? 'blue' : 'grey'"
                  >
                    mdi-format-font-size-increase
                  </v-icon></v-btn
                >

                <!-- LEFT TEXT VISIBILITY -->
                <!-- <v-btn icon @click="toggleLeftText()">
                  <v-icon v-if="showTextLeft == '0'" color="grey">
                    mdi-eye-off-outline
                  </v-icon>
                  <v-icon v-else-if="showTextLeft == '1'" color="grey">
                    mdi-eye-outline
                  </v-icon>
                </v-btn> -->

                <!-- HIGHLIGHTING -->
                <span
                  class="
                    text-overline text-grey
                    lighten-5
                    ml-5
                    d-none d-sm-inline
                  "
                  >Prompt</span
                >
                <v-btn icon color="blue" @click="changeColorPrompt()">
                  <v-icon v-if="colorPrompt == '0'">
                    mdi-numeric-1-circle
                  </v-icon>
                  <v-icon v-else-if="colorPrompt == '1'">
                    mdi-numeric-2-circle
                  </v-icon>
                  <v-icon v-else-if="colorPrompt == '2'">
                    mdi-numeric-3-circle
                  </v-icon>
                  <v-icon v-else-if="colorPrompt == '3'">
                    mdi-numeric-4-circle
                  </v-icon>
                </v-btn>
              </v-col>
              <v-col cols="6" class="text-center px-lg-6 px-md-0 px-sm-0 px-0">
                <!-- RIGHT TEXT FONT SIZE -->
                <v-btn icon @click="setFontSizeRight(FONT_SIZE_SMALL)">
                  <v-icon
                    :color="iconFontDecreaseRightIsActive ? 'blue' : 'grey'"
                  >
                    mdi-format-font-size-decrease
                  </v-icon></v-btn
                >
                <v-btn icon @click="setFontSizeRight(FONT_SIZE_LARGE)">
                  <v-icon
                    :color="iconFontIncreaseRightIsActive ? 'blue' : 'grey'"
                  >
                    mdi-format-font-size-increase
                  </v-icon></v-btn
                >

                <!-- RIGHT TEXT VISIBILITY -->
                <v-btn icon @click="toggleRightText()">
                  <v-icon v-if="showTextRight == '0'" color="grey">
                    mdi-eye-off-outline
                  </v-icon>
                  <v-icon v-else-if="showTextRight == '1'" color="grey">
                    mdi-eye-outline
                  </v-icon>
                </v-btn>

                <!-- LAYOUT MODE -->
                <span
                  class="
                    text-overline text-grey
                    lighten-5
                    ml-5
                    d-none d-sm-inline
                  "
                  >Layout</span
                >
                <v-btn icon @click="changeLayoutMode()" color="green">
                  <v-icon v-if="layoutMode == '0'">
                    mdi-numeric-1-circle
                  </v-icon>
                  <v-icon v-if="layoutMode == '1'">
                    mdi-numeric-2-circle
                  </v-icon>
                  <v-icon v-if="layoutMode == '2'">
                    mdi-numeric-3-circle
                  </v-icon>
                </v-btn>
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
import { LANGUAGES, DEFAULT_FROM, DEFAULT_TO } from "@/common/language.helper";
import {
  DEFAULT_PART,
  PARTS_AMOUNT,
  FONT_SIZE_NORMAL,
  FONT_SIZE_SMALL,
  FONT_SIZE_LARGE,
} from "@/common/helper";
import {
  SET_FONT_SIZE_LEFT,
  SET_FONT_SIZE_RIGHT,
  SET_LAYOUT_MODE,
  SET_COLOR_PROMPT,
  SET_SHOW_TEXT_LEFT,
  SET_SHOW_TEXT_RIGHT,
} from "@/store/mutations.type";
import { mapGetters } from "vuex";
import { LanguageHelper } from "./common/language.helper";

const assets = import.meta.glob(`./assets/info/**`, {
  as: "raw",
});

export default {
  name: "App",
  data: () => ({
    LANGUAGES,
    PARTS_AMOUNT,
    FONT_SIZE_NORMAL,
    FONT_SIZE_SMALL,
    FONT_SIZE_LARGE,
    drawer: false,
    contents: LanguageHelper.initContents(),
  }),
  mounted() {},
  methods: {
    getContents() {
      let path = `./assets/info/contents.json`;
      console.log(assets);
      if (assets[path]) {
        assets[path]().then((resp_json) => {
          this.contents = JSON.parse(resp_json);
        });
      }
    },
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
    setFontSizeLeft(mode) {
      if (this.fontSizeLeft == mode) {
        localStorage.fontSizeLeft = FONT_SIZE_NORMAL;
        this.$store.commit(SET_FONT_SIZE_LEFT, {
          fontSizeLeft: FONT_SIZE_NORMAL,
        });
      } else {
        localStorage.fontSizeLeft = mode;
        this.$store.commit(SET_FONT_SIZE_LEFT, {
          fontSizeLeft: mode,
        });
      }
    },
    setFontSizeRight(mode) {
      if (this.fontSizeRight == mode) {
        localStorage.fontSizeRight = FONT_SIZE_NORMAL;
        this.$store.commit(SET_FONT_SIZE_RIGHT, {
          fontSizeLeft: FONT_SIZE_NORMAL,
        });
      } else {
        localStorage.fontSizeRight = mode;
        this.$store.commit(SET_FONT_SIZE_RIGHT, {
          fontSizeRight: mode,
        });
      }
    },
    changeLayoutMode() {
      let layoutMode = this.layoutMode;
      layoutMode = (layoutMode + 1) % 3;
      localStorage.layoutMode = layoutMode;
      this.$store.commit(SET_LAYOUT_MODE, {
        layoutMode: layoutMode,
      });
    },
    changeColorPrompt() {
      let colorPrompt = this.colorPrompt;
      colorPrompt = (colorPrompt + 1) % 4;
      localStorage.colorPrompt = colorPrompt;
      this.$store.commit(SET_COLOR_PROMPT, {
        colorPrompt: colorPrompt,
      });
    },
    toggleLeftText() {
      let showTextLeft = Number(this.showTextLeft);
      showTextLeft = ((showTextLeft + 1) % 2).toString();
      localStorage.showTextLeft = showTextLeft;
      this.$store.commit(SET_SHOW_TEXT_LEFT, {
        showTextLeft: showTextLeft,
      });
    },
    toggleRightText() {
      let showTextRight = Number(this.showTextRight);
      showTextRight = ((showTextRight + 1) % 2).toString();
      localStorage.showTextRight = showTextRight;
      this.$store.commit(SET_SHOW_TEXT_RIGHT, {
        showTextRight: showTextRight,
      });
    },
  },
  computed: {
    ...mapGetters([
      "fontSizeLeft",
      "fontSizeRight",
      "layoutMode",
      "colorPrompt",
      "showTextLeft",
      "showTextRight",
    ]),
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
      return part_id;
    },
    iconFontDecreaseLeftIsActive() {
      return this.fontSizeLeft == "1";
    },
    iconFontIncreaseLeftIsActive() {
      return this.fontSizeLeft == "2";
    },
    iconFontDecreaseRightIsActive() {
      return this.fontSizeRight == "1";
    },
    iconFontIncreaseRightIsActive() {
      return this.fontSizeRight == "2";
    },
  },
  mounted() {
    this.getContents();
  },
};
</script>
  