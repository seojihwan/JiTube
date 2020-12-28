import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IStoreState } from '../../store';
import {
  UserWrapper,
  UserInfoWrapper,
  UserContentsTabWrapper,
  UserContentsTab,
  UserActiveContentsTab,
  UserTabWrapper,
} from './styles';
import { RouteComponentProps } from 'react-router-dom';
import {
  requestCelarGetUserPopularTopTenVideos,
  requestClearUserAllVideos,
  requestGetUserAllVideos,
} from '../../actions';
import { UserInfo } from './UserInfo';
import { UserTab } from './UserTab';

const contentsTab = [
  { width: 33.4, name: '홈', prevWidth: 0 },
  { width: 66.6, name: '동영상', prevWidth: 50 },
];

interface RouterProps {
  id: string;
}
interface locationStateProps {
  admin: { imageUrl: string; name: string };
}

export const User: React.FC<
  RouteComponentProps<RouterProps, any, locationStateProps>
> = ({
  match: { params },
  location: {
    state: {
      admin: { imageUrl, name },
    },
  },
}) => {
  const auth = useSelector((store: IStoreState) => store.authentication);
  const [activeItem, setActiveItem] = useState(0);
  const isAdmin = params.id === auth?.user_id;
  const handelItemClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const activeIdx = Number(e.currentTarget.getAttribute('data-idx'));
    setActiveItem(activeIdx);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth) {
      dispatch(requestGetUserAllVideos(params.id));
    }
    return () => {
      dispatch(requestClearUserAllVideos());
      dispatch(requestCelarGetUserPopularTopTenVideos());
    };
  }, []);
  const UserContentsTabs = () => {
    return (
      <UserContentsTabWrapper>
        {contentsTab.map((tab, idx) => (
          <UserContentsTab
            data-idx={idx}
            onClick={handelItemClick}
            width={tab.width}
            key={idx}
          >
            {tab.name}
          </UserContentsTab>
        ))}
      </UserContentsTabWrapper>
    );
  };

  return (
    <>
      <UserWrapper>
        <UserInfoWrapper>
          <UserInfo imageUrl={imageUrl} name={name} />
          <UserTabWrapper>
            <UserContentsTabs />
            <UserActiveContentsTab
              width={contentsTab[activeItem].width}
              translateX={contentsTab[activeItem].prevWidth}
            />
          </UserTabWrapper>
        </UserInfoWrapper>
      </UserWrapper>
      <UserTab activeItem={activeItem} isAdmin={isAdmin} />
    </>
  );
};
