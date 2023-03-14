import { Properties } from "@/constants/Properties";
import { CounterAxisAlignItems } from "../figmaTypes/counterAxisAlignItems";
import { LayoutMode } from "../figmaTypes/layoutMode";
import { PrimaryAxisAlignItems } from "../figmaTypes/primaryAxisAlignItems";
import { notifyUI } from "../notifiers";
import { BaseToken } from "./BaseToken";

export type LayoutModeValue = LayoutMode;

export class LayoutModeToken extends BaseToken<LayoutModeValue> {
  public readonly key = Properties.layoutMode;
  private readonly applyProperty = 'layoutMode';
  private readonly allowedValues: LayoutModeValue[] = ['NONE', 'HORIZONTAL', 'VERTICAL'];
  private readonly defaultValue: LayoutModeValue = 'NONE';

  public fromTokenValue(value: any) {
    const val = value.toString().trim().toUpperCase();
    if (this.allowedValues.includes(val)) {
      return val;
    }
    notifyUI(`Invalid ${this.key} value: ${val}. Must be one of: ${this.allowedValues.join(', ')}. Defaulting to ${this.defaultValue}.`)
    return this.defaultValue;
  }

  public apply(node: BaseNode, value: LayoutModeValue) {
    let old = this.defaultValue;
    if (this.applyProperty in node) {
      old = node[this.applyProperty];
      node[this.applyProperty] = value;
    }

    if (old != 'NONE' && old != value) {
      if ('primaryAxisAlignItems' in node && 'counterAxisAlignItems' in node) {
        let primaryAxisAlignItems: PrimaryAxisAlignItems = node.primaryAxisAlignItems;
        let counterAxisAlignItems: CounterAxisAlignItems = node.counterAxisAlignItems;
        if (primaryAxisAlignItems != 'SPACE_BETWEEN' && counterAxisAlignItems != 'BASELINE') {
          node.primaryAxisAlignItems = counterAxisAlignItems;
          node.counterAxisAlignItems = primaryAxisAlignItems;
        }
      }
    }
  }

  public unset(node: BaseNode) {
    if (this.applyProperty in node && typeof node[this.applyProperty] !== 'undefined') {
      this.apply(node, this.defaultValue)
    }
  }
}
const layoutModeToken = new LayoutModeToken();
export default layoutModeToken;