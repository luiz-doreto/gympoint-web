import React, { useEffect, useState } from 'react';

import ContentWrapper from '~/components/ContentWrapper';
import ContentHeader from '~/components/ContentHeader';
import Button from '~/components/Button';
import { Container, EditButton, DeleteButton } from './styles';
import api from '~/services/api';

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
                    onClick={() => alert('falta implemenetar')}
                />
                <input placeholder="Buscar aluno" />
            </ContentHeader>
            <ContentWrapper>
                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Idade</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {students.map(student => (
                            <tr>
                                <td>{student.name}</td>
                                <td>{student.email}</td>
                                <td>{student.age}</td>
                                <td>
                                    <EditButton
                                        type="button"
                                        onClick={() =>
                                            alert('not implemented yet!')
                                        }
                                    >
                                        editar
                                    </EditButton>
                                    <DeleteButton
                                        type="button"
                                        onClick={() =>
                                            alert('not implemented yet!')
                                        }
                                    >
                                        apagar
                                    </DeleteButton>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </ContentWrapper>
        </Container>
    );
}
