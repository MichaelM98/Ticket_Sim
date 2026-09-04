// Each scenario is a "template" the ticket generator picks from at random.
// Priority and requester are assigned separately, so the same scenario can
// come up again later with a different person and urgency.
const scenarios = [
  { category: "Network", subject: "Can't connect to office Wi-Fi", description: "Laptop shows connected to Wi-Fi but says there's no internet access." },
  { category: "Network", subject: "VPN keeps disconnecting", description: "VPN connection drops every 10-15 minutes while working from home." },
  { category: "Network", subject: "Shared drive not showing up", description: "The department's shared network drive disappeared from File Explorer this morning." },
  { category: "Software", subject: "Excel keeps crashing on save", description: "Excel closes unexpectedly whenever trying to save a large spreadsheet." },
  { category: "Software", subject: "Outlook won't open", description: "Outlook shows a loading spinner for several minutes, then closes itself." },
  { category: "Software", subject: "Browser keeps freezing", description: "Chrome becomes completely unresponsive after having more than a few tabs open." },
  { category: "Hardware", subject: "New monitor won't turn on", description: "Just unboxed a new monitor, power light doesn't come on at all." },
  { category: "Hardware", subject: "Laptop won't charge", description: "Charging cable is plugged in but the battery percentage keeps dropping." },
  { category: "Hardware", subject: "Keyboard keys not registering", description: "Certain letters don't show up when typing, and it seems to be getting worse." },
  { category: "Account", subject: "Locked out of email account", description: "Password reset email never arrives, tried three times." },
  { category: "Account", subject: "Can't log into payroll portal", description: "Login page says 'invalid credentials' even right after resetting the password." },
  { category: "Printer", subject: "Printer won't print", description: "Print jobs show as 'queued' but nothing ever comes out of the printer." },
  { category: "Printer", subject: "Printer only prints blank pages", description: "Ink levels look fine, but every printed page comes out completely blank." },
  { category: "Security", subject: "Suspicious email in inbox", description: "Received an email asking to 'verify' a bank account - looks like phishing." },
];

export default scenarios;
