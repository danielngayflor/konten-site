import nodemailer from 'nodemailer';

const TO = 'sales@konten.agency';

// ── Email HTML builders ────────────────────────────────────────────────────────

function row(label, value) {
  return `<tr>
    <td style="padding:10px 14px;color:#666;width:190px;border-bottom:1px solid #eee;vertical-align:top">${label}</td>
    <td style="padding:10px 14px;border-bottom:1px solid #eee">${value || '—'}</td>
  </tr>`;
}

function wrap(title, tableRows) {
  return `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
      <div style="background:#00249C;padding:24px 28px">
        <h2 style="color:#FDFBD4;margin:0;font-size:20px;font-weight:800;letter-spacing:-0.5px">${title}</h2>
      </div>
      <table style="width:100%;border-collapse:collapse;background:#fff">
        ${tableRows}
      </table>
      <p style="color:#999;font-size:12px;padding:16px 14px 0;margin:0">
        Sent automatically from konten.agency
      </p>
    </div>
  `;
}

function contactEmail(d) {
  return {
    subject: `New enquiry from ${d.name || 'a visitor'}`,
    html: wrap('New contact enquiry', [
      row('Name', `<strong>${d.name}</strong>`),
      row('Brand / Company', d.brandCompany),
      row('Email', `<a href="mailto:${d.email}" style="color:#00249C">${d.email}</a>`),
      row('Phone', d.phone),
      row('Service interest', d.serviceInterest),
      row('Message', d.message ? d.message.replace(/\n/g, '<br>') : '—'),
    ].join('')),
  };
}

function discoveryEmail(d) {
  return {
    subject: `Discovery request from ${d.fullName || 'a visitor'}`,
    html: wrap('New discovery session request', [
      row('Name', `<strong>${d.fullName}</strong>`),
      row('Organisation', d.organisation),
      row('Email', `<a href="mailto:${d.email}" style="color:#00249C">${d.email}</a>`),
      row('Phone', d.phone),
      row('Service of interest', d.serviceOfInterest),
      row('Project type', d.projectType),
      row('Preferred date', d.preferredDate ? `${d.preferredDate}${d.timeOfDay ? ` (${d.timeOfDay})` : ''}` : null),
      row('Project description', d.projectDescription ? d.projectDescription.replace(/\n/g, '<br>') : '—'),
    ].join('')),
  };
}

function downloadEmail(d) {
  return {
    subject: `Template download — ${d.email}`,
    html: wrap('Template download lead', [
      row('Email', `<a href="mailto:${d.email}" style="color:#00249C">${d.email}</a>`),
      row('Resource', d.resourceSlug),
    ].join('')),
  };
}

function newsletterEmail(d) {
  return {
    subject: `Newsletter signup — ${d.email}`,
    html: wrap('New newsletter signup', [
      row('Email', `<a href="mailto:${d.email}" style="color:#00249C">${d.email}</a>`),
    ].join('')),
  };
}

const TEMPLATES = {
  contact: contactEmail,
  discovery: discoveryEmail,
  download: downloadEmail,
  newsletter: newsletterEmail,
};

// ── Handler ────────────────────────────────────────────────────────────────────

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { type, data } = req.body ?? {};

  if (!type || !TEMPLATES[type]) {
    return res.status(400).json({ error: 'Invalid form type' });
  }
  if (!data?.email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const { subject, html } = TEMPLATES[type](data);

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT ?? '587'),
      secure: process.env.SMTP_PORT === '465',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Konten Site" <${process.env.SMTP_USER}>`,
      to: TO,
      replyTo: data.email,          // hitting Reply in your inbox goes straight to the sender
      subject,
      html,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('SMTP error:', err);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
