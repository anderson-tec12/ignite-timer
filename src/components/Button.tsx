import { ButtonContainer } from "./Button.styles"

interface IPROPS{
  variant?:'primary' | 'secondary' | 'danger' | 'success'
}

export function Button({variant='primary'}:IPROPS){
  return (
    <ButtonContainer variant={variant}>Enviar</ButtonContainer>
  )
}