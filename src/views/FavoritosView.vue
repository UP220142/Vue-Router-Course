<script setup>
import { useFavoritosStore } from "@/store/favoritos";
import { storeToRefs } from "pinia";
import { useGetPokemonTypes } from "@/composables/getPokeType";
import { computed } from "vue";

const useFavoritos = useFavoritosStore();
const { favoritos } = storeToRefs(useFavoritos);

const favoritosData = computed(() => ({
    results: favoritos.value,
}));

const { getTypeClass } = useGetPokemonTypes(favoritosData);
</script>

<template>
    <h1>Favoritos</h1>
    <div v-if="favoritos.length === 0">
        <p>No tienes favoritos</p>
    </div>
    <ul v-else class="list-group">
        <li v-for="poke in favoritos" :key="poke.id" :class="[
            'list-group-item',
            'd-flex',
            'justify-content-between',
            'align-items-center',
            'mb-2',
            'border',
            'rounded',
            `list-group-item-${getTypeClass(poke.types?.[0]?.type?.name || 'normal')}`,
        ]">
            {{ poke.name }}
            <span class="badge bg-secondary">{{
                poke.types?.[0]?.type?.name || "normal"
                }}</span>
        </li>
    </ul>
</template>
