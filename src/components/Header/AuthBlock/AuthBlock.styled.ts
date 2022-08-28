import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({theme}) => theme.space.SPACE_MEDIUM};
  font-size: ${({theme}) => theme.fontSize.SMALL};
`

export {Wrapper}