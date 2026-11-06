// Server-side helper for Slack incoming webhooks. Never import this from client components:
// the webhook URL is a secret.

/** Escapes the characters Slack treats as control sequences in message text. */
export function escapeSlackText(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Posts a message to the channel bound to `SLACK_WEBHOOK_URL`. Throws on failure. */
export async function postSlackMessage(text: string) {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) {
    throw new Error("SLACK_WEBHOOK_URL is not configured");
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
    signal: AbortSignal.timeout(5_000),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Slack responded with status ${response.status}`);
  }
}
