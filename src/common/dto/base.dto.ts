export class BaseDTO {
  /**
   * 更新时间
   * @example Date
   */
  readonly updateAt: Date = new Date();
  /**
   * 创建时间
   * @example Date
   */
  readonly createAt?: Date = new Date();
}
