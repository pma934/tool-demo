<template>
    <div id="app">
        <v-a
            :p-child1="child1"
            :p-child2="child2"
            @test1="onTest1"
            @test2="onTest2"
        >
        </v-a>
        <button @click="decoratorTest">Decorator</button>
    </div>
</template>
<script>
// import {addConsole,debounce} from "./addConsole";
import a from "./a.vue";
export default {
    data() {
        return {
            child1: "",
            child2: "",
        };
    },
    components: { "v-a": a },
    methods: {
        onTest1() {
            console.log("test1 running...");
        },
        onTest2() {
            console.log("test2 running");
        },
        // @debounce(2000)
        // @addConsole
        decoratorTest(){
            console.log(123)
        }
    },
};
</script>