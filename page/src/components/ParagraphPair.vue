<template>
  <div>
    <v-row justify="center" class="px-0 px-md-5 px-sm-2" no-gutters>
      <v-col cols="12" sm="6" justify="center" class="px-0 px-md-5 px-sm-2">
        <Content 
          @onHover="onHoverLeft"
          @onLeave="onLeaveLeft"
          :highlightNum="highlightNumLeft"
          :data="item[0]"
          :num="num"> </Content
      ></v-col>
      <v-col cols="12" sm="6" justify="center" class="px-0 px-md-5 px-sm-2">
        <Content
          @onHover="onHoverRight"
          @onLeave="onLeaveRight"
          :data="item[1]"
          :num="num"
          :highlightNum="highlightNumRight"> </Content
      ></v-col>
    </v-row>
  </div>
</template>

<script>
// Components
import Content from "../components/Content.vue";

export default {
  name: "ParagraphPair",
  components: {
    Content,
  },
  props: ["item", "num"],
  data: () => ({
    highlightNumLeft: -1,
    highlightNumRight: -1,
  }),
  methods: {
    onHoverLeft(n) {
      this.highlightNumRight = n;
    },
    onLeaveLeft() {
      this.highlightNumRight = -1;
    },
    onHoverRight(n) {
      this.highlightNumLeft = n;
    },
    onLeaveRight() {
      this.highlightNumLeft = -1;
    }
  }
};
</script>
