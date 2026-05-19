import { Heading, Text } from "@react-email/components";
import { EmailLayout } from "./components/EmailLayout";

export default function ContactConfirmation({ name = "there" }: { name?: string }) {
  return (
    <EmailLayout preview="We received your message">
      <Heading style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "30px" }}>We received your message</Heading>
      <Text>Hi {name},</Text>
      <Text>Thanks for reaching out — we'll get back to you within 24 hours.</Text>
      <Text>— Team Woodrix</Text>
    </EmailLayout>
  );
}
