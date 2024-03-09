import User from "@/models/userModel";
import nodemailer, { Transporter } from "nodemailer";
import bcryptjs from "bcryptjs";

export enum EmailType {
  VERIFY = "VERIFY",
  RESET = "RESET",
}

export interface EmailData {
  email: string;
  emailType: EmailType;
  userId: string;
}

export const sendEmail = async ({ email, emailType, userId }: EmailData) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    if (emailType === EmailType.VERIFY) {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 360000,
      });
    } else if (emailType === EmailType.RESET) {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 360000,
      });
    }

    const transport: Transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const subject =
      emailType === EmailType.VERIFY
        ? "VERIFY YOUR EMAIL"
        : "RESET YOUR PASSWORD";

    const htmlBody = `


  <p>Click <a href="${
    process.env.DOMAIN
  }/verifyEmail?token=${hashedToken}">here</a> to ${
      emailType === EmailType.VERIFY
        ? "verify your email"
        : "reset your password"
    }</p>
  <p>Alternatively, you can copy and paste the link below in your browser:</p>
  <p>${process.env.DOMAIN}/verifyEmail?token=${hashedToken}</p>
`;
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: subject,
      html: htmlBody,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(
      "Failed to send email. Please check your internet connection and try again.",
      error
    );
  }
};
