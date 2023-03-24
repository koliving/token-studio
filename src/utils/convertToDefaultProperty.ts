import { Properties } from '@/constants/Properties';

export function convertToDefaultProperty(property: string): string {
  let type: string = '';
  switch (property) {
    case Properties.width:
    case Properties.height:
    case Properties.sizing:
    case Properties.itemSpacing:
    case Properties.verticalPadding:
    case Properties.horizontalPadding:
    case Properties.paddingTop:
    case Properties.paddingLeft:
    case Properties.paddingBottom:
    case Properties.paddingRight:
      type = Properties.dimension;
      break;
    case Properties.borderRadiusTopLeft:
    case Properties.borderRadiusTopRight:
    case Properties.borderRadiusBottomLeft:
    case Properties.borderRadiusBottomRight:
      type = Properties.borderRadius;
      break;
    case Properties.borderColor:
      type = Properties.fill;
      break;
    case Properties.borderWidthTop:
    case Properties.borderWidthLeft:
    case Properties.borderWidthRight:
    case Properties.borderWidthBottom:
      type = Properties.borderWidth;
      break;
    case 'fontFamily':
      type = Properties.fontFamily;
      break;
    case 'fontSize':
      type = Properties.fontSize;
      break;
    case 'fontWeight':
      type = Properties.fontWeight;
      break;
    case 'lineHeight':
      type = Properties.lineHeight;
      break;
    case 'style':
      type = 'strokeStyle';
      break;
    default:
      type = property;
      break;
  }
  return type;
}
