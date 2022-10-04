<template>
  <div>
    <v-row justify="center" class="px-0 px-md-5 px-sm-2" no-gutters>
      <v-col cols="12" sm="6" justify="center" class="px-0 px-md-5 px-sm-2">
        <Content :data="item[0]" :num="num"> </Content
      ></v-col>
      <v-col cols="12" sm="6" justify="center" class="px-0 px-md-5 px-sm-2">
        <Content :data="item[1]" :num="num"> </Content
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
  data: () => ({}),
};
</script>
