import { Properties } from '@/constants/Properties';
import { LayoutAlign } from '../figmaTypes/layoutAlign';
import { LayoutGrow } from '../figmaTypes/layoutGrow';
import { LayoutMode } from '../figmaTypes/layoutMode';
import { getNodeParentLayoutMode } from '../figmaUtils/getNodeParentLayoutMode';
import { notifyUI } from '../notifiers';
import { BaseToken } from './BaseToken';

export type LayoutResizing = 'FIXED' | 'FILL' | 'HUG';

export abstract class LayoutResizingTokenBase extends BaseToken<LayoutResizing> {
  private readonly applyKey = 'layoutGrow';

  private readonly allowedValues = ['FIXED', 'FILL', 'HUG'];

  private readonly defaultValue = 'FIXED';

  public fromTokenValue(value: any) {
    const val = value.toString().trim().toUpperCase();
    if (this.allowedValues.includes(val)) {
      return val;
    }
    notifyUI(`Invalid ${this.key} value: ${val}. Must be one of: ${this.allowedValues.join(', ')}. Defaulting to ${this.defaultValue}.`);
    return this.defaultValue;
  }

  public applyLayoutResizing(node: BaseNode, value: LayoutResizing, direction: LayoutMode) {
    const parentLayoutMode = getNodeParentLayoutMode(node);
    let layoutGrow: LayoutGrow = ('layoutGrow' in node && node.layoutGrow as LayoutGrow) || 0;
    let layoutAlign: LayoutAlign = ('layoutAlign' in node && node.layoutAlign) || 'INHERIT';

    if (parentLayoutMode == direction) {
      switch (value) {
        case 'FIXED':
          layoutGrow = 0;
          break;
        case 'FILL':
          layoutGrow = 1;
          break;
        default:
          throw new Error(`Invalid ${this.key} value: ${value}`);
      }
    } else {
      switch (value) {
        case 'FIXED':
          layoutAlign = 'INHERIT';
          break;
        case 'FILL':
          layoutAlign = 'STRETCH';
          break;
        default:
          throw new Error(`Invalid ${this.key} value: ${value}`);
      }
    }

    if ('layoutGrow' in node) {
      node.layoutGrow = layoutGrow;
    }
    if ('layoutAlign' in node) {
      node.layoutAlign = layoutAlign;
    }
  }

  public unset(node: BaseNode) {
    if (this.applyKey in node && typeof node[this.applyKey] !== 'undefined') {
      this.apply(node, this.defaultValue);
    }
  }
}
