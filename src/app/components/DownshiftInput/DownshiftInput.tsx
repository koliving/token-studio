import React, { useCallback, useMemo, useRef } from 'react';
import Downshift from 'downshift';
import { ResolveTokenValuesResult } from '@/plugin/tokenHelpers';
import Box from '../Box';
import Text from '../Text';
import { StyledIconDisclosure, StyledInputSuffix } from '../StyledInputSuffix';
import Stack from '../Stack';
import { SingleToken } from '@/types/tokens';
import { StyledPrefix } from '../Input';
import { TokenTypes } from '@/constants/TokenTypes';
import { styled } from '@/stitches.config';
import { StyledDownshiftInput } from './StyledDownshiftInput';
import Tooltip from '../Tooltip';
import { Properties } from '@/constants/Properties';
import { isDocumentationType } from '@/utils/is/isDocumentationType';
import { useReferenceTokenType } from '@/app/hooks/useReferenceTokenType';
import { ErrorValidation } from '../ErrorValidation';

const StyledDropdown = styled('div', {
  position: 'absolute',
  zIndex: '10',
  width: '100%',
  maxHeight: '140px',
  borderRadius: '$contextMenu',
  overflowY: 'scroll',
  backgroundColor: '$bgDefault',
  marginTop: '1px',
  cursor: 'pointer',
  boxShadow: '$contextMenu',
});

const StyledItemValue = styled('div', {
  color: '$textMuted',
  fontWeight: '$bold',
  textAlign: 'right',
  textTransform: 'uppercase',
  maxWidth: '300px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

const StyledItem = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$2',
  padding: '$2 $3',
  fontSize: '$xsmall',
  variants: {
    isFocused: {
      true: {
        backgroundColor: '$interaction',
        color: '$onInteraction',
        [`& ${StyledItemValue}`]: {
          color: '$onInteraction',
        },
      },
    },
  },
});

const StyledItemColorDiv = styled('div', {
  flexShrink: 0,
});

const StyledItemColor = styled('div', {
  width: '16px',
  height: '16px',
  borderRadius: '$colorSwatch',
  border: '1px solid',
  borderColor: '$borderMuted',
});

