import { ref, watch } from "vue";
import axios from "axios";

export const useGetPokemonTypes = (data) => {
  const pokemonsWithTypes = ref([]);
  const loadingTypes = ref(false);

  const typeColorMap = {
    normal: "secondary",
    fire: "danger",
    water: "primary",
    electric: "warning",
    grass: "success",
    ice: "info",
    fighting: "danger",
    poison: "dark",
    ground: "warning",
    flying: "info",
    psychic: "primary",
    bug: "success",
    rock: "secondary",
    ghost: "dark",
    dragon: "primary",
    dark: "dark",
    steel: "secondary",
    fairy: "light",
  };

  const getTypeClass = (type) => {
    return typeColorMap[type] || "secondary";
  };

  watch(
    data,
    async (newData) => {
      if (newData && newData.results) {
        loadingTypes.value = true;
        try {
          const promises = newData.results.map((poke) => {
            // Validar si tiene URL (viene de la API) o ya tiene types (viene de favoritos)
            if (poke.url) {
              return axios.get(poke.url);
            } else if (poke.types) {
              // Si ya tiene types, retornarlo como está
              return Promise.resolve({ data: poke });
            } else {
              // Si no tiene ni URL ni types, retornar un objeto vacío
              return Promise.resolve({ data: { name: poke.name, types: [] } });
            }
          });
          
          const responses = await Promise.all(promises);
          pokemonsWithTypes.value = responses.map((res) => ({
            name: res.data.name,
            type: res.data.types?.[0]?.type?.name || "normal",
          }));
        } catch (error) {
          console.error("Error loading pokemon types:", error);
        } finally {
          loadingTypes.value = false;
        }
      }
    },
    { immediate: true }
  );

  return {
    pokemonsWithTypes,
    loadingTypes,
    getTypeClass,
  };
};