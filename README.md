# n8n-nodes-itoc360

This is an n8n community node. It lets you send alerts to [ITOC360](https://itoc360.com) from your n8n workflows.

ITOC360 is an alert routing and on-call management platform. It ingests alerts from monitoring, observability, CI/CD, and security tools, correlates them into incidents, and routes them to the right on-call responders through escalation policies and multi-channel notifications.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

- [Installation](#installation)
- [Operations](#operations)
- [Credentials](#credentials)
- [Compatibility](#compatibility)
- [Usage](#usage)
- [Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

- **Send Alert** — Trigger a new alert in ITOC360.
- **Resolve Alert** — Resolve an existing alert in ITOC360.

Alerts sent with the same **Title**, **Host**, and **Source** are grouped together, so a Resolve Alert with matching values will close the alert opened by a previous Send Alert.

### Fields

| Field | Required | Description |
| --- | --- | --- |
| Title | Yes | Short summary of the alert |
| Host | Yes | Source host or system identifier |
| Severity | Yes | `low`, `medium`, `high`, or `critical` |
| Message | No | Detailed alert message |
| Source | No | n8n workflow name or identifier |
| Timestamp | No | ISO 8601 timestamp |

## Credentials

To use this node you need an ITOC360 account with an n8n source:

1. In ITOC360, go to **Sources**, click **Create Source**, and select **n8n** from the list.
2. Copy the source's **webhook URL** and **token**.
3. In n8n, create new **ITOC360 API** credentials and paste the webhook URL and token.

## Compatibility

Tested with n8n 2.28.5 and Node.js 22+.
## Usage

Add the **ITOC360** node to a workflow, select **Send Alert**, and fill in the title, host, and severity. When the workflow runs, the alert appears in ITOC360 and is routed according to your escalation policy. Use **Resolve Alert** with the same title, host, and source to close it.

## Resources

- [ITOC360 n8n integration guide](https://docs.itoc360.com/integrations/inbound-integrations/workflow-and-automation/n8n-integration)
- [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
- [ITOC360 documentation](https://docs.itoc360.com)

## License

[MIT](LICENSE.md)