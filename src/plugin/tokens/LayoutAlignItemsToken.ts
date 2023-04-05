import { Properties } from '@/constants/Properties';
import { CounterAxisAlignItems } from '../figmaTypes/counterAxisAlignItems';
import { PrimaryAxisAlignItems } from '../figmaTypes/primaryAxisAlignItems';
import { notifyUI } from '../notifiers';
import { BaseToken } from './BaseToken';

export type LayoutAlignItemsValue = 'TOP_LEFT' | 'TOP_CENTER' | 'TOP_RIGHT' | 'CENTER_LEFT' | 'CENTER' | 'CENTER_RIGHT' | 'BOTTOM_LEFT' | 'BOTTOM_CENTER' | 'BOTTOM_RIGHT';

export class LayoutAlignItemsToken extends BaseToken<LayoutAlignItemsValue> {
  public readonly key = Properties.layoutAlignItems;

  private readonly allowedValues = ['TOP_LEFT', 'TOP_CENTER', 'TOP_RIGHT', 'CENTER_LEFT', 'CENTER', 'CENTER_RIGHT', 'BOTTOM_LEFT', 'BOTTOM_CENTER', 'BOTTOM_RIGHT'];

  private readonly defaultValue = 'TOP_LEFT';

  public fromTokenValue(value: any) {
    const val = value.toString().trim().replaceAll(' ', '_').toUpperCase();
    if (this.allowedValues.includes(val)) {
      return val;
    }
    notifyUI(`Invalid ${this.key} value: ${val}. Must be one of: ${this.allowedValues.join(', ')}. Defaulting to ${this.defaultValue}.`);
    return this.defaultValue;
  }

  public apply(node: BaseNode, value: LayoutAlignItemsValue) {
    let primaryAxisAlignItems: PrimaryAxisAlignItems = 'MIN';
    let counterAxisAlignItems: CounterAxisAlignItems = 'MIN';

    switch (value) {
      case 'TOP_LEFT':
        primaryAxisAlignItems = 'MIN';
        counterAxisAlignItems = 'MIN';
        break;
      case 'TOP_CENTER':
        primaryAxisAlignItems = 'CENTER';
        counterAxisAlignItems = 'MIN';
        break;
      case 'TOP_RIGHT':
        primaryAxisAlignItems = 'MAX';
        counterAxisAlignItems = 'MIN';
        break;
      case 'CENTER_LEFT':
        primaryAxisAlignItems = 'MIN';
        counterAxisAlignItems = 'CENTER';
        break;
      case 'CENTER':
        primaryAxisAlignItems = 'CENTER';
        counterAxisAlignItems = 'CENTER';
        break;
      case 'CENTER_RIGHT':
        primaryAxisAlignItems = 'MAX';
        counterAxisAlignItems = 'CENTER';
        break;
      case 'BOTTOM_LEFT':
        primaryAxisAlignItems = 'MIN';
        counterAxisAlignItems = 'MAX';
        break;
      case 'BOTTOM_CENTER':
        primaryAxisAlignItems = 'CENTER';
        counterAxisAlignItems = 'MAX';
        break;
      case 'BOTTOM_RIGHT':
        primaryAxisAlignItems = 'MAX';
        counterAxisAlignItems = 'MAX';
        break;
      default:
        throw new Error(`Invalid layout align value: ${value}`);
    }

    if ('layoutMode' in node && node.layoutMode === 'VERTICAL') {
      [primaryAxisAlignItems, counterAxisAlignItems] = [counterAxisAlignItems, primaryAxisAlignItems];
    }

    if ('primaryAxisAlignItems' in node) {
      node.primaryAxisAlignItems = primaryAxisAlignItems;
    }
    if ('counterAxisAlignItems' in node) {
      node.counterAxisAlignItems = counterAxisAlignItems;
    }
  }

  public unset(node: BaseNode) {
    this.apply(node, this.defaultValue);
  }
}
const layoutAlignItemsToken = new LayoutAlignItemsToken();
export default layoutAlignItemsToken;
