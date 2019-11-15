import { all, takeLatest, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';
import { signInSuccess, signInFailure } from './actions';

export function* signIn({ payload }) {
    try {
        const { email, password } = payload;

        const response = yield call(api.post, 'sessions', {
            email,
            password,
        });

        api.defaults.headers.Authorization = `Bearer ${response.token}`;

        yield put(signInSuccess(response.data));

        history.push('/student');
    } catch (err) {
        toast.error('Falha na autenticação, por favor verifique seus dados.');
        yield put(signInFailure());
    }
}

export function setToken({ payload }) {
    const { token } = payload.auth;

    api.defaults.headers.Authorization = `Bearer ${token}`;
}

export default all([
    takeLatest('@auth/SIGN_IN_REQUEST', signIn),
    takeLatest('persist/REHYDRATE', setToken),
]);
