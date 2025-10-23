const resetPassTemplate = (name, resetLink) => {
  return `
    <div>
        <h1>Hello ${name}</h1>
        <p>Your reset password link is <a href="${resetLink}">here</a></p>
    </div>
    `;
};

module.exports = resetPassTemplate;