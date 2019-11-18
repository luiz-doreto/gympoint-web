import React from 'react';
import { useParams } from 'react-router-dom';
import { Form as UnForm, Input } from '@rocketseat/unform';

import { ContentHeader, ContentWrapper, Button } from '~/components';
import { Container } from './styles';
// import api from '~/services/api';
import history from '~/services/history';

export default function Form() {
    const { student_id } = useParams();

    function handleRegister() {}

    return (
        <Container>
            <ContentHeader
                title={student_id ? 'Edição de aluno' : 'Cadastro de aluno'}
            >
                <Button
                    text="Voltar"
                    buttonType={Button.TYPES.Back}
                    onClick={() => history.push('/student/list')}
                />
                <Button
                    text="Cadastrar"
                    buttonType={Button.TYPES.Register}
                    onClick={handleRegister}
                />
            </ContentHeader>
            <ContentWrapper>
                <UnForm>
                    <Input name="name" />
                </UnForm>
            </ContentWrapper>
        </Container>
    );
}
