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

  watch(data, async (newData) => {
    if (newData && newData.results) {
      loadingTypes.value = true;
      try {
        const promises = newData.results.map((poke) => axios.get(poke.url));
        const responses = await Promise.all(promises);
        pokemonsWithTypes.value = responses.map((res) => ({
          name: res.data.name,
          type: res.data.types[0].type.name,
        }));
      } catch (error) {
        console.error("Error loading pokemon types:", error);
      } finally {
        loadingTypes.value = false;
      }
    }
  });

  return {
    pokemonsWithTypes,
    loadingTypes,
    getTypeClass,
  };
};