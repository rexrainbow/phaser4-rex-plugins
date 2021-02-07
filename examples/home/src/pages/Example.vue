<template>
  <div>
    <iframe
      :src="iFrameSrc"
      :width="800"
      :height="600"
      frameborder="0"
      scrolling="no"
      seamless="seamless"
    ></iframe>
  </div>
</template>

<script>
const IframeRootURL = "https://rexrainbow.github.io/phaser4-rex-plugins/public/";

export default {
  name: "Example",
  data() {
    return {
      gameIFrameSrc: ""
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    iFrameSrc() {
      return `${IframeRootURL}${this.id}/`;
    }
  }
};
</script>
