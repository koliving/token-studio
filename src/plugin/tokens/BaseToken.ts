import { MapValuesToTokensResult } from '@/types';

export abstract class BaseToken<TValue> {
  public readonly abstract key: string;

  public abstract fromTokenValue(value: any): TValue;
  public abstract apply(node: BaseNode, value: TValue): void;
  public abstract unset(node: BaseNode): void;

  public applyFromTokensResult(node: BaseNode, values: MapValuesToTokensResult) {
    if (values[this.key]) {
      this.apply(node, this.fromTokenValue(values[this.key]));
    }
  }
}
