<template>
  <div>
    <v-row v-if="imageExists(item)" class="d-none d-sm-flex">
      <v-col
        cols="12"
        sm="12"
        class="
          px-lg-8 px-md-4 px-sm-2 px-0
          d-flex
          justify-center
          pa-10
          mb-8
          mt-2
        "
      >
        <ul id="Frames">
          <li class="Frame">
            <v-img
              width="512"
              :src="getImgPath(item)"
              class="img-frame"
            ></v-img>
          </li>
        </ul>
      </v-col>
    </v-row>
    <v-row v-if="imageExists(item)" class="d-flex d-sm-none">
      <v-col
        cols="12"
        sm="12"
        class="
          px-lg-8 px-md-4 px-sm-2 px-0
          d-flex
          justify-center
          pa-5
          mb-8
          mt-2
        "
      >
        <v-img
          max-width="512"
          :src="getImgPath(item)"
          class="img-frame"
        ></v-img>
      </v-col>
    </v-row>
    <v-row justify="center" class="px-lg-12 px-md-0 pp" no-gutters>
      <div class="book-par-id">{{ item[0]["p"] }}</div>
      <v-col
        cols="12"
        sm="6"
        justify="center"
        class="px-lg-8 px-md-4 px-sm-2 px-0"
      >
        <Content
          v-if="mode == '0' || mode == '1' || mode == '2'"
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
          :showTextRight="showTextRight"
          :colorPrompt="colorPrompt"
        >
        </Content>
        <Content
          v-if="mode == '1' && showTextRight == '1'"
          @onHover="onHoverRight"
          @onLeave="onLeaveRight"
          :highlightNum="highlightNumRight"
          :data="item[1]"
          :num="num"
          :class="[{ fs: fontRight == '1' }, { fl: fontRight == '2' }]"
          :mode="mode"
          :colorPrompt="colorPrompt"
        >
        </Content>
      </v-col>
      <v-col
        v-if="mode == '0' && showTextRight == '1'"
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
          :colorPrompt="colorPrompt"
        >
        </Content>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
#Frames,
.Frame {
  list-style: none;
  list-style-type: none;
  margin: 0px;
  padding: 0px;
  text-align: center;
}
#Frames {
  width: 100%;
}
.Frame {
  display: inline-block;
  padding: 40px;
  border-width: 20px;
  border-style: solid;
  border-color: #2f2d2d #434040 #4f4c4c #434040;
  background: #f5f5f5;
  background-image: -webkit-gradient(
    linear,
    0 0,
    0 100%,
    from(#e5e4df),
    to(#cdcdc6)
  );
  background-image: -webkit-linear-gradient(#e5e4df, #cdcdc6);
  background-image: -moz-linear-gradient(#e5e4df, #cdcdc6);
  background-image: -o-linear-gradient(#e5e4df, #cdcdc6);
  background-image: linear-gradient(#e5e4df, #cdcdc6);
  box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.6), 0 5px 2px rgba(0, 0, 0, 0.1),
    0 5px 10px rgba(0, 0, 0, 0.8);
  position: relative;
  overflow: hidden;
}
.Frame::before {
  content: "";
  position: absolute;
  top: -175px;
  right: -20%;
  width: 400px;
  height: 400px;
  transform: rotateZ(-40deg);
  -webkit-transform: rotateZ(-40deg);
  -moz-transform: rotateZ(-40deg);
  -o-transform: rotateZ(-40deg);
  background-image: -webkit-gradient(
    linear,
    0 0,
    0 100%,
    from(rgba(255, 255, 255, 0.4)),
    to(rgba(255, 255, 255, 0))
  );
  background-image: -webkit-linear-gradient(
    rgba(255, 255, 255, 0.4),
    rgba(255, 255, 255, 0)
  );
  background-image: -moz-linear-gradient(
    rgba(255, 255, 255, 0.4),
    rgba(255, 255, 255, 0)
  );
  background-image: -o-linear-gradient(
    rgba(255, 255, 255, 0.4),
    rgba(255, 255, 255, 0)
  );
  background-image: linear-gradient(
    rgba(255, 255, 255, 0.4),
    rgba(255, 255, 255, 0)
  );
}
.Frame .img-frame {
  border-width: 2px;
  border-style: solid;
  border-color: #bbbab4 #c7c7bf #e5e4df #c7c7bf;
  box-shadow: 0 -1px 1px rgba(0, 0, 0, 0.1),
    0 1px 1px 1px rgba(255, 255, 255, 0.7);
}
</style>

<script>
// Components
import Content from "../components/Content.vue";

const assets = import.meta.glob(`../assets/img/**`, {
  as: "raw",
});

export default {
  name: "ParagraphPair",
  components: {
    Content,
  },
  props: [
    "item",
    "num",
    "fontLeft",
    "fontRight",
    "mode",
    "showTextLeft",
    "showTextRight",
    "colorPrompt",
  ],
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
    getImgPath(pars) {
      let par = pars[0];
      if (par && par["p"]) {
        let imgName = `${par["p"]}.png`;
        return new URL(`../assets/img/${imgName}`, import.meta.url).href;
      }
    },
    imageExists(pars) {
      let par = pars[0];
      if (par && par["p"]) {
        let imgName = `${par["p"]}.png`;
        let path = `../assets/img/${imgName}`;
        if (assets[path]) {
          return true;
        }
      }
      return false;
    },
  },
};
</script>
