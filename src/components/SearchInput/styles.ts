import styled from 'styled-components';

export const InputItem = styled.div`
  border-width: 0;

  label{
    margin-top: 10px;
    padding: 5px;
    line-height: 1.5;
    text-align: right;
    clear: both;
    float:left;
    margin-right:15px;
  }
  input {
    margin-top: 10px;
    border-color: none;
    padding: 5px;
    line-height: 1.5;
    vertical-align: middle;
    &:focus {
        outline: none;
    }
  }
`;

