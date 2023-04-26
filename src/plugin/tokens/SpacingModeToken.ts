import { Properties } from '@/constants/Properties';
import { CounterAxisAlignItems } from '../figmaTypes/counterAxisAlignItems';
import { LayoutMode } from '../figmaTypes/layoutMode';
import { PrimaryAxisAlignItems } from '../figmaTypes/primaryAxisAlignItems';
import { notifyUI } from '../notifiers';
import { BaseToken } from './BaseToken';
import { snake } from 'case';

export type SpacingModeValue = 'PACKED' | 'SPACE_BETWEEN';

export class SpacingModeToken extends BaseToken<SpacingModeValue> {
  private readonly applyProperty = 'primaryAxisAlignItems';
  public readonly key = Properties.spacingMode;

  private readonly allowedValues: SpacingModeValue[] = ['PACKED', 'SPACE_BETWEEN'];

  private readonly defaultValue: SpacingModeValue = 'PACKED';

  public fromTokenValue(value: any) {
    const val = snake(value.toString().trim()).toUpperCase();
    if (this.allowedValues.includes(val as SpacingModeValue)) {
      return val as SpacingModeValue;
    }
    notifyUI(`Invalid ${this.key} value: ${val}. Must be one of: ${this.allowedValues.join(', ')}. Defaulting to ${this.defaultValue}.`);
    return this.defaultValue;
  }

  public apply(node: BaseNode, value: SpacingModeValue) {
    if (value == 'PACKED') return

    if (this.applyProperty in node) {
      node[this.applyProperty] = value;
    }
  }

  public unset(node: BaseNode) {
    if (this.applyProperty in node && typeof node[this.applyProperty] !== 'undefined') {
      this.apply(node, this.defaultValue);
    }
  }
}

const spacingModeToken = new SpacingModeToken();
export default spacingModeToken;
