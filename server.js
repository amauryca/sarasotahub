const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Resend } = require('resend');

const app = express();
const PORT = 3001;

// Initialize Resend with your API key
const resend = new Resend('re_8Fn58NsH_EcjjVMp32j3VDiPNEC4ZwL5f');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Submit resource endpoint
app.post('/api/submit', async (req, res) => {
  try {
    const formData = req.body;

    // Validate required fields
    if (!formData.name || !formData.category || !formData.address || !formData.description || !formData.submitterName || !formData.submitterEmail) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        message: 'Please ensure all required fields are filled in.'
      });
    }

    // Build email HTML
    const emailHtml = buildEmailHtml(formData);

    // Send email via Resend
    const response = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'sarasotahub@gmail.com',
      subject: `📋 New Resource: ${formData.name}`,
      html: emailHtml,
      reply_to: formData.submitterEmail
    });

    console.log('Email sent successfully:', response);
    res.json({ 
      success: true, 
      id: response.id,
      message: 'Resource submitted successfully!' 
    });

  } catch (error) {
    console.error('Error submitting resource:', error);
    res.status(500).json({ 
      error: 'Failed to submit resource',
      message: error.message || 'An error occurred while processing your submission.'
    });
  }
});

// Build email HTML function
function buildEmailHtml(formData) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
      <div style="background: linear-gradient(135deg, #e91e63, #f06292); color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center;">
        <h1 style="margin: 0; font-size: 28px;">📋 New Resource Submission</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.95; font-size: 16px;">Sarasota Community Hub</p>
      </div>
      
      <div style="padding: 25px; background: #f9f9f9; border-bottom: 1px solid #eee;">
        <h3 style="color: #e91e63; border-bottom: 3px solid #e91e63; padding-bottom: 12px; margin-top: 0; font-size: 18px;">📍 Resource Information</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Name:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${escapeHtml(formData.name)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Category:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${escapeHtml(formData.category)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Address:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${escapeHtml(formData.address)}</td>
          </tr>
          ${formData.phone ? `<tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${escapeHtml(formData.phone)}</td>
          </tr>` : ''}
          ${formData.email ? `<tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Email:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><a href="mailto:${escapeHtml(formData.email)}" style="color: #e91e63;">${escapeHtml(formData.email)}</a></td>
          </tr>` : ''}
          ${formData.website ? `<tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Website:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><a href="${escapeHtml(formData.website)}" style="color: #e91e63;" target="_blank">${escapeHtml(formData.website)}</a></td>
          </tr>` : ''}
          ${formData.hours ? `<tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Hours:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${escapeHtml(formData.hours)}</td>
          </tr>` : ''}
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee; vertical-align: top;"><strong>Description:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${escapeHtml(formData.description).replace(/\n/g, '<br>')}</td>
          </tr>
          ${formData.services ? `<tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee; vertical-align: top;"><strong>Services:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${escapeHtml(formData.services).replace(/\n/g, '<br>')}</td>
          </tr>` : ''}
          ${formData.tags ? `<tr>
            <td style="padding: 8px 0;"><strong>Tags:</strong></td>
            <td style="padding: 8px 0;">${escapeHtml(formData.tags)}</td>
          </tr>` : ''}
        </table>
      </div>
      
      <div style="padding: 25px; background: white;">
        <h3 style="color: #e91e63; border-bottom: 3px solid #e91e63; padding-bottom: 12px; margin-top: 0; font-size: 18px;">👤 Submitter Information</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Name:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${escapeHtml(formData.submitterName)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Email:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><a href="mailto:${escapeHtml(formData.submitterEmail)}" style="color: #e91e63;">${escapeHtml(formData.submitterEmail)}</a></td>
          </tr>
          ${formData.submitterPhone ? `<tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${escapeHtml(formData.submitterPhone)}</td>
          </tr>` : ''}
          ${formData.submitterRelation ? `<tr>
            <td style="padding: 8px 0;"><strong>Relationship:</strong></td>
            <td style="padding: 8px 0;">${escapeHtml(formData.submitterRelation)}</td>
          </tr>` : ''}
        </table>
      </div>
      
      <div style="padding: 15px; background: #fce4ec; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px; color: #666;">
        <p style="margin: 0;">This resource will be reviewed and added to the Sarasota Community Hub within 1-2 business days.</p>
      </div>
    </div>
  `;
}

// HTML escape function
function escapeHtml(text) {
  if (!text) return '';
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return String(text).replace(/[&<>"']/g, m => map[m]);
}

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Sarasota Hub Backend Server running on http://localhost:${PORT}`);
  console.log(`📝 Submit endpoint: POST http://localhost:${PORT}/api/submit`);
});
