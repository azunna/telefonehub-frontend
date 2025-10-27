import React, { useState } from 'react';
import { Container, Row, Col, Card, Accordion, Form, Badge } from 'react-bootstrap';
import { 
  Search, 
  HelpCircle, 
  ChevronDown, 
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Star,
  MessageCircle,
  Phone,
  Video,
  Mail,
  Settings,
  CreditCard,
  Shield,
  Users,
  Globe
} from 'lucide-react';

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Questions', icon: HelpCircle, count: 89 },
    { id: 'getting-started', name: 'Getting Started', icon: Star, count: 15 },
    { id: 'calls', name: 'Voice & Video Calls', icon: Phone, count: 18 },
    { id: 'messaging', name: 'SMS & Messaging', icon: MessageCircle, count: 12 },
    { id: 'account', name: 'Account & Settings', icon: Settings, count: 14 },
    { id: 'billing', name: 'Billing & Payments', icon: CreditCard, count: 10 },
    { id: 'security', name: 'Security & Privacy', icon: Shield, count: 8 },
    { id: 'business', name: 'Business Features', icon: Users, count: 7 },
    { id: 'technical', name: 'Technical Issues', icon: AlertCircle, count: 5 }
  ];

  const faqs = [
    {
      id: 1,
      category: 'getting-started',
      question: 'How do I create an account?',
      answer: 'Creating an account is easy! Simply click the "Sign Up" button on our homepage, enter your email address, create a password, and verify your email. You can also sign up using your Google, Facebook, or Apple account for faster registration.',
      helpful: 156,
      tags: ['account', 'registration', 'signup']
    },
    {
      id: 2,
      category: 'calls',
      question: 'How do I make a call?',
      answer: 'To make a call, open the app and tap the phone icon. Enter the number you want to call or select from your contacts. You can also make calls directly from recent calls or by tapping a contact in your contact list.',
      helpful: 203,
      tags: ['calls', 'phone', 'contacts']
    },
    {
      id: 3,
      category: 'calls',
      question: 'Can I make international calls?',
      answer: 'Yes! TelefoneHub supports international calling to over 200 countries. Rates vary by destination and are clearly displayed before you make the call. You can also purchase international calling packages for better rates.',
      helpful: 189,
      tags: ['international', 'calls', 'rates']
    },
    {
      id: 4,
      category: 'messaging',
      question: 'How do I send an SMS?',
      answer: 'To send an SMS, go to the Messages tab, tap the compose button, enter the recipient\'s number or select from contacts, type your message, and tap send. You can also reply to incoming messages directly.',
      helpful: 167,
      tags: ['sms', 'messaging', 'text']
    },
    {
      id: 5,
      category: 'account',
      question: 'How do I change my password?',
      answer: 'To change your password, go to Settings > Account > Security > Change Password. Enter your current password and your new password twice. Make sure your new password is strong and unique.',
      helpful: 134,
      tags: ['password', 'security', 'account']
    },
    {
      id: 6,
      category: 'billing',
      question: 'How does billing work?',
      answer: 'TelefoneHub uses a pay-per-use model. You only pay for the calls and messages you make. Rates are clearly displayed before each call. You can add funds to your account or set up automatic top-ups.',
      helpful: 178,
      tags: ['billing', 'payments', 'rates']
    },
    {
      id: 7,
      category: 'technical',
      question: 'Why is my call quality poor?',
      answer: 'Poor call quality can be caused by several factors: weak internet connection, background apps using bandwidth, or server issues. Try switching to WiFi, closing other apps, or restarting the app. If the problem persists, contact support.',
      helpful: 145,
      tags: ['quality', 'troubleshooting', 'internet']
    },
    {
      id: 8,
      category: 'calls',
      question: 'How do I use video calling?',
      answer: 'Video calling is available in the Video tab. Tap the video icon next to any contact, or start a video call from the call interface. Make sure you have camera and microphone permissions enabled in your device settings.',
      helpful: 198,
      tags: ['video', 'calls', 'permissions']
    },
    {
      id: 9,
      category: 'security',
      question: 'Is my data secure?',
      answer: 'Yes! We use military-grade encryption (AES-256) to protect your data. All communications are encrypted end-to-end, and we never store your call content without explicit consent. Your privacy is our top priority.',
      helpful: 167,
      tags: ['security', 'encryption', 'privacy']
    },
    {
      id: 10,
      category: 'business',
      question: 'Do you offer business plans?',
      answer: 'Yes! We offer comprehensive business plans with features like call recording, analytics, team management, and API access. Contact our sales team to discuss the best plan for your business needs.',
      helpful: 89,
      tags: ['business', 'plans', 'enterprise']
    },
    {
      id: 11,
      category: 'account',
      question: 'How do I delete my account?',
      answer: 'To delete your account, go to Settings > Account > Delete Account. You\'ll need to confirm your password and acknowledge that this action cannot be undone. All your data will be permanently deleted within 30 days.',
      helpful: 67,
      tags: ['account', 'delete', 'data']
    },
    {
      id: 12,
      category: 'technical',
      question: 'The app keeps crashing. What should I do?',
      answer: 'Try these steps: 1) Close and restart the app, 2) Restart your device, 3) Check for app updates, 4) Clear app cache, 5) Reinstall the app. If the problem persists, contact our technical support team.',
      helpful: 123,
      tags: ['crash', 'troubleshooting', 'app']
    },
    {
      id: 13,
      category: 'messaging',
      question: 'Can I send group messages?',
      answer: 'Yes! You can create group conversations by tapping the compose button, then selecting multiple contacts. Group messages support up to 50 participants and include features like group names and participant management.',
      helpful: 156,
      tags: ['group', 'messaging', 'contacts']
    },
    {
      id: 14,
      category: 'billing',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, Google Pay, and bank transfers. All payments are processed securely through our payment partners.',
      helpful: 134,
      tags: ['payments', 'credit', 'cards']
    },
    {
      id: 15,
      category: 'security',
      question: 'Can I use TelefoneHub for business calls?',
      answer: 'Absolutely! TelefoneHub is perfect for business use. We offer features like call recording, analytics, team management, and integration with popular business tools. Check out our business plans for more details.',
      helpful: 112,
      tags: ['business', 'calls', 'features']
    }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const popularFAQs = faqs
    .sort((a, b) => b.helpful - a.helpful)
    .slice(0, 5);

  return (
    <div className="faq-page">
      {/* Header */}
      <section className="header-section">
        <div className="container">
          <Row className="text-center">
            <Col lg={8} className="mx-auto">
              <h1 className="header-title">Frequently Asked Questions</h1>
              <p className="header-subtitle">
                Find answers to common questions about TelefoneHub
              </p>
              
              {/* Search Bar */}
              <div className="search-container">
                <div className="search-bar">
                  <Search className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search for answers..."
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

      {/* Categories */}
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
                    <p className="category-count">{category.count} questions</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Popular FAQs */}
      <section className="popular-section">
        <div className="container">
          <h2 className="section-title">Most Helpful Questions</h2>
          <Row>
            <Col lg={8}>
              <div className="popular-faqs">
                {popularFAQs.map((faq, index) => (
                  <Card key={faq.id} className="popular-faq-card">
                    <Card.Body>
                      <div className="faq-header">
                        <div className="faq-number">{index + 1}</div>
                        <h4 className="faq-question">{faq.question}</h4>
                        <Badge bg="success" className="helpful-badge">
                          <CheckCircle className="me-1" />
                          {faq.helpful} found helpful
                        </Badge>
                      </div>
                      <p className="faq-answer">{faq.answer}</p>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </Col>
            <Col lg={4}>
              <Card className="help-tips">
                <Card.Body>
                  <h4>Search Tips</h4>
                  <ul className="tips-list">
                    <li>Use specific keywords</li>
                    <li>Try different phrasings</li>
                    <li>Check the category filters</li>
                    <li>Look at related questions</li>
                  </ul>
                  
                  <h4>Still Need Help?</h4>
                  <p>Can't find what you're looking for?</p>
                  <div className="help-actions">
                    <a href="/contact" className="btn btn-primary btn-sm me-2">
                      <MessageCircle className="me-1" />
                      Contact Support
                    </a>
                    <a href="/support" className="btn btn-outline-primary btn-sm">
                      <HelpCircle className="me-1" />
                      Support Center
                    </a>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </section>

      {/* All FAQs */}
      <section className="all-faqs-section">
        <div className="container">
          <h2 className="section-title">
            {selectedCategory === 'all' ? 'All Questions' : categories.find(c => c.id === selectedCategory)?.name}
            <span className="question-count">({filteredFAQs.length} questions)</span>
          </h2>
          
          <Accordion className="faq-accordion">
            {filteredFAQs.map((faq) => (
              <Accordion.Item key={faq.id} eventKey={faq.id.toString()}>
                <Accordion.Header>
                  <div className="faq-question-header">
                    <span className="faq-question-text">{faq.question}</span>
                    <div className="faq-meta">
                      <Badge bg="secondary" className="me-2">
                        {categories.find(c => c.id === faq.category)?.name}
                      </Badge>
                      <span className="helpful-count">
                        <CheckCircle className="helpful-icon" />
                        {faq.helpful} helpful
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
                    <button className="btn btn-outline-success btn-sm me-2">
                      <CheckCircle className="me-1" />
                      Helpful
                    </button>
                    <button className="btn btn-outline-secondary btn-sm">
                      <AlertCircle className="me-1" />
                      Not Helpful
                    </button>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>

          {filteredFAQs.length === 0 && (
            <div className="no-results">
              <HelpCircle className="no-results-icon" />
              <h3>No questions found</h3>
              <p>Try adjusting your search terms or browse different categories.</p>
            </div>
          )}
        </div>
      </section>

      <style>{`
        .faq-page {
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

        .popular-section {
          padding: 4rem 0;
        }

        .popular-faq-card {
          margin-bottom: 1.5rem;
          border: 1px solid #E5E7EB;
        }

        .faq-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .faq-number {
          background: #1E40AF;
          color: white;
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 0.875rem;
        }

        .faq-question {
          flex: 1;
          color: #1F2937;
          font-size: 1.125rem;
          font-weight: 600;
          margin: 0;
        }

        .helpful-badge {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .faq-answer {
          color: #4B5563;
          line-height: 1.7;
          margin: 0;
        }

        .help-tips {
          background: #F8FAFC;
          border: 1px solid #E5E7EB;
        }

        .help-tips h4 {
          color: #1F2937;
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .tips-list {
          list-style: none;
          padding: 0;
          margin-bottom: 2rem;
        }

        .tips-list li {
          padding: 0.5rem 0;
          border-bottom: 1px solid #E5E7EB;
          color: #4B5563;
        }

        .tips-list li:last-child {
          border-bottom: none;
        }

        .help-actions {
          display: flex;
          gap: 0.5rem;
        }

        .all-faqs-section {
          padding: 4rem 0;
          background: #F8FAFC;
        }

        .question-count {
          font-size: 1rem;
          font-weight: 400;
          color: #6B7280;
          margin-left: 1rem;
        }

        .faq-accordion {
          margin-bottom: 2rem;
        }

        .faq-question-header {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          width: 100%;
        }

        .faq-question-text {
          font-size: 1.125rem;
          font-weight: 600;
          color: #1F2937;
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

        .no-results {
          text-align: center;
          padding: 4rem 2rem;
        }

        .no-results-icon {
          width: 4rem;
          height: 4rem;
          color: #6B7280;
          margin-bottom: 1rem;
        }

        .no-results h3 {
          color: #1F2937;
          margin-bottom: 1rem;
        }

        .no-results p {
          color: #6B7280;
        }

        @media (max-width: 768px) {
          .header-title {
            font-size: 2rem;
          }
          
          .section-title {
            font-size: 2rem;
          }
          
          .faq-header {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .faq-meta {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default FAQ;
