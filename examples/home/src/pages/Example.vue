<template>
  <q-page class="column flex flex-center bg-grey-9">
    <q-card dark>
      <q-tabs v-model="tab" align="justify" narrow-indicator dense>
        <q-tab name="demo" label="Demo" />
        <q-tab name="sourceCode" label="Source Code" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated class="bg-grey-9 text-white">
        <q-tab-panel name="demo">
          <iframe
            :src="iFrameSrc"
            width="800"
            height="600"
            frameborder="0"
            scrolling="no"
            seamless="seamless"
          ></iframe>
        </q-tab-panel>

        <q-tab-panel name="sourceCode">
          <q-scroll-area
            dark
            class="bg-dark text-white rounded-borders"
            style="width: 800px; height: 600px"
          >
            <q-markdown :src="sourceCodeContent" show-copy />
          </q-scroll-area>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script>
import axios from "axios";
import { QMarkdown } from "@quasar/quasar-ui-qmarkdown";

const IframeRootURL =
  "https://rexrainbow.github.io/phaser4-rex-plugins/public/";
const SourceCodeRootURL =
  "https://raw.githubusercontent.com/rexrainbow/phaser4-rex-plugins/master/examples/";

export default {
  name: "Example",
  components: { QMarkdown },
  data() {
    return {
      tab: "demo",
      sourceCodeContent: "Loading source code...",
    };
  },
  computed: {
    iFrameSrc() {
      var path = this.$route.params.id.replaceAll("_", "-");
      return `${IframeRootURL}/${path}/`.toLowerCase();
    },
    sourceCodeSrc() {
      var keys = this.$route.params.id.split("_");
      var fileName = keys[keys.length - 1];
      keys.length--;
      var folderName = keys.join("-");
      return `${SourceCodeRootURL}/${folderName}/${fileName}.ts`.toLowerCase();
    },
  },
  watch: {
    iFrameSrc: function (val) {
      this.tab = "demo";
    },
    sourceCodeSrc: function (val) {
      this.sourceCodeContent = "Loading source code...";
      this.loadSourceCode(this.sourceCodeSrc);
    },
  },
  methods: {
    loadSourceCode(path) {
      var self = this;
      axios
        .create()
        .get(path)
        .then((response) => {
          self.sourceCodeContent = "```javascript\n" + response.data + "\n```";
        });
    },
  },
  mounted() {
    this.loadSourceCode(this.sourceCodeSrc);
  },
};
</script>
