![Banner image](https://user-images.githubusercontent.com/10284570/173569848-c624317f-42b1-45a6-ab09-f0ea3c247648.png)

# n8n-nodes-websockets-lite

## nodes
- WebsocketsTriggerNode
- WebsocketsReplyNode

## function
- Support event open/close/message.
- Custom request header
- Customize initial data
- Timed heartbeat data
- Reply to the message.-Only once

## 功能
- 支持事件  open / close / message
- 自定义请求头
- 自定义初始数据
- 定时心跳数据
- 回复消息 - 只能一次



## Exmaple
```json
{
  "nodes": [
    {
      "parameters": {
        "websocketUrl": "wss://echo.websocket.events",
        "headers": {
          "parameters": []
        },
        "pingData": "={{ JSON.stringify({\"op\":1}) }}",
        "pingTimerSeconds": 45
      },
      "type": "n8n-nodes-websockets-lite.websocketsNode",
      "typeVersion": 1,
      "position": [
        -540,
        620
      ],
      "id": "61f21344-cb6b-426e-bf45-37d2dfc9895c",
      "name": "websocketsnode"
    },
    {
      "parameters": {
        "replyContent": "open"
      },
      "type": "n8n-nodes-websockets-lite.websocketsReplyNode",
      "typeVersion": 1,
      "position": [
        180,
        480
      ],
      "id": "5b73f177-a5de-462f-884b-6fc7e40e99c0",
      "name": "Websockets Send Node"
    },
    {
      "parameters": {
        "rules": {
          "values": [
            {
              "conditions": {
                "options": {
                  "caseSensitive": true,
                  "leftValue": "",
                  "typeValidation": "strict",
                  "version": 2
                },
                "conditions": [
                  {
                    "leftValue": "={{ $json.event }}",
                    "rightValue": "open",
                    "operator": {
                      "type": "string",
                      "operation": "equals"
                    },
                    "id": "3884e3d2-f40e-4e9f-9697-09e6733bf6db"
                  }
                ],
                "combinator": "and"
              },
              "renameOutput": true,
              "outputKey": "Open"
            },
            {
              "conditions": {
                "options": {
                  "caseSensitive": true,
                  "leftValue": "",
                  "typeValidation": "strict",
                  "version": 2
                },
                "conditions": [
                  {
                    "id": "d2c8e9c1-914b-4368-982e-c01f0f3645c2",
                    "leftValue": "={{ $json.event }}",
                    "rightValue": "message",
                    "operator": {
                      "type": "string",
                      "operation": "equals",
                      "name": "filter.operator.equals"
                    }
                  }
                ],
                "combinator": "and"
              },
              "renameOutput": true,
              "outputKey": "message"
            },
            {
              "conditions": {
                "options": {
                  "caseSensitive": true,
                  "leftValue": "",
                  "typeValidation": "strict",
                  "version": 2
                },
                "conditions": [
                  {
                    "id": "2a4402e1-723d-47d4-86ee-8ee0864d85af",
                    "leftValue": "={{ $json.event }}",
                    "rightValue": "close",
                    "operator": {
                      "type": "string",
                      "operation": "equals",
                      "name": "filter.operator.equals"
                    }
                  }
                ],
                "combinator": "and"
              },
              "renameOutput": true,
              "outputKey": "close"
            }
          ]
        },
        "options": {
          "fallbackOutput": "extra"
        }
      },
      "type": "n8n-nodes-base.switch",
      "typeVersion": 3.2,
      "position": [
        -280,
        600
      ],
      "id": "e43ed8cc-1d98-4b96-b5a1-0a45ac366a8f",
      "name": "Switch"
    },
    {
      "parameters": {
        "replyContent": "message"
      },
      "type": "n8n-nodes-websockets-lite.websocketsReplyNode",
      "typeVersion": 1,
      "position": [
        180,
        680
      ],
      "id": "6b181ba5-9280-4429-a6e8-4e08c434afdd",
      "name": "Websockets Send Node1"
    }
  ],
  "connections": {
    "websocketsnode": {
      "main": [
        [
          {
            "node": "Switch",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Switch": {
      "main": [
        [
          {
            "node": "Websockets Send Node",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Websockets Send Node1",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  },
  "pinData": {},
  "meta": {
    "instanceId": "0df765b3d0993112e88e19d04d39f740e9de5a025e7bc18393c83fe1ab44211e"
  }
}
```
