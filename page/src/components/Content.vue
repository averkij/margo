<template>
  <div v-if="data">
    <div v-if="data.t == 'h1'">
      <h1 class="mb-4">{{ data.c }}</h1>
    </div>
    <div v-else-if="data.t == 'h2'">
      <h2 class="mb-2">{{ data.c }}</h2>
    </div>
    <p v-else-if="data.t == 'text'">
      <span :class="['s' + (i % 4)]" v-for="(sent, i) in data.c" :key="i">
        {{ sent }}&nbsp;
      </span>
    </p>
    <div v-else></div>
  </div>
</template>

<script>
export default {
  name: "Content",
  props: ["data"],
  data: () => ({}),
  methods: {
    // renderText(data) {
    //   let text = data.t
    //   re
    // }
  },
};
</script>
