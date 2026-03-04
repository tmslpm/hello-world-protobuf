import { createValidator } from "@bufbuild/protovalidate";
import { GenMessage } from "@bufbuild/protobuf/codegenv2";
import { toBinary, fromBinary, create, Message } from "@bufbuild/protobuf";
import { ProtoType } from "../types/code.type.ts";

export const ProtoService = new class _ProtoService {

  #validator = createValidator()

  validate<T extends Message>(schema: GenMessage<T>, v: T) {
    const result = this.#validator.validate(schema, v);

    if (result.kind !== "valid") {
      //ProtoService.log.debug({ result }, "invalide proto");
      console.log("invalide proto", { result })
      return false;
    }

    return true;
  }

  encode<T extends Message>(schema: GenMessage<T>, v: T) {
    return toBinary(schema, v);
  }

  decode<T extends Message>(schema: GenMessage<T>, v: Uint8Array<ArrayBuffer>) {
    return fromBinary(schema, v);
  }

  create<T extends Message>(schema: GenMessage<T>, v: ProtoType<T>): T {
    return create(schema, v);
  }

  MakeProtoSerializer<T extends Message>(schema: GenMessage<T>) {
    return new ProtoSerializer(schema);
  }

}

export class ProtoSerializer<T extends Message> {
  readonly #schema: GenMessage<T>;

  constructor(schema: GenMessage<T>) {
    this.#schema = schema;
  }

  validate(v: T): boolean {
    return ProtoService.validate(this.#schema, v);
  }

  encode(v: T): Uint8Array<ArrayBuffer> {
    return ProtoService.encode(this.#schema, v);
  }

  decode(v: Uint8Array<ArrayBuffer>): T {
    return ProtoService.decode(this.#schema, v);
  }

  create(v: ProtoType<T>): T {
    return ProtoService.create(this.#schema, v);
  }

}
