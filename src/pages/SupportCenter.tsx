import React, { useState } from 'react';
import { Container, Row, Col, Card, Accordion, Form, Button, Badge } from 'react-bootstrap';
import { 
  Search, 
  MessageCircle, 
  Phone, 
  Mail, 
  Clock, 
  HelpCircle,
  BookOpen,
  Video,
  FileText,
  Users,
  Star,
  ChevronDown,
  ChevronRight,
  Send,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';

const SupportCenter = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [ticketForm, setTicketForm] = useState({
    subject: '',
    category: '',
    priority: 'medium',
    description: '',
    email: '',
    phone: ''
  });

  const categories = [
    { id: 'all', name: 'All Topics', icon: HelpCircle, count: 156 },
    { id: 'getting-started', name: 'Getting Started', icon: BookOpen, count: 23 },
    { id: 'billing', name: 'Billing & Payments', icon: FileText, count: 18 },
    { id: 'technical', name: 'Technical Issues', icon: AlertCircle, count: 31 },
    { id: 'features', name: 'Features & Usage', icon: Star, count: 42 },
    { id: 'account', name: 'Account & Security', icon: Users, count: 28 },
    { id: 'api', name: 'API & Integration', icon: Code, count: 14 }
  ];

  const faqs = [
    {
      id: 1,
      category: 'getting-started',
      question: 'How do I make my first call?',
      answer: 'To make your first call, simply open the app, tap the phone icon, enter the number you want to call, and tap the call button. You can also call from your contacts or recent calls list.',
      helpful: 89,
      tags: ['calls', 'beginner', 'phone']
    },
    {
      id: 2,
      category: 'billing',
      question: 'How does billing work?',
      answer: 'TelefoneHub uses a pay-per-use model. You only pay for the calls you make. Rates vary by country and call type. You can view your usage and billing in the app under Settings > Billing.',
      helpful: 76,
      tags: ['billing', 'pricing', 'payments']
    },
    {
      id: 3,
      category: 'technical',
      question: 'Why is my call quality poor?',
      answer: 'Poor call quality can be caused by several factors: weak internet connection, background apps using bandwidth, or server issues. Try switching to WiFi, closing other apps, or restarting the app.',
      helpful: 92,
      tags: ['quality', 'troubleshooting', 'calls']
    },
    {
      id: 4,
      category: 'features',
      question: 'How do I use video calling?',
      answer: 'Video calling is available in the Video tab. Tap the video icon next to any contact, or start a video call from the call interface. Make sure you have camera and microphone permissions enabled.',
      helpful: 84,
      tags: ['video', 'calls', 'permissions']
    },
    {
      id: 5,
      category: 'account',
      question: 'How do I change my password?',
      answer: 'To change your password, go to Settings > Account > Security > Change Password. You\'ll need to enter your current password and then your new password twice.',
      helpful: 67,
      tags: ['password', 'security', 'account']
    },
    {
      id: 6,
      category: 'api',
      question: 'How do I integrate TelefoneHub API?',
      answer: 'Our API documentation is available at developers.telefonehub.com. You\'ll need an API key, which you can generate in your account settings. Start with our quick start guide.',
      helpful: 58,
      tags: ['api', 'integration', 'developers']
    }
  ];

  const howToGuides = [
    {
      id: 1,
      title: 'Setting Up Your Account',
      description: 'Complete guide to creating and configuring your TelefoneHub account',
      duration: '5 min read',
      difficulty: 'Beginner',
      steps: 8,
      category: 'getting-started'
    },
    {
      id: 2,
      title: 'Making International Calls',
      description: 'Learn how to make cost-effective international calls',
      duration: '3 min read',
      difficulty: 'Easy',
      steps: 5,
      category: 'features'
    },
    {
      id: 3,
      title: 'Configuring Video Settings',
      description: 'Optimize your video calling experience',
      duration: '7 min read',
      difficulty: 'Intermediate',
      steps: 12,
      category: 'technical'
    },
    {
      id: 4,
      title: 'Setting Up Payment Methods',
      description: 'Add and manage your payment options',
      duration: '4 min read',
      difficulty: 'Easy',
      steps: 6,
      category: 'billing'
    },
    {
      id: 5,
      title: 'API Integration Guide',
      description: 'Integrate TelefoneHub into your application',
      duration: '15 min read',
      difficulty: 'Advanced',
      steps: 20,
      category: 'api'
    },
    {
      id: 6,
      title: 'Troubleshooting Common Issues',
      description: 'Solutions for the most common problems',
      duration: '10 min read',
      difficulty: 'Intermediate',
      steps: 15,
      category: 'technical'
    }
  ];

  const contactMethods = [
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Get instant help from our support team',
      availability: '24/7',
      responseTime: '2-5 minutes',
      color: '#10B981'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Speak directly with our support team',
      availability: 'Mon-Fri 9AM-6PM PST',
      responseTime: 'Immediate',
      color: '#3B82F6'
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Send us a detailed message',
      availability: '24/7',
      responseTime: '2-4 hours',
      color: '#8B5CF6'
    },
    {
      icon: Video,
      title: 'Video Call',
      description: 'Screen share with our technical team',
      availability: 'Mon-Fri 9AM-6PM PST',
      responseTime: 'Scheduled',
      color: '#F59E0B'
    }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle ticket submission
    console.log('Ticket submitted:', ticketForm);
    alert('Support ticket submitted successfully! We\'ll get back to you soon.');
  };

  return (
    <div className="support-center">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <Row className="text-center">
            <Col lg={8} className="mx-auto">
              <h1 className="hero-title">How can we help you?</h1>
              <p className="hero-subtitle">
                Find answers, get support, and learn how to make the most of TelefoneHub
              </p>
              
              {/* Search Bar */}
              <div className="search-container">
                <div className="search-bar">
                  <Search className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search for help articles, FAQs, or topics..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                  />
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </section>

      {/* Quick Help Categories */}
      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">Browse by Category</h2>
          <Row>
            {categories.map((category) => (
              <Col lg={3} md={6} key={category.id} className="mb-4">
                <Card 
                  className={`category-card ${selectedCategory === category.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <Card.Body>
                    <category.icon className="category-icon" />
                    <h4 className="category-name">{category.name}</h4>
                    <p className="category-count">{category.count} articles</p>
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
            <Col lg={8}>
              <Accordion className="faq-accordion">
                {filteredFAQs.map((faq) => (
                  <Accordion.Item key={faq.id} eventKey={faq.id.toString()}>
                    <Accordion.Header>
                      <div className="faq-question">
                        <span>{faq.question}</span>
                        <div className="faq-meta">
                          <Badge bg="secondary" className="me-2">
                            {categories.find(c => c.id === faq.category)?.name}
                          </Badge>
                          <span className="helpful-count">
                            <CheckCircle className="helpful-icon" />
                            {faq.helpful} found helpful
                          </span>
                        </div>
                      </div>
                    </Accordion.Header>
                    <Accordion.Body>
                      <p className="faq-answer">{faq.answer}</p>
                      <div className="faq-tags">
                        {faq.tags.map((tag, index) => (
                          <Badge key={index} bg="light" text="dark" className="me-1">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="faq-feedback">
                        <Button variant="outline-primary" size="sm" className="me-2">
                          <CheckCircle className="me-1" />
                          Helpful
                        </Button>
                        <Button variant="outline-secondary" size="sm">
                          <AlertCircle className="me-1" />
                          Not Helpful
                        </Button>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </Col>
            <Col lg={4}>
              <Card className="helpful-tips">
                <Card.Body>
                  <h4>Helpful Tips</h4>
                  <ul className="tips-list">
                    <li>Use specific keywords when searching</li>
                    <li>Check the category filters for related topics</li>
                    <li>Rate articles to help others find them</li>
                    <li>Contact support if you can't find an answer</li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </section>

      {/* How-To Guides */}
      <section className="guides-section">
        <div className="container">
          <h2 className="section-title">Step-by-Step Guides</h2>
          <Row>
            {howToGuides.map((guide) => (
              <Col lg={4} md={6} key={guide.id} className="mb-4">
                <Card className="guide-card">
                  <Card.Body>
                    <div className="guide-header">
                      <h4 className="guide-title">{guide.title}</h4>
                      <div className="guide-meta">
                        <Badge bg="primary" className="me-2">
                          {guide.difficulty}
                        </Badge>
                        <span className="guide-duration">{guide.duration}</span>
                      </div>
                    </div>
                    <p className="guide-description">{guide.description}</p>
                    <div className="guide-footer">
                      <span className="guide-steps">{guide.steps} steps</span>
                      <Button variant="outline-primary" size="sm">
                        Read Guide
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Contact Support */}
      <section className="contact-section">
        <div className="container">
          <h2 className="section-title">Still need help?</h2>
          <Row>
            <Col lg={8}>
              <Card className="ticket-form-card">
                <Card.Body>
                  <h4>Submit a Support Ticket</h4>
                  <Form onSubmit={handleTicketSubmit}>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Subject</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Brief description of your issue"
                            value={ticketForm.subject}
                            onChange={(e) => setTicketForm({...ticketForm, subject: e.target.value})}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Category</Form.Label>
                          <Form.Select
                            value={ticketForm.category}
                            onChange={(e) => setTicketForm({...ticketForm, category: e.target.value})}
                            required
                          >
                            <option value="">Select a category</option>
                            <option value="technical">Technical Issue</option>
                            <option value="billing">Billing & Payment</option>
                            <option value="account">Account & Security</option>
                            <option value="feature">Feature Request</option>
                            <option value="other">Other</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Priority</Form.Label>
                          <Form.Select
                            value={ticketForm.priority}
                            onChange={(e) => setTicketForm({...ticketForm, priority: e.target.value})}
                          >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                            <option value="urgent">Urgent</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="your@email.com"
                            value={ticketForm.email}
                            onChange={(e) => setTicketForm({...ticketForm, email: e.target.value})}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Form.Group className="mb-3">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        placeholder="Please provide detailed information about your issue..."
                        value={ticketForm.description}
                        onChange={(e) => setTicketForm({...ticketForm, description: e.target.value})}
                        required
                      />
                    </Form.Group>
                    <Button type="submit" variant="primary">
                      <Send className="me-2" />
                      Submit Ticket
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4}>
              <div className="contact-methods">
                <h4>Other Ways to Contact Us</h4>
                {contactMethods.map((method, index) => (
                  <Card key={index} className="contact-method-card">
                    <Card.Body>
                      <div className="contact-method">
                        <method.icon 
                          className="contact-icon" 
                          style={{ color: method.color }}
                        />
                        <div className="contact-details">
                          <h5>{method.title}</h5>
                          <p>{method.description}</p>
                          <div className="contact-meta">
                            <span className="availability">
                              <Clock className="me-1" />
                              {method.availability}
                            </span>
                            <span className="response-time">
                              {method.responseTime}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </Col>
          </Row>
        </div>
      </section>

      <style>{`
        .support-center {
          font-family: 'Inter', sans-serif;
        }

        .hero-section {
          background: linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%);
          color: white;
          padding: 4rem 0;
        }

        .hero-title {
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .hero-subtitle {
          font-size: 1.25rem;
          margin-bottom: 2rem;
          opacity: 0.9;
        }

        .search-container {
          max-width: 600px;
          margin: 0 auto;
        }

        .search-bar {
          position: relative;
          background: white;
          border-radius: 0.5rem;
          padding: 0.75rem 1rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: #6B7280;
          width: 1.25rem;
          height: 1.25rem;
        }

        .search-input {
          border: none;
          outline: none;
          width: 100%;
          padding-left: 2.5rem;
          font-size: 1rem;
        }

        .categories-section {
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

        .category-card {
          cursor: pointer;
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }

        .category-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px -5px rgba(0, 0, 0, 0.1);
        }

        .category-card.active {
          border-color: #1E40AF;
          background: linear-gradient(135deg, #F8FAFF 0%, #FFFFFF 100%);
        }

        .category-icon {
          width: 2.5rem;
          height: 2.5rem;
          color: #1E40AF;
          margin-bottom: 1rem;
        }

        .category-name {
          font-size: 1.25rem;
          font-weight: 600;
          color: #1F2937;
          margin-bottom: 0.5rem;
        }

        .category-count {
          color: #6B7280;
          margin: 0;
        }

        .faq-section {
          padding: 4rem 0;
        }

        .faq-accordion {
          margin-bottom: 2rem;
        }

        .faq-question {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .faq-meta {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .helpful-count {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          color: #6B7280;
          font-size: 0.875rem;
        }

        .helpful-icon {
          width: 1rem;
          height: 1rem;
          color: #10B981;
        }

        .faq-answer {
          color: #4B5563;
          line-height: 1.7;
          margin-bottom: 1rem;
        }

        .faq-tags {
          margin-bottom: 1rem;
        }

        .faq-feedback {
          display: flex;
          gap: 0.5rem;
        }

        .helpful-tips {
          background: #F8FAFC;
          border: 1px solid #E5E7EB;
        }

        .tips-list {
          list-style: none;
          padding: 0;
        }

        .tips-list li {
          padding: 0.5rem 0;
          border-bottom: 1px solid #E5E7EB;
        }

        .tips-list li:last-child {
          border-bottom: none;
        }

        .guides-section {
          padding: 4rem 0;
          background: #F8FAFC;
        }

        .guide-card {
          height: 100%;
          transition: all 0.3s ease;
        }

        .guide-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px -5px rgba(0, 0, 0, 0.1);
        }

        .guide-header {
          margin-bottom: 1rem;
        }

        .guide-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #1F2937;
          margin-bottom: 0.75rem;
        }

        .guide-meta {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .guide-duration {
          color: #6B7280;
          font-size: 0.875rem;
        }

        .guide-description {
          color: #4B5563;
          margin-bottom: 1.5rem;
        }

        .guide-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .guide-steps {
          color: #6B7280;
          font-size: 0.875rem;
        }

        .contact-section {
          padding: 4rem 0;
        }

        .ticket-form-card {
          border: 1px solid #E5E7EB;
        }

        .contact-methods {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .contact-method-card {
          border: 1px solid #E5E7EB;
        }

        .contact-method {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }

        .contact-icon {
          width: 2rem;
          height: 2rem;
          margin-top: 0.25rem;
        }

        .contact-details h5 {
          color: #1F2937;
          margin-bottom: 0.5rem;
        }

        .contact-details p {
          color: #6B7280;
          margin-bottom: 0.75rem;
        }

        .contact-meta {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .availability {
          display: flex;
          align-items: center;
          color: #6B7280;
          font-size: 0.875rem;
        }

        .response-time {
          color: #1E40AF;
          font-weight: 500;
          font-size: 0.875rem;
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2rem;
          }
          
          .section-title {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default SupportCenter;
