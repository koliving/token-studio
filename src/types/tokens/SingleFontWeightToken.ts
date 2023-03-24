import { TokenTypes } from '@/constants/TokenTypes';
import { SingleGenericToken } from './SingleGenericToken';

export type SinglefontWeightToken<Named extends boolean = true, P = unknown> = SingleGenericToken<TokenTypes.FONT_WEIGHT, string, Named, P>;
