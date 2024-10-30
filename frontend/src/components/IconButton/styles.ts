import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.button`
  align-items: center;
  background: #3e3b47;
  border: 0;
  border-radius: 16px;
  color: #fff;
  display: flex;
  font-size: 1.5rem;
  height: 88px;
  justify-content: center;
  transition: background-color 0.2s;
  width: 88px;

  &:hover {
    background: ${shade(0.2, '#3E3B47')};
  }
`;
