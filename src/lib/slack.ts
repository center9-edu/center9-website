import axios from "axios";

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

  // axios rejects on non-2xx responses and timeouts.
  await axios.post(webhookUrl, { text }, { timeout: 5_000 });
}
