<template>
  <div>
    <v-row justify="center" class="px-lg-12 px-md-0" no-gutters>
      <v-col
        cols="12"
        sm="6"
        justify="center"
        class="px-lg-8 px-md-4 px-sm-2 px-0"
      >
        <Content
          @onHover="onHoverLeft"
          @onLeave="onLeaveLeft"
          :highlightNum="highlightNumLeft"
          :data="item[0]"
          :data2="item[1]"
          :num="num"
          :mode="mode"
          :class="[
            { fs: fontLeft == '1' && (mode == '0' || mode == '1') },
            { fl: fontLeft == '2' && (mode == '0' || mode == '1') },
          ]"
          :fontLeft="fontLeft"
          :fontRight="fontRight"
        >
        </Content>
        <Content
          v-if="mode == '1'"
          @onHover="onHoverRight"
          @onLeave="onLeaveRight"
          :highlightNum="highlightNumRight"
          :data="item[1]"
          :num="num"
          :class="[{ fs: fontRight == '1' }, { fl: fontRight == '2' }]"
          :mode="mode"
        >
        </Content>
      </v-col>
      <v-col
        v-if="mode == '0'"
        cols="12"
        sm="6"
        justify="center"
        class="px-lg-8 px-md-2 px-sm-2 px-0"
        :class="[{ fs: fontRight == '1' }, { fl: fontRight == '2' }]"
        :mode="mode"
      >
        <Content
          @onHover="onHoverRight"
          @onLeave="onLeaveRight"
          :data="item[1]"
          :num="num"
          :highlightNum="highlightNumRight"
        >
        </Content>
      </v-col>
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
  props: ["item", "num", "fontLeft", "fontRight", "mode"],
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
    },
  },
};
</script>
