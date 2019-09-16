import { Alert } from 'react-native';
import { all, takeLatest, call, put } from 'redux-saga/effects';
import api from '~/services/api';
import { updateProfileSuccess, updateProfileFailure } from './actions';

export function* updateProfile({ payload }) {
  try {
    const { name, email, avatar_id, ...rest } = payload.data;

    const profile = {
      name,
      email,
      avatar_id,
      ...(rest.oldPassword ? rest : {}),
    };

    Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
    const response = yield call(api.put, 'users', profile);

    yield put(updateProfileSuccess(response.data));
  } catch (error) {
    Alert.alert('Erro', 'Erros ocorreram. Verifique seus dados');
    yield put(updateProfileFailure());
  }
}
export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
