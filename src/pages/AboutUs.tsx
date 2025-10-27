import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { 
  Users, 
  Target, 
  Eye, 
  Award, 
  Globe, 
  Shield, 
  Zap, 
  Heart,
  TrendingUp,
  Clock,
  CheckCircle
} from 'lucide-react';

const AboutUs = () => {
  const stats = [
    { icon: Users, number: '1M+', label: 'Active Users' },
    { icon: Globe, number: '50+', label: 'Countries' },
    { icon: Clock, number: '99.9%', label: 'Uptime' },
    { icon: TrendingUp, number: '500%', label: 'Growth Rate' },
  ];

  const values = [
    {
      icon: Shield,
      title: 'Security First',
      description: 'Military-grade encryption and enterprise security standards protect every communication.'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Cutting-edge technology and AI-powered features for the future of communication.'
    },
    {
      icon: Heart,
      title: 'User-Centric',
      description: 'Every feature is designed with our users\' needs and experience in mind.'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Connecting people and businesses worldwide with seamless communication.'
    }
  ];

  const team = [
    {
      name: 'Alex Johnson',
      role: 'CEO & Founder',
      image: 'https://via.placeholder.com/200',
      bio: 'Former VP at Microsoft with 15+ years in telecommunications.'
    },
    {
      name: 'Sarah Chen',
      role: 'CTO',
      image: 'https://via.placeholder.com/200',
      bio: 'Ex-Google engineer specializing in real-time communication systems.'
    },
    {
      name: 'Michael Rodriguez',
      role: 'Head of Product',
      image: 'https://via.placeholder.com/200',
      bio: 'Product leader with experience at WhatsApp and Telegram.'
    },
    {
      name: 'Dr. Emily Watson',
      role: 'Head of AI',
      image: 'https://via.placeholder.com/200',
      bio: 'AI researcher with PhD from MIT, leading our AI initiatives.'
    }
  ];

  return (
    <div className="about-us">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="container">
            <Row className="align-items-center min-vh-100">
              <Col lg={6}>
                <div className="hero-text">
                  <h1 className="hero-title">
                    Revolutionizing Global Communication
                  </h1>
                  <p className="hero-subtitle">
                    TelefoneHub is the world's most advanced communication platform, 
                    powered by AI and built for the future of business and personal connectivity.
                  </p>
                  <div className="hero-buttons">
                    <button className="btn btn-primary btn-lg me-3">
                      Get Started
                    </button>
                    <button className="btn btn-outline-light btn-lg">
                      Watch Demo
                    </button>
                  </div>
                </div>
              </Col>
              <Col lg={6}>
                <div className="hero-image">
                  <img 
                    src="https://via.placeholder.com/600x400" 
                    alt="TelefoneHub Platform"
                    className="img-fluid rounded-3 shadow-lg"
                  />
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section py-5">
        <div className="container">
          <Row className="text-center">
            {stats.map((stat, index) => (
              <Col md={3} key={index} className="mb-4">
                <div className="stat-item">
                  <stat.icon className="stat-icon" />
                  <h3 className="stat-number">{stat.number}</h3>
                  <p className="stat-label">{stat.label}</p>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mission-vision py-5">
        <div className="container">
          <Row className="align-items-center">
            <Col lg={6}>
              <div className="mission-content">
                <h2 className="section-title">Our Mission</h2>
                <p className="section-text">
                  To democratize global communication by providing enterprise-grade 
                  voice, video, and messaging solutions that are accessible, secure, 
                  and intelligent. We believe everyone deserves the power to connect 
                  seamlessly, regardless of location, language, or device.
                </p>
                <div className="mission-points">
                  <div className="mission-point">
                    <CheckCircle className="check-icon" />
                    <span>Break down communication barriers</span>
                  </div>
                  <div className="mission-point">
                    <CheckCircle className="check-icon" />
                    <span>Enable global business connectivity</span>
                  </div>
                  <div className="mission-point">
                    <CheckCircle className="check-icon" />
                    <span>Provide AI-powered communication tools</span>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="vision-content">
                <h2 className="section-title">Our Vision</h2>
                <p className="section-text">
                  To become the world's leading communication infrastructure, 
                  powering the next generation of digital interactions. We envision 
                  a future where language, distance, and technology barriers are 
                  eliminated, creating a truly connected global community.
                </p>
                <div className="vision-goals">
                  <div className="goal-item">
                    <Target className="goal-icon" />
                    <div>
                      <h4>Global Reach</h4>
                      <p>Connecting every corner of the world</p>
                    </div>
                  </div>
                  <div className="goal-item">
                    <Eye className="goal-icon" />
                    <div>
                      <h4>Innovation</h4>
                      <p>Leading the future of communication</p>
                    </div>
                  </div>
                  <div className="goal-item">
                    <Award className="goal-icon" />
                    <div>
                      <h4>Excellence</h4>
                      <p>Setting the gold standard for quality</p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">Our Values</h2>
            <p className="section-subtitle">
              The principles that guide everything we do
            </p>
          </div>
          <Row>
            {values.map((value, index) => (
              <Col lg={3} md={6} key={index} className="mb-4">
                <div className="value-card">
                  <value.icon className="value-icon" />
                  <h4 className="value-title">{value.title}</h4>
                  <p className="value-description">{value.description}</p>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">Meet Our Team</h2>
            <p className="section-subtitle">
              The brilliant minds behind TelefoneHub
            </p>
          </div>
          <Row>
            {team.map((member, index) => (
              <Col lg={3} md={6} key={index} className="mb-4">
                <div className="team-card">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="team-image"
                  />
                  <h4 className="team-name">{member.name}</h4>
                  <p className="team-role">{member.role}</p>
                  <p className="team-bio">{member.bio}</p>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section py-5 bg-primary text-white">
        <div className="container text-center">
          <h2 className="cta-title">Ready to Transform Your Communication?</h2>
          <p className="cta-subtitle">
            Join millions of users who trust TelefoneHub for their communication needs.
          </p>
          <div className="cta-buttons">
            <button className="btn btn-light btn-lg me-3">
              Start Free Trial
            </button>
            <button className="btn btn-outline-light btn-lg">
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      <style>{`
        .about-us {
          font-family: 'Inter', sans-serif;
        }

        .hero-section {
          background: linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%);
          color: white;
          position: relative;
          overflow: hidden;
        }

        .hero-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><defs><radialGradient id="a" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="%23ffffff" stop-opacity="0.1"/><stop offset="100%" stop-color="%23ffffff" stop-opacity="0"/></radialGradient></defs><circle cx="200" cy="200" r="300" fill="url(%23a)"/><circle cx="800" cy="800" r="400" fill="url(%23a)"/></svg>');
          opacity: 0.3;
        }

        .hero-content {
          position: relative;
          z-index: 2;
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 1.5rem;
        }

        .hero-subtitle {
          font-size: 1.25rem;
          line-height: 1.6;
          margin-bottom: 2rem;
          opacity: 0.9;
        }

        .hero-buttons {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .stats-section {
          background: #F8FAFC;
        }

        .stat-item {
          padding: 2rem 1rem;
        }

        .stat-icon {
          width: 3rem;
          height: 3rem;
          color: #1E40AF;
          margin-bottom: 1rem;
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: 700;
          color: #1E40AF;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          font-size: 1rem;
          color: #6B7280;
          margin: 0;
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #1F2937;
          margin-bottom: 1.5rem;
        }

        .section-subtitle {
          font-size: 1.125rem;
          color: #6B7280;
          margin-bottom: 0;
        }

        .section-text {
          font-size: 1.125rem;
          line-height: 1.7;
          color: #4B5563;
          margin-bottom: 2rem;
        }

        .mission-points {
          margin-top: 2rem;
        }

        .mission-point {
          display: flex;
          align-items: center;
          margin-bottom: 1rem;
        }

        .check-icon {
          width: 1.5rem;
          height: 1.5rem;
          color: #10B981;
          margin-right: 1rem;
        }

        .vision-goals {
          margin-top: 2rem;
        }

        .goal-item {
          display: flex;
          align-items: flex-start;
          margin-bottom: 2rem;
        }

        .goal-icon {
          width: 2rem;
          height: 2rem;
          color: #1E40AF;
          margin-right: 1rem;
          margin-top: 0.25rem;
        }

        .goal-item h4 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #1F2937;
          margin-bottom: 0.5rem;
        }

        .goal-item p {
          color: #6B7280;
          margin: 0;
        }

        .value-card {
          text-align: center;
          padding: 2rem 1.5rem;
          background: white;
          border-radius: 1rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          height: 100%;
        }

        .value-icon {
          width: 3rem;
          height: 3rem;
          color: #1E40AF;
          margin-bottom: 1.5rem;
        }

        .value-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #1F2937;
          margin-bottom: 1rem;
        }

        .value-description {
          color: #6B7280;
          line-height: 1.6;
          margin: 0;
        }

        .team-card {
          text-align: center;
          background: white;
          border-radius: 1rem;
          padding: 2rem 1.5rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          height: 100%;
        }

        .team-image {
          width: 8rem;
          height: 8rem;
          border-radius: 50%;
          object-fit: cover;
          margin-bottom: 1.5rem;
        }

        .team-name {
          font-size: 1.25rem;
          font-weight: 600;
          color: #1F2937;
          margin-bottom: 0.5rem;
        }

        .team-role {
          color: #1E40AF;
          font-weight: 500;
          margin-bottom: 1rem;
        }

        .team-bio {
          color: #6B7280;
          line-height: 1.6;
          margin: 0;
        }

        .cta-section {
          background: linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%);
        }

        .cta-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .cta-subtitle {
          font-size: 1.25rem;
          margin-bottom: 2rem;
          opacity: 0.9;
        }

        .cta-buttons {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }
          
          .section-title {
            font-size: 2rem;
          }
          
          .cta-title {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default AboutUs;
