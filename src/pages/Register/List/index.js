import React, { useEffect, useState } from 'react';
import { MdCheckCircle } from 'react-icons/md';
import { toast } from 'react-toastify';

import {
    ContentWrapper,
    ContentHeader,
    Button,
    Table,
    EmptyState,
    Spinner,
} from '~/components';
import api from '~/services/api';
import history from '~/services/history';
import { formatDate } from '~/util/format';
import { Container } from './styles';

const { ActionType } = Table.Action;

export default function List() {
    const [registers, setRegisters] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadRegisters() {
            await fetchRegistrations();
        }

        loadRegisters();
    }, []);

    async function fetchRegistrations() {
        const response = await api.get('registrations');

        const data = response.data.map(register => ({
            ...register,
            formattedStart: formatDate(register.start_date),
            formattedEnd: formatDate(register.end_date),
        }));

        setRegisters(data);
        setLoading(false);
    }

    async function handleRemove(id) {
        setLoading(true);
        try {
            await api.delete(`/registrations/${id}`);
            toast.success('Matrícula removida com sucesso');
        } catch (error) {
            toast.error('Falha ao remover matrícula');
        }

        await fetchRegistrations();
    }

    return (
        <Container>
            <ContentHeader title="Gerenciando matrículas">
                <Button
                    text="Cadastrar"
                    buttonType={Button.TYPES.Register}
                    onClick={() => history.push('/register/form')}
                />
            </ContentHeader>
            <ContentWrapper>
                {loading ? (
                    <Spinner />
                ) : registers.length > 0 ? (
                    <Table>
                        <thead>
                            <tr>
                                <th width="25%">Aluno</th>
                                <th width="15%">Plano</th>
                                <th>Inicio</th>
                                <th>Término</th>
                                <th>Ativa</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {registers.map(reg => (
                                <tr key={reg.id}>
                                    <td>{reg.student.name}</td>
                                    <td>{reg.plan ? reg.plan.title : '---'}</td>
                                    <td>{reg.formattedStart}</td>
                                    <td>{reg.formattedEnd}</td>
                                    <td>
                                        <MdCheckCircle
                                            size={20}
                                            color={
                                                reg.active ? '#42CB59' : '#ddd'
                                            }
                                        />
                                    </td>
                                    <td>
                                        <Table.Action
                                            type={ActionType.edit}
                                            color="#4D85EE"
                                            onClick={() =>
                                                history.push(
                                                    `/register/form/${reg.id}`
                                                )
                                            }
                                        />
                                        <Table.Action
                                            type={ActionType.delete}
                                            color="#DE3B3B"
                                            onClick={() => handleRemove(reg.id)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                ) : (
                    <EmptyState text="Não existem matrículas cadastradas" />
                )}
            </ContentWrapper>
        </Container>
    );
}
