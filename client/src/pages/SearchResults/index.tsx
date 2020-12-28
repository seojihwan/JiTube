import React, { useMemo, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IStoreState } from '../../store';
import { requestGetAllVideos } from '../../actions';
import qs from 'qs';
import { SearchResultsThumbNails } from './SearchResultsThumbnails';

export const SearchResults: React.FC<RouteComponentProps> = props => {
  const videos = useSelector((state: IStoreState) => state.videos) || [];
  const dispatch = useDispatch();
  const keyword = qs.parse(props.location.search, { ignoreQueryPrefix: true });
  const filteredVideos = useMemo(
    () =>
      videos.filter(video =>
        Boolean(video.title.trim().match(String(keyword.search_query) || ''))
      ),
    [videos, keyword]
  );
  console.log(props);
  useEffect(() => {
    dispatch(requestGetAllVideos());
  }, []);

  return <SearchResultsThumbNails videos={filteredVideos} />;
};
