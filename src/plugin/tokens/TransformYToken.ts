import { Properties } from '@/constants/Properties';
import { notifyUI } from '../notifiers';
import { BaseToken } from './BaseToken';

export class TransformYToken extends BaseToken<number> {
  public readonly key = Properties.transformY;
  public readonly applyKey = 'y';
  private readonly defaultValue = 0;

  public fromTokenValue(value: any) {
    const val = parseInt(value.toString().toLowerCase().replaceAll('px', '').trim());
    if (Number.isNaN(val)) {
      notifyUI(`Invalid ${this.key} value: ${val}. Must be a number.`);
      return this.defaultValue;
    }
    return val;
  }

  public apply(node: BaseNode, value: number) {
    if (this.applyKey in node) {
      node[this.applyKey] = value;
    }
  }

  public unset(node: BaseNode) {
    this.apply(node, this.defaultValue)
  }
}

const transformYToken = new TransformYToken();
export default transformYToken;
