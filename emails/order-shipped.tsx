import { Heading, Text, Button } from "@react-email/components";
import { EmailLayout } from "./components/EmailLayout";

export default function OrderShipped({
  orderNumber, trackingNumber, courier, trackUrl,
}: { orderNumber: string; trackingNumber: string; courier: string; trackUrl: string }) {
  return (
    <EmailLayout preview="Your Woodrix order is on its way">
      <Heading style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "30px" }}>Your order is on its way 🚚</Heading>
      <Text>Order #{orderNumber} has shipped via {courier}.</Text>
      <Text>Tracking number: <strong>{trackingNumber}</strong></Text>
      <Button href={trackUrl} style={{ background: "#6B4226", color: "#FAF7F2", padding: "12px 24px", borderRadius: "4px", textDecoration: "none" }}>Track Order</Button>
    </EmailLayout>
  );
}
