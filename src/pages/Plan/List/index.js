import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import {
    ContentWrapper,
    ContentHeader,
    Button,
    Table,
    EmptyState,
    Spinner,
} from '~/components';
import { formatPrice } from '~/util/format';
import api from '~/services/api';
import history from '~/services/history';

import { Container } from './styles';

const { ActionType } = Table.Action;

export default function List() {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadPlans() {
            await fetchPlans();
        }

        loadPlans();
    }, []);

    async function fetchPlans() {
        const response = await api.get('plans');

        const data = response.data.map(plan => ({
            ...plan,
            formattedDuration:
                plan.duration === 1
                    ? `${plan.duration} mês`
                    : `${plan.duration} meses`,
            formattedPrice: formatPrice(plan.price),
        }));

        setPlans(data);
        setLoading(false);
    }

    async function handleRemove(id) {
        setLoading(true);
        try {
            await api.delete(`/plans/${id}`);
            toast.success('Plano removido com sucesso');
        } catch (error) {
            toast.error('Falha ao remover plano');
        }

        await fetchPlans();
    }

    return (
        <Container>
            <ContentHeader title="Gerenciando planos">
                <Button
                    text="Cadastrar"
                    buttonType={Button.TYPES.Register}
                    onClick={() => history.push('/plan/form')}
                />
            </ContentHeader>
            <ContentWrapper>
                {loading ? (
                    <Spinner />
                ) : plans.length > 0 ? (
                    <Table>
                        <thead>
                            <tr>
                                <th width="40%">Título</th>
                                <th>Duração</th>
                                <th>Valor/mês</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {plans.map(plan => (
                                <tr key={plan.id}>
                                    <td>{plan.title}</td>
                                    <td>{plan.formattedDuration}</td>
                                    <td>{plan.formattedPrice}</td>
                                    <td>
                                        <Table.Action
                                            type={ActionType.edit}
                                            color="#4D85EE"
                                            onClick={() =>
                                                history.push(
                                                    `/plan/form/${plan.id}`
                                                )
                                            }
                                        />
                                        <Table.Action
                                            type={ActionType.delete}
                                            color="#DE3B3B"
                                            onClick={() =>
                                                handleRemove(plan.id)
                                            }
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                ) : (
                    <EmptyState text="Não existem planos cadastrados" />
                )}
            </ContentWrapper>
        </Container>
    );
}
