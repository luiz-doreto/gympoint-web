import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;

    > strong {
        font-size: 24px;
    }

    > button {
        color: #fff;
        font-weight: bold;
        font-size: 14px;
        text-transform: uppercase;
        height: 36px;
        border-radius: 4px;
        border: 0;
        background: #ee4d64;
        padding: 10px;
    }

    > div {
        display: flex;
        align-items: center;
    }

    div input {
        margin-left: 10px;
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        height: 36px;
        padding: 10px 20px;
    }
`;
