import { createSlice } from '@reduxjs/toolkit';
//Valor Inicial de state
const initState = {
  ListFavorites:[],
  listBook :[],
};

//switch 
export const actors = {
  ListFavorites: { type: 'ListFavorites' },
  ListBook: { type: 'ListBook' },

};


//Funcion de IncVal.. Action
const ListFavoritesHandler = (state, action) => {
  console.log("into Reducer ListFavorites: ")
  state.ListFavorites=[...action.payload]
};


const ListBookHandle = (state, action) => {
  console.log("into Reducer ListBook")
  const { payload } = action;
  try {
    state.listBook = [...payload.body];
  } catch(error) {
    console.log('error', error);
  }
};

const loadSlice = createSlice({
  name: 'Load',
  initialState: initState,
  reducers: {
  
    [actors.ListFavorites.type]: ListFavoritesHandler,
    [actors.ListBook.type]: ListBookHandle,
  },
});

export const {

  ListFavorites,
  ListBook

} = loadSlice.actions;

export default loadSlice.reducer;