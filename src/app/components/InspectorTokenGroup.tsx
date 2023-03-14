import React, { useState } from 'react';
import { SingleToken } from '@/types/tokens';
import Box from './Box';
import Heading from './Heading';
import InspectorTokenSingle from './InspectorTokenSingle';
import { Properties } from '@/constants/Properties';
import { SelectionGroup } from '@/types';
import Checkbox from './Checkbox';
import Label from './Label';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Dispatch } from '../store';
import { inspectStateSelector } from '@/selectors';

export default function InspectorTokenGroup({
  group,
  resolvedTokens,
}: {
  group: [Properties, SelectionGroup[]];
  resolvedTokens: SingleToken[];
}) {
  const [groupKey, groupValue] = group;
  const dispatch = useDispatch<Dispatch>()
  const inspectState = useSelector(inspectStateSelector, shallowEqual);

  const groupTokens = groupValue.map(t => `${t.category}-${t.value}`)
  const isChecked = groupTokens.every(t => inspectState.selectedTokens.includes(t))

  const handleSelectAll = () => {
    if (isChecked) {
      dispatch.inspectState.setSelectedTokens([])
    } else {
      dispatch.inspectState.setSelectedTokens(groupTokens)
    }
  }

  return (
    <Box
      css={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginBottom: '$3',
      }}
      key={`${groupKey}`}
    >
      <Box
        css={{
          display: 'flex',
          alignItems: 'center',
          gap: '$3',
          fontSize: '$small',
        }}
      >
        <Checkbox
          checked={isChecked}
          onCheckedChange={handleSelectAll}
          id="selectAll"
          />
        <Heading size="small">{groupKey}</Heading>
      </Box>
      {groupValue.map((uniqueToken) => (
        <InspectorTokenSingle
          key={`${uniqueToken.category}-${uniqueToken.value}`}
          token={uniqueToken}
          resolvedTokens={resolvedTokens}
        />
      ))}
    </Box>
  );
}
