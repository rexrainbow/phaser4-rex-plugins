<template>
  <q-expansion-item dense :label="parent">
    <q-card>
      <q-card-section v-if="Array.isArray(children)">
        <q-list>
          <q-item
            v-for="child in children"
            :key="getChildPrefix(child)"
            :to="
              getChildPrefix(child)
                .toLowerCase()
                .replace(' ', '-')
            "
            exact
          >
            <q-item-section>
              {{ child }}
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>

      <q-card-section v-else>
        <ExpandLinks
          v-for="(child, childName) in children"
          :key="getChildPrefix(childName)"
          :prefix="parentPrefix"
          :parent="childName"
          :children="child"
        />
      </q-card-section>
    </q-card>
  </q-expansion-item>
</template>

<script>
export default {
  name: "ExpandLinks",
  props: ["prefix", "parent", "children"],
  computed: {
    parentPrefix() {
      if (this.prefix === "") {
        return this.parent;
      } else {
        return `${this.prefix}-${this.parent}`;
      }
    }
  },
  methods: {
    getChildPrefix(child) {
      return `${this.parentPrefix}-${child}`;
    }
  }
};
</script>
