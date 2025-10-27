import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FileText, Calendar, AlertCircle, Shield, Users, Globe } from 'lucide-react';

const TermsOfService = () => {
  const lastUpdated = 'December 15, 2024';

  return (
    <div className="terms-of-service">
      {/* Header */}
      <section className="header-section">
        <div className="container">
          <Row className="text-center">
            <Col lg={8} className="mx-auto">
              <div className="header-content">
                <FileText className="header-icon" />
                <h1 className="header-title">Terms of Service</h1>
                <p className="header-subtitle">
                  Please read these terms carefully before using TelefoneHub
                </p>
                <div className="last-updated">
                  <Calendar className="calendar-icon" />
                  Last updated: {lastUpdated}
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </section>

      {/* Content */}
      <section className="content-section">
        <div className="container">
          <Row>
            <Col lg={8} className="mx-auto">
              <div className="terms-content">
                
                {/* Introduction */}
                <section className="terms-section">
                  <h2>1. Introduction</h2>
                  <p>
                    Welcome to TelefoneHub ("we," "our," or "us"). These Terms of Service ("Terms") 
                    govern your use of our communication platform, including our website, mobile 
                    applications, and services (collectively, the "Service").
                  </p>
                  <p>
                    By accessing or using our Service, you agree to be bound by these Terms. If you 
                    disagree with any part of these terms, you may not access the Service.
                  </p>
                </section>

                {/* Acceptance of Terms */}
                <section className="terms-section">
                  <h2>2. Acceptance of Terms</h2>
                  <p>
                    By creating an account, downloading our mobile application, or using our Service, 
                    you acknowledge that you have read, understood, and agree to be bound by these Terms 
                    and our Privacy Policy.
                  </p>
                  <div className="highlight-box">
                    <AlertCircle className="alert-icon" />
                    <p>
                      <strong>Important:</strong> If you are under 18 years of age, you must have your 
                      parent or guardian's permission to use our Service.
                    </p>
                  </div>
                </section>

                {/* Description of Service */}
                <section className="terms-section">
                  <h2>3. Description of Service</h2>
                  <p>
                    TelefoneHub provides a comprehensive communication platform that includes:
                  </p>
                  <ul>
                    <li>Voice calling services (local and international)</li>
                    <li>Video calling and conferencing</li>
                    <li>SMS and messaging services</li>
                    <li>AI-powered features and automation</li>
                    <li>Business communication tools</li>
                    <li>API services for developers</li>
                    <li>Emergency and security services</li>
                  </ul>
                  <p>
                    We reserve the right to modify, suspend, or discontinue any part of our Service 
                    at any time with or without notice.
                  </p>
                </section>

                {/* User Accounts */}
                <section className="terms-section">
                  <h2>4. User Accounts</h2>
                  <h3>4.1 Account Creation</h3>
                  <p>
                    To use our Service, you must create an account by providing accurate and complete 
                    information. You are responsible for maintaining the confidentiality of your account 
                    credentials and for all activities that occur under your account.
                  </p>
                  
                  <h3>4.2 Account Security</h3>
                  <p>
                    You agree to:
                  </p>
                  <ul>
                    <li>Keep your password secure and confidential</li>
                    <li>Notify us immediately of any unauthorized use of your account</li>
                    <li>Use only one account per person</li>
                    <li>Not share your account credentials with others</li>
                  </ul>

                  <h3>4.3 Account Termination</h3>
                  <p>
                    We may suspend or terminate your account if you violate these Terms or engage in 
                    fraudulent, abusive, or illegal activities. You may terminate your account at any 
                    time by contacting our support team.
                  </p>
                </section>

                {/* Acceptable Use */}
                <section className="terms-section">
                  <h2>5. Acceptable Use Policy</h2>
                  <h3>5.1 Permitted Uses</h3>
                  <p>You may use our Service for lawful purposes only, including:</p>
                  <ul>
                    <li>Personal and business communications</li>
                    <li>Educational and research purposes</li>
                    <li>Emergency and safety communications</li>
                    <li>Integration with your own applications (via API)</li>
                  </ul>

                  <h3>5.2 Prohibited Uses</h3>
                  <p>You agree not to use our Service for:</p>
                  <ul>
                    <li>Illegal activities or violations of any laws</li>
                    <li>Spam, harassment, or abusive communications</li>
                    <li>Transmission of malicious code or viruses</li>
                    <li>Attempting to gain unauthorized access to our systems</li>
                    <li>Reverse engineering or attempting to extract source code</li>
                    <li>Reselling our Service without permission</li>
                    <li>Any activity that could harm or disrupt our Service</li>
                  </ul>

                  <div className="warning-box">
                    <AlertCircle className="warning-icon" />
                    <p>
                      <strong>Violation of these terms may result in immediate account termination 
                      and legal action.</strong>
                    </p>
                  </div>
                </section>

                {/* Privacy and Data */}
                <section className="terms-section">
                  <h2>6. Privacy and Data Protection</h2>
                  <p>
                    Your privacy is important to us. Our collection and use of personal information 
                    is governed by our Privacy Policy, which is incorporated into these Terms by reference.
                  </p>
                  <h3>6.1 Data Collection</h3>
                  <p>
                    We collect information necessary to provide our Service, including:
                  </p>
                  <ul>
                    <li>Account information (name, email, phone number)</li>
                    <li>Communication data (call logs, messages, recordings)</li>
                    <li>Usage data (app interactions, feature usage)</li>
                    <li>Device information (for technical support)</li>
                  </ul>

                  <h3>6.2 Data Security</h3>
                  <p>
                    We implement industry-standard security measures to protect your data, including 
                    encryption in transit and at rest, secure data centers, and regular security audits.
                  </p>

                  <h3>6.3 Data Retention</h3>
                  <p>
                    We retain your data for as long as necessary to provide our Service and comply 
                    with legal obligations. You may request deletion of your data by contacting our 
                    support team.
                  </p>
                </section>

                {/* Billing and Payments */}
                <section className="terms-section">
                  <h2>7. Billing and Payments</h2>
                  <h3>7.1 Payment Terms</h3>
                  <p>
                    Our Service operates on a pay-per-use model. You are charged based on your 
                    actual usage of our communication services. All charges are calculated in real-time 
                    and billed according to our current pricing schedule.
                  </p>

                  <h3>7.2 Payment Methods</h3>
                  <p>
                    We accept various payment methods including credit cards, bank transfers, and 
                    digital wallets. You authorize us to charge your selected payment method for 
                    all charges incurred.
                  </p>

                  <h3>7.3 Billing Disputes</h3>
                  <p>
                    If you dispute any charges, you must notify us within 30 days of the billing date. 
                    We will investigate and resolve disputes in good faith.
                  </p>

                  <h3>7.4 Refunds</h3>
                  <p>
                    Refunds are provided at our discretion and may be subject to processing fees. 
                    Service credits may be issued for technical issues or service interruptions.
                  </p>
                </section>

                {/* Intellectual Property */}
                <section className="terms-section">
                  <h2>8. Intellectual Property Rights</h2>
                  <h3>8.1 Our Rights</h3>
                  <p>
                    TelefoneHub and its original content, features, and functionality are owned by 
                    us and are protected by international copyright, trademark, and other intellectual 
                    property laws.
                  </p>

                  <h3>8.2 Your Rights</h3>
                  <p>
                    You retain ownership of any content you create or upload to our Service. By using 
                    our Service, you grant us a limited license to use your content solely for the 
                    purpose of providing our Service.
                  </p>

                  <h3>8.3 API Usage</h3>
                  <p>
                    If you use our API, you must comply with our API Terms of Use and rate limits. 
                    You may not use our API to compete with our Service or for any prohibited purposes.
                  </p>
                </section>

                {/* Service Availability */}
                <section className="terms-section">
                  <h2>9. Service Availability</h2>
                  <p>
                    While we strive to provide reliable service, we cannot guarantee uninterrupted 
                    availability. We may experience downtime for maintenance, updates, or due to 
                    circumstances beyond our control.
                  </p>
                  <h3>9.1 Service Level Agreement</h3>
                  <p>
                    We aim to maintain 99.9% uptime for our core services. Service credits may be 
                    provided for extended outages as outlined in our SLA.
                  </p>
                  <h3>9.2 Emergency Services</h3>
                  <p>
                    Our Service may not support traditional emergency calling (911, 112, etc.) in 
                    all regions. Users should maintain access to traditional phone services for 
                    emergency situations.
                  </p>
                </section>

                {/* Limitation of Liability */}
                <section className="terms-section">
                  <h2>10. Limitation of Liability</h2>
                  <p>
                    TO THE MAXIMUM EXTENT PERMITTED BY LAW, TELEFONEHUB SHALL NOT BE LIABLE FOR ANY 
                    INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT 
                    NOT LIMITED TO LOSS OF PROFITS, DATA, OR USE, ARISING OUT OF OR RELATING TO YOUR 
                    USE OF OUR SERVICE.
                  </p>
                  <p>
                    Our total liability to you for any claims arising from these Terms or your use 
                    of our Service shall not exceed the amount you paid us in the 12 months preceding 
                    the claim.
                  </p>
                </section>

                {/* Indemnification */}
                <section className="terms-section">
                  <h2>11. Indemnification</h2>
                  <p>
                    You agree to indemnify and hold harmless TelefoneHub and its officers, directors, 
                    employees, and agents from any claims, damages, or expenses arising from your use 
                    of our Service or violation of these Terms.
                  </p>
                </section>

                {/* Termination */}
                <section className="terms-section">
                  <h2>12. Termination</h2>
                  <h3>12.1 Termination by You</h3>
                  <p>
                    You may terminate your account at any time by contacting our support team. 
                    Upon termination, your access to the Service will cease immediately.
                  </p>
                  <h3>12.2 Termination by Us</h3>
                  <p>
                    We may terminate or suspend your account immediately, without prior notice, 
                    if you breach these Terms or engage in prohibited activities.
                  </p>
                  <h3>12.3 Effect of Termination</h3>
                  <p>
                    Upon termination, your right to use the Service ceases immediately. We may 
                    delete your account data after a reasonable period, subject to legal requirements.
                  </p>
                </section>

                {/* Changes to Terms */}
                <section className="terms-section">
                  <h2>13. Changes to Terms</h2>
                  <p>
                    We reserve the right to modify these Terms at any time. We will notify users 
                    of material changes via email or through our Service. Your continued use of 
                    our Service after changes become effective constitutes acceptance of the new Terms.
                  </p>
                </section>

                {/* Governing Law */}
                <section className="terms-section">
                  <h2>14. Governing Law and Disputes</h2>
                  <h3>14.1 Governing Law</h3>
                  <p>
                    These Terms shall be governed by and construed in accordance with the laws of 
                    the State of California, without regard to conflict of law principles.
                  </p>
                  <h3>14.2 Dispute Resolution</h3>
                  <p>
                    Any disputes arising from these Terms or your use of our Service shall be resolved 
                    through binding arbitration in accordance with the rules of the American Arbitration 
                    Association.
                  </p>
                </section>

                {/* Contact Information */}
                <section className="terms-section">
                  <h2>15. Contact Information</h2>
                  <p>
                    If you have any questions about these Terms, please contact us:
                  </p>
                  <div className="contact-info">
                    <div className="contact-item">
                      <strong>Email:</strong> legal@telefonehub.com
                    </div>
                    <div className="contact-item">
                      <strong>Address:</strong> 123 Innovation Drive, San Francisco, CA 94105
                    </div>
                    <div className="contact-item">
                      <strong>Phone:</strong> +1 (555) 123-4567
                    </div>
                  </div>
                </section>

                {/* Severability */}
                <section className="terms-section">
                  <h2>16. Severability</h2>
                  <p>
                    If any provision of these Terms is found to be unenforceable or invalid, the 
                    remaining provisions shall remain in full force and effect.
                  </p>
                </section>

                {/* Entire Agreement */}
                <section className="terms-section">
                  <h2>17. Entire Agreement</h2>
                  <p>
                    These Terms, together with our Privacy Policy and any other legal notices 
                    published by us, constitute the entire agreement between you and TelefoneHub 
                    regarding the use of our Service.
                  </p>
                </section>

              </div>
            </Col>
          </Row>
        </div>
      </section>

      <style>{`
        .terms-of-service {
          font-family: 'Inter', sans-serif;
          line-height: 1.7;
        }

        .header-section {
          background: linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%);
          color: white;
          padding: 4rem 0;
        }

        .header-content {
          text-align: center;
        }

        .header-icon {
          width: 4rem;
          height: 4rem;
          margin-bottom: 1.5rem;
          opacity: 0.9;
        }

        .header-title {
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .header-subtitle {
          font-size: 1.25rem;
          margin-bottom: 2rem;
          opacity: 0.9;
        }

        .last-updated {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-size: 1rem;
          opacity: 0.8;
        }

        .calendar-icon {
          width: 1.25rem;
          height: 1.25rem;
        }

        .content-section {
          padding: 4rem 0;
          background: #F8FAFC;
        }

        .terms-content {
          background: white;
          padding: 3rem;
          border-radius: 1rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .terms-section {
          margin-bottom: 3rem;
        }

        .terms-section h2 {
          color: #1F2937;
          font-size: 1.875rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid #E5E7EB;
        }

        .terms-section h3 {
          color: #1F2937;
          font-size: 1.25rem;
          font-weight: 600;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }

        .terms-section p {
          color: #4B5563;
          margin-bottom: 1.5rem;
        }

        .terms-section ul {
          color: #4B5563;
          margin-bottom: 1.5rem;
          padding-left: 1.5rem;
        }

        .terms-section li {
          margin-bottom: 0.5rem;
        }

        .highlight-box {
          background: #FEF3C7;
          border: 1px solid #F59E0B;
          border-radius: 0.5rem;
          padding: 1.5rem;
          margin: 1.5rem 0;
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }

        .alert-icon {
          width: 1.5rem;
          height: 1.5rem;
          color: #F59E0B;
          margin-top: 0.125rem;
          flex-shrink: 0;
        }

        .highlight-box p {
          margin: 0;
          color: #92400E;
        }

        .warning-box {
          background: #FEE2E2;
          border: 1px solid #EF4444;
          border-radius: 0.5rem;
          padding: 1.5rem;
          margin: 1.5rem 0;
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }

        .warning-icon {
          width: 1.5rem;
          height: 1.5rem;
          color: #EF4444;
          margin-top: 0.125rem;
          flex-shrink: 0;
        }

        .warning-box p {
          margin: 0;
          color: #991B1B;
        }

        .contact-info {
          background: #F8FAFC;
          padding: 1.5rem;
          border-radius: 0.5rem;
          margin-top: 1rem;
        }

        .contact-item {
          margin-bottom: 0.75rem;
          color: #4B5563;
        }

        .contact-item:last-child {
          margin-bottom: 0;
        }

        .contact-item strong {
          color: #1F2937;
        }

        @media (max-width: 768px) {
          .header-title {
            font-size: 2rem;
          }
          
          .terms-content {
            padding: 2rem 1.5rem;
          }
          
          .terms-section h2 {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default TermsOfService;
