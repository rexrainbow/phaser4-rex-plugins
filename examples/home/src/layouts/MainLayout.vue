<template>
    <q-layout view="hHh lpR fFf">
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <Links :links="links" />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { Examples } from "../data/Examples.js";
import Links from "components/Links";

export default {
  name: "MainLayout",
  components: { Links },
  data() {
    return {
      leftDrawerOpen: false,
      links: Examples
    };
  }
};
</script>
