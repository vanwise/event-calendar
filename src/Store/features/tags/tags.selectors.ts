import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'Types/libs';
import { tagsAdapter, tagsApi, tagsInitialState } from './tags.slice';

const selectTagsResult = tagsApi.endpoints.getTags.select();

const selecTagsData = createSelector(selectTagsResult, tags => tags.data);

export const {
  selectIds: selectTagsIds,
  selectAll: selectAllTags,
  selectById: selectTagById,
} = tagsAdapter.getSelectors(
  (state: RootState) => selecTagsData(state) || tagsInitialState,
);
