import { Html, Head, Body, Container, Section, Img, Text, Hr } from "@react-email/components";

export function EmailLayout({ preview, children }: { preview?: string; children: React.ReactNode }) {
  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: "#FAF7F2", fontFamily: "DM Sans, Helvetica, sans-serif", margin: 0, padding: "24px 0", color: "#1C1007" }}>
        {preview && <Text style={{ display: "none" }}>{preview}</Text>}
        <Container style={{ background: "#FFFFFF", maxWidth: "560px", margin: "0 auto", padding: "32px", borderRadius: "8px", border: "1px solid #E0D5C5" }}>
          <Section style={{ textAlign: "center", marginBottom: "24px" }}>
            <Text style={{ fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "30px", letterSpacing: "0.18em", color: "#1C1007", margin: 0 }}>
              WOODRIX
            </Text>
          </Section>
          <Hr style={{ borderColor: "#E0D5C5" }} />
          {children}
          <Hr style={{ borderColor: "#E0D5C5", marginTop: "32px" }} />
          <Text style={{ fontSize: "11px", color: "#7A6A5A", textAlign: "center", marginTop: "16px" }}>
            © 2025 Woodrix · Crafted for the way you live.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
