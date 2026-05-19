import { Heading, Text, Button } from "@react-email/components";
import { EmailLayout } from "./components/EmailLayout";

export default function PasswordReset({ resetUrl }: { resetUrl: string }) {
  return (
    <EmailLayout preview="Reset your Woodrix password">
      <Heading style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "30px" }}>Reset your password</Heading>
      <Text>Click below to set a new password. This link expires in 1 hour.</Text>
      <Button href={resetUrl} style={{ background: "#6B4226", color: "#FAF7F2", padding: "12px 24px", borderRadius: "4px", textDecoration: "none" }}>
        Reset Password
      </Button>
      <Text style={{ fontSize: "12px", color: "#7A6A5A", marginTop: "20px" }}>
        Didn't request this? You can safely ignore this email.
      </Text>
    </EmailLayout>
  );
}
