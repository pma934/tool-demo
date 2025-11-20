<template>
    <div class="child-1">
        <p>in child1:</p>
        <p>props: {{ pChild1 }}</p>
        <p>$attrs: {{ $attrs }}</p>
        <hr />
        <v-b v-bind="$attrs" v-on="$listeners"></v-b>
    </div>
</template>
<script>
import b from "./b.vue";
export default {
    props: ["pChild1"],
    data() {
        return {};
    },
    inheritAttrs: false,
    components: { 'v-b':b },
    mounted() {
        this.$emit("test1");
    },
};
</script>