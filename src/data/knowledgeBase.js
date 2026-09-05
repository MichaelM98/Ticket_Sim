const articles = [
  {
    title: "Troubleshooting Wi-Fi Connectivity",
    category: "Network",
    body: "Confirm the Wi-Fi icon shows connected, not just 'trying to connect.' Have the user forget and rejoin the network, then restart their adapter (Device Manager > Network adapters > Disable/Enable). If other devices on the same network are fine, the issue is local to that device - check for IP conflicts with ipconfig /all.",
  },
  {
    title: "VPN Connection Drops",
    category: "Network",
    body: "Frequent VPN disconnects are often caused by an unstable home Wi-Fi signal or the machine going to sleep. Check power settings (disable sleep while plugged in), and confirm the VPN client is up to date. If it drops at a consistent time interval, suspect a session timeout on the VPN server side.",
  },
  {
    title: "Application Crashing on Save",
    category: "Software",
    body: "Crashes on save are frequently caused by a corrupted template, a full disk, or a conflicting add-in. Have the user try 'Save As' to a different location first. If that works, the original file/folder may have permission issues. Check available disk space and disable add-ins one at a time to isolate the cause.",
  },
  {
    title: "Printer Not Printing",
    category: "Printer",
    body: "Check the print queue for stuck jobs - clear it and restart the Print Spooler service if jobs are stuck 'processing.' Confirm the printer is set as default and is online, not paused. For network printers, verify the printer's IP hasn't changed.",
  },
  {
    title: "Resetting a Forgotten Password",
    category: "Account",
    body: "If a password reset email never arrives, check the spam/junk folder first, then confirm the account's recovery email is correct. Account lockouts after failed attempts usually clear after 15-30 minutes, or can be manually unlocked in the admin console.",
  },
  {
    title: "Monitor or Display Not Powering On",
    category: "Hardware",
    body: "Confirm the power cable is seated at both ends and the outlet works (test with another device). Try a different video cable/port - a loose or damaged cable is the most common cause. If the monitor's power light doesn't come on at all, the issue is likely the power brick/cable, not the computer.",
  },
  {
    title: "Laptop Battery or Charging Issues",
    category: "Hardware",
    body: "If the battery percentage drops while plugged in, check the charging cable and port for damage first, then try a different outlet. Some laptops report 'plugged in, not charging' when the battery is intentionally capped for longevity - check the manufacturer's battery health settings.",
  },
  {
    title: "Identifying Phishing Emails",
    category: "Security",
    body: "Red flags: urgency ('verify now or your account will be locked'), mismatched sender domains, generic greetings, and links that don't match the claimed destination when hovered. Never click links in a suspicious email - report it and have the user delete it without replying.",
  },
];

export default articles;
