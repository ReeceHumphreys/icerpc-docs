// Copyright (c) ZeroC, Inc.

import contentMap from './contentMap.json';

import {
  SideBarSourceType,
  isCategory,
  isLink,
  GETTING_STARTED_BASE_URL,
  ICERPC_BASE_URL,
  ICERPC_FOR_ICE,
  PROTOBUF_BASE_URL,
  SLICE1_BASE_URL,
  SLICE2_BASE_URL,
  SideBarLink
} from '../types';

export const baseUrls = [
  GETTING_STARTED_BASE_URL,
  ICERPC_BASE_URL,
  ICERPC_FOR_ICE,
  PROTOBUF_BASE_URL,
  SLICE1_BASE_URL,
  SLICE2_BASE_URL
];

export const flattenSideBarData = (
  sideBarData: SideBarSourceType[]
): SideBarSourceType[] => {
  return sideBarData.flatMap((item) => {
    if (isCategory(item)) {
      return item.links;
    } else if (isLink(item)) {
      return item;
    } else {
      return [];
    }
  });
};

export const flattenContentMap = (
  key: string,
  contentMap: { [x: string]: SideBarSourceType[] }
): SideBarLink[] =>
  contentMap[key].flatMap((item) => {
    if (isCategory(item)) {
      // item.links can be a link or a divider return only if it is a link
      return item.links.filter((item): item is SideBarLink => isLink(item));
    } else if (isLink(item)) {
      return [item];
    } else {
      return [];
    }
  });

export const currentNavItem = (baseUrl: string) => {
  switch (baseUrl) {
    case GETTING_STARTED_BASE_URL:
      return 'Getting Started';
    case ICERPC_BASE_URL:
      return 'IceRPC';
    case ICERPC_FOR_ICE:
      return 'IceRPC for Ice Users';
    case PROTOBUF_BASE_URL:
      return 'Protobuf';
    case SLICE1_BASE_URL:
    case SLICE2_BASE_URL:
      return 'Slice';
    default:
      return '';
  }
};

export const sideBarData = (baseUrl: string): SideBarSourceType[] => {
  switch (baseUrl) {
    case GETTING_STARTED_BASE_URL:
      return contentMap['getting_started'];
    case ICERPC_BASE_URL:
      return contentMap['icerpc'];
    case ICERPC_FOR_ICE:
      return contentMap['icerpc_for_ice_users'];
    case PROTOBUF_BASE_URL:
      return contentMap['protobuf'];
    case SLICE1_BASE_URL:
      return contentMap['slice1'];
    case SLICE2_BASE_URL:
      return contentMap['slice2'];

    default:
      return [];
  }
};
