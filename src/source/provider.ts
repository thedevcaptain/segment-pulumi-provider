import * as pulumi from "@pulumi/pulumi";
import { getSegmentClient } from "../utils";
interface SegmentSourceProviderInputs {
  name: string;
  catalog_name: string;
  workspace: string;
}

export class SegmentSourceProvider implements pulumi.dynamic.ResourceProvider {
  async diff(
    id: string,
    old: SegmentSourceProviderInputs,
    news: SegmentSourceProviderInputs
  ): Promise<pulumi.dynamic.DiffResult> {
    return {
      changes: old.name !== news.name || old.catalog_name !== news.catalog_name,
      deleteBeforeReplace: true,
    };
  }
  async delete(id: string, props: SegmentSourceProviderInputs) {
    const client = getSegmentClient();
    try {
      await client.delete(`/${props.name}`);
    } catch (e: any) {
      if (e.isAxiosError) {
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
