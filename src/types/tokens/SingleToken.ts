import { SingleColorToken } from './SingleColorToken';
import { SingleBorderRadiusToken } from './SingleBorderRadiusToken';
import { SingleTextToken } from './SingleTextToken';
import { SingleSpacingToken } from './SingleSpacingToken';
import { SingleTypographyToken } from './SingleTypographyToken';
import { SingleOpacityToken } from './SingleOpacityToken';
import { SingleBorderWidthToken } from './SingleBorderWidthToken';
import { SingleBoxShadowToken } from './SingleBoxShadowToken';
import { SinglefontFamilyToken } from './SingleFontFamilyToken';
import { SinglefontWeightToken } from './SingleFontWeightToken';
import { SinglelineHeightToken } from './SingleLineHeightToken';
import { SingleLetterSpacingToken } from './SingleLetterSpacingToken';
import { SinglefontSizeToken } from './SingleFontSizeToken';
import { SingleParagraphSpacingToken } from './SingleParagraphSpacingToken';
import { SingleTextDecorationToken } from './SingleTextDecorationToken';
import { SingleTextCaseToken } from './SingleTextCaseToken';
import { SingleOtherToken } from './SingleOtherToken';
import { SingleCompositionToken } from './SingleCompositionToken';
import { SingleDimensionToken } from './SingleDimensionToken';
import { SingleBorderToken } from './SingleBorderToken';
import { SingleAssetToken } from './SingleAssetToken';

export type SingleToken<Named extends boolean = true, P = unknown> =
  SingleColorToken<Named, P>
  | SingleBorderRadiusToken<Named, P>
  | SingleTextToken<Named, P>
  | SingleTypographyToken<Named, P>
  | SingleOpacityToken<Named, P>
  | SingleBorderWidthToken<Named, P>
  | SingleBoxShadowToken<Named, P>
  | SinglefontFamilyToken<Named, P>
  | SinglefontWeightToken<Named, P>
  | SinglelineHeightToken<Named, P>
  | SingleLetterSpacingToken<Named, P>
  | SinglefontSizeToken<Named, P>
  | SingleParagraphSpacingToken<Named, P>
  | SingleTextDecorationToken<Named, P>
  | SingleTextCaseToken<Named, P>
  | SingleSpacingToken<Named, P>
  | SingleOtherToken<Named, P>
  | SingleBorderToken<Named, P>
  | SingleCompositionToken<Named, P>
  | SingleCompositionToken<Named, P>
  | SingleDimensionToken<Named, P>
  | SingleAssetToken<Named, P>;
