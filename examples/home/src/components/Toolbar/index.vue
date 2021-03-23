<template>
  <q-toolbar>
    <q-btn
      dense
      flat
      round
      icon="menu"
      @click="$emit('toggleLeftDrarwer')"
    />

    <q-toolbar-title>
      {{ title }}
    </q-toolbar-title>
  </q-toolbar>
</template>

<script>
export default {
  name: "toolbar",
  computed: {
    title() {
      var id = this.$route.params.id;
      if (id && id !== "") {
        return this.$route.params.id.replaceAll("_", "/");
      } else {
        return "Examples of Phaser4-Rex-Plugins";
      }
    },
  },
};
</script>