import { Formik, Form } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import Input from './components/Input';
import Button from './components/Button';
import CenteredContainer from './components/CenteredContainer';
import Section from './components/Section';
import Balance from './components/Balance';

const compoundInterest = (deposit, contribution, years, rate) => {
  let total = deposit;
  for(let i = 0; i < years; i++) {
    total = (total + contribution) * (1 + rate);
  }

  return Math.round(total);
}

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

const App = () => {
const [balance, setBalance] = useState('');

  const handleSubmit = ({deposit, contribution, years, rate}) => {
    const interest = compoundInterest(Number(deposit),Number(contribution), Number(years), Number(rate));
    setBalance(formatter.format(interest));
  }

  return (
    <CenteredContainer>
      <Section>
        <Formik
          initialValues={{
            deposit: '',
            contribution: '',
            years: '',
            rate: ''
          }}
          onSubmit={handleSubmit}
          validationSchema={Yup.object({
            deposit: Yup
              .number()
              .typeError('Must be a number')
              .required('Required'),
            contribution: Yup
            .number()
            .typeError('Must be a number')
            .required('Required'),
            years: Yup
            .number()
            .typeError('Must be a number')
            .required('Required'),
            rate: Yup
            .number()
            .typeError('Must be a number')
            .min(0, 'Must be bigger than 0')
            .max(1, 'Must be smaller than 1')
            .required('Required'),
          })}
        >
          <Form>
          <Input name='deposit' label='Initial deposit' />
          <Input name='contribution' label='Year contribution' />
          <Input name='years' label='Years' />
          <Input name='rate' label='Estimated rate' />
          <Button type='submit'>Calculate</Button>
          </Form>
        </Formik>
        {balance !== '' ? <Balance>Final Balance: {balance}</Balance> : null}
      </Section>
    </CenteredContainer>
  );
}

export default App;
