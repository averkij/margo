<template>
  <div v-if="data">
    <div v-if="data.t == 'h1'">
      <div v-if="mode == '2'">
        <div :class="[{ fs: fontLeft == '1' }, { fl: fontLeft == '2' }]">
          <h1 class="mb-4">
            {{ data.c }}
          </h1>
        </div>
        <div :class="[{ fs: fontRight == '1' }, { fl: fontRight == '2' }]">
          <h1 v-if="showTextRight == '1'" class="mb-4">
            {{ data2.c }}
          </h1>
        </div>
      </div>
      <div v-else>
        <h1 class="mb-4">{{ data.c }}</h1>
      </div>
    </div>
    <div v-else-if="data.t == 'h2'">
      <div v-if="mode == '2'">
        <div :class="[{ fs: fontLeft == '1' }, { fl: fontLeft == '2' }]">
          <h2 class="mb-4">
            {{ data.c }}
          </h2>
        </div>
        <div :class="[{ fs: fontRight == '1' }, { fl: fontRight == '2' }]">
          <h2 v-if="showTextRight == '1'" class="mb-4">
            {{ data2.c }}
          </h2>
        </div>
      </div>
      <div v-else>
        <h2 class="mb-4">{{ data.c }}</h2>
      </div>
    </div>
    <p v-else-if="data.t == 'text'">
      <div>
        <div v-if="mode == '2' && data && data2" >
          <span v-for="(sent, i) in zip(data.c, data2.c)" :key="i">
            <v-hover v-slot="{ isHovering, props }">
              <span
                @mouseover="onMouseOver(i)"
                @mouseleave="onMouseLeave()"
                v-bind="props"
                :class="[
                  colorPrompt == '1' ? `u${((num + i) % 4)}` : colorPrompt == '2' ? `s${((num + i) % 4)}` : colorPrompt == '3' ? `g${((num + i) % 4)}` : '',
                  { h: isHovering || i == highlightNum },
                  { fs: fontLeft == '1' },
                  { fl: fontLeft == '2' }
                ]"
              >
                {{ sent[0] }}&nbsp;
              </span>
              <span
                v-if="showTextRight=='1'"
                @mouseover="onMouseOver(i)"
                @mouseleave="onMouseLeave()"
                v-bind="props"
                :class="[ colorPrompt == '1' ? `u${((num + i) % 4)}` : colorPrompt == '2' ? `s${((num + i) % 4)}` : colorPrompt == '3' ? `g${((num + i) % 4)}` : '',
                  { h: isHovering || i == highlightNum },
                  { fs: fontRight == '1' },
                  { fl: fontRight == '2' }
                ]"
              >
                {{ sent[1] }}&nbsp;
              </span>
            </v-hover>
          </span>
        </div>
        <div v-else>
          <span v-for="(sent, i) in data.c" :key="i">
            <v-hover v-slot="{ isHovering, props }">
              <span
                @mouseover="onMouseOver(i)"
                @mouseleave="onMouseLeave()"
                v-bind="props"
                :class="[
                  colorPrompt == '1' ? `u${((num + i) % 4)}` : colorPrompt == '2' ? `s${((num + i) % 4)}` : colorPrompt == '3' ? `g${((num + i) % 4)}` : '',
                  { h: isHovering || i == highlightNum },
                ]"
              >
                {{ sent }}&nbsp;
              </span>
            </v-hover>
          </span>
        </div>
      </div>
    </p>
    <p v-else-if="data.t == 'qtext'">
      <div>
        <div v-if="mode == '2' && data && data2" >
          <span>
              <span
                :class="[ 'qtext',
                  { fs: fontLeft == '1' },
                  { fl: fontLeft == '2' }
                ]"
              >
                {{ data }}
              </span>
              <span
                v-if="showTextRight=='1'"
                :class="[ 'qtext',
                  { fs: fontRight == '1' },
                  { fl: fontRight == '2' }
                ]"
              >
                {{ data2 }}
              </span>
          </span>
        </div>
        <div v-else>
          <span>
              <span
                :class="[ 'qtext',
                  { h: isHovering || i == highlightNum },
                ]"
              >
                {{ data.c }}&nbsp;
              </span>
          </span>
        </div>
      </div>
    </p>
  </div>
</template>

<script>
export default {
  name: "Content",
  props: [
    "data",
    "data2",
    "num",
    "highlightNum",
    "mode",
    "fontLeft",
    "fontRight",
    "showTextRight",
    "colorPrompt",
  ],
  data: () => ({}),
  methods: {
    onMouseOver(num) {
      this.$emit("onHover", num);
    },
    onMouseLeave() {
      this.$emit("onLeave");
    },
    zip(a, b) {
      return a.map((k, i) => [k, b[i]]);
    },
  },
};
</script>
