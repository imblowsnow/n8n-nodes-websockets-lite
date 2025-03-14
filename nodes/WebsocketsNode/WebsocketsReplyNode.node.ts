import {
	INodeType,
	INodeTypeDescription,
	NodeConnectionType,
	NodeOperationError
} from 'n8n-workflow';
import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow/dist/Interfaces';
// @ts-ignore
import WebSocket from 'ws';

export class WebsocketsReplyNode implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Websockets Send Node',
		name: 'websocketsReplyNode',
		group: ['transform'],
		version: 1,
		description: 'Websockets Send',
		defaults: {
			name: 'Websockets Send Node',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		properties: [
			{
				displayName: 'Send Content',
				name: 'content',
				type: 'string',
				default: '',
				required: true,
			},
			{
				displayName: 'Websocket Resource Field (Parameter Name)',
				name: 'websocketResource',
				type: 'string',
				required: true,
				default: 'ws',
				description: 'WS resource field name given by trigger node',
			},
		],
	};

	// @ts-ignore
	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		// 处理响应
		const connectedNodes = this.getParentNodes("WebsocketsNode");
		if (!connectedNodes){
			throw new NodeOperationError(
				this.getNode(),
				new Error('No Websocket node found in the workflow'),
				{
					description:
						'Insert a Websocket node to your workflow and set the “Respond” parameter to “Using Respond to Websocket Node” ',
				},
			);
		}

		const items = this.getInputData();

		let websocketResource = this.getNodeParameter('websocketResource', 0) as string;
		let ws: WebSocket = items[0].json[websocketResource]
		if (!ws){
			throw new NodeOperationError(
				this.getNode(),
				`Execution error: No websocket resource received`,
			);
		}

		const content = this.getNodeParameter('content', 0) as string;

		ws.send(content)

		return [[]]
	}
}
