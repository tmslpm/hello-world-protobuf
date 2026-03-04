
import { DocSchema } from "../../generated/protobufs/treelink_pb"
import { fromBinary } from "@bufbuild/protobuf";

; (async () => {
  console.log("protobufs eager import")

  console.log(fromBinary(DocSchema, new Uint8Array([])));

  document.getElementById("app")!.textContent = "js ok";
})();
