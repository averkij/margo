<template>
  <v-container>
    <v-row class="text-center">
      <!-- <v-col cols="12">
        <v-img src="/src/assets/logo.svg" class="my-3" contain height="200" />
      </v-col> -->

      <v-col cols="6" justify="center">
        <h2>{{ leftData["head"] ? leftData["head"]["title"] : "" }}</h2>
        {{ leftData["body"] }}</v-col
      >
      <v-col cols="6" justify="center">
        <h2>{{ rightData["head"] ? rightData["head"]["title"] : "" }}</h2>
        {{ rightData["body"] }}</v-col
      >
    </v-row>
  </v-container>
</template>

<script>
import { defineComponent } from "vue";
import { LANGUAGES } from "@/common/language.helper";
import { DEFAULT_FROM, DEFAULT_TO } from "@/common/language.helper";
import { DEFAULT_PART } from "@/common/helper";

// Components
import Book from "../components/Book.vue";

const data = import.meta.glob(`../assets/book/**`, {
  as: "raw",
});

export default defineComponent({
  name: "HomeView",
  components: {
    Book,
  },
  data() {
    return {
      LANGUAGES,
      DEFAULT_FROM,
      DEFAULT_TO,
      DEFAULT_PART,
      leftData: "loading...",
      rightData: "loading...",
      maxPartId: 33,
    };
  },
  methods: {
    getFrom() {
      let path = `../assets/book/${this.langCodeFrom}/${this.currPart}.txt`;
      data[path]().then((resp_json) => {
        this.leftData = JSON.parse(resp_json);
      });
    },
    getTo() {
      let path = `../assets/book/${this.langCodeTo}/${this.currPart}.txt`;
      data[path]().then((resp_json) => {
        this.rightData = JSON.parse(resp_json);
      });
    },
    getBoth() {
      this.getFrom(this.langCodeFrom);
      this.getTo(this.langCodeTo);
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
      if (part_id < 1 || part_id > this.maxPartId) {
        return DEFAULT_PART;
      }
      return part_id;
    },
  },
  watch: {
    langCodeFrom() {
      this.getFrom();
    },
    langCodeTo() {
      this.getTo();
    },
  },
  mounted() {
    this.getBoth();
  },
});
</script>
