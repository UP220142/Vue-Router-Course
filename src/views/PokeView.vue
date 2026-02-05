<script setup>
import { useRoute, useRouter } from "vue-router";
import {useGetData} from '@/composables/getData';

const route = useRoute();
const router = useRouter();

const {getData, data, loading} = useGetData();

const back = () => {
    router.push("/pokemons");
};

getData(`https://pokeapi.co/api/v2/pokemon/${route.params.name}`);
</script>

<template>
    <p v-if="loading">Cargando información...</p>
    <div v-if="data">
        <img :src="data.sprites?.front_default" alt="Pokemon sprite" width="250" height="250" />
        <h1>Poke name: {{ $route.params.name }}</h1>
    </div>
    <h1 v-else>Poke not found</h1>
    <button @click="back" class="btn btn-outline-primary">Volver</button>
</template>
