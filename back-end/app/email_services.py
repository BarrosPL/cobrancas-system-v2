import smtplib
from email.mime.text import MIMEText


def send_email(to_email: str, subject: str, body: str):
    sender_email = "seuemail@gmail.com"
    sender_password = "SENHA_DE_APP"

    msg = MIMEText(body)
    msg["Subject"] = subject
    msg["From"] = sender_email
    msg["To"] = to_email

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(sender_email, sender_password)
        server.sendmail(sender_email, to_email, msg.as_string())