import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { parseISO } from 'date-fns';
import { Form as UnForm, Input } from '@rocketseat/unform';

import {
    ContentHeader,
    ContentWrapper,
    Button,
    Select,
    DatePicker,
} from '~/components';
import { Container, InputGridContainer, InputContainer } from './styles';
import { formatPrice } from '~/util/format';
import history from '~/services/history';
import api from '~/services/api';

export default function Form() {
    const { register_id } = useParams();
    const [register, setRegister] = useState({});
    const [students, setStudents] = useState([]);
    const [plans, setPlans] = useState([]);

    useEffect(() => {
        async function loadStudents() {
            const response = await api.get('students');

            const data = response.data.map(std => ({
                id: std.id,
                title: std.name,
            }));

            setStudents(data);
        }

        async function loadPlans() {
            const response = await api.get('plans');

            const data = response.data.map(plan => ({
                id: plan.id,
                title: plan.title,
            }));

            setPlans(data);
        }

        loadPlans();
        loadStudents();
    }, []);

    useEffect(() => {
        async function loadRegister() {
            if (register_id) {
                const response = await api.get(`registrations/${register_id}`);
                const { data } = response;

                setRegister({
                    ...data,
                    start_date: parseISO(data.start_date),
                    end_date: parseISO(data.end_date),
                    price: formatPrice(data.price),
                });
            }
        }

        loadRegister();
    }, [register_id]);

    async function handleSave(data) {
        console.tron.log(data);
    }

    return (
        <Container>
            <ContentHeader
                title={
                    register_id
                        ? 'Edição de matrícula'
                        : 'Cadastro de matrícula'
                }
            >
                <Button
                    text="Voltar"
                    buttonType={Button.TYPES.Back}
                    onClick={() => history.push('/register/list')}
                />
                <Button
                    type="submit"
                    form="register"
                    text="Salvar"
                    buttonType={Button.TYPES.Save}
                />
            </ContentHeader>

            <ContentWrapper>
                <UnForm
                    id="register"
                    initialData={register}
                    onSubmit={handleSave}
                >
                    <label htmlFor="student">Aluno</label>
                    <Select id="student" name="student_id" options={students} />
                    <InputGridContainer>
                        <InputContainer>
                            <label htmlFor="plan">Plano</label>
                            <Select id="plan" name="plan_id" options={plans} />
                        </InputContainer>
                        <InputContainer>
                            <label htmlFor="start_date">Data de início</label>
                            <DatePicker id="start_date" name="start_date" />
                        </InputContainer>
                        <InputContainer>
                            <label htmlFor="end_date">Data de término</label>
                            <DatePicker
                                id="end_date"
                                name="end_date"
                                disabled
                            />
                        </InputContainer>
                        <InputContainer>
                            <label htmlFor="price">Valor Total</label>
                            <Input id="price" name="price" disabled />
                        </InputContainer>
                    </InputGridContainer>
                </UnForm>
            </ContentWrapper>
        </Container>
    );
}
