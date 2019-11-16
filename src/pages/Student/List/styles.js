import styled from 'styled-components';

export const Container = styled.div`
    /* header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;

        strong {
            font-size: 24px;
        }

        div {
            button {
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
            input {
                margin-left: 10px;
                border: 1px solid rgba(0, 0, 0, 0.1);
                border-radius: 4px;
                height: 36px;
                padding: 10px 20px;
            }
        }
    } */

    table {
        width: 100%;
        border-collapse: collapse;

        thead th {
            text-transform: uppercase;
            text-align: left;
            font-size: 16px;
            padding: 12px 0;
        }

        tbody {
            tr {
                border-bottom: 1px solid #eee;

                &:last-child {
                    border-bottom: 0;
                }
            }

            td {
                padding: 12px 0;
                color: #666;
                font-size: 16px;

                &:last-child {
                    text-align: right;
                }
            }
        }
    }
`;

export const EditButton = styled.button`
    border: 0;
    background: none;
    margin-left: 10px;
    font-size: 15px;
    color: #4d85ee;
`;

export const DeleteButton = styled.button`
    border: 0;
    background: none;
    margin-left: 10px;
    font-size: 15px;
    color: #de3b3b;
`;