const StyledItemName = styled('div', {
  flexGrow: 1,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

const StyledPart = styled('span', {
  variants: {
    matches: {
      true: {
        fontWeight: '$bold',
      },
    },
  },
});

interface DownShiftProps {
  name?: string;
  type: string;
  label?: React.ReactElement | string;
  inlineLabel?: boolean;
  error?: string;
  value?: string;
  initialName?: string;
  placeholder?: string;
  prefix?: React.ReactNode;
  suffix?: boolean;
  resolvedTokens: ResolveTokenValuesResult[];
  setInputValue(value: string): void;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  handleBlur?: React.ChangeEventHandler<HTMLInputElement>;
}

export const DownshiftInput: React.FunctionComponent<DownShiftProps> = ({
  name,
  type,
  label,
  inlineLabel = false,
  error,
  value,
  initialName,
  prefix,
  suffix,
  placeholder,
  setInputValue,
  resolvedTokens,
  handleChange,
  handleBlur,
}) => {
  const [showAutoSuggest, setShowAutoSuggest] = React.useState<boolean>(false);
  const [isFirstLoading, setIsFirstLoading] = React.useState<boolean>(true);
  const container = useRef<HTMLDivElement>(null);
  const filteredValue = useMemo(() => ((showAutoSuggest || typeof value !== 'string') ? '' : value?.replace(/[{}$]/g, '')), [
    showAutoSuggest,
    value,
  ]); // removing non-alphanumberic except . from the input value
  const referenceTokenTypes = useReferenceTokenType(type as TokenTypes);
  const getHighlightedText = useCallback((text: string, highlight: string) => {
    // Split on highlight term and include term into parts, ignore case
    const parts = text.split(new RegExp(`(${highlight.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <StyledPart key={i} matches={part.toLowerCase() === highlight.toLowerCase()}>
            {part}
          </StyledPart>
        ))}
        {' '}
      </span>
    );
  }, []);

  const filteredTokenItems = useMemo(
    () => {
      if (isDocumentationType(type as Properties)) {
        return resolvedTokens
          .filter(
            (token: SingleToken) => !filteredValue || token.name.toLowerCase().includes(filteredValue.toLowerCase()),
          )
          .filter((token: SingleToken) => token.name !== initialName).sort((a, b) => (
            a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' })
          ));
      }
      return resolvedTokens
        .filter(
          (token: SingleToken) => !filteredValue || token.name.toLowerCase().includes(filteredValue.toLowerCase()),
        )
        .filter((token: SingleToken) => referenceTokenTypes.includes(token?.type) && token.name !== initialName).sort((a, b) => (
          a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' })
        ));
    },
    [resolvedTokens, filteredValue, type, isDocumentationType],
  ).sort((a, b) => a.isSuggestion ? -1 : 1);

  const resolveValue = useCallback((token: SingleToken) => {
    let returnValue: string = '';
    if (token.type === TokenTypes.TYPOGRAPHY || token.type === TokenTypes.BOX_SHADOW) {
      if (Array.isArray(token.value)) {
        returnValue = token.value.reduce<string>((totalAcc, item) => {
          const singleReturnValue = Object.entries(item).reduce<string>((acc, [, propertyValue]) => (
            `${acc}${propertyValue.toString()}/`
          ), '');
          return `${totalAcc}${singleReturnValue},`;
        }, '');
      } else {
        returnValue = Object.entries(token.value).reduce<string>((acc, [, propertyValue]) => (
          `${acc}${propertyValue.toString()}/`
        ), '');
      }
    } else if (token.type === TokenTypes.COMPOSITION) {
      returnValue = Object.entries(token.value).reduce<string>((acc, [property, value]) => (
        `${acc}${property}:${value}`
      ), '');
    } else if (typeof token.value === 'string' || typeof token.value === 'number') {
      returnValue = token.value;
    }

    return returnValue;
  }, []);

  const handleSelect = useCallback((selectedItem: any) => {
    setInputValue(value?.includes('$') ? `$${selectedItem.name}` : `${selectedItem.name}`);
    setShowAutoSuggest(false);
  }, [setInputValue, setShowAutoSuggest, value]);

  const handleAutoSuggest = React.useCallback(() => {
    setShowAutoSuggest(!showAutoSuggest);
  }, [showAutoSuggest]);

  const handleInputChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setIsFirstLoading(false);
    handleChange(e);
  }, [handleChange]);

  const handleInputBlur = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (handleBlur) {
      handleBlur(e);
    }
  }, [handleBlur]);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (container.current && event.target instanceof Node && !container.current.contains(event.target) && showAutoSuggest) {
      setShowAutoSuggest(false);
    }
  }, [showAutoSuggest]);

  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <Downshift onSelect={handleSelect}>
      {({
        selectedItem, highlightedIndex, getItemProps, getInputProps,
      }) => (
        <div style={{ position: 'relative' }}>
          <Stack direction="row" justify="between" align="center" css={{ marginBottom: '$1' }}>
            {label && !inlineLabel ? <Text size="small" bold>{label}</Text> : null}
            {error ? <ErrorValidation>{error}</ErrorValidation> : null}
          </Stack>
          <Box css={{ display: 'flex', position: 'relative', width: '100%' }} className="input" ref={container}>
            {!!inlineLabel && !prefix && <Tooltip label={name}><StyledPrefix isText>{label}</StyledPrefix></Tooltip>}
            {!!prefix && <StyledPrefix>{prefix}</StyledPrefix>}
            <StyledDownshiftInput
              suffix={suffix}
              type={type}
              name={name}
              placeholder={placeholder}
              value={value}
              onChange={handleInputChange}
              getInputProps={getInputProps}
              onBlur={handleInputBlur}
            />
            {suffix && (
              <StyledInputSuffix type="button" data-testid="downshift-input-suffix-button" onClick={handleAutoSuggest}>
                <StyledIconDisclosure />
              </StyledInputSuffix>
            )}
          </Box>

          {filteredTokenItems
            && filteredTokenItems.length > 0
            && selectedItem?.name !== filteredValue
            && (showAutoSuggest || !isFirstLoading) ? (
              <StyledDropdown className="content scroll-container">
                {filteredTokenItems.map((token: SingleToken, index: number) => {
                  const tokenName = token.isSuggestion ? token.name : `{${token.name}}`;
                  return (
                    <StyledItem
                      data-cy="downshift-input-item"
                      data-testid="downshift-input-item"
                      className="dropdown-item"
                      {...getItemProps({ key: tokenName, index, item: { ...token, name: tokenName } })}
                      css={{
                        backgroundColor: highlightedIndex === index ? '$interaction' : '$bgDefault',
                      }}
                      isFocused={highlightedIndex === index}
                    >
                      {type === 'color' && (
                      <StyledItemColorDiv>
                        <StyledItemColor style={{ backgroundColor: token.value.toString() }} />
                      </StyledItemColorDiv>
                      )}
                      <StyledItemName>{getHighlightedText(tokenName, filteredValue || '')}</StyledItemName>
                      <StyledItemValue>{resolveValue(token)}</StyledItemValue>
                    </StyledItem>
                  );
                })}
              </StyledDropdown>
            ) : null}
        </div>
      )}
    </Downshift>
  );
};
