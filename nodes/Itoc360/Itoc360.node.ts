import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IHttpRequestMethods,
	IHttpRequestOptions,
	IDataObject,
} from 'n8n-workflow';
import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';

export class Itoc360 implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'itoc360',
		name: 'itoc360',
		icon: { light: 'file:itoc360.svg', dark: 'file:itoc360.dark.svg' },
		group: ['output'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: 'Send alert and resolve events to itoc360',
		usableAsTool: true,
		defaults: {
			name: 'itoc360',
		},
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'itoc360Api',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Resolve Alert',
						value: 'resolve',
						description: 'Resolve an existing alert in itoc360',
						action: 'Resolve an alert',
					},
					{
						name: 'Send Alert',
						value: 'alert',
						description: 'Trigger a new alert in itoc360',
						action: 'Send an alert',
					},
				],
				default: 'alert',
			},
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				default: '',
				required: true,
				description: 'Short summary of the alert',
			},
			{
				displayName: 'Host',
				name: 'host',
				type: 'string',
				default: '',
				required: true,
				description: 'Source host or system identifier the alert relates to',
			},
			{
				displayName: 'Severity',
				name: 'severity',
				type: 'options',
				options: [
					{ name: 'Critical', value: 'critical' },
					{ name: 'High', value: 'high' },
					{ name: 'Low', value: 'low' },
					{ name: 'Medium', value: 'medium' },
				],
				default: 'medium',
				required: true,
				description: 'Severity level of the alert',
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				options: [
					{
						displayName: 'Message',
						name: 'message',
						type: 'string',
						typeOptions: { rows: 3 },
						default: '',
						description: 'Detailed alert message',
					},
					{
						displayName: 'Source',
						name: 'source',
						type: 'string',
						default: '',
						description:
							'N8n workflow name or identifier. Used together with title and host to group related alerts.',
					},
					{
						displayName: 'Timestamp',
						name: 'timestamp',
						type: 'dateTime',
						default: '',
						description:
							'ISO 8601 timestamp for the event. Defaults to the time the event is received if left empty.',
					},
				],
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		const credentials = await this.getCredentials('itoc360Api');
		const baseUrl = (credentials.baseUrl as string).replace(/\/+$/, '');

		for (let i = 0; i < items.length; i++) {
			try {
				const operation = this.getNodeParameter('operation', i) as string;
				const title = this.getNodeParameter('title', i) as string;
				const host = this.getNodeParameter('host', i) as string;
				const severity = this.getNodeParameter('severity', i) as string;
				const additionalFields = this.getNodeParameter('additionalFields', i, {}) as {
					message?: string;
					source?: string;
					timestamp?: string;
				};

				const body: IDataObject = {
					event_type: operation,
					title,
					host,
					severity,
				};

				if (additionalFields.message) body.message = additionalFields.message;
				if (additionalFields.source) body.source = additionalFields.source;
				if (additionalFields.timestamp) body.timestamp = additionalFields.timestamp;

				const options: IHttpRequestOptions = {
					method: 'POST' as IHttpRequestMethods,
					url: baseUrl,
					body,
					json: true,
				};

				const response = (await this.helpers.httpRequestWithAuthentication.call(
					this,
					'itoc360Api',
					options,
				)) as IDataObject;

				returnData.push({
					json: response,
					pairedItem: { item: i },
				});
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: { error: (error as Error).message },
						pairedItem: { item: i },
					});
					continue;
				}
				throw new NodeOperationError(this.getNode(), error as Error, { itemIndex: i });
			}
		}

		return [returnData];
	}
}