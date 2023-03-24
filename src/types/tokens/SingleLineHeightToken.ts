import { TokenTypes } from '@/constants/TokenTypes';
import { SingleGenericToken } from './SingleGenericToken';

export type SinglelineHeightToken<Named extends boolean = true, P = unknown> = SingleGenericToken<TokenTypes.LINE_HEIGHT, string, Named, P>;
