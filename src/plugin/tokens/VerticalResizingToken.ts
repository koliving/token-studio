import { Properties } from "@/constants/Properties";
import { LayoutResizing, LayoutResizingTokenBase } from "./LayoutResizingTokenBase";

export class VerticalResizingToken extends LayoutResizingTokenBase {
  public readonly key = Properties.verticalResizing;

  public apply(node: BaseNode, value: LayoutResizing) {
    return this.applyLayoutResizing(node, value, 'VERTICAL');
  }
}

const verticalResizingToken = new VerticalResizingToken();
export default verticalResizingToken;