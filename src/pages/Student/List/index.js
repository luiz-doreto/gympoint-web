import React, { useEffect, useState } from 'react';

import { ContentWrapper, ContentHeader, Button, Table } from '~/components';
import api from '~/services/api';
import history from '~/services/history';

import { Container } from './styles';

export default function List() {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        async function loadStudents() {
            const response = await api.get('students');

            setStudents(response.data);
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
                <Table>
                    <thead>
                        <tr>
                            <th width="50%">Nome</th>
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
                                        text="editar"
                                        color="#4D85EE"
                                        onClick={() =>
                                            history.push(
                                                `/student/form/${student.id}`
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
