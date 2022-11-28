import styled from '@emotion/styled'
import { container_form_styles, body_styles } from './styles'
export const ContainerForm = ({ children }) => {
  const Container = styled('div')(container_form_styles)
  return <Container>{children}</Container>
}
export const BodyResetPassword = ({ children }) => {
  const Body = styled('div')(body_styles)
  return <Body>{children}</Body>
}
