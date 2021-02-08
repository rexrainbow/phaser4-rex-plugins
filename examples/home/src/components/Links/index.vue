<template>
    <q-tree
        :nodes="dataToNode(links)"
        node-key="nodeKey"
        default-expand-all
        no-connectors
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
    name = name.replaceAll(" ", "-").toLowerCase();
    return parent ? `${parent.nodeKey}_${name}` : name;
};

export default {
    name: "Links",
    props: ["links"],
    methods: {
        dataToNode(data) {
            return DataTONode(data);
        },
    },
};
</script>
