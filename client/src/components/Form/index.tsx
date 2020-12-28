import React, {
  ButtonHTMLAttributes,
  FormHTMLAttributes,
  InputHTMLAttributes,
} from 'react';
import { Container, Input, Button } from './styles';

interface IForm {
  Input: React.FC<InputHTMLAttributes<HTMLInputElement>>;
  Button: React.FC<ButtonHTMLAttributes<HTMLButtonElement>>;
}
export const Form: React.FC<FormHTMLAttributes<HTMLFormElement>> & IForm = ({
  children,
  ...restProps
}) => {
  return <Container {...restProps}>{children}</Container>;
};

Form.Input = ({ children, ...restProps }) => {
  return <Input {...restProps}>{children}</Input>;
};

Form.Button = ({ children, ...restProps }) => {
  return <Button {...restProps}>{children}</Button>;
};
