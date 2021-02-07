<template>
  <q-list>
    <q-item v-for="item in links" :key="getLink(item)" :to="getLink(item)" exact>
      <q-item-section>
        {{ getLink(item) }}
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
export default {
  name: "Links",
  props: ["links"],
  methods: {
    getLink(item) {
      return `${item.category}-${item.name}`;
    }
  }
};
</script>
