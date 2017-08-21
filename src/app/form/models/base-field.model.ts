export class BaseFields <T> {
  controlType: string;
  key: string;
  label: string;
  order: number;
  placeholder: string;
  required: boolean;
  value: T;

  constructor(options: {
    controlType?: string,
    key?: string,
    label?: string,
    order?: number,
    placeholder?: string
    value?: T,
    required?: boolean,
  } = {}) {
    this.controlType = options.controlType || '';
    this.key = options.key || '';
    this.label = options.label || '';
    this.order = options.order === undefined ? 1 : options.order;
    this.placeholder = options.placeholder || '';
    this.required = !!options.required;
    this.value = options.value;
  }
}
