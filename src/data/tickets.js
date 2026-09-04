const tickets = [
    {
        id: 1,
        subject: "Can't connect to office Wi-FI",
        priority: "High",
        category: "Network",
        requester: "John Doe",
        department: "Accounting Dept.",
        description: "Laptop shows 'Wi-Fi' but says no internet access since this morning",
        status: "Open"
    },
    {
        id: 2,
        subject: "Excel keeps crashing on save",
        priority: "Medium",
        category: "Software",
        requester: "Marcus Lee",
        department: "Finance Dept.",
        description: "Excel closes unexpectedly whenever trying to save a large spreadsheet.",
        status: "Open"
    },
    {
        id: 3,
        subject: "New monitor won't turn on.",
        priority: "Low",
        category: "Hardware",
        requester: "Priya Nair",
        department: "Marketing Dept.",
        description: "Just unboxed a new monitor, power light doesn't come on at all.",
        status: "Open"
    },
    {
        id: 4,
        subject: "Locked out of email account",
        priority: "High",
        category: "Account",
        requester: "Sam Okafor",
        department: "Sales Dept.",
        description: "Password reset email never arrives, tried three times.",
        status: "Open"
    }
];
export default tickets;
