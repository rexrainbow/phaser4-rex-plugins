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
      <Links />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import Toolbar from "components/Toolbar";
import Links from "components/Links";

export default {
  name: "MainLayout",
  components: { Toolbar, Links },
  data() {
    return {
      leftDrawerOpen: false,
    };
  },
};
</script>
