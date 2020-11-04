import styled from 'styled-components';

interface ReplyInputFilledProps {
  isFocus: boolean;
}
export const ReplyForm = styled.form`
  overflow: hidden;
`;
export const ReplyInputWrapper = styled.div`
  display: inline-block;
  width: 100%;
  height: 24px;
`;

export const ReplyInputFilledWrapper = styled.div`
  width: 100%;
  font-size: 14px;
`;
export const ReplyInputFilled = styled.div<ReplyInputFilledProps>`
  height: 1px;
  background-color: #000;
  width: 100%;
  transform: ${(props) =>
    props.isFocus ? 'scale3d(1,1,1);' : 'scale3d(0,1,1);'};
  transition: ${(props) => (props.isFocus ? 'transform 1s' : 'none')};
`;

export const ReplyInput = styled.input`
  width: 100%;
  height: 24px;
  border: none;
  border-bottom: solid 1px;
  border-bottom-color: #bebdb8;
  box-sizing: border-box;
  outline: none;
`;

export const ReplyEnter = styled.button`
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
