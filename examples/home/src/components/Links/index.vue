<template>
  <q-tree
    ref="tree"
    :nodes="dataToNode(links)"
    node-key="nodeKey"
    no-connectors
    accordion
    dark
  >
    <template v-slot:header-link="prop">
      <q-item :to="prop.node.nodeKey" exact dense>
        <q-item-section>
          {{ prop.node.label }}
        </q-item-section>
      </q-item>
    </template>
  </q-tree>
</template>

<script>
import axios from "axios";

var DataTONode = function (data, parent) {
  var nodes = [];
  if (!Array.isArray(data)) {
    for (var name in data) {
      var node = {
        label: name,
        header: "category",
        nodeKey: GetNodeKey(name, parent),
      };
      node.children = DataTONode(data[name], node);
      nodes.push(node);
    }
  } else {
    data.forEach(function (name) {
      nodes.push({
        label: name,
        header: "link",
        nodeKey: GetNodeKey(name, parent),
      });
    });
  }

  return nodes;
};

var GetNodeKey = function (name, parent) {
  name = name.replaceAll(" ", "-");
  return parent ? `${parent.nodeKey}_${name}` : name;
};

export default {
  name: "Links",
  data() {
    return {
      links: {},
    };
  },
  methods: {
    dataToNode(data) {
      return DataTONode(data);
    },
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
