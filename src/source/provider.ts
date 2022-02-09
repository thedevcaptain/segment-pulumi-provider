import * as pulumi from "@pulumi/pulumi";
import { getSegmentClient } from "../utils";
import { Source } from "../../schema";
interface SegmentSourceProviderInputs {
  name: string;
  catalog_name: string;
  workspace: string;
}

export class SegmentSourceProvider implements pulumi.dynamic.ResourceProvider {
  async delete(id: string, props: SegmentSourceProviderInputs) {
    const client = getSegmentClient();
    console.log(`/${props.name}`);
    try {
      await client.delete(`/${props.name}`);
    } catch (e: any) {
      if (e.isAxiosError) {
        console.log(e.request.url);
        console.error(e.response.data);
        throw new Error(e.response.data);
      }
      throw e;
    }
  }

  async create(
    inputs: SegmentSourceProviderInputs
  ): Promise<pulumi.dynamic.CreateResult> {
    const client = getSegmentClient();
    let outs: Source;
    try {
      const response = await client.post<Source>(
        `/workspaces/${inputs.workspace}/sources`,
        {
          source: {
            name: `workspaces/${inputs.workspace}/sources/${inputs.name}`,
            catalog_name: `catalog/sources/${inputs.catalog_name}`,
          },
        }
      );
      outs = response.data;
    } catch (e: any) {
      if (e.isAxiosError) {
        console.error(e.response.data);
        throw new Error(e.response.data);
      }
      throw e;
    }
    return { id: outs?.id ?? inputs.name, outs };
  }
}
