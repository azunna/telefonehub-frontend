import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Send, 
  CheckCircle,
  AlertCircle,
  Globe,
  Users,
  Headphones
} from 'lucide-react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    category: '',
    message: '',
    priority: 'medium'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const contactMethods = [
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Speak directly with our support team',
      contact: '+1 (555) 123-4567',
      availability: 'Mon-Fri 9AM-6PM PST',
      color: '#3B82F6'
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Send us a detailed message',
      contact: 'support@telefonehub.com',
      availability: '24/7 Response',
      color: '#10B981'
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Get instant help from our team',
      contact: 'Available on website',
      availability: '24/7',
      color: '#8B5CF6'
    },
    {
      icon: MapPin,
      title: 'Office Address',
      description: 'Visit our headquarters',
      contact: '123 Innovation Drive, San Francisco, CA 94105',
      availability: 'Mon-Fri 9AM-5PM',
      color: '#F59E0B'
    }
  ];

  const departments = [
    {
      name: 'Technical Support',
      email: 'tech@telefonehub.com',
      description: 'For technical issues, bugs, and troubleshooting',
      icon: Headphones
    },
    {
      name: 'Sales & Billing',
      email: 'sales@telefonehub.com',
      description: 'For pricing, billing questions, and new features',
      icon: Users
    },
    {
      name: 'Business Development',
      email: 'business@telefonehub.com',
      description: 'For partnerships, integrations, and enterprise solutions',
      icon: Globe
    },
    {
      name: 'General Inquiries',
      email: 'info@telefonehub.com',
      description: 'For general questions and information',
      icon: MessageCircle
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        category: '',
        message: '',
        priority: 'medium'
      });
      
      setSubmitStatus('success');
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-us">
      {/* Header */}
      <section className="header-section">
        <div className="container">
          <Row className="text-center">
            <Col lg={8} className="mx-auto">
              <h1 className="header-title">Contact Us</h1>
              <p className="header-subtitle">
                We're here to help! Get in touch with our team for support, questions, or feedback.
              </p>
            </Col>
          </Row>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="contact-methods-section">
        <div className="container">
          <h2 className="section-title">Get in Touch</h2>
          <Row>
            {contactMethods.map((method, index) => (
              <Col lg={3} md={6} key={index} className="mb-4">
                <Card className="contact-method-card">
                  <Card.Body className="text-center">
                    <method.icon 
                      className="contact-icon" 
                      style={{ color: method.color }}
                    />
                    <h4 className="contact-title">{method.title}</h4>
                    <p className="contact-description">{method.description}</p>
                    <div className="contact-details">
                      <p className="contact-info">{method.contact}</p>
                      <p className="contact-availability">
                        <Clock className="clock-icon" />
                        {method.availability}
                      </p>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Contact Form */}
      <section className="contact-form-section">
        <div className="container">
          <Row>
            <Col lg={8} className="mx-auto">
              <Card className="contact-form-card">
                <Card.Body>
                  <h2 className="form-title">Send us a Message</h2>
                  <p className="form-subtitle">
                    Fill out the form below and we'll get back to you as soon as possible.
                  </p>

                  {submitStatus === 'success' && (
                    <Alert variant="success" className="mb-4">
                      <CheckCircle className="me-2" />
                      Thank you! Your message has been sent successfully. We'll get back to you soon.
                    </Alert>
                  )}

                  {submitStatus === 'error' && (
                    <Alert variant="danger" className="mb-4">
                      <AlertCircle className="me-2" />
                      Sorry, there was an error sending your message. Please try again or contact us directly.
                    </Alert>
                  )}

                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Full Name *</Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter your full name"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Email Address *</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter your email address"
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Phone Number</Form.Label>
                          <Form.Control
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="Enter your phone number"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Priority</Form.Label>
                          <Form.Select
                            name="priority"
                            value={formData.priority}
                            onChange={handleInputChange}
                          >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                            <option value="urgent">Urgent</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Subject *</Form.Label>
                          <Form.Control
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            required
                            placeholder="Brief description of your inquiry"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Category *</Form.Label>
                          <Form.Select
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            required
                          >
                            <option value="">Select a category</option>
                            <option value="technical">Technical Support</option>
                            <option value="billing">Billing & Payments</option>
                            <option value="sales">Sales & Features</option>
                            <option value="partnership">Partnership</option>
                            <option value="feedback">Feedback</option>
                            <option value="other">Other</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-4">
                      <Form.Label>Message *</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={6}
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        placeholder="Please provide detailed information about your inquiry..."
                      />
                    </Form.Group>

                    <div className="form-actions">
                      <Button 
                        type="submit" 
                        variant="primary" 
                        size="lg"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="me-2" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </section>

      {/* Departments */}
      <section className="departments-section">
        <div className="container">
          <h2 className="section-title">Contact Specific Departments</h2>
          <Row>
            {departments.map((dept, index) => (
              <Col lg={3} md={6} key={index} className="mb-4">
                <Card className="department-card">
                  <Card.Body className="text-center">
                    <dept.icon className="department-icon" />
                    <h4 className="department-name">{dept.name}</h4>
                    <p className="department-description">{dept.description}</p>
                    <a href={`mailto:${dept.email}`} className="department-email">
                      {dept.email}
                    </a>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <Row>
            <Col lg={8} className="mx-auto">
              <div className="faq-items">
                <div className="faq-item">
                  <h4>How quickly will I receive a response?</h4>
                  <p>
                    We typically respond to inquiries within 2-4 hours during business hours. 
                    For urgent technical issues, we aim to respond within 1 hour.
                  </p>
                </div>
                <div className="faq-item">
                  <h4>What information should I include in my message?</h4>
                  <p>
                    Please include your account details, a clear description of the issue, 
                    any error messages you're seeing, and steps you've already tried.
                  </p>
                </div>
                <div className="faq-item">
                  <h4>Can I schedule a call with your team?</h4>
                  <p>
                    Yes! For complex issues or detailed discussions, we can schedule a 
                    video call. Please mention this in your message and we'll arrange a time.
                  </p>
                </div>
                <div className="faq-item">
                  <h4>Is there a phone number for emergencies?</h4>
                  <p>
                    For critical system outages or security issues, call our emergency 
                    line at +1 (555) 911-TECH (911-8324) available 24/7.
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </section>

      <style>{`
        .contact-us {
          font-family: 'Inter', sans-serif;
        }

        .header-section {
          background: linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%);
          color: white;
          padding: 4rem 0;
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

        .contact-methods-section {
          padding: 4rem 0;
          background: #F8FAFC;
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #1F2937;
          margin-bottom: 3rem;
          text-align: center;
        }

        .contact-method-card {
          height: 100%;
          border: 1px solid #E5E7EB;
          transition: all 0.3s ease;
        }

        .contact-method-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px -5px rgba(0, 0, 0, 0.1);
        }

        .contact-icon {
          width: 3rem;
          height: 3rem;
          margin-bottom: 1.5rem;
        }

        .contact-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #1F2937;
          margin-bottom: 1rem;
        }

        .contact-description {
          color: #6B7280;
          margin-bottom: 1.5rem;
        }

        .contact-info {
          font-weight: 600;
          color: #1F2937;
          margin-bottom: 0.5rem;
        }

        .contact-availability {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          color: #6B7280;
          font-size: 0.875rem;
          margin: 0;
        }

        .clock-icon {
          width: 1rem;
          height: 1rem;
        }

        .contact-form-section {
          padding: 4rem 0;
        }

        .contact-form-card {
          border: 1px solid #E5E7EB;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .form-title {
          font-size: 2rem;
          font-weight: 700;
          color: #1F2937;
          margin-bottom: 1rem;
        }

        .form-subtitle {
          color: #6B7280;
          margin-bottom: 2rem;
        }

        .form-actions {
          text-align: center;
        }

        .departments-section {
          padding: 4rem 0;
          background: #F8FAFC;
        }

        .department-card {
          height: 100%;
          border: 1px solid #E5E7EB;
          transition: all 0.3s ease;
        }

        .department-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px -5px rgba(0, 0, 0, 0.1);
        }

        .department-icon {
          width: 2.5rem;
          height: 2.5rem;
          color: #1E40AF;
          margin-bottom: 1rem;
        }

        .department-name {
          font-size: 1.25rem;
          font-weight: 600;
          color: #1F2937;
          margin-bottom: 1rem;
        }

        .department-description {
          color: #6B7280;
          margin-bottom: 1.5rem;
        }

        .department-email {
          color: #1E40AF;
          text-decoration: none;
          font-weight: 500;
        }

        .department-email:hover {
          text-decoration: underline;
        }

        .faq-section {
          padding: 4rem 0;
        }

        .faq-items {
          display: grid;
          gap: 2rem;
        }

        .faq-item h4 {
          color: #1F2937;
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .faq-item p {
          color: #4B5563;
          margin: 0;
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .header-title {
            font-size: 2rem;
          }
          
          .section-title {
            font-size: 2rem;
          }
          
          .form-title {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ContactUs;
