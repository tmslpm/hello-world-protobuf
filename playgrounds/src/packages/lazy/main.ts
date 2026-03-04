
; (async () => {
  console.log("protobufs lazy import")

  const DocSchema = await import("../../generated/protobufs/treelink_pb")
    .then(v => v.DocSchema);

  const fromBinary = await import("@bufbuild/protobuf")
    .then(v => v.fromBinary);

  console.log(fromBinary(DocSchema, new Uint8Array([])));
  document.getElementById("app")!.textContent = "js ok";
})();
