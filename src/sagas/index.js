import {
  call,
  put,
  takeLatest,
  select,
} from 'redux-saga/effects';
import {actors, ListFavorites, ListBook, ListFavoritesDelete} from '../reducers/user'
import {fetchBook} from '../config/remoteApi'


function* ListFavoritesAPP({List}) {
  try {
    console.log("into IncValapp", List)
    yield put(ListFavorites(List));
  } catch (error) {
    console.log("errorSaga", error)
  }
};

function* fetchListBook() {
  try {
    const response = yield call(fetchBook);
    yield put(ListBook(response.data));
  } catch (error) {
    console.log("errorSagaApi", error)
  }
}
// esto es para escuchar los reducer
function* mainSaga() {
  console.log("into Saga")
  try {
    yield takeLatest(actors.ListFavorites.type ,ListFavoritesAPP);
    yield takeLatest(actors.ListBook.type, fetchListBook);
  } catch (err) {
    console.log("ERRO", err)
  }
}


export default mainSaga;
