import { Heading, Text, Button, Section } from "@react-email/components";
import { EmailLayout } from "./components/EmailLayout";

export default function Welcome({ name = "friend" }: { name?: string }) {
  return (
    <EmailLayout preview="Welcome to Woodrix">
      <Heading style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "32px", color: "#1C1007" }}>
        Welcome to Woodrix, {name}.
      </Heading>
      <Text style={{ color: "#1C1007", fontSize: "15px", lineHeight: "24px" }}>
        Every piece in our collection is shaped by hand from real, sustainably-sourced timber. To celebrate your arrival, here's <strong>10% off</strong> your first order.
      </Text>
      <Section style={{ textAlign: "center", margin: "24px 0" }}>
        <Text style={{ display: "inline-block", padding: "8px 16px", background: "#F2EDE4", border: "1px dashed #C4A882", fontFamily: "monospace", fontSize: "18px" }}>
          WELCOME10
        </Text>
      </Section>
      <Button href="https://woodrix.com/shop" style={{ background: "#6B4226", color: "#FAF7F2", padding: "12px 24px", borderRadius: "4px", textDecoration: "none", display: "inline-block" }}>
        Start Shopping
      </Button>
    </EmailLayout>
  );
}
