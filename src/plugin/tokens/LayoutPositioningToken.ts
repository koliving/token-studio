import { Properties } from "@/constants/Properties";
import { notifyUI } from "../notifiers";
import { BaseToken } from "./BaseToken";

export type LayoutPositioning = 'AUTO' | 'ABSOLUTE';

export class LayoutPositioningToken extends BaseToken<LayoutPositioning> {
  public readonly key = Properties.layoutPositioning;
  private readonly applyKey = 'layoutPositioning';
  private readonly allowedValues = ['AUTO', 'ABSOLUTE'];
  private readonly defaultValue = 'AUTO';

  public fromTokenValue(value: any) {
    const val = value.toString().trim().toUpperCase();
    if (this.allowedValues.includes(val)) {
      return val;
    }
    notifyUI(`Invalid ${this.key} value: ${val}. Must be one of: ${this.allowedValues.join(', ')}. Defaulting to ${this.defaultValue}.`)
    return this.defaultValue;
  }

  public apply(node: BaseNode, value: LayoutPositioning) {
    if (this.applyKey in node) {
      node[this.applyKey] = value;
    }
  }

  public unset(node: BaseNode) {
    if (this.applyKey in node && typeof node[this.applyKey] !== 'undefined') {
      this.apply(node, this.defaultValue);
    }
  }
}

const layoutPositioningToken = new LayoutPositioningToken();
export default layoutPositioningToken;