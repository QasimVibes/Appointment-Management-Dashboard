import React from 'react';
import {
  Body,
  Container,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import { CSSProperties } from 'react';

interface ResetPasswordEmailProps {
  otpCode: string;
}

const ResetPasswordEmail: React.FC<ResetPasswordEmailProps> = ({ otpCode }) => {
  return (
    <Html>
      <Preview>Reset Your Password</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section>
            <Heading style={h1}>Reset Your Password</Heading>
            <Text style={text}>
              Please use the verification code below to reset your password
              for Appointment Management Dashboard.
            </Text>
            <Text style={otp}>{otpCode}</Text>
            <Text style={text}>
              If you didn’t request a password reset, you can ignore this
              email.
            </Text>
            <Text style={text}>
              Thanks,
              <br />
              The Appointment Management Dashboard Team
            </Text>
          </Section>
          <Hr />
          <Section style={footer}>
            <Text style={footerText}>
              Made with ♥ by Appointment Management Dashboard
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

const main: CSSProperties = {
  fontFamily: 'Helvetica, Arial, sans-serif',
  backgroundColor: '#ffffff',
  margin: 0,
  padding: 0,
};

const container: CSSProperties = {
  width: '100%',
  maxWidth: '600px',
  margin: '0 auto',
  padding: '20px',
  backgroundColor: '#ffffff',
};

const h1: CSSProperties = {
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '1rem 0',
};

const text: CSSProperties = {
  fontSize: '16px',
  lineHeight: '24px',
  margin: '16px 0',
};

const otp: CSSProperties = {
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '16px 0',
};

const footer: CSSProperties = {
  paddingTop: '20px',
  textAlign: 'center',
};

const footerText: CSSProperties = {
  fontSize: '14px',
  color: '#999999',
};

export default ResetPasswordEmail;
