import React from 'react';
import { Container, Row, Col, Card, Accordion } from 'react-bootstrap';
import { Shield, CheckCircle, AlertTriangle, Database, User, Lock, Eye, Download, Trash2, Edit } from 'lucide-react';

const GDPRCompliance = () => {
  return (
    <div className="gdpr-compliance">
      {/* Header */}
      <section className="header-section">
        <div className="container">
          <Row className="text-center">
            <Col lg={8} className="mx-auto">
              <div className="header-content">
                <Shield className="header-icon" />
                <h1 className="header-title">GDPR Compliance</h1>
                <p className="header-subtitle">
                  Your data protection rights under the General Data Protection Regulation
                </p>
              </div>
            </Col>
          </Row>
        </div>
      </section>

      {/* Content */}
      <section className="content-section">
        <div className="container">
          <Row>
            <Col lg={10} className="mx-auto">
              
              {/* Your Rights */}
              <section className="rights-section">
                <h2>Your Data Protection Rights</h2>
                <Row>
                  <Col lg={6} className="mb-4">
                    <Card className="right-card">
                      <Card.Body>
                        <Eye className="right-icon" />
                        <h4>Right of Access</h4>
                        <p>You have the right to obtain confirmation of whether we process your personal data and access to that data.</p>
                        <button className="btn btn-primary">Request Data Access</button>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col lg={6} className="mb-4">
                    <Card className="right-card">
                      <Card.Body>
                        <Edit className="right-icon" />
                        <h4>Right to Rectification</h4>
                        <p>You have the right to have inaccurate personal data corrected and incomplete data completed.</p>
                        <button className="btn btn-primary">Update My Data</button>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col lg={6} className="mb-4">
                    <Card className="right-card">
                      <Card.Body>
                        <Trash2 className="right-icon" />
                        <h4>Right to Erasure</h4>
                        <p>You have the right to have your personal data deleted in certain circumstances ("right to be forgotten").</p>
                        <button className="btn btn-primary">Request Deletion</button>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col lg={6} className="mb-4">
                    <Card className="right-card">
                      <Card.Body>
                        <Lock className="right-icon" />
                        <h4>Right to Restrict Processing</h4>
                        <p>You have the right to restrict the processing of your personal data in certain circumstances.</p>
                        <button className="btn btn-primary">Restrict Processing</button>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col lg={6} className="mb-4">
                    <Card className="right-card">
                      <Card.Body>
                        <Download className="right-icon" />
                        <h4>Right to Data Portability</h4>
                        <p>You have the right to receive your personal data in a structured, commonly used format.</p>
                        <button className="btn btn-primary">Export My Data</button>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col lg={6} className="mb-4">
                    <Card className="right-card">
                      <Card.Body>
                        <AlertTriangle className="right-icon" />
                        <h4>Right to Object</h4>
                        <p>You have the right to object to the processing of your personal data for certain purposes.</p>
                        <button className="btn btn-primary">Object to Processing</button>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </section>

              {/* Data Processing Information */}
              <section className="processing-section">
                <h2>How We Process Your Data</h2>
                <Accordion>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>
                      <div className="accordion-header">
                        <Database className="accordion-icon" />
                        <span>Data Controller Information</span>
                      </div>
                    </Accordion.Header>
                    <Accordion.Body>
                      <div className="controller-info">
                        <h4>TelefoneHub Ltd.</h4>
                        <p><strong>Address:</strong> 123 Innovation Drive, San Francisco, CA 94105</p>
                        <p><strong>Email:</strong> privacy@telefonehub.com</p>
                        <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                        <p><strong>Data Protection Officer:</strong> dpo@telefonehub.com</p>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="1">
                    <Accordion.Header>
                      <div className="accordion-header">
                        <User className="accordion-icon" />
                        <span>Personal Data We Collect</span>
                      </div>
                    </Accordion.Header>
                    <Accordion.Body>
                      <div className="data-categories">
                        <div className="data-category">
                          <h5>Identity Data</h5>
                          <ul>
                            <li>Name, email address, phone number</li>
                            <li>Profile information and preferences</li>
                            <li>Account credentials</li>
                          </ul>
                        </div>
                        <div className="data-category">
                          <h5>Communication Data</h5>
                          <ul>
                            <li>Call logs and recordings (with consent)</li>
                            <li>Messages and chat content</li>
                            <li>Video call content</li>
                          </ul>
                        </div>
                        <div className="data-category">
                          <h5>Technical Data</h5>
                          <ul>
                            <li>IP address and device information</li>
                            <li>Usage patterns and analytics</li>
                            <li>Location data (general)</li>
                          </ul>
                        </div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="2">
                    <Accordion.Header>
                      <div className="accordion-header">
                        <CheckCircle className="accordion-icon" />
                        <span>Legal Basis for Processing</span>
                      </div>
                    </Accordion.Header>
                    <Accordion.Body>
                      <div className="legal-basis">
                        <div className="basis-item">
                          <h5>Contract Performance</h5>
                          <p>We process your data to provide our communication services as agreed in our Terms of Service.</p>
                        </div>
                        <div className="basis-item">
                          <h5>Legitimate Interest</h5>
                          <p>We process data to improve our services, prevent fraud, and ensure security.</p>
                        </div>
                        <div className="basis-item">
                          <h5>Consent</h5>
                          <p>We process certain data (like call recordings) based on your explicit consent.</p>
                        </div>
                        <div className="basis-item">
                          <h5>Legal Obligation</h5>
                          <p>We process data to comply with legal requirements and regulations.</p>
                        </div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="3">
                    <Accordion.Header>
                      <div className="accordion-header">
                        <Lock className="accordion-icon" />
                        <span>Data Security Measures</span>
                      </div>
                    </Accordion.Header>
                    <Accordion.Body>
                      <div className="security-measures">
                        <div className="measure">
                          <CheckCircle className="check-icon" />
                          <div>
                            <h5>Encryption</h5>
                            <p>AES-256 encryption for data at rest and in transit</p>
                          </div>
                        </div>
                        <div className="measure">
                          <CheckCircle className="check-icon" />
                          <div>
                            <h5>Access Controls</h5>
                            <p>Strict access controls and multi-factor authentication</p>
                          </div>
                        </div>
                        <div className="measure">
                          <CheckCircle className="check-icon" />
                          <div>
                            <h5>Regular Audits</h5>
                            <p>Regular security assessments and penetration testing</p>
                          </div>
                        </div>
                        <div className="measure">
                          <CheckCircle className="check-icon" />
                          <div>
                            <h5>Staff Training</h5>
                            <p>Data protection training for all employees</p>
                          </div>
                        </div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </section>

              {/* Data Retention */}
              <section className="retention-section">
                <h2>Data Retention Periods</h2>
                <div className="retention-table">
                  <div className="retention-item">
                    <div className="data-type">Account Information</div>
                    <div className="retention-period">Until account deletion or 3 years of inactivity</div>
                  </div>
                  <div className="retention-item">
                    <div className="data-type">Communication Logs</div>
                    <div className="retention-period">2 years for billing and legal compliance</div>
                  </div>
                  <div className="retention-item">
                    <div className="data-type">Call Recordings</div>
                    <div className="retention-period">As specified in consent or 1 year maximum</div>
                  </div>
                  <div className="retention-item">
                    <div className="data-type">Usage Analytics</div>
                    <div className="retention-period">2 years in anonymized form</div>
                  </div>
                  <div className="retention-item">
                    <div className="data-type">Support Tickets</div>
                    <div className="retention-period">3 years for service improvement</div>
                  </div>
                </div>
              </section>

              {/* Third-Party Sharing */}
              <section className="sharing-section">
                <h2>Third-Party Data Sharing</h2>
                <div className="sharing-info">
                  <div className="sharing-category">
                    <h4>Service Providers</h4>
                    <p>We share data with trusted service providers who help us operate our platform:</p>
                    <ul>
                      <li>Cloud hosting providers (AWS, Google Cloud)</li>
                      <li>Payment processors (Stripe, PayPal)</li>
                      <li>Telecommunications carriers (Telnyx)</li>
                      <li>Customer support tools</li>
                    </ul>
                  </div>
                  <div className="sharing-category">
                    <h4>Legal Requirements</h4>
                    <p>We may share data when required by law or to:</p>
                    <ul>
                      <li>Comply with legal processes</li>
                      <li>Protect our rights and safety</li>
                      <li>Prevent fraud and security threats</li>
                      <li>Enforce our Terms of Service</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Contact Information */}
              <section className="contact-section">
                <h2>Exercise Your Rights</h2>
                <div className="contact-methods">
                  <Card className="contact-card">
                    <Card.Body>
                      <h4>Data Protection Officer</h4>
                      <p>Contact our Data Protection Officer for any GDPR-related inquiries:</p>
                      <div className="contact-details">
                        <p><strong>Email:</strong> dpo@telefonehub.com</p>
                        <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                        <p><strong>Response Time:</strong> Within 72 hours</p>
                      </div>
                    </Card.Body>
                  </Card>
                  <Card className="contact-card">
                    <Card.Body>
                      <h4>Supervisory Authority</h4>
                      <p>You have the right to lodge a complaint with your local supervisory authority:</p>
                      <div className="contact-details">
                        <p><strong>EU Residents:</strong> Contact your local data protection authority</p>
                        <p><strong>UK Residents:</strong> Information Commissioner's Office (ICO)</p>
                        <p><strong>Response Time:</strong> Varies by authority</p>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              </section>

            </Col>
          </Row>
        </div>
      </section>

      <style>{`
        .gdpr-compliance {
          font-family: 'Inter', sans-serif;
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

        .content-section {
          padding: 4rem 0;
          background: #F8FAFC;
        }

        .rights-section {
          margin-bottom: 4rem;
        }

        .rights-section h2 {
          color: #1F2937;
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 3rem;
          text-align: center;
        }

        .right-card {
          height: 100%;
          border: 1px solid #E5E7EB;
          transition: all 0.3s ease;
        }

        .right-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px -5px rgba(0, 0, 0, 0.1);
        }

        .right-icon {
          width: 2.5rem;
          height: 2.5rem;
          color: #1E40AF;
          margin-bottom: 1rem;
        }

        .right-card h4 {
          color: #1F2937;
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .right-card p {
          color: #4B5563;
          margin-bottom: 1.5rem;
        }

        .processing-section {
          margin-bottom: 4rem;
        }

        .processing-section h2 {
          color: #1F2937;
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 3rem;
          text-align: center;
        }

        .accordion-header {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .accordion-icon {
          width: 1.5rem;
          height: 1.5rem;
          color: #1E40AF;
        }

        .controller-info h4 {
          color: #1F2937;
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .controller-info p {
          color: #4B5563;
          margin-bottom: 0.5rem;
        }

        .data-categories {
          display: grid;
          gap: 2rem;
        }

        .data-category h5 {
          color: #1F2937;
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .data-category ul {
          color: #4B5563;
          margin: 0;
          padding-left: 1.5rem;
        }

        .data-category li {
          margin-bottom: 0.5rem;
        }

        .legal-basis {
          display: grid;
          gap: 1.5rem;
        }

        .basis-item h5 {
          color: #1F2937;
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .basis-item p {
          color: #4B5563;
          margin: 0;
        }

        .security-measures {
          display: grid;
          gap: 1.5rem;
        }

        .measure {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }

        .check-icon {
          width: 1.5rem;
          height: 1.5rem;
          color: #10B981;
          margin-top: 0.125rem;
          flex-shrink: 0;
        }

        .measure h5 {
          color: #1F2937;
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .measure p {
          color: #4B5563;
          margin: 0;
        }

        .retention-section {
          margin-bottom: 4rem;
        }

        .retention-section h2 {
          color: #1F2937;
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 3rem;
          text-align: center;
        }

        .retention-table {
          background: white;
          border-radius: 0.5rem;
          overflow: hidden;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
        }

        .retention-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          border-bottom: 1px solid #E5E7EB;
        }

        .retention-item:last-child {
          border-bottom: none;
        }

        .data-type {
          font-weight: 600;
          color: #1F2937;
        }

        .retention-period {
          color: #6B7280;
        }

        .sharing-section {
          margin-bottom: 4rem;
        }

        .sharing-section h2 {
          color: #1F2937;
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 3rem;
          text-align: center;
        }

        .sharing-info {
          display: grid;
          gap: 2rem;
        }

        .sharing-category h4 {
          color: #1F2937;
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .sharing-category p {
          color: #4B5563;
          margin-bottom: 1rem;
        }

        .sharing-category ul {
          color: #4B5563;
          margin: 0;
          padding-left: 1.5rem;
        }

        .sharing-category li {
          margin-bottom: 0.5rem;
        }

        .contact-section h2 {
          color: #1F2937;
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 3rem;
          text-align: center;
        }

        .contact-methods {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .contact-card {
          border: 1px solid #E5E7EB;
        }

        .contact-card h4 {
          color: #1F2937;
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .contact-card p {
          color: #4B5563;
          margin-bottom: 1rem;
        }

        .contact-details p {
          color: #4B5563;
          margin-bottom: 0.5rem;
        }

        .contact-details strong {
          color: #1F2937;
        }

        @media (max-width: 768px) {
          .header-title {
            font-size: 2rem;
          }
          
          .rights-section h2,
          .processing-section h2,
          .retention-section h2,
          .sharing-section h2,
          .contact-section h2 {
            font-size: 2rem;
          }
          
          .retention-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default GDPRCompliance;
