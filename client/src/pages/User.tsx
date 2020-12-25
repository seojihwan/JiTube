import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IStoreState } from '../store';
import { UserHome, UserVideos } from '../components';
import {
  UserWrapper,
  UserInfoWrapper,
  UserContentsTabWrapper,
  UserContentsTab,
  UserActiveContentsTab,
  UserTabWrapper,
  UserInfo,
  UserImage,
  UserName,
  UserActivetabWrapper,
} from './styles';
import { endpoint } from '../apis';
import { RouteComponentProps } from 'react-router-dom';
import {
  requestCelarGetUserPopularTopTenVideos,
  requestClearUserAllVideos,
  requestGetUserAllVideos,
} from '../actions';

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

export const User: React.FC<RouteComponentProps<
  RouterProps,
  any,
  locationStateProps
>> = ({
  match: { params },
  location: {
    state: { admin },
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

  const UserActivetab = ({ activeItem }: { activeItem: number }) => {
    switch (activeItem) {
      case 0:
        return <UserHome isAdmin={isAdmin} />;
      case 1:
        return <UserVideos isAdmin={isAdmin} />;
      default:
        return <UserHome isAdmin={isAdmin} />;
    }
  };

  return (
    <>
      <UserWrapper>
        <UserInfoWrapper>
          <UserInfo>
            <UserImage src={endpoint + admin.imageUrl} />
            <UserName>{admin.name}</UserName>
          </UserInfo>
          <UserTabWrapper>
            <UserContentsTabs />
            <UserActiveContentsTab
              width={contentsTab[activeItem].width}
              translateX={contentsTab[activeItem].prevWidth}
            />
          </UserTabWrapper>
        </UserInfoWrapper>
      </UserWrapper>
      <UserActivetabWrapper>
        <UserActivetab activeItem={activeItem} />
      </UserActivetabWrapper>
    </>
  );
};
