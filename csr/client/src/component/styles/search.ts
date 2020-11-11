import styled from 'styled-components';
import loupe from './res/loupe.svg';

export const SearchBar = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 45%;
`;
export const SearchInput = styled.input`
  width: calc(100% - 60px);
  height: 30px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 2px;
  outline: none;
  :focus {
    border: 1px solid #2800cc;
  }
`;

export const SearchButton = styled.button`
  width: 60px;
  height: 30px;
  border: 1px solid #ccc;
  border-left: none;
  box-sizing: border-box;
  outline: none;
  background-image: url(${loupe});
  background-position: center;
  background-size: 18px 18px;
  background-color: #efefef;
  background-repeat: no-repeat;
  :hover {
    background-color: #e5e5e5;
  }
  cursor: pointer;
`;
