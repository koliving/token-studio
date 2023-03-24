import { TokenTypes } from '@/constants/TokenTypes';
import { SingleGenericToken } from './SingleGenericToken';

export type SinglefontWeightToken<Named extends boolean = true, P = unknown> = SingleGenericToken<TokenTypes.FONT_WEIGHTS, string, Named, P>;
