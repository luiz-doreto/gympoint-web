import React from 'react';
import { Link } from 'react-router-dom';

import logo from '~/assets/logo-header.svg';
import { Container } from './styles';

export default function Header() {
    return (
        <Container>
            <nav>
                <img src={logo} alt="GymPoint" />

                <Link to="/student">Alunos</Link>
                <Link to="/plan">Planos</Link>
                <Link to="/register">Matrículas</Link>
                {/* <Link>Pedidos de auxílio</Link> */}
            </nav>

            <aside>
                <strong>Administrador do sistema</strong>
                <button type="button" onClick={() => alert('oi')}>
                    logout
                </button>
            </aside>
        </Container>
    );
}
