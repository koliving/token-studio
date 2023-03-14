import { Properties } from '@/constants/Properties';
import { LayoutResizing, LayoutResizingTokenBase } from './LayoutResizingTokenBase';

export class HorizontalResizingToken extends LayoutResizingTokenBase {
  public readonly key = Properties.horizontalResizing;

  public apply(node: BaseNode, value: LayoutResizing) {
    return this.applyLayoutResizing(node, value, 'HORIZONTAL');
  }
}

const horizontalResizingToken = new HorizontalResizingToken();
export default horizontalResizingToken;
