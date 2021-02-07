<template>
  <q-list>
    <ExpandLinks
      v-for="(child, childName) in links"
      :key="childName"
      prefix=""
      :parent="childName"
      :children="child"
    />
  </q-list>
</template>

<script>
import ExpandLinks from "./ExpandLinks";

export default {
  name: "Links",
  components: { ExpandLinks },
  props: ["links"]
};
</script>
