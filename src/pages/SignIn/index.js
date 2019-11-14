import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import logo from '~/assets/logo.svg';

import { Container } from './styles';

export default function SignIn() {
    function handleSubmit(data) {
        console.tron.log(data);
    }

    return (
        <Container>
            <img src={logo} alt="logo" />
            <Form onSubmit={handleSubmit}>
                <label htmlFor="email">E-mail</label>
                <Input id="email" name="email" type="email" />
                <label htmlFor="pass">Senha</label>
                <Input id="pass" name="password" type="password" />

                <button type="submit">Acessar</button>
            </Form>
        </Container>
    );
}
