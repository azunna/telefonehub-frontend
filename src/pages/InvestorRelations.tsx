import React, { useState } from 'react';
import { Container, Row, Col, Tab, Tabs } from 'react-bootstrap';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Globe, 
  Download, 
  Calendar,
  BarChart3,
  PieChart,
  LineChart,
  FileText,
  Award,
  Target
} from 'lucide-react';

const InvestorRelations = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const keyMetrics = [
    { icon: DollarSign, value: '$50M', label: 'Revenue (2024)', change: '+150%' },
    { icon: Users, value: '1M+', label: 'Active Users', change: '+200%' },
    { icon: Globe, value: '50+', label: 'Countries', change: '+25%' },
    { icon: TrendingUp, value: '99.9%', label: 'Uptime', change: 'Stable' },
  ];

  const financialHighlights = [
    {
      quarter: 'Q4 2024',
      revenue: '$15.2M',
      growth: '+45%',
      users: '1.2M',
      arpu: '$12.67'
    },
    {
      quarter: 'Q3 2024',
      revenue: '$10.5M',
      growth: '+38%',
      users: '950K',
      arpu: '$11.05'
    },
    {
      quarter: 'Q2 2024',
      revenue: '$7.6M',
      growth: '+42%',
      users: '750K',
      arpu: '$10.13'
    },
    {
      quarter: 'Q1 2024',
      revenue: '$5.4M',
      growth: '+35%',
      users: '580K',
      arpu: '$9.31'
    }
  ];

  const milestones = [
    {
      date: '2024',
      title: 'Series B Funding',
      description: 'Raised $25M to accelerate global expansion and AI development',
      amount: '$25M'
    },
    {
      date: '2023',
      title: 'Series A Funding',
      description: 'Secured $10M to scale platform and enter new markets',
      amount: '$10M'
    },
    {
      date: '2022',
      title: 'Seed Funding',
      description: 'Initial $2M investment to launch core platform',
      amount: '$2M'
    },
    {
      date: '2021',
      title: 'Company Founded',
      description: 'TelefoneHub founded with vision to revolutionize communication',
      amount: 'Bootstrap'
    }
  ];

  const leadership = [
    {
      name: 'Alex Johnson',
      title: 'CEO & Co-Founder',
      experience: '15+ years in telecom',
      previous: 'VP at Microsoft',
      image: 'https://via.placeholder.com/150'
    },
    {
      name: 'Sarah Chen',
      title: 'CTO & Co-Founder',
      experience: '12+ years in tech',
      previous: 'Senior Engineer at Google',
      image: 'https://via.placeholder.com/150'
    },
    {
      name: 'Michael Rodriguez',
      title: 'CFO',
      experience: '10+ years in finance',
      previous: 'VP Finance at Stripe',
      image: 'https://via.placeholder.com/150'
    },
    {
      name: 'Dr. Emily Watson',
      title: 'Head of AI',
      experience: '8+ years in AI/ML',
      previous: 'Research Scientist at OpenAI',
      image: 'https://via.placeholder.com/150'
    }
  ];

  return (
    <div className="investor-relations">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <Row className="align-items-center min-vh-50">
            <Col lg={8}>
              <div className="hero-content">
                <h1 className="hero-title">Investor Relations</h1>
                <p className="hero-subtitle">
                  TelefoneHub is building the future of global communication. 
                  Join us in revolutionizing how the world connects.
                </p>
                <div className="hero-stats">
                  {keyMetrics.map((metric, index) => (
                    <div key={index} className="hero-stat">
                      <metric.icon className="stat-icon" />
                      <div className="stat-content">
                        <div className="stat-value">{metric.value}</div>
                        <div className="stat-label">{metric.label}</div>
                        <div className="stat-change positive">{metric.change}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Col>
            <Col lg={4}>
              <div className="hero-chart">
                <div className="chart-placeholder">
                  <LineChart className="chart-icon" />
                  <p>Revenue Growth Chart</p>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="tabs-section">
        <div className="container">
          <Tabs
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k || 'overview')}
            className="investor-tabs"
          >
            <Tab eventKey="overview" title="Overview">
              <div className="tab-content">
                <Row>
                  <Col lg={8}>
                    <div className="content-section">
                      <h2>Company Overview</h2>
                      <p>
                        TelefoneHub is a leading communication platform that provides 
                        enterprise-grade voice, video, and messaging solutions powered by 
                        artificial intelligence. Our mission is to democratize global 
                        communication by making advanced telephony accessible to businesses 
                        and individuals worldwide.
                      </p>
                      <p>
                        Founded in 2021, we have rapidly grown to serve over 1 million 
                        active users across 50+ countries. Our platform combines the 
                        reliability of traditional telephony with the innovation of modern 
                        AI technology.
                      </p>
                    </div>
                  </Col>
                  <Col lg={4}>
                    <div className="sidebar-section">
                      <h3>Quick Facts</h3>
                      <div className="fact-item">
                        <strong>Founded:</strong> 2021
                      </div>
                      <div className="fact-item">
                        <strong>Headquarters:</strong> San Francisco, CA
                      </div>
                      <div className="fact-item">
                        <strong>Employees:</strong> 150+
                      </div>
                      <div className="fact-item">
                        <strong>Markets:</strong> 50+ Countries
                      </div>
                      <div className="fact-item">
                        <strong>Funding:</strong> $37M Total
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </Tab>

            <Tab eventKey="financials" title="Financials">
              <div className="tab-content">
                <h2>Financial Performance</h2>
                <div className="financials-grid">
                  {financialHighlights.map((quarter, index) => (
                    <div key={index} className="quarter-card">
                      <h4>{quarter.quarter}</h4>
                      <div className="quarter-metrics">
                        <div className="metric">
                          <span className="metric-label">Revenue</span>
                          <span className="metric-value">{quarter.revenue}</span>
                          <span className="metric-growth positive">{quarter.growth}</span>
                        </div>
                        <div className="metric">
                          <span className="metric-label">Users</span>
                          <span className="metric-value">{quarter.users}</span>
                        </div>
                        <div className="metric">
                          <span className="metric-label">ARPU</span>
                          <span className="metric-value">{quarter.arpu}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Tab>

            <Tab eventKey="leadership" title="Leadership">
              <div className="tab-content">
                <h2>Leadership Team</h2>
                <Row>
                  {leadership.map((leader, index) => (
                    <Col lg={3} md={6} key={index} className="mb-4">
                      <div className="leader-card">
                        <img 
                          src={leader.image} 
                          alt={leader.name}
                          className="leader-image"
                        />
                        <h4 className="leader-name">{leader.name}</h4>
                        <p className="leader-title">{leader.title}</p>
                        <p className="leader-experience">{leader.experience}</p>
                        <p className="leader-previous">{leader.previous}</p>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
            </Tab>

            <Tab eventKey="milestones" title="Milestones">
              <div className="tab-content">
                <h2>Company Milestones</h2>
                <div className="timeline">
                  {milestones.map((milestone, index) => (
                    <div key={index} className="timeline-item">
                      <div className="timeline-marker">
                        <DollarSign className="marker-icon" />
                      </div>
                      <div className="timeline-content">
                        <div className="timeline-date">{milestone.date}</div>
                        <h4 className="timeline-title">{milestone.title}</h4>
                        <p className="timeline-description">{milestone.description}</p>
                        <div className="timeline-amount">{milestone.amount}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Tab>

            <Tab eventKey="documents" title="Documents">
              <div className="tab-content">
                <h2>Investor Documents</h2>
                <div className="documents-grid">
                  <div className="document-card">
                    <FileText className="document-icon" />
                    <h4>Annual Report 2024</h4>
                    <p>Complete financial and operational overview</p>
                    <button className="btn btn-primary">
                      <Download className="me-2" />
                      Download PDF
                    </button>
                  </div>
                  <div className="document-card">
                    <BarChart3 className="document-icon" />
                    <h4>Q4 2024 Earnings</h4>
                    <p>Quarterly financial results and guidance</p>
                    <button className="btn btn-primary">
                      <Download className="me-2" />
                      Download PDF
                    </button>
                  </div>
                  <div className="document-card">
                    <PieChart className="document-icon" />
                    <h4>Investor Presentation</h4>
                    <p>Company overview and growth strategy</p>
                    <button className="btn btn-primary">
                      <Download className="me-2" />
                      Download PDF
                    </button>
                  </div>
                  <div className="document-card">
                    <Calendar className="document-icon" />
                    <h4>Upcoming Events</h4>
                    <p>Earnings calls and investor meetings</p>
                    <button className="btn btn-outline-primary">
                      View Calendar
                    </button>
                  </div>
                </div>
              </div>
            </Tab>
          </Tabs>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="container">
          <Row className="text-center">
            <Col lg={8} className="mx-auto">
              <h2>Investor Contact</h2>
              <p>
                For investor inquiries, please contact our investor relations team.
              </p>
              <div className="contact-info">
                <div className="contact-item">
                  <strong>Email:</strong> investors@telefonehub.com
                </div>
                <div className="contact-item">
                  <strong>Phone:</strong> +1 (555) 123-4567
                </div>
                <div className="contact-item">
                  <strong>Address:</strong> 123 Innovation Drive, San Francisco, CA 94105
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </section>

      <style>{`
        .investor-relations {
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
          margin-bottom: 1.5rem;
        }

        .hero-subtitle {
          font-size: 1.25rem;
          margin-bottom: 2rem;
          opacity: 0.9;
        }

        .hero-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }

        .hero-stat {
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.1);
          padding: 1.5rem;
          border-radius: 1rem;
          backdrop-filter: blur(10px);
        }

        .stat-icon {
          width: 2.5rem;
          height: 2.5rem;
          margin-right: 1rem;
        }

        .stat-value {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
        }

        .stat-label {
          font-size: 0.875rem;
          opacity: 0.8;
          margin-bottom: 0.25rem;
        }

        .stat-change {
          font-size: 0.75rem;
          font-weight: 600;
        }

        .stat-change.positive {
          color: #10B981;
        }

        .hero-chart {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .chart-placeholder {
          background: rgba(255, 255, 255, 0.1);
          padding: 3rem;
          border-radius: 1rem;
          text-align: center;
          backdrop-filter: blur(10px);
        }

        .chart-icon {
          width: 4rem;
          height: 4rem;
          margin-bottom: 1rem;
          opacity: 0.7;
        }

        .tabs-section {
          padding: 4rem 0;
          background: #F8FAFC;
        }

        .investor-tabs .nav-link {
          color: #6B7280;
          font-weight: 500;
          padding: 1rem 2rem;
          border: none;
          background: transparent;
        }

        .investor-tabs .nav-link.active {
          color: #1E40AF;
          background: white;
          border-radius: 0.5rem 0.5rem 0 0;
          box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
        }

        .tab-content {
          background: white;
          padding: 2rem;
          border-radius: 0 0.5rem 0.5rem 0.5rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .content-section h2 {
          color: #1F2937;
          margin-bottom: 1.5rem;
        }

        .content-section p {
          color: #4B5563;
          line-height: 1.7;
          margin-bottom: 1.5rem;
        }

        .sidebar-section {
          background: #F8FAFC;
          padding: 2rem;
          border-radius: 0.5rem;
        }

        .sidebar-section h3 {
          color: #1F2937;
          margin-bottom: 1.5rem;
        }

        .fact-item {
          padding: 0.75rem 0;
          border-bottom: 1px solid #E5E7EB;
        }

        .fact-item:last-child {
          border-bottom: none;
        }

        .financials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-top: 2rem;
        }

        .quarter-card {
          background: #F8FAFC;
          padding: 1.5rem;
          border-radius: 0.5rem;
          border: 1px solid #E5E7EB;
        }

        .quarter-card h4 {
          color: #1F2937;
          margin-bottom: 1rem;
        }

        .quarter-metrics {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .metric {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .metric-label {
          color: #6B7280;
          font-size: 0.875rem;
        }

        .metric-value {
          color: #1F2937;
          font-weight: 600;
        }

        .metric-growth {
          font-size: 0.875rem;
          font-weight: 600;
        }

        .metric-growth.positive {
          color: #10B981;
        }

        .leader-card {
          text-align: center;
          background: white;
          padding: 2rem 1.5rem;
          border-radius: 0.5rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          height: 100%;
        }

        .leader-image {
          width: 6rem;
          height: 6rem;
          border-radius: 50%;
          object-fit: cover;
          margin-bottom: 1rem;
        }

        .leader-name {
          color: #1F2937;
          margin-bottom: 0.5rem;
        }

        .leader-title {
          color: #1E40AF;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .leader-experience {
          color: #6B7280;
          font-size: 0.875rem;
          margin-bottom: 0.25rem;
        }

        .leader-previous {
          color: #6B7280;
          font-size: 0.875rem;
        }

        .timeline {
          position: relative;
          margin-top: 2rem;
        }

        .timeline::before {
          content: '';
          position: absolute;
          left: 1.5rem;
          top: 0;
          bottom: 0;
          width: 2px;
          background: #E5E7EB;
        }

        .timeline-item {
          position: relative;
          margin-bottom: 3rem;
          padding-left: 4rem;
        }

        .timeline-marker {
          position: absolute;
          left: 0;
          top: 0;
          width: 3rem;
          height: 3rem;
          background: #1E40AF;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1;
        }

        .marker-icon {
          width: 1.5rem;
          height: 1.5rem;
          color: white;
        }

        .timeline-content {
          background: white;
          padding: 1.5rem;
          border-radius: 0.5rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .timeline-date {
          color: #1E40AF;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .timeline-title {
          color: #1F2937;
          margin-bottom: 0.75rem;
        }

        .timeline-description {
          color: #4B5563;
          margin-bottom: 1rem;
        }

        .timeline-amount {
          color: #10B981;
          font-weight: 600;
          font-size: 1.125rem;
        }

        .documents-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
          margin-top: 2rem;
        }

        .document-card {
          background: white;
          padding: 2rem;
          border-radius: 0.5rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          text-align: center;
        }

        .document-icon {
          width: 3rem;
          height: 3rem;
          color: #1E40AF;
          margin-bottom: 1rem;
        }

        .document-card h4 {
          color: #1F2937;
          margin-bottom: 0.75rem;
        }

        .document-card p {
          color: #6B7280;
          margin-bottom: 1.5rem;
        }

        .contact-section {
          background: #F8FAFC;
          padding: 4rem 0;
        }

        .contact-section h2 {
          color: #1F2937;
          margin-bottom: 1rem;
        }

        .contact-section p {
          color: #6B7280;
          margin-bottom: 2rem;
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .contact-item {
          color: #4B5563;
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2rem;
          }
          
          .hero-stats {
            grid-template-columns: 1fr;
          }
          
          .financials-grid {
            grid-template-columns: 1fr;
          }
          
          .documents-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default InvestorRelations;
