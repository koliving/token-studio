import { TokenTypes } from '@/constants/TokenTypes';
import { SingleGenericToken } from './SingleGenericToken';

export type SinglefontFamilyToken<Named extends boolean = true, P = unknown> = SingleGenericToken<TokenTypes.FONT_FAMILY, string, Named, P>;
