import React, { useState, useEffect } from 'react';

import { ContentWrapper, ContentHeader, Table } from '~/components';
import AnswerDialog from '../AnswerDialog';
import { Container } from './styles';
import api from '~/services/api';

export default function List() {
    const [helpOrders, setHelpOrders] = useState([]);

    useEffect(() => {
        async function loadHelpOrders() {
            const response = await api.get('help-orders');

            setHelpOrders(response.data);
        }

        loadHelpOrders();
    }, []);

    return (
        <Container>
            <ContentHeader title="Pedidos de auxílio" />
            <ContentWrapper>
                <Table>
                    <thead>
                        <tr>
                            <th>Aluno</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {helpOrders.map(ho => (
                            <tr key={ho.id}>
                                <td>{ho.student.name}</td>
                                <td>
                                    <Table.Action
                                        text="responder"
                                        color="#4D85EE"
                                        onClick={() =>
                                            alert('not implemented yet!')
                                        }
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </ContentWrapper>
            <AnswerDialog />
        </Container>
    );
}
