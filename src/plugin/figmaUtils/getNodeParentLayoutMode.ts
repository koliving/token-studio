import { LayoutMode } from "../figmaTypes/layoutMode";

export function getNodeParentLayoutMode(node: BaseNode): LayoutMode {
  return node.parent && 'layoutMode' in node.parent && node.parent.layoutMode || 'NONE';
}