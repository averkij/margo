<template>
  <div v-if="data">
    <div v-if="data.t == 'h1'">
      <h1 class="mb-4">{{ data.c }}</h1>
    </div>
    <div v-else-if="data.t == 'h2'">
      <h2 class="mb-2">{{ data.c }}</h2>
    </div>
    <p v-else-if="data.t == 'text'">
      <span v-for="(sent, i) in data.c" :key="i">
        <v-hover v-slot="{ isHovering, props }">
          <span
            @mouseover="onMouseOver(i)"
            @mouseleave="onMouseLeave()"
            v-bind="props"
            :class="[
              's' + ((num + i) % 4),
              { h: isHovering || i == highlightNum },
            ]"
          >
            {{ sent }}&nbsp;
          </span>
        </v-hover>
      </span>
    </p>
    <div v-else></div>
  </div>
</template>

<script>
export default {
  name: "Content",
  props: ["data", "num", "highlightNum"],
  data: () => ({}),
  methods: {
    onMouseOver(num) {
      this.$emit("onHover", num);
    },
    onMouseLeave() {
      this.$emit("onLeave");
    },
  },
};
</script>
