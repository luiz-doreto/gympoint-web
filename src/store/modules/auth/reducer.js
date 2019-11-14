import produce from 'immer';

const INITIAL_STATE = {
    token: null,
};

export default function auth(state = INITIAL_STATE, action) {
    return produce(state, draft => {
        switch (action.type) {
            case '@auth/SIGN_IN_SUCCESS': {
                draft.token = action.payload.token;
                break;
            }
            case '@auth/SIGN_OUT': {
                draft.token = null;
                break;
            }
            default:
        }
    });
}
