import { Properties } from "@/constants/Properties";
import { notifyUI } from "../notifiers";
import { BaseToken } from "./BaseToken";

export class MaxWidthToken extends BaseToken<number> {
  public readonly key = Properties.maxWidth;
  private readonly defaultValue = -1;

  public fromTokenValue(value: any) {
    const val = parseInt(value.toString().toLowerCase().replaceAll('px', '').trim());
    if (Number.isNaN(val)) {
      notifyUI(`Invalid ${this.key} value: ${val}. Must be a number.`)
      return this.defaultValue;
    }
    return val;
  }

  public apply(node: BaseNode, value: number) {
    if ('width' in node && 'height' in node && 'resize' in node) {
      if (node.width > value && value >= 0) {
        console.log('resizing', node.name, node.width, value, node.height)
        node.resize(value, node.height);
      }
    }
  }

  public unset(node: BaseNode) {
    // leaving original size
  }
}

const maxWidthToken = new MaxWidthToken();
export default maxWidthToken;