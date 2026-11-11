# Trial registration → Google Sheet + Slack

The form at `/dang-ky-hoc-thu` posts to the `submitTrialRegistration` server action
(`src/features/leads/actions.ts`). After validating the input on the server, the action sends
the registration as JSON to a Google Apps Script web app, which appends a row to a Google Sheet.

## 1. Prepare the sheet

1. Create a Google Sheet (for example "Center9Edu – Đăng ký học thử").
2. Rename the first tab to `Đăng ký học thử` and add this header row:

   | Thời gian | Họ tên phụ huynh | Số điện thoại | Tên học viên | Tuổi học viên | Email | Ghi chú |
   |---|---|---|---|---|---|---|

## 2. Add the Apps Script

In the sheet, open **Extensions → Apps Script**, replace the code with the following and save:

```js
const SHEET_NAME = "Đăng ký học thử";

function doPost(e) {
  const secret = PropertiesService.getScriptProperties().getProperty("WEBHOOK_SECRET");
  const data = JSON.parse(e.postData.contents);

  if (!secret || data.secret !== secret) {
    return json({ ok: false, error: "unauthorized" });
  }

  // Falls back to the first tab if the named tab is missing or its name was typed differently.
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.getSheets()[0];
  sheet.appendRow([
    new Date(data.submittedAt),
    data.parentName,
    "'" + data.phone, // keep the leading 0 / +84
    data.studentName,
    data.studentAge,
    data.email,
    data.note,
  ]);

  return json({ ok: true });
}

function json(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
```

Then open **Project Settings → Script properties** and add `WEBHOOK_SECRET` with a long random
value (for example the output of `openssl rand -hex 32`).

## 3. Deploy

1. **Deploy → New deployment → Web app**.
2. Execute as: **Me**. Who has access: **Anyone**.
3. Copy the web app URL (`https://script.google.com/macros/s/.../exec`).

After changing the script later, use **Deploy → Manage deployments → Edit → New version** so the
URL stays the same.

## 4. Configure the website

Set these environment variables (`.env.local` locally, the hosting provider's settings in
production):

```bash
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/.../exec
GOOGLE_SHEETS_WEBHOOK_SECRET=<same value as WEBHOOK_SECRET>
```

Both variables are server-only (no `NEXT_PUBLIC_` prefix). If either is missing, the form shows an
error asking parents to call the hotline instead of silently dropping the registration.

## 5. Slack notification

After the registration is saved to the sheet, the server action posts a summary to Slack through
an [incoming webhook](https://docs.slack.dev/messaging/sending-messages-using-incoming-webhooks/)
(`src/lib/slack.ts`). Set the webhook URL for the target channel (currently `#crm`):

```bash
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...
```

The notification is best-effort: if Slack is down or the variable is missing, the registration
still succeeds and only the failure reason is logged. User input is escaped (`&`, `<`, `>`) so it
cannot inject Slack mentions or links.

## Notes

- All fields except the note are required. The server action validates every field again and
  ignores submissions that fill the hidden honeypot field.
- Values starting with `=`, `+`, `-` or `@` are prefixed with `'` so the sheet never evaluates
  them as formulas.
- Submitted personal data is never written to server logs; only failure reasons are logged.
