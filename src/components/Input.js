import styled from 'styled-components';
import { useField } from 'formik';

const Control = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  color: #000;
  display: block;
  margin-bottom: 5px;
`;

const StyledInput = styled.input`
  outline: none;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
`;

const ErrorMessage = styled.div`
  color: #f00;
`;

const Input = ({label, ...props}) => {

  const [field, meta] = useField(props);

  return (
    <Control>
      <Label>{label}</Label>
      <StyledInput {...field} {...props} />
      {meta.touched && meta.error ? (
        <ErrorMessage>{meta.error}</ErrorMessage>
      ) : null}
    </Control>
  )
}

export default Input;