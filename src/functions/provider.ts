import * as pulumi from "@pulumi/pulumi";
import {getSegmentClient} from "../utils";
import {Source} from "../../schema";

export interface FunctionSetting {
	name: string;
	label: string;
	type: string;
	required: string;
	sensitive: string;
}

interface SegmentFunctionProviderInputs {
	name: string;
	workspace: string;
  code: string;
	type: 'SOURCE' | "DESTINATION";
  settings?: FunctionSetting[]
}

export class SegmentFunctionProvider implements pulumi.dynamic.ResourceProvider {
	// async diff(
	//   id: string,
	//   old: SegmentFunctionProviderInputs,
	//   news: SegmentFunctionProviderInputs
	// ): Promise<pulumi.dynamic.DiffResult> {
	//   return {
	//     changes: old.name !== news.name || old.catalog_name !== news.catalog_name,
	//     deleteBeforeReplace: true,
	//   };
	// }
	// async delete(id: string, props: SegmentFunctionProviderInputs) {
	//   const client = getSegmentClient();
	//   try {
	//     await client.delete(`/${props.name}`);
	//   } catch (e: any) {
	//     if (e.isAxiosError) {
	//       console.error(e.response.data);
	//       throw new Error(e.response.data);
	//     }
	//     throw e;
	//   }
	// }


	async create(
		inputs: SegmentFunctionProviderInputs
	): Promise<pulumi.dynamic.CreateResult> {
		const client = getSegmentClient();
		let outs: Source;
		try {
			const response = await client.post<Source>(
				`/workspaces/${inputs.workspace}/functions`,
				{
					function: {
            code: inputs.code,
						display_name: inputs.name,
						type: inputs.type,
						settings: inputs.settings ?? []
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
		return {id: outs?.id ?? inputs.name, outs};
	}
}
