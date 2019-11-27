import React, { useEffect, useState } from 'react';
import { MdCheckCircle } from 'react-icons/md';

import { ContentWrapper, ContentHeader, Button, Table } from '~/components';
import api from '~/services/api';
import history from '~/services/history';
import { formatDate } from '~/util/format';
import { Container } from './styles';

export default function List() {
    const [registers, setRegisters] = useState([]);

    useEffect(() => {
        async function loadRegisters() {
            const response = await api.get('registrations');

            const data = response.data.map(register => ({
                ...register,
                formattedStart: formatDate(register.start_date),
                formattedEnd: formatDate(register.end_date),
            }));

            setRegisters(data);
        }

        loadRegisters();
    }, []);

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
                                <td>{reg.plan.title}</td>
                                <td>{reg.formattedStart}</td>
                                <td>{reg.formattedEnd}</td>
                                <td>
                                    {
                                        <MdCheckCircle
                                            size={20}
                                            color={
                                                reg.active ? '#42CB59' : '#ddd'
                                            }
                                        />
                                    }
                                </td>
                                <td>
                                    <Table.Action
                                        text="editar"
                                        color="#4D85EE"
                                        onClick={() =>
                                            history.push(
                                                `/register/form/${reg.id}`
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
