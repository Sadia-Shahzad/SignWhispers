import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from dotenv import load_dotenv

load_dotenv()

def send_reset_email(to_email: str, token: str):
    try:
        reset_link = f"{os.getenv('FRONTEND_URL')}/reset-password?token={token}"

        message = Mail(
            from_email=(os.getenv("FROM_EMAIL"), "SignWhisper"),
            to_emails=to_email,
            subject="Reset Your Password - SignWhisper",
            html_content=f"""
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">

    <div style="background-color: #f8f9fa; padding: 30px; border-radius: 10px;">
        
        <h2 style="color: #333;">🔐 Password Reset Request</h2>
        
        <p style="color: #555;">Hello,</p>
        <p style="color: #555;">
            You requested a password reset for your <strong>SignWhisper</strong> account.
            Click the button below to reset your password:
        </p>
        
        <div style="text-align: center; margin: 30px 0;">
            <a href="{reset_link}" 
               style="background-color: #4CAF50; 
                      color: white; 
                      padding: 14px 28px; 
                      text-decoration: none; 
                      border-radius: 6px; 
                      font-size: 16px;
                      font-weight: bold;">
                Reset Password
            </a>
        </div>

        <p style="color: #888; font-size: 13px; border-top: 1px solid #ddd; padding-top: 15px;">
            ⚠️ This link will expire in <strong>15 minutes</strong>.<br><br>
            If you did not request this, please ignore this email.
            Your account is safe.
        </p>

    </div>

</body>
</html>
            """
        )

        sg = SendGridAPIClient(os.getenv("SENDGRID_API_KEY"))
        response = sg.send(message)
        print("✅ Email sent! Status Code:", response.status_code)

    except Exception as e:
        print("❌ Email Error:", str(e))
        raise