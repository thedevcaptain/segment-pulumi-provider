import * as pulumi from "@pulumi/pulumi";
import { SegmentSourceProvider } from "./provider";
import { SourceLibraryConfig } from "../../schema";

interface SourceInput {
  name: string;
  catalog_name: string;
}

export default class Source extends pulumi.dynamic.Resource {
  public readonly name!: pulumi.Output<string>;
  public readonly catalog_name!: pulumi.Output<string>;

  // from host
  public readonly write_keys!: pulumi.Output<string[]>;
  public readonly create_time!: pulumi.Output<string>;
  public readonly library_config!: pulumi.Output<SourceLibraryConfig>;

  constructor(
    name: string,
    props: SourceInput,
    opts?: pulumi.CustomResourceOptions
  ) {
    const config = new pulumi.Config("segment");
    super(
      new SegmentSourceProvider(),
      name,
      {
        name: props.name,
        catalog_name: props.catalog_name,
        workspace: config.require("workspace"),
      },
      opts
    );
  }
}
