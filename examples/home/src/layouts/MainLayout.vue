<template>
  <q-layout view="lHh lpR lFf">
    <q-header elevated class="bg-grey-10 text-white">
      <Toolbar @toggleLeftDrarwer="leftDrawerOpen = !leftDrawerOpen" />
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-10"
    >
      <Links :links="links" />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import Toolbar from "components/Toolbar";
import Links from "components/Links";
import axios from "axios";

export default {
  name: "MainLayout",
  components: { Toolbar, Links },
  data() {
    return {
      leftDrawerOpen: false,
      links: {},
    };
  },
  mounted() {
    var self = this;
    axios
      .create()
      .get("examples.json")
      .then((response) => {
        self.links = response.data;
      });
  },
};
</script>
