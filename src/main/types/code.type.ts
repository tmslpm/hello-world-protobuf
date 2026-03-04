export type DeepOmit<T, K extends PropertyKey> =

  // if
  T extends Array<infer U> ? Array<DeepOmit<U, K>>

  // else if :
  : T extends object ? { [P in Exclude<keyof T, K>]: DeepOmit<T[P], K> }

  // else :
  : T;

export type ProtoType<T> = DeepOmit<T, "$typeName" | "$unknown">;
