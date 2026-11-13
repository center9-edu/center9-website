# Trial registration → Google Sheet + Slack

The form at `/dang-ky-hoc-thu` posts to the `submitTrialRegistration` server action
(`src/features/leads/actions.ts`). After validating the input on the server, the action responds
right away and then, in the background (`after()`), sends the lead as JSON to a Google Apps Script
web app, which appends a row to a Google Sheet.

## 1. Prepare the sheet

1. Create a Google Sheet (for example "Center9Edu – Đăng ký học thử").
2. Rename the first tab to `Đăng ký học thử` and add this header row (the form fields plus the
   submission time):

   | thoi_gian | ho_va_ten | do_tuoi_hoc_vien | so_dien_thoai | khoa_hoc_quan_tam | ghi_chu | dong_y_xu_ly_thong_tin |
   |---|---|---|---|---|---|---|

   The header names must match exactly (lowercase, no diacritics, words joined with `_`): the script puts each value under
   the column with the same name and leaves any other column empty, so Sales can add their own
   columns to the right.
3. Share the sheet only with staff who handle leads.

`khoa_hoc_quan_tam` holds a course code: `SCRATCH`, `COMPUTER_SCIENCE`, `WEB_DEVELOPMENT`,
`DATA_AI` or `UNDECIDED` (empty when not chosen). `thoi_gian` is Vietnam time (UTC+7).

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
  // Each value goes to the column whose header (row 1) has the same name, so the column order
  // does not matter. Columns the website does not send stay empty.
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const row = headers.map((header) => {
    const key = String(header).trim();
    if (key === "so_dien_thoai") return "'" + data.so_dien_thoai; // keep the leading 0
    return key in data && key !== "secret" ? data[key] : "";
  });
  sheet.appendRow(row);

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

After trying to save the lead to the sheet, the server action posts a summary to Slack through
an [incoming webhook](https://docs.slack.dev/messaging/sending-messages-using-incoming-webhooks/)
(`src/lib/slack.ts`). Set the webhook URL for the target channel (currently `#crm`):

```bash
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...
```

The message always carries the full lead. If saving to the sheet failed, its header says so, so
the lead can be entered by hand. If Slack is down or the variable is missing, only the failure
reason is logged. User input is escaped (`&`, `<`, `>`) so it
cannot inject Slack mentions or links.

## Notes

- Required: name (2–80 characters), student age (8–18), phone and privacy consent. Course and note
  (max 500 characters) are optional. The server action validates every field again and
  ignores submissions that fill the hidden honeypot field.
- Values starting with `=`, `+`, `-` or `@` are prefixed with `'` so the sheet never evaluates
  them as formulas.
- Submitted personal data is never written to server logs; only failure reasons are logged.
