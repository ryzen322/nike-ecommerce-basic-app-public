import { createSlice } from "@reduxjs/toolkit";

const shoesSlice = createSlice({
  name: "shoes",
  initialState: {
    items: [],
    colors: [],
    singleData: [],
    selectedColor: [],
  },
  reducers: {
    transformData(state, action) {
      const data = action.payload;
      const loadedShoes = [];
      for (const key in data) {
        const colors = data[key].color;
        const loadedColors = [];
        for (const color in colors) {
          const imgs = colors[color];
          const loadedImages = [];
          for (const img in imgs) {
            loadedImages.push(imgs[img]);
          }
          loadedColors.push({ colorId: color, images: loadedImages });
        }
        loadedShoes.push({
          key: key,
          id: key,
          name: data[key].name,
          type: data[key].type,
          colors: loadedColors,
          price: data[key].price,
        });
        state.items = loadedShoes;
      }
    },
    transoformSingleData(state, action) {
      const data = action.payload;
      const colors = data.color;
      const loadedColors = [];
      for (const color in colors) {
        const imgs = colors[color];
        const loadedImages = [];
        for (const img in imgs) {
          loadedImages.push(imgs[img]);
        }
        loadedColors.push({ colorId: color, images: loadedImages });
        data.color = loadedColors;
      }
      state.singleData = data;
      state.colors = data.color;
    },
    resetSingleData(state) {
      state.singleData = [];
      state.selectedColor = [];
      state.colors = [];
    },
    assignColor(state, action) {
      const colorId = action.payload;
      const selectedColor = state.colors.find(
        (color) => color.colorId === colorId
      );
      state.selectedColor = selectedColor;
    },
  },
});

export const shoesActions = shoesSlice.actions;

export default shoesSlice;
