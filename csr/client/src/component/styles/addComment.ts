import styled from 'styled-components';

interface CommentInputFilledProps {
  isFocus: boolean;
}

export const AddCommentForm = styled.form`
  overflow: hidden;
  height: 80px;
  margin-bottom: 20px;
`;

export const UserIcon = styled.img`
  margin-right: 8px;
`;

export const CommentInputFilledWrapper = styled.div`
  width: 100%;
  font-size: 14px;
`;
export const CommentInputFilled = styled.div<CommentInputFilledProps>`
  height: 1px;
  background-color: #000;
  width: 100%;
  transform: ${(props) =>
    props.isFocus ? 'scale3d(1,1,1);' : 'scale3d(0,1,1);'};
  transition: ${(props) => (props.isFocus ? 'transform 1s' : 'none')};
`;

export const CommentInputWrapper = styled.div`
  display: inline-block;
  width: calc(100% - 40px);
  height: 24px;
`;

export const CommentInput = styled.input`
  width: 100%;
  height: 24px;
  border: none;
  border-bottom: solid 1px;
  border-bottom-color: #bebdb8;
  box-sizing: border-box;
  outline: none;
`;

export const CommentEnter = styled.button`
  float: right;
  margin-top: 10px;
  border: none;
  outline: none;
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
    cursor: pointer;
  }
`;
