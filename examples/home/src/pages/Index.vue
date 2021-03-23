<template>
  <q-page class="flex flex-center bg-grey-9">
    <q-card dark style="width: 800px; height: 600px">
      <q-list v-for="(items, header) in content" :key="header">
        <q-item-label header>{{ header }}</q-item-label>
        <q-item
          v-for="item in items"
          :key="item.url"
          clickable
          tag="a"
          target="_blank"
          :href="item.url"
        >
          <q-item-section>{{ item.label }}</q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </q-page>
</template>

<script>
var content = {
  Phaser4: [
    { label: "Github", url: "https://github.com/phaserjs/phaser" },
    { label: "Official discord channel", url: "https://discord.gg/phaser" },
    {
      label: "Bug report",
      url: "https://github.com/phaserjs/phaser/issues",
    },
  ],
  "Rex-plugins": [
    {
      label: "Github",
      url: "https://github.com/rexrainbow/phaser4-rex-plugins",
    },
    { label: "Discord channel", url: "https://discord.gg/kWkuFZK" },
    {
      label: "Bug report",
      url: "https://github.com/rexrainbow/phaser4-rex-plugins/issues",
    },
  ],
};

export default {
  name: "PageIndex",
  data() {
    return {
      content: content,
    };
  },
};
</script>
