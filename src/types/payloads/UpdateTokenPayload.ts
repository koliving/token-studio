import { TokenTypes } from '@/constants/TokenTypes';
import { ColorModifier } from '../Modifier';
import {
  SingleColorToken,
  SingleBorderRadiusToken,
  SingleTextToken,
  SingleTypographyToken,
  SingleOpacityToken,
  SingleBorderWidthToken,
  SingleBoxShadowToken,
  SinglefontFamilyToken,
  SinglefontWeightToken,
  SinglelineHeightToken,
  SingleLetterSpacingToken,
  SinglefontSizeToken,
  SingleParagraphSpacingToken,
  SingleTextDecorationToken,
  SingleTextCaseToken,
  SingleSpacingToken,
  SingleOtherToken,
  SingleCompositionToken,
  SingleSizingToken,
  SingleDimensionToken,
  SingleBorderToken,
  SingleAssetToken,
} from '../tokens';

type GenericTokenInput<T extends TokenTypes, V = string> = {
  parent: string; // the currently active tokenSet
  name: string;
  type: T;
  value: V;
  description?: string;
  oldName?: string; // only passed when editing token
  shouldUpdate?: boolean
  shouldUpdateDocument?: boolean;
  $extensions?: { 'studio.tokens': { modify: ColorModifier } }
};

export type UpdateTokenPayload =
  GenericTokenInput<TokenTypes.COLOR, SingleColorToken['value']>
  | GenericTokenInput<TokenTypes.BORDER_RADIUS, SingleBorderRadiusToken['value']>
  | GenericTokenInput<TokenTypes.TEXT, SingleTextToken['value']>
  | GenericTokenInput<TokenTypes.TYPOGRAPHY, SingleTypographyToken['value']>
  | GenericTokenInput<TokenTypes.OPACITY, SingleOpacityToken['value']>
  | GenericTokenInput<TokenTypes.BORDER_WIDTH, SingleBorderWidthToken['value']>
  | GenericTokenInput<TokenTypes.BOX_SHADOW, SingleBoxShadowToken['value']>
  | GenericTokenInput<TokenTypes.FONT_FAMILY, SinglefontFamilyToken['value']>
  | GenericTokenInput<TokenTypes.FONT_WEIGHT, SinglefontWeightToken['value']>
  | GenericTokenInput<TokenTypes.LINE_HEIGHT, SinglelineHeightToken['value']>
  | GenericTokenInput<TokenTypes.LETTER_SPACING, SingleLetterSpacingToken['value']>
  | GenericTokenInput<TokenTypes.FONT_SIZE, SinglefontSizeToken['value']>
  | GenericTokenInput<TokenTypes.PARAGRAPH_SPACING, SingleParagraphSpacingToken['value']>
  | GenericTokenInput<TokenTypes.TEXT_DECORATION, SingleTextDecorationToken['value']>
  | GenericTokenInput<TokenTypes.TEXT_CASE, SingleTextCaseToken['value']>
  | GenericTokenInput<TokenTypes.SPACING, SingleSpacingToken['value']>
  | GenericTokenInput<TokenTypes.SIZING, SingleSizingToken['value']>
  | GenericTokenInput<TokenTypes.COMPOSITION, SingleCompositionToken['value']>
  | GenericTokenInput<TokenTypes.DIMENSION, SingleDimensionToken['value']>
  | GenericTokenInput<TokenTypes.BORDER, SingleBorderToken['value']>
  | GenericTokenInput<TokenTypes.ASSET, SingleAssetToken['value']>
  | GenericTokenInput<TokenTypes.OTHER, SingleOtherToken['value']>;
