<template>
  <div>
    <!-- items -->
    <div v-if="SHOW_TITLE">
      <div v-for="(line, i) in head" :key="i">
        <ParagraphPair
          :item="line"
          :num="accSentCounter[i]"
          :fontLeft="fontSizeLeft"
          :fontRight="fontSizeRight"
          :mode="layoutMode"
          :showTextLeft="showTextLeft"
          :showTextRight="showTextRight"
          :colorPrompt="colorPrompt"
        >
        </ParagraphPair>
      </div>
    </div>
    <div v-for="(line, i) in items" :key="i">
      <ParagraphPair
        :item="line"
        :num="accSentCounter[i]"
        :fontLeft="fontSizeLeft"
        :fontRight="fontSizeRight"
        :mode="layoutMode"
        :showTextLeft="showTextLeft"
        :showTextRight="showTextRight"
        :colorPrompt="colorPrompt"
      >
      </ParagraphPair>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { LANGUAGES, DEFAULT_FROM, DEFAULT_TO } from "@/common/language.helper";
import { DEFAULT_PART, PARTS_AMOUNT, SHOW_TITLE } from "@/common/helper";

// Components
import ParagraphPair from "../components/ParagraphPair.vue";
import { mapGetters } from "vuex";

const data = import.meta.glob(`../assets/book/**`, {
  as: "raw",
});
const zip = (a, b) => a.map((k, i) => [k, b[i]]);

export default defineComponent({
  name: "HomeView",
  components: {
    ParagraphPair,
  },
  data() {
    return {
      LANGUAGES,
      DEFAULT_FROM,
      DEFAULT_TO,
      DEFAULT_PART,
      PARTS_AMOUNT,
      SHOW_TITLE,
      leftData: {},
      rightData: {},
      items: [],
      head: [],
      accSentCounter: [], //for correct sentence-level highlighting,
    };
  },
  methods: {
    getFrom() {
      let path = `../assets/book/${this.langCodeFrom}/${this.currPart}.txt`;
      if (data[path]) {
        data[path]().then((resp_json) => {
          this.leftData = JSON.parse(resp_json);
          this.updateItems();
        });
      }
    },
    getTo() {
      let path = `../assets/book/${this.langCodeTo}/${this.currPart}.txt`;
      if (data[path]) {
        data[path]().then((resp_json) => {
          this.rightData = JSON.parse(resp_json);
          this.updateItems();
        });
      }
    },
    getBoth() {
      this.getFrom(this.langCodeFrom);
      this.getTo(this.langCodeTo);
    },
    updateItems() {
      if (
        this.accSentCounter.length == 0 ||
        this.accSentCounter.length < this.leftData["body"].length
      ) {
        this.calcSentCounter(this.leftData["body"]);
      }
      this.items = zip(this.leftData["body"], this.rightData["body"]);
      this.head = zip(this.leftData["head"], this.rightData["head"]);
    },
    calcSentCounter(paragraphs) {
      let c = 0;
      this.accSentCounter = [0];
      paragraphs.forEach((par) => {
        if (par["t"] != "text") {
          this.accSentCounter.push(0);
        } else {
          c += par["c"].length;
          this.accSentCounter.push(c);
        }
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
  },
  watch: {
    langCodeFrom() {
      this.getFrom();
    },
    langCodeTo() {
      this.getTo();
    },
    currPart() {
      this.getFrom();
      this.getTo();
    },
  },
  mounted() {
    this.getBoth();
  },
});
</script>
