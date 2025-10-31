const resetPassTemplate = (name, link) => `
  <h2>Hi ${name},</h2>
  <p>You requested a password reset. Click below to set a new password:</p>
  <a href="${link}" style="background:#007BFF;color:#fff;padding:10px 15px;text-decoration:none;border-radius:5px;">
    Reset Password
  </a>
  <p>This link will expire in 10 minutes.</p>
`;

module.exports = resetPassTemplate;
