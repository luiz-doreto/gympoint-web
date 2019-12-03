import React, { useEffect, useState } from 'react';

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

import { Container } from './styles';

const { ActionType } = Table.Action;

export default function List() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadStudents() {
            const response = await api.get('students');

            setStudents(response.data);
            setLoading(false);
        }

        loadStudents();
    }, []);

    return (
        <Container>
            <ContentHeader title="Gerenciando alunos">
                <Button
                    text="Cadastrar"
                    buttonType={Button.TYPES.Register}
                    onClick={() => history.push('/student/form')}
                />
                <input placeholder="Buscar aluno" />
            </ContentHeader>
            <ContentWrapper>
                {loading ? (
                    <Spinner />
                ) : students.length > 0 ? (
                    <Table>
                        <thead>
                            <tr>
                                <th width="40%">Nome</th>
                                <th>Email</th>
                                <th>Idade</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {students.map(student => (
                                <tr key={student.id}>
                                    <td>{student.name}</td>
                                    <td>{student.email}</td>
                                    <td>{student.age}</td>
                                    <td>
                                        <Table.Action
                                            type={ActionType.edit}
                                            color="#4D85EE"
                                            onClick={() =>
                                                history.push(
                                                    `/student/form/${student.id}`
                                                )
                                            }
                                        />
                                        <Table.Action
                                            type={ActionType.delete}
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
                ) : (
                    <EmptyState text="Não existem alunos cadastrados" />
                )}
            </ContentWrapper>
        </Container>
    );
}
