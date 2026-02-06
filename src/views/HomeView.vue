<script setup>
import { useCounterStore } from "@/store/counter.js";
import { storeToRefs } from "pinia";

const useCounter = useCounterStore();

const {  double, count } = storeToRefs(useCounter);
</script>

<template>
  <h1>Home counetr: {{ count }}</h1>
  <h2>double: {{ double }}</h2>
  <button @click="increment">Increment</button>
</template>
