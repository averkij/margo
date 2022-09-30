<template>
  <v-container>
    <v-row class="text-center">
      <!-- <v-col cols="12">
        <v-img src="/src/assets/logo.svg" class="my-3" contain height="200" />
      </v-col> -->

      <v-col cols="6" justify="center"
        ><h2>{{ langCodeFrom }}</h2>
        {{ leftData }}</v-col
      >
      <v-col cols="6" justify="center">
        <h2>{{ langCodeTo }}</h2>
        {{ rightData }}</v-col
      >
    </v-row>
  </v-container>
</template>

<script>
import { defineComponent } from "vue";
import { LANGUAGES } from "@/common/language.helper";
import { DEFAULT_FROM, DEFAULT_TO } from "@/common/language.helper";
import { DEFAULT_PART } from "@/common/helper";
import exampleText from "/src/assets/book/en/1.txt?raw";

// Components
import Book from "../components/Book.vue";

const data = import.meta.glob(`../assets/book/**`, {
  as: "raw",
  // eager: true,
});

// const leftData = await import(`/src/assets/book/${$route.params.from}/1.txt`, {
//   as: "raw",
//   eager: true,
// });

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
    };
  },
  methods: {
    getFrom() {
      let path = `../assets/book/${this.langCodeFrom}/1.txt`;
      data[path]().then((resp) => {
        this.leftData = resp;
      });
    },
    getTo() {
      let path = `../assets/book/${this.langCodeTo}/1.txt`;
      data[path]().then((resp) => {
        this.rightData = resp;
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
    // leftData() {
    //   return import(
    //     // `${import.meta.env.BASE_URL}src/assets/book/${this.langCodeFrom}/1.txt`,
    //     `../assets/book/${this.langCodeFrom}/1.txt`,
    //     {
    //       as: "raw",
    //       // eager: true,
    //     }
    //   ).then((response) => {
    //     console.log(response);
    //     return response;
    //   });
    // },
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
