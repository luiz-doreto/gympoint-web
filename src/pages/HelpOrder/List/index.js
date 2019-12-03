import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import {
    ContentWrapper,
    ContentHeader,
    Table,
    EmptyState,
    Spinner,
} from '~/components';
import AnswerDialog from '../AnswerDialog';
import { Container } from './styles';
import api from '~/services/api';

export default function List() {
    const [helpOrders, setHelpOrders] = useState([]);
    const [helpOrder, setHelpOrder] = useState({});
    const [showDialog, setShowDialog] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadHelpOrders() {
            const response = await api.get('help-orders');

            setHelpOrders(response.data);
            setLoading(false);
        }

        loadHelpOrders();
    }, []);

    function handleClick(id) {
        const HO = helpOrders.find(ho => ho.id === id);
        setHelpOrder(HO);
        setShowDialog(true);
    }

    function handleClose() {
        setShowDialog(false);
    }

    async function handleAnswer(answer) {
        try {
            await api.put(`/help-orders/${helpOrder.id}/answer`, { answer });
            toast.success('Aluno respondido com sucesso!');
        } catch (error) {
            toast.error('Falha ao responder aluno!');
        }

        const response = await api.get('help-orders');

        setHelpOrders(response.data);
        setShowDialog(false);
    }

    return (
        <Container>
            <ContentHeader title="Pedidos de auxílio" />
            <ContentWrapper>
                {loading ? (
                    <Spinner />
                ) : helpOrders.length > 0 ? (
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
                                            onClick={() => handleClick(ho.id)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                ) : (
                    <EmptyState text="Não existem dúvidas cadastradas" />
                )}
            </ContentWrapper>
            <AnswerDialog
                visible={showDialog}
                data={helpOrder}
                onClose={handleClose}
                onAnswer={handleAnswer}
            />
        </Container>
    );
}
