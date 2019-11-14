import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
    width: 100%;
    max-width: 380px;
    text-align: center;
    background: #fff;
    padding: 50px 30px;
    border-radius: 4px;

    form {
        display: flex;
        flex-direction: column;
        margin-top: 30px;

        label {
            align-self: flex-start;
            text-transform: uppercase;
            font-weight: bold;
            margin-bottom: 5px;
        }

        input {
            background: #fff;
            border: 1px solid rgba(0, 0, 0, 0.2);
            height: 44px;
            border-radius: 4px;
            padding: 0 15px;
            margin: 0 0 10px;
        }

        span {
            color: #fb6f91;
            align-self: flex-start;
            margin: 0 0 10px;
        }

        button {
            margin: 5px 0 0;
            height: 44px;
            font-weight: bold;
            background: #ee4d64;
            color: #fff;
            border: 0;
            border-radius: 4px;
            font-size: 16px;
            transition: background 0.2s;
            &:hover {
                background: ${darken(0.06, '#ee4d64')};
            }
        }
    }
`;
