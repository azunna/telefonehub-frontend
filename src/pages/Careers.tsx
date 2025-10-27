import React, { useState } from 'react';
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';
import { 
  MapPin, 
  Clock, 
  Users, 
  Heart, 
  Zap, 
  Globe, 
  Award,
  Coffee,
  Laptop,
  Gamepad2,
  BookOpen,
  Dumbbell,
  Plane,
  Home,
  DollarSign,
  Shield,
  Lightbulb,
  Target,
  Search,
  Filter
} from 'lucide-react';

const Careers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');

  const departments = [
    { id: 'all', name: 'All Departments' },
    { id: 'engineering', name: 'Engineering' },
    { id: 'product', name: 'Product' },
    { id: 'design', name: 'Design' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'sales', name: 'Sales' },
    { id: 'operations', name: 'Operations' },
  ];

  const locations = [
    { id: 'all', name: 'All Locations' },
    { id: 'san-francisco', name: 'San Francisco, CA' },
    { id: 'new-york', name: 'New York, NY' },
    { id: 'london', name: 'London, UK' },
    { id: 'singapore', name: 'Singapore' },
    { id: 'remote', name: 'Remote' },
  ];

  const benefits = [
    {
      icon: DollarSign,
      title: 'Competitive Salary',
      description: 'Above-market compensation with equity options'
    },
    {
      icon: Heart,
      title: 'Health & Wellness',
      description: 'Comprehensive health, dental, and vision coverage'
    },
    {
      icon: Home,
      title: 'Flexible Work',
      description: 'Remote-first culture with flexible hours'
    },
    {
      icon: Plane,
      title: 'Unlimited PTO',
      description: 'Take time off when you need it, no questions asked'
    },
    {
      icon: BookOpen,
      title: 'Learning Budget',
      description: '$2,000 annual budget for courses and conferences'
    },
    {
      icon: Laptop,
      title: 'Equipment',
      description: 'Latest MacBook Pro and all the tools you need'
    },
    {
      icon: Dumbbell,
      title: 'Fitness',
      description: 'Gym membership and wellness programs'
    },
    {
      icon: Coffee,
      title: 'Office Perks',
      description: 'Free meals, snacks, and premium coffee'
    }
  ];

  const values = [
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We encourage creative thinking and bold ideas that push boundaries.'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'We believe the best solutions come from diverse teams working together.'
    },
    {
      icon: Target,
      title: 'Excellence',
      description: 'We strive for the highest quality in everything we do.'
    },
    {
      icon: Shield,
      title: 'Integrity',
      description: 'We do the right thing, even when no one is watching.'
    }
  ];

  const openPositions = [
    {
      id: 1,
      title: 'Senior Software Engineer',
      department: 'engineering',
      location: 'san-francisco',
      type: 'Full-time',
      experience: '5+ years',
      description: 'Build scalable backend systems and APIs for our communication platform.',
      requirements: ['Node.js, Python, or Go', 'Microservices architecture', 'AWS/GCP experience', '5+ years experience'],
      posted: '2 days ago',
      featured: true
    },
    {
      id: 2,
      title: 'Product Manager',
      department: 'product',
      location: 'new-york',
      type: 'Full-time',
      experience: '3+ years',
      description: 'Lead product strategy and roadmap for our AI-powered communication features.',
      requirements: ['Product management experience', 'Technical background', 'AI/ML knowledge', '3+ years experience'],
      posted: '1 week ago',
      featured: false
    },
    {
      id: 3,
      title: 'UX Designer',
      department: 'design',
      location: 'remote',
      type: 'Full-time',
      experience: '4+ years',
      description: 'Design intuitive user experiences for our mobile and web applications.',
      requirements: ['Figma, Sketch, or Adobe XD', 'Mobile design experience', 'User research skills', '4+ years experience'],
      posted: '3 days ago',
      featured: true
    },
    {
      id: 4,
      title: 'DevOps Engineer',
      department: 'engineering',
      location: 'london',
      type: 'Full-time',
      experience: '4+ years',
      description: 'Manage our cloud infrastructure and deployment pipelines.',
      requirements: ['Kubernetes, Docker', 'AWS/Azure/GCP', 'CI/CD pipelines', '4+ years experience'],
      posted: '5 days ago',
      featured: false
    },
    {
      id: 5,
      title: 'Sales Development Representative',
      department: 'sales',
      location: 'san-francisco',
      type: 'Full-time',
      experience: '1+ years',
      description: 'Generate leads and qualify prospects for our enterprise sales team.',
      requirements: ['Sales experience', 'CRM knowledge', 'Communication skills', '1+ years experience'],
      posted: '1 week ago',
      featured: false
    },
    {
      id: 6,
      title: 'AI Research Scientist',
      department: 'engineering',
      location: 'singapore',
      type: 'Full-time',
      experience: 'PhD or 5+ years',
      description: 'Research and develop AI models for voice and video processing.',
      requirements: ['PhD in AI/ML or 5+ years', 'PyTorch/TensorFlow', 'NLP/Computer Vision', 'Research experience'],
      posted: '2 weeks ago',
      featured: true
    }
  ];

  const filteredPositions = openPositions.filter(position => {
    const matchesSearch = position.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         position.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || position.department === selectedDepartment;
    const matchesLocation = selectedLocation === 'all' || position.location === selectedLocation;
    
    return matchesSearch && matchesDepartment && matchesLocation;
  });

  const getDepartmentColor = (department: string) => {
    const colors: { [key: string]: string } = {
      engineering: 'primary',
      product: 'success',
      design: 'warning',
      marketing: 'info',
      sales: 'danger',
      operations: 'secondary'
    };
    return colors[department] || 'secondary';
  };

  return (
    <div className="careers">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <Row className="align-items-center min-vh-100">
            <Col lg={8} className="mx-auto text-center">
              <h1 className="hero-title">Join Our Mission</h1>
              <p className="hero-subtitle">
                Help us build the future of global communication. We're looking for 
                passionate individuals who want to make a real impact.
              </p>
              <div className="hero-stats">
                <div className="stat">
                  <Users className="stat-icon" />
                  <div className="stat-content">
                    <div className="stat-number">150+</div>
                    <div className="stat-label">Team Members</div>
                  </div>
                </div>
                <div className="stat">
                  <Globe className="stat-icon" />
                  <div className="stat-content">
                    <div className="stat-number">20+</div>
                    <div className="stat-label">Countries</div>
                  </div>
                </div>
                <div className="stat">
                  <Award className="stat-icon" />
                  <div className="stat-content">
                    <div className="stat-number">4.8</div>
                    <div className="stat-label">Glassdoor Rating</div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </section>

      {/* Search Section */}
      <section className="search-section">
        <div className="container">
          <Row>
            <Col lg={8} className="mx-auto">
              <div className="search-container">
                <div className="search-bar">
                  <Search className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search for jobs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
                </div>
                <div className="filters">
                  <div className="filter-group">
                    <Filter className="filter-icon" />
                    <select
                      value={selectedDepartment}
                      onChange={(e) => setSelectedDepartment(e.target.value)}
                      className="filter-select"
                    >
                      {departments.map(dept => (
                        <option key={dept.id} value={dept.id}>{dept.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="filter-group">
                    <MapPin className="filter-icon" />
                    <select
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="filter-select"
                    >
                      {locations.map(location => (
                        <option key={location.id} value={location.id}>{location.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </section>

      {/* Open Positions */}
      <section className="positions-section">
        <div className="container">
          <div className="section-header">
            <h2>Open Positions</h2>
            <p>Find your next opportunity with us</p>
          </div>
          <Row>
            {filteredPositions.map((position) => (
              <Col lg={6} key={position.id} className="mb-4">
                <Card className={`position-card ${position.featured ? 'featured' : ''}`}>
                  <Card.Body>
                    <div className="position-header">
                      <div className="position-title">
                        <h4>{position.title}</h4>
                        {position.featured && (
                          <Badge bg="primary" className="featured-badge">Featured</Badge>
                        )}
                      </div>
                      <div className="position-meta">
                        <Badge bg={getDepartmentColor(position.department)}>
                          {departments.find(d => d.id === position.department)?.name}
                        </Badge>
                        <span className="position-location">
                          <MapPin className="location-icon" />
                          {locations.find(l => l.id === position.location)?.name}
                        </span>
                        <span className="position-type">{position.type}</span>
                      </div>
                    </div>
                    <p className="position-description">{position.description}</p>
                    <div className="position-requirements">
                      <strong>Requirements:</strong>
                      <ul>
                        {position.requirements.slice(0, 3).map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="position-footer">
                      <span className="posted-date">
                        <Clock className="clock-icon" />
                        Posted {position.posted}
                      </span>
                      <Button variant="primary" size="sm">
                        Apply Now
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="container">
          <div className="section-header">
            <h2>Why Work With Us</h2>
            <p>We offer comprehensive benefits and perks to support our team</p>
          </div>
          <Row>
            {benefits.map((benefit, index) => (
              <Col lg={3} md={6} key={index} className="mb-4">
                <div className="benefit-card">
                  <benefit.icon className="benefit-icon" />
                  <h4 className="benefit-title">{benefit.title}</h4>
                  <p className="benefit-description">{benefit.description}</p>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <div className="section-header">
            <h2>Our Values</h2>
            <p>The principles that guide our culture and decisions</p>
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

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <Row className="text-center">
            <Col lg={8} className="mx-auto">
              <h2>Don't See the Right Role?</h2>
              <p>
                We're always looking for talented individuals. Send us your resume 
                and we'll keep you in mind for future opportunities.
              </p>
              <Button variant="primary" size="lg" className="me-3">
                Submit Resume
              </Button>
              <Button variant="outline-primary" size="lg">
                Learn More
              </Button>
            </Col>
          </Row>
        </div>
      </section>

      <style>{`
        .careers {
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
          margin-bottom: 1.5rem;
        }

        .hero-subtitle {
          font-size: 1.25rem;
          margin-bottom: 3rem;
          opacity: 0.9;
        }

        .hero-stats {
          display: flex;
          justify-content: center;
          gap: 3rem;
          flex-wrap: wrap;
        }

        .stat {
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

        .stat-number {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
        }

        .stat-label {
          font-size: 0.875rem;
          opacity: 0.8;
        }

        .search-section {
          background: #F8FAFC;
          padding: 3rem 0;
        }

        .search-container {
          background: white;
          padding: 2rem;
          border-radius: 1rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .search-bar {
          position: relative;
          margin-bottom: 1.5rem;
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
          width: 100%;
          padding: 1rem 1rem 1rem 3rem;
          border: 1px solid #D1D5DB;
          border-radius: 0.5rem;
          font-size: 1rem;
        }

        .filters {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .filter-group {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .filter-icon {
          width: 1.25rem;
          height: 1.25rem;
          color: #6B7280;
        }

        .filter-select {
          padding: 0.75rem;
          border: 1px solid #D1D5DB;
          border-radius: 0.5rem;
          font-size: 0.875rem;
        }

        .positions-section {
          padding: 4rem 0;
        }

        .section-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .section-header h2 {
          font-size: 2.5rem;
          font-weight: 700;
          color: #1F2937;
          margin-bottom: 1rem;
        }

        .section-header p {
          font-size: 1.125rem;
          color: #6B7280;
        }

        .position-card {
          height: 100%;
          border: 1px solid #E5E7EB;
          transition: all 0.3s ease;
        }

        .position-card:hover {
          box-shadow: 0 8px 25px -5px rgba(0, 0, 0, 0.1);
          transform: translateY(-2px);
        }

        .position-card.featured {
          border-color: #1E40AF;
          background: linear-gradient(135deg, #F8FAFF 0%, #FFFFFF 100%);
        }

        .position-header {
          margin-bottom: 1rem;
        }

        .position-title {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 0.75rem;
        }

        .position-title h4 {
          color: #1F2937;
          margin: 0;
          font-size: 1.25rem;
        }

        .featured-badge {
          font-size: 0.75rem;
        }

        .position-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          align-items: center;
        }

        .position-location {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          color: #6B7280;
          font-size: 0.875rem;
        }

        .location-icon {
          width: 1rem;
          height: 1rem;
        }

        .position-type {
          color: #6B7280;
          font-size: 0.875rem;
        }

        .position-description {
          color: #4B5563;
          margin-bottom: 1rem;
          line-height: 1.6;
        }

        .position-requirements {
          margin-bottom: 1.5rem;
        }

        .position-requirements strong {
          color: #1F2937;
          font-size: 0.875rem;
        }

        .position-requirements ul {
          margin: 0.5rem 0 0 1rem;
          padding: 0;
        }

        .position-requirements li {
          color: #6B7280;
          font-size: 0.875rem;
          margin-bottom: 0.25rem;
        }

        .position-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .posted-date {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          color: #6B7280;
          font-size: 0.875rem;
        }

        .clock-icon {
          width: 1rem;
          height: 1rem;
        }

        .benefits-section {
          background: #F8FAFC;
          padding: 4rem 0;
        }

        .benefit-card {
          text-align: center;
          background: white;
          padding: 2rem 1.5rem;
          border-radius: 1rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          height: 100%;
        }

        .benefit-icon {
          width: 3rem;
          height: 3rem;
          color: #1E40AF;
          margin-bottom: 1rem;
        }

        .benefit-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #1F2937;
          margin-bottom: 0.75rem;
        }

        .benefit-description {
          color: #6B7280;
          line-height: 1.6;
          margin: 0;
        }

        .values-section {
          padding: 4rem 0;
        }

        .value-card {
          text-align: center;
          padding: 2rem 1.5rem;
          height: 100%;
        }

        .value-icon {
          width: 3rem;
          height: 3rem;
          color: #1E40AF;
          margin-bottom: 1rem;
        }

        .value-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #1F2937;
          margin-bottom: 0.75rem;
        }

        .value-description {
          color: #6B7280;
          line-height: 1.6;
          margin: 0;
        }

        .cta-section {
          background: linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%);
          color: white;
          padding: 4rem 0;
        }

        .cta-section h2 {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .cta-section p {
          font-size: 1.125rem;
          margin-bottom: 2rem;
          opacity: 0.9;
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }
          
          .hero-stats {
            flex-direction: column;
            gap: 1rem;
          }
          
          .filters {
            flex-direction: column;
          }
          
          .position-title {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Careers;
