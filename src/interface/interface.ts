export interface User {
  ID: number;
  name_user: string;
  position: string;
  username: string;
  password: string;
  status: number;
}

export interface Supplier {
  ID: number;
  name_supplier: string;
  phone: number;
  address: string;
}

export interface Stock {
  ID: number | null;
  code_product: string;
  name_product: string;
  unit_product: string;
  total_product: number;
  type_product: string;
  price_product: number;
  id_supplier: number;
  supplier: Supplier;
  id_user: number;
  user: User;
}

export interface Order {
  ID: number;
  purchase_order: string;
  date_transaction: string;
  id_supplier: number;
  supplier: Supplier;
  type_transaction: string;
  status: number;
  id_user: number;
  user: User;
}

export interface DetailOrder {
  ID: number | null;
  code_product: string;
  id_order: number;
  order: Order;
  name_product: string;
  unit_product: string;
  type_product: string;
  price_product: number;
  total_product: number;
}

export interface Input {
  ID: number | null;
  no_input: string;
  date_input: string;
  code_product: string;
  name_product: string;
  type_product: string;
  total_product: number;
  price_product: number;
  id_user: number;
  user: User;
}

export interface DetailInput {
  ID: number | null;
  id_input: number;
  input: Input;
  code_product: string;
  name_raw: string;
  unit_product: string;
  total_used: number;
  type_product: string;
  price_unit: number;
}

export interface Output {
  ID: number | null;
  no_output: string;
  date_output: string;
  id_user: number;
  user: User;
}

export interface DetailOutput {
  ID: number | null;
  id_output: number;
  output: Output;
  code_product: string;
  name_finished: string;
  unit_product: string;
  total_used: number;
  type_product: string;
  price_unit: number;
}

export interface Opname {
  ID: number | null;
  code_stock_opname: string;
  date_calculate: string;
  id_user: number;
  user: User;
}

export interface DetailOpname {
  ID: number | null;
  id_opname: number;
  opname: Opname;
  code_product: string;
  name_finished: string;
  unit_product: string;
  type_product: string;
  price_unit: number;
  stock_real: number;
  stock_system: number;
  total_diff: number;
}
