import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Shield, Calendar, Eye, Lock, Database, Globe, UserCheck, AlertTriangle } from 'lucide-react';

const PrivacyPolicy = () => {
  const lastUpdated = 'December 15, 2024';

  return (
    <div className="privacy-policy">
      {/* Header */}
      <section className="header-section">
        <div className="container">
          <Row className="text-center">
            <Col lg={8} className="mx-auto">
              <div className="header-content">
                <Shield className="header-icon" />
                <h1 className="header-title">Privacy Policy</h1>
                <p className="header-subtitle">
                  How we collect, use, and protect your personal information
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
              <div className="privacy-content">
                
                {/* Introduction */}
                <section className="privacy-section">
                  <h2>1. Introduction</h2>
                  <p>
                    TelefoneHub ("we," "our," or "us") is committed to protecting your privacy. 
                    This Privacy Policy explains how we collect, use, disclose, and safeguard 
                    your information when you use our communication platform and services.
                  </p>
                  <p>
                    By using our Service, you consent to the data practices described in this 
                    Privacy Policy. If you do not agree with the terms of this Privacy Policy, 
                    please do not access or use our Service.
                  </p>
                </section>

                {/* Information We Collect */}
                <section className="privacy-section">
                  <h2>2. Information We Collect</h2>
                  
                  <h3>2.1 Personal Information</h3>
                  <p>We collect information you provide directly to us, including:</p>
                  <ul>
                    <li><strong>Account Information:</strong> Name, email address, phone number, password</li>
                    <li><strong>Profile Information:</strong> Profile picture, display name, preferences</li>
                    <li><strong>Contact Information:</strong> Address, billing information, emergency contacts</li>
                    <li><strong>Communication Data:</strong> Call logs, messages, recordings (with consent)</li>
                    <li><strong>Payment Information:</strong> Credit card details, billing address (processed securely)</li>
                  </ul>

                  <h3>2.2 Usage Information</h3>
                  <p>We automatically collect information about your use of our Service:</p>
                  <ul>
                    <li><strong>Device Information:</strong> Device type, operating system, unique device identifiers</li>
                    <li><strong>Log Data:</strong> IP address, browser type, access times, pages viewed</li>
                    <li><strong>Usage Patterns:</strong> Features used, call duration, message frequency</li>
                    <li><strong>Location Data:</strong> General location (city, country) for service optimization</li>
                  </ul>

                  <h3>2.3 Communication Content</h3>
                  <p>
                    We may collect and process the content of your communications, including:
                  </p>
                  <ul>
                    <li>Voice call audio (for quality improvement and AI features)</li>
                    <li>Video call content (for technical support and quality assurance)</li>
                    <li>Text messages and chat content</li>
                    <li>File uploads and shared content</li>
                  </ul>
                  <div className="highlight-box">
                    <Eye className="highlight-icon" />
                    <p>
                      <strong>Note:</strong> We only access communication content with your explicit 
                      consent or when necessary for service provision and security.
                    </p>
                  </div>
                </section>

                {/* How We Use Information */}
                <section className="privacy-section">
                  <h2>3. How We Use Your Information</h2>
                  
                  <h3>3.1 Service Provision</h3>
                  <p>We use your information to:</p>
                  <ul>
                    <li>Provide and maintain our communication services</li>
                    <li>Process payments and manage billing</li>
                    <li>Authenticate users and prevent fraud</li>
                    <li>Provide customer support and technical assistance</li>
                    <li>Send service-related notifications and updates</li>
                  </ul>

                  <h3>3.2 Service Improvement</h3>
                  <p>We use your information to:</p>
                  <ul>
                    <li>Analyze usage patterns to improve our Service</li>
                    <li>Develop new features and functionality</li>
                    <li>Conduct research and analytics</li>
                    <li>Train AI models for better service delivery</li>
                    <li>Optimize network performance and call quality</li>
                  </ul>

                  <h3>3.3 Legal and Security</h3>
                  <p>We use your information to:</p>
                  <ul>
                    <li>Comply with legal obligations and regulations</li>
                    <li>Respond to law enforcement requests</li>
                    <li>Protect against fraud and security threats</li>
                    <li>Enforce our Terms of Service</li>
                    <li>Protect the rights and safety of our users</li>
                  </ul>
                </section>

                {/* Information Sharing */}
                <section className="privacy-section">
                  <h2>4. Information Sharing and Disclosure</h2>
                  
                  <h3>4.1 We Do Not Sell Your Information</h3>
                  <p>
                    We do not sell, trade, or rent your personal information to third parties 
                    for marketing purposes.
                  </p>

                  <h3>4.2 When We Share Information</h3>
                  <p>We may share your information in the following circumstances:</p>
                  
                  <div className="sharing-category">
                    <h4>Service Providers</h4>
                    <p>
                      We share information with trusted third-party service providers who assist 
                      us in operating our Service, including:
                    </p>
                    <ul>
                      <li>Cloud hosting and infrastructure providers</li>
                      <li>Payment processors and financial institutions</li>
                      <li>Telecommunications carriers and network providers</li>
                      <li>Customer support and analytics services</li>
                    </ul>
                  </div>

                  <div className="sharing-category">
                    <h4>Legal Requirements</h4>
                    <p>
                      We may disclose information when required by law or to:
                    </p>
                    <ul>
                      <li>Comply with legal processes or government requests</li>
                      <li>Protect our rights, property, or safety</li>
                      <li>Prevent fraud or security threats</li>
                      <li>Enforce our Terms of Service</li>
                    </ul>
                  </div>

                  <div className="sharing-category">
                    <h4>Business Transfers</h4>
                    <p>
                      In the event of a merger, acquisition, or sale of assets, your information 
                      may be transferred as part of the business transaction.
                    </p>
                  </div>

                  <div className="sharing-category">
                    <h4>Consent</h4>
                    <p>
                      We may share information with your explicit consent or at your direction.
                    </p>
                  </div>
                </section>

                {/* Data Security */}
                <section className="privacy-section">
                  <h2>5. Data Security</h2>
                  
                  <h3>5.1 Security Measures</h3>
                  <p>
                    We implement industry-standard security measures to protect your information:
                  </p>
                  <ul>
                    <li><strong>Encryption:</strong> All data is encrypted in transit and at rest</li>
                    <li><strong>Access Controls:</strong> Strict access controls and authentication</li>
                    <li><strong>Secure Infrastructure:</strong> Protected data centers and networks</li>
                    <li><strong>Regular Audits:</strong> Security assessments and penetration testing</li>
                    <li><strong>Employee Training:</strong> Security awareness and data handling training</li>
                  </ul>

                  <h3>5.2 End-to-End Encryption</h3>
                  <p>
                    For sensitive communications, we use end-to-end encryption to ensure that 
                    only you and your intended recipients can access the content.
                  </p>

                  <div className="security-box">
                    <Lock className="security-icon" />
                    <div>
                      <h4>Military-Grade Security</h4>
                      <p>
                        We use AES-256 encryption and RSA-4096 key exchange to provide 
                        military-grade security for your communications.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Data Retention */}
                <section className="privacy-section">
                  <h2>6. Data Retention</h2>
                  
                  <h3>6.1 Retention Periods</h3>
                  <p>We retain your information for different periods depending on the type of data:</p>
                  <ul>
                    <li><strong>Account Information:</strong> Until account deletion or 3 years of inactivity</li>
                    <li><strong>Communication Logs:</strong> 2 years for billing and legal compliance</li>
                    <li><strong>Call Recordings:</strong> As specified in your consent or 1 year maximum</li>
                    <li><strong>Usage Analytics:</strong> 2 years in anonymized form</li>
                    <li><strong>Support Tickets:</strong> 3 years for service improvement</li>
                  </ul>

                  <h3>6.2 Data Deletion</h3>
                  <p>
                    You can request deletion of your personal information at any time. We will 
                    delete your data within 30 days of your request, subject to legal requirements.
                  </p>
                </section>

                {/* Your Rights */}
                <section className="privacy-section">
                  <h2>7. Your Privacy Rights</h2>
                  
                  <h3>7.1 Access and Portability</h3>
                  <p>
                    You have the right to access your personal information and receive a copy 
                    in a portable format.
                  </p>

                  <h3>7.2 Correction and Updates</h3>
                  <p>
                    You can update or correct your personal information through your account 
                    settings or by contacting our support team.
                  </p>

                  <h3>7.3 Deletion</h3>
                  <p>
                    You can request deletion of your personal information, subject to legal 
                    and operational requirements.
                  </p>

                  <h3>7.4 Opt-Out</h3>
                  <p>
                    You can opt out of certain data processing activities, including:
                  </p>
                  <ul>
                    <li>Marketing communications</li>
                    <li>Non-essential analytics</li>
                    <li>AI model training</li>
                    <li>Location tracking</li>
                  </ul>

                  <h3>7.5 Data Portability</h3>
                  <p>
                    You can export your data in a machine-readable format for transfer to 
                    another service.
                  </p>
                </section>

                {/* International Transfers */}
                <section className="privacy-section">
                  <h2>8. International Data Transfers</h2>
                  <p>
                    Your information may be transferred to and processed in countries other than 
                    your own. We ensure appropriate safeguards are in place for international 
                    transfers, including:
                  </p>
                  <ul>
                    <li>Standard Contractual Clauses (SCCs)</li>
                    <li>Adequacy decisions by relevant authorities</li>
                    <li>Certification schemes and codes of conduct</li>
                    <li>Binding corporate rules</li>
                  </ul>
                </section>

                {/* Children's Privacy */}
                <section className="privacy-section">
                  <h2>9. Children's Privacy</h2>
                  <p>
                    Our Service is not intended for children under 13 years of age. We do not 
                    knowingly collect personal information from children under 13. If you are 
                    a parent or guardian and believe your child has provided us with personal 
                    information, please contact us immediately.
                  </p>
                  <div className="warning-box">
                    <AlertTriangle className="warning-icon" />
                    <p>
                      <strong>Important:</strong> If we discover that we have collected personal 
                      information from a child under 13, we will delete such information promptly.
                    </p>
                  </div>
                </section>

                {/* Cookies and Tracking */}
                <section className="privacy-section">
                  <h2>10. Cookies and Tracking Technologies</h2>
                  
                  <h3>10.1 Types of Cookies</h3>
                  <p>We use various types of cookies and similar technologies:</p>
                  <ul>
                    <li><strong>Essential Cookies:</strong> Required for basic service functionality</li>
                    <li><strong>Performance Cookies:</strong> Help us understand how you use our Service</li>
                    <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
                    <li><strong>Analytics Cookies:</strong> Provide insights into service usage</li>
                  </ul>

                  <h3>10.2 Cookie Management</h3>
                  <p>
                    You can control cookies through your browser settings. However, disabling 
                    certain cookies may affect the functionality of our Service.
                  </p>
                </section>

                {/* Third-Party Services */}
                <section className="privacy-section">
                  <h2>11. Third-Party Services</h2>
                  <p>
                    Our Service may contain links to third-party websites or integrate with 
                    third-party services. This Privacy Policy does not apply to third-party 
                    services. We encourage you to review the privacy policies of any third-party 
                    services you use.
                  </p>
                </section>

                {/* Changes to Privacy Policy */}
                <section className="privacy-section">
                  <h2>12. Changes to This Privacy Policy</h2>
                  <p>
                    We may update this Privacy Policy from time to time. We will notify you of 
                    any material changes by:
                  </p>
                  <ul>
                    <li>Posting the updated Privacy Policy on our website</li>
                    <li>Sending you an email notification</li>
                    <li>Displaying a notice in our Service</li>
                  </ul>
                  <p>
                    Your continued use of our Service after changes become effective constitutes 
                    acceptance of the updated Privacy Policy.
                  </p>
                </section>

                {/* Contact Information */}
                <section className="privacy-section">
                  <h2>13. Contact Us</h2>
                  <p>
                    If you have any questions about this Privacy Policy or our data practices, 
                    please contact us:
                  </p>
                  <div className="contact-info">
                    <div className="contact-item">
                      <strong>Privacy Officer:</strong> privacy@telefonehub.com
                    </div>
                    <div className="contact-item">
                      <strong>Data Protection Officer:</strong> dpo@telefonehub.com
                    </div>
                    <div className="contact-item">
                      <strong>Address:</strong> 123 Innovation Drive, San Francisco, CA 94105
                    </div>
                    <div className="contact-item">
                      <strong>Phone:</strong> +1 (555) 123-4567
                    </div>
                  </div>
                </section>

                {/* Regional Privacy Rights */}
                <section className="privacy-section">
                  <h2>14. Regional Privacy Rights</h2>
                  
                  <h3>14.1 European Union (GDPR)</h3>
                  <p>
                    If you are in the EU, you have additional rights under the General Data 
                    Protection Regulation (GDPR), including the right to:
                  </p>
                  <ul>
                    <li>Access your personal data</li>
                    <li>Rectify inaccurate data</li>
                    <li>Erase your data ("right to be forgotten")</li>
                    <li>Restrict processing</li>
                    <li>Data portability</li>
                    <li>Object to processing</li>
                    <li>Withdraw consent</li>
                  </ul>

                  <h3>14.2 California (CCPA)</h3>
                  <p>
                    If you are a California resident, you have rights under the California 
                    Consumer Privacy Act (CCPA), including the right to:
                  </p>
                  <ul>
                    <li>Know what personal information we collect</li>
                    <li>Know whether we sell or disclose personal information</li>
                    <li>Say no to the sale of personal information</li>
                    <li>Access your personal information</li>
                    <li>Request deletion of personal information</li>
                    <li>Equal service and price</li>
                  </ul>
                </section>

              </div>
            </Col>
          </Row>
        </div>
      </section>

      <style>{`
        .privacy-policy {
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

        .privacy-content {
          background: white;
          padding: 3rem;
          border-radius: 1rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .privacy-section {
          margin-bottom: 3rem;
        }

        .privacy-section h2 {
          color: #1F2937;
          font-size: 1.875rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid #E5E7EB;
        }

        .privacy-section h3 {
          color: #1F2937;
          font-size: 1.25rem;
          font-weight: 600;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }

        .privacy-section h4 {
          color: #1F2937;
          font-size: 1.125rem;
          font-weight: 600;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }

        .privacy-section p {
          color: #4B5563;
          margin-bottom: 1.5rem;
        }

        .privacy-section ul {
          color: #4B5563;
          margin-bottom: 1.5rem;
          padding-left: 1.5rem;
        }

        .privacy-section li {
          margin-bottom: 0.5rem;
        }

        .highlight-box {
          background: #F0F9FF;
          border: 1px solid #0EA5E9;
          border-radius: 0.5rem;
          padding: 1.5rem;
          margin: 1.5rem 0;
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }

        .highlight-icon {
          width: 1.5rem;
          height: 1.5rem;
          color: #0EA5E9;
          margin-top: 0.125rem;
          flex-shrink: 0;
        }

        .highlight-box p {
          margin: 0;
          color: #0C4A6E;
        }

        .security-box {
          background: #F0FDF4;
          border: 1px solid #22C55E;
          border-radius: 0.5rem;
          padding: 1.5rem;
          margin: 1.5rem 0;
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }

        .security-icon {
          width: 1.5rem;
          height: 1.5rem;
          color: #22C55E;
          margin-top: 0.125rem;
          flex-shrink: 0;
        }

        .security-box h4 {
          color: #15803D;
          margin: 0 0 0.5rem 0;
        }

        .security-box p {
          color: #15803D;
          margin: 0;
        }

        .warning-box {
          background: #FEF2F2;
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

        .sharing-category {
          background: #F8FAFC;
          padding: 1.5rem;
          border-radius: 0.5rem;
          margin: 1rem 0;
        }

        .sharing-category h4 {
          color: #1F2937;
          margin-top: 0;
          margin-bottom: 0.75rem;
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
          
          .privacy-content {
            padding: 2rem 1.5rem;
          }
          
          .privacy-section h2 {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default PrivacyPolicy;
