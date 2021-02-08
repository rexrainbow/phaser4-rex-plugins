<template>
    <q-layout view="lHh lpR lFf">
        <q-header elevated class="bg-primary text-white">
            <q-toolbar>
                <q-btn
                    dense
                    flat
                    round
                    icon="menu"
                    @click="leftDrawerOpen = !leftDrawerOpen"
                />

                <q-toolbar-title>
                    {{ title }}
                </q-toolbar-title>
            </q-toolbar>
        </q-header>

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
import Links from "components/Links";
import { LoadScriptPromise } from "../utils/loader/LoadScriptPromise.js";

export default {
    name: "MainLayout",
    components: { Links },
    data() {
        return {
            leftDrawerOpen: false,
            links: {},
        };
    },
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
    mounted() {
        var self = this;
        LoadScriptPromise("data.js").then(function () {
            self.links = window.Examples;
        });
    },
};
</script>
