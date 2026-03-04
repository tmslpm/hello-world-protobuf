import { pino } from "pino";
import { DocSchema } from "../generated/protobufs/treelink_pb.ts";
import { toBinary, fromBinary, create } from "@bufbuild/protobuf";
import { createValidator } from "@bufbuild/protovalidate";

const log = pino({ name: "main" });

// Data 
const transfer = create(DocSchema, {
  version: 1,
  title: "Titre",
  content: "Description",
  author: "Auteur",
  links: [
    {
      url: "https://exemple.com",
      label: "Label Exemple",
      title: "Title 1"
    }
  ]
});

// Validate
const validator = createValidator();
const validatorresult = validator.validate(DocSchema, transfer);
if (validatorresult.kind !== "valid") {
  throw new Error("error validation")
}

// Encode
console.log("================================")
const binary = toBinary(DocSchema, transfer);
console.log({ result: binary });

// Decode
console.log("================================")
const result = fromBinary(DocSchema, binary);
console.log({ result: result });
