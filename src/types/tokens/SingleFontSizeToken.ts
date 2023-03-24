import { TokenTypes } from '@/constants/TokenTypes';
import { SingleGenericToken } from './SingleGenericToken';

export type SinglefontSizeToken<Named extends boolean = true, P = unknown> = SingleGenericToken<TokenTypes.FONT_SIZE, string, Named, P>;
