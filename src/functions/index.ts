import * as pulumi from "@pulumi/pulumi";
import { SegmentFunctionProvider } from "./provider";

interface FunctionSetting {
  name: string;
  label: string;
  type: string;
  required: string;
  sensitive: string;
}

interface FunctionInput {
  name: string;
  code: string;
  workspace: string;
  type: 'SOURCE' | "DESTINATION";
  settings?: FunctionSetting[]
}

export default class Function extends pulumi.dynamic.Resource {
  constructor(
    name: string,
    props: FunctionInput,
    opts?: pulumi.CustomResourceOptions
  ) {
    const config = new pulumi.Config("segment");
    super(
      new SegmentFunctionProvider(),
      name,
      {
        name: props.name,
        type: props.type,
        code: props.code,
        workspace: config.require("workspace"),
        setting: props.settings ?? []
      },
      opts
    );
  }
}
