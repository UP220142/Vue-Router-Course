<script setup>
import { RouterLink } from "vue-router";
import { useGetData } from "@/composables/getData";
import { useGetPokemonTypes } from "@/composables/getPokeType";

const { data, getData, loading, error } = useGetData();
const { pokemonsWithTypes, loadingTypes, getTypeClass } =
    useGetPokemonTypes(data);
getData("https://pokeapi.co/api/v2/pokemon");
</script>

<template>
    <h1>Pokemons</h1>

    <p v-if="loading || loadingTypes">Cargando información...</p>

    <div class="alert alert-danger mt-2" v-else-if="error">{{ error }}</div>

    <div v-else-if="data && pokemonsWithTypes.length > 0">
        <ul class="list-group mb-2">
            <li v-for="poke in pokemonsWithTypes" :key="poke.name" :class="[
                'list-group-item',
                'list-group-item-action',
                `list-group-item-${getTypeClass(poke.type)}`,
            ]">
                <router-link :to="`/pokemons/${poke.name}`" class="text-decoration-none text-dark">
                    {{ poke.name }}
                    <span class="badge bg-secondary ms-2">{{ poke.type }}</span>
                </router-link>
            </li>
        </ul>
        <div class="mb-2">
            <button :disabled="!data.previous" class="btn btn-success me-2" @click="getData(data.previous)">
                Previous
            </button>
            <button :disabled="!data.next" class="btn btn-primary" @click="getData(data.next)">
                Next
            </button>
        </div>
    </div>
</template>
