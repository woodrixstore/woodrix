import { Heading, Text, Button, Section } from "@react-email/components";
import { EmailLayout } from "./components/EmailLayout";

type Props = {
  customerName?: string;
  orderNumber: string;
  total: string;
  eta: string;
  trackUrl: string;
};

export default function OrderConfirmation({ customerName = "friend", orderNumber, total, eta, trackUrl }: Props) {
  return (
    <EmailLayout preview={`Order Confirmed — #${orderNumber}`}>
      <Heading style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "30px", color: "#1C1007" }}>
        Thank you, {customerName}.
      </Heading>
      <Text style={{ color: "#1C1007", fontSize: "15px" }}>
        Your order <strong>#{orderNumber}</strong> has been confirmed. It's now in our workshop, waiting to be carefully prepared for you.
      </Text>
      <Section style={{ background: "#F2EDE4", padding: "16px", borderRadius: "6px", margin: "20px 0" }}>
        <Text style={{ margin: 0, color: "#7A6A5A", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.15em" }}>Order Total</Text>
        <Text style={{ margin: "4px 0 0", fontSize: "22px", fontFamily: "Cormorant Garamond, serif" }}>{total}</Text>
        <Text style={{ margin: "12px 0 0", fontSize: "13px", color: "#7A6A5A" }}>Estimated delivery: <strong style={{ color: "#1C1007" }}>{eta}</strong></Text>
      </Section>
      <Button href={trackUrl} style={{ background: "#6B4226", color: "#FAF7F2", padding: "12px 24px", borderRadius: "4px", textDecoration: "none", display: "inline-block" }}>
        Track Your Order
      </Button>
    </EmailLayout>
  );
}
