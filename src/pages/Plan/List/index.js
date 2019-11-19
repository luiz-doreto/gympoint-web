import React, { useEffect, useState } from 'react';

import { ContentWrapper, ContentHeader, Button, Table } from '~/components';
import { formatPrice } from '~/util/format';
import api from '~/services/api';
import history from '~/services/history';

import { Container } from './styles';

export default function List() {
    const [plans, setPlans] = useState([]);

    useEffect(() => {
        async function loadPlans() {
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
        }

        loadPlans();
    }, []);

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
                                        text="editar"
                                        color="#4D85EE"
                                        onClick={() =>
                                            history.push(
                                                `/plan/form/${plan.id}`
                                            )
                                        }
                                    />
                                    <Table.Action
                                        text="apagar"
                                        color="#DE3B3B"
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
        </Container>
    );
}
