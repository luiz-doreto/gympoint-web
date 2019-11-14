import { all, takeLatest } from 'redux-saga/effects';

export function* signIn() {
    return yield all(); // pra nao dar erro :/
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
