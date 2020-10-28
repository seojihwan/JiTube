import styled from 'styled-components';

interface CommentInputFilledProps {
  isFocus: boolean;
}
export const UserIcon = styled.img`
  margin-right: 8px;
`;

export const CommentInputFilledWrapper = styled.div`
  width: 100%;
  /* transform: translateX(50%); */
`;
export const CommentInputFilled = styled.div<CommentInputFilledProps>`
  height: 1px;
  background-color: #000;
  width: ${(props) => (props.isFocus ? '100%' : '0px')};
  transition: width 1s;
`;

export const CommentInputWrapper = styled.div`
  display: inline-block;
  width: calc(100% - 40px);
`;

export const CommentInput = styled.input`
  width: 100%;
  border: none;
  border-bottom: solid 1px;
  border-bottom-color: #bebdb8;
  box-sizing: border-box;
  outline: none;
  :focus + ${CommentInputFilled} {
    width: 100%;
  }
`;

export const CommentEnter = styled.button`
  float: right;
  margin-top: 10px;
  border: none;
  border-radius: 1px;
  width: 60px;
  height: 30px;

  :disabled {
    color: #fff;
    background-color: #808588;
  }
  :enabled {
    color: #fff;
    background-color: #0f52ba;
  }
`;
