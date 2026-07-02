# n8n-nodes-itoc360

This is an n8n community node. It lets you send alerts to [itoc360](https://itoc360.com) from your n8n workflows.

itoc360 is an alert routing and on-call management platform. It ingests alerts from monitoring, observability, CI/CD, and security tools, correlates them into incidents, and routes them to the right on-call responders through escalation policies and multi-channel notifications.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)
[Operations](#operations)
[Credentials](#credentials)
[Usage](#usage)
[Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

- **Send Alert** — Trigger a new alert in itoc360.
- **Resolve Alert** — Resolve an existing alert in itoc360.

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

To use this node you need an itoc360 account and an **n8n source**:

1. In itoc360, create a new source of type **n8n**.
2. Copy the source's **webhook URL** and **token**.
3. In n8n, create new **itoc360 API** credentials and paste the webhook base URL and token.

## Usage

Add the **itoc360** node to a workflow, select **Send Alert**, and fill in the title, host, and severity. When the workflow runs, the alert appears in itoc360 and is routed according to your escalation policy. Use **Resolve Alert** with the same title, host, and source to close it.

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
- [itoc360 documentation](https://docs.itoc360.com)

## License

[MIT](LICENSE.md)
