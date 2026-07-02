import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
	Icon,
} from 'n8n-workflow';

export class Itoc360Api implements ICredentialType {
	name = 'itoc360Api';

	displayName = 'ITOC360 API';

	documentationUrl = 'https://docs.itoc360.com';

	icon: Icon = { light: 'file:../nodes/Itoc360/itoc360.svg', dark: 'file:../nodes/Itoc360/itoc360.dark.svg' };

	properties: INodeProperties[] = [
		{
			displayName: 'Webhook URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://api.itoc360.app/functions/v1/events',
			required: true,
			description:
				'The ITOC360 events endpoint. Copy it from your ITOC360 source configuration (the URL you send alerts to).',
		},
		{
			displayName: 'Source Token',
			name: 'token',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description:
				'The token for your ITOC360 n8n source. Create an n8n source in ITOC360 and copy its token here.',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			qs: {
				token: '={{$credentials.token}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.baseUrl}}',
			method: 'POST',
			body: {
				event_type: 'alert',
				title: 'itoc360 credential test',
				host: 'n8n',
				severity: 'low',
			},
		},
	};
}