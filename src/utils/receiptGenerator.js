export function generateAndDownloadReceipt(receipt) {
  const invoiceWindow = window.open('', '_blank', 'width=800,height=900')
  if (!invoiceWindow) return

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Receipt - ${receipt.invoiceNumber}</title>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0d1117; color: #e6edf3; margin: 0; padding: 40px; }
        .receipt-card { max-width: 650px; margin: 0 auto; background: #161b22; border: 1px solid #30363d; border-radius: 20px; padding: 32px; box-shadow: 0 20px 40px rgba(0,0,0,0.5); }
        .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #30363d; pb: 20px; padding-bottom: 20px; }
        .brand { font-size: 24px; font-weight: 800; color: #10b981; display: flex; align-items: center; gap: 8px; }
        .invoice-title { font-size: 14px; font-weight: 700; color: #8b949e; text-transform: uppercase; letter-spacing: 1px; }
        .details-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 24px; font-size: 13px; }
        .label { color: #8b949e; font-weight: 600; }
        .value { color: #ffffff; font-weight: 700; margin-top: 4px; }
        .summary-table { width: 100%; border-collapse: collapse; margin-top: 30px; }
        .summary-table th { text-align: left; padding: 12px; border-bottom: 1px solid #30363d; color: #8b949e; font-size: 12px; }
        .summary-table td { padding: 16px 12px; border-bottom: 1px solid #21262d; font-size: 14px; font-weight: 600; }
        .total-row { background: rgba(16, 185, 129, 0.1); border-radius: 12px; }
        .total-row td { color: #10b981; font-size: 18px; font-weight: 800; }
        .status-badge { display: inline-block; background: rgba(16, 185, 129, 0.2); color: #10b981; font-size: 11px; font-weight: 800; padding: 4px 12px; border-radius: 20px; text-transform: uppercase; }
        .footer { margin-top: 32px; pt: 20px; border-top: 1px solid #30363d; text-align: center; font-size: 12px; color: #8b949e; }
        .btn-print { background: #10b981; color: #000; font-weight: 800; border: none; padding: 10px 24px; border-radius: 10px; cursor: pointer; margin-top: 20px; font-size: 14px; }
        @media print {
          .btn-print { display: none; }
          body { background: #fff; color: #000; padding: 0; }
          .receipt-card { border: none; shadow: none; color: #000; background: #fff; }
          .value, .total-row td { color: #000; }
        }
      </style>
    </head>
    <body>
      <div class="receipt-card">
        <div class="header">
          <div class="brand">
            <span style="background: #10b981; color: #000; width: 28px; height: 28px; display: inline-flex; align-items: center; justify-content: center; border-radius: 8px; font-size: 14px; font-weight: 900;">MS</span>
            MeetSphere
          </div>
          <div>
            <div class="invoice-title">Official Receipt</div>
            <div class="status-badge">${receipt.status || 'PAID'}</div>
          </div>
        </div>

        <div class="details-grid">
          <div>
            <div class="label">Invoice Number</div>
            <div class="value">${receipt.invoiceNumber}</div>
          </div>
          <div>
            <div class="label">Date & Time</div>
            <div class="value">${receipt.date}</div>
          </div>
          <div>
            <div class="label">Customer Name</div>
            <div class="value">${receipt.customerName || 'MeetSphere Host'}</div>
          </div>
          <div>
            <div class="label">Payment Method</div>
            <div class="value">${receipt.paymentMethod || 'UPI / Card'}</div>
          </div>
        </div>

        <table class="summary-table">
          <thead>
            <tr>
              <th>ROOM TIER DESCRIPTION</th>
              <th>CAPACITY</th>
              <th style="text-align: right;">AMOUNT</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div style="font-weight: 800; font-size: 15px; color: #ffffff;">${receipt.planName}</div>
                <div style="font-size: 12px; color: #8b949e;">High Performance Live Meeting Room Subscription</div>
              </td>
              <td>
                <div>👤 ${receipt.maxHosts} ${receipt.maxHosts === 1 ? 'Host' : 'Co-Hosts'}</div>
                <div>👥 Up to ${receipt.maxUsers?.toLocaleString()} Users</div>
              </td>
              <td style="text-align: right; font-weight: 800; font-size: 16px;">${receipt.amount}</td>
            </tr>
            <tr class="total-row">
              <td colspan="2" style="font-weight: 800;">TOTAL AMOUNT PAID</td>
              <td style="text-align: right;">${receipt.amount}</td>
            </tr>
          </tbody>
        </table>

        <div class="footer">
          <p>Thank you for choosing MeetSphere for your video conferencing!</p>
          <p style="font-size: 11px; margin-top: 4px;">256-bit SSL Encrypted Transaction · Support: support@meetsphere.com</p>
          <button class="btn-print" onclick="window.print()">🖨️ Print / Save PDF</button>
        </div>
      </div>
    </body>
    </html>
  `

  invoiceWindow.document.write(htmlContent)
  invoiceWindow.document.close()
}
