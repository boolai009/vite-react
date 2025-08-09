import React, { useState } from 'react';
import { Code, ArrowLeft, ExternalLink, Download, Play, Star, Zap, Users, Target, Calendar } from 'lucide-react';

// Game data structure
interface Game {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  screenshot: string;
  technologies: string[];
  highlights: string[];
  status: 'live' | 'development' | 'completed';
  playUrl: string;
  sourceUrl?: string;
  downloadUrl?: string;
  featured?: boolean;
}

// Sample games data - replace with your actual games
const games: Game[] = [
  {
    id: 'advanced-pong',
    title: '🏓 Advanced Pong',
    subtitle: 'Enterprise-Grade Unity Architecture',
    description: 'Professional Unity game showcasing advanced physics, component architecture, and modern development practices. Built with zero-coupling design and enterprise-grade patterns.',
    screenshot: '/api/placeholder/600/400', // Replace with actual screenshot
    technologies: ['Unity 2023.2', 'C#', 'WebGL', 'UniTask', 'New Input System'],
    highlights: [
      'Zero tunneling physics with raycast collision',
      'Component decoupling with event-driven architecture', 
      'Cross-platform responsive design',
      'Professional development workflows'
    ],
    status: 'live',
    playUrl: '/games/pong',
    sourceUrl: 'https://github.com/yourusername/advanced-pong',
    featured: true
  },
  {
    id: 'space-shooter',
    title: '🚀 Quantum Defense',
    subtitle: '3D Space Combat Simulator',
    description: 'High-performance 3D space shooter featuring advanced AI, particle systems, and procedural level generation. Showcases optimization techniques and modern Unity rendering.',
    screenshot: '/api/placeholder/600/400',
    technologies: ['Unity 2023.2', 'URP', 'C#', 'Cinemachine', 'ProBuilder'],
    highlights: [
      'Advanced AI behavior trees',
      'Custom shader programming',
      'Procedural level generation',
      'Optimized for 60+ FPS'
    ],
    status: 'development',
    playUrl: '/games/space-shooter',
    sourceUrl: 'https://github.com/yourusername/quantum-defense'
  },
  {
    id: 'puzzle-game',
    title: '🧩 Neural Networks',
    subtitle: 'Logic Puzzle Game',
    description: 'Mind-bending puzzle game combining circuit logic with neural network concepts. Features procedural puzzle generation and adaptive difficulty systems.',
    screenshot: '/api/placeholder/600/400',
    technologies: ['Unity 2023.2', 'C#', 'DOTween', 'Custom Editor Tools'],
    highlights: [
      'Procedural puzzle generation',
      'Adaptive difficulty AI',
      'Custom Unity editor tools',
      'Beautiful minimal UI design'
    ],
    status: 'completed',
    playUrl: '/games/neural-networks',
    downloadUrl: '/downloads/neural-networks.zip'
  },
  {
    id: 'vr-experience',
    title: '🥽 Industrial Training VR',
    subtitle: 'Virtual Reality Training Platform',
    description: 'Professional VR training simulation for industrial equipment operation. Features haptic feedback, safety protocols, and performance analytics.',
    screenshot: '/api/placeholder/600/400',
    technologies: ['Unity XR', 'Oculus SDK', 'C#', 'XR Interaction Toolkit'],
    highlights: [
      'Realistic physics simulation',
      'Hand tracking integration',
      'Safety protocol training',
      'Performance analytics dashboard'
    ],
    status: 'completed',
    playUrl: '/games/vr-training',
    sourceUrl: 'https://github.com/yourusername/vr-training'
  }
];

const statusColors = {
  live: { bg: 'rgba(34, 197, 94, 0.2)', text: '#22c55e', border: '#22c55e' },
  development: { bg: 'rgba(251, 191, 36, 0.2)', text: '#fbbf24', border: '#fbbf24' },
  completed: { bg: 'rgba(147, 51, 234, 0.2)', text: '#9333ea', border: '#9333ea' }
};

const statusLabels = {
  live: 'Live & Playable',
  development: 'In Development', 
  completed: 'Completed'
};

// Individual Game Card Component
const GameCard: React.FC<{ game: Game }> = ({ game }) => {
  const statusStyle = statusColors[game.status];
  
  return (
    <div className={`experience-card ${game.featured ? 'featured-game' : ''}`} style={{ 
      marginBottom: '2rem',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      position: 'relative'
    }}
    onMouseEnter={(e) => {
      (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
      (e.currentTarget as HTMLElement).style.background = 'rgba(255, 255, 255, 0.15)';
    }}
    onMouseLeave={(e) => {
      (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
      (e.currentTarget as HTMLElement).style.background = 'rgba(255, 255, 255, 0.1)';
    }}
    >
      {game.featured && (
        <div style={{
          position: 'absolute',
          top: '-8px',
          right: '20px',
          background: 'linear-gradient(45deg, #9333ea, #3b82f6)',
          color: 'white',
          padding: '4px 12px',
          borderRadius: '12px',
          fontSize: '0.75rem',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          <Star size={12} />
          Featured
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '2rem', alignItems: 'start' }}>
        {/* Game Screenshot */}
        <div style={{
          width: '300px',
          height: '200px',
          borderRadius: '8px',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #1f2937, #374151)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
        }}>
          <img 
            src={game.screenshot} 
            alt={`${game.title} screenshot`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
            onError={(e) => {
              // Fallback for missing images
              (e.target as HTMLImageElement).style.display = 'none';
              (e.target as HTMLImageElement).parentElement!.innerHTML = `
                <div style="color: #9ca3af; text-align: center; padding: 1rem;">
                  <div style="font-size: 2rem; margin-bottom: 0.5rem;">🎮</div>
                  <div>Screenshot Coming Soon</div>
                </div>
              `;
            }}
          />
          
          {/* Play Overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0,
            transition: 'opacity 0.3s ease'
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.opacity = '1';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.opacity = '0';
          }}
          >
            <div style={{
              background: 'rgba(147, 51, 234, 0.9)',
              color: 'white',
              padding: '12px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Play size={24} fill="white" />
            </div>
          </div>
        </div>

        {/* Game Info */}
        <div style={{ flex: 1 }}>
          <div className="experience-header">
            <div style={{ flex: 1 }}>
              <h3 className="experience-company" style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>
                {game.title}
              </h3>
              <h4 className="experience-position" style={{ color: '#a855f7', marginBottom: '1rem' }}>
                {game.subtitle}
              </h4>
              
              {/* Status Badge */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: statusStyle.bg,
                color: statusStyle.text,
                border: `1px solid ${statusStyle.border}`,
                padding: '0.25rem 0.75rem',
                borderRadius: '12px',
                fontSize: '0.75rem',
                fontWeight: '600',
                marginBottom: '1rem'
              }}>
                <div style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: statusStyle.text
                }} />
                {statusLabels[game.status]}
              </div>
              
              <p style={{ color: '#d1d5db', lineHeight: '1.6', marginBottom: '1rem' }}>
                {game.description}
              </p>
            </div>
          </div>

          {/* Technologies */}
          <div style={{ marginBottom: '1rem' }}>
            <h5 style={{ color: '#a855f7', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>
              Technologies Used
            </h5>
            <div className="skill-tags">
              {game.technologies.map((tech, index) => (
                <span key={index} className="skill-tag" style={{ fontSize: '0.75rem' }}>
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Key Highlights */}
          <ul className="experience-highlights" style={{ marginBottom: '1.5rem' }}>
            {game.highlights.map((highlight, index) => (
              <li key={index} className="experience-highlight">
                <Zap className="experience-highlight-icon" />
                <span className="experience-highlight-text">{highlight}</span>
              </li>
            ))}
          </ul>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href={game.playUrl} className="btn-primary">
              <Play className="lucide" size={16} />
              <span>Play Game</span>
            </a>
            
            {game.sourceUrl && (
              <a href={game.sourceUrl} className="btn-secondary" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="lucide" size={16} />
                <span>Source Code</span>
              </a>
            )}
            
            {game.downloadUrl && (
              <a href={game.downloadUrl} className="btn-secondary">
                <Download className="lucide" size={16} />
                <span>Download</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Games Index Page
const GamesPage: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'live' | 'development' | 'completed'>('all');
  
  const filteredGames = filter === 'all' ? games : games.filter(game => game.status === filter);
  const featuredGames = games.filter(game => game.featured);

  return (
    <div className="portfolio">
      {/* Navigation */}
      <nav className="nav">
        <div className="nav-container">
          <div className="nav-brand">
            <div className="nav-logo">
              <Code className="lucide" />
            </div>
            <span className="nav-title">Misael Aponte</span>
          </div>
          
          <div className="nav-links">
            <a 
              href="/" 
              className="nav-link"
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem',
                textDecoration: 'none',
                color: 'inherit'
              }}
            >
              <ArrowLeft size={16} />
              Back to Portfolio
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-avatar">
            🎮
          </div>
          <h1 className="hero-title">
            Interactive Game
            <span className="hero-subtitle">
              Portfolio
            </span>
          </h1>
          <p className="hero-description">
            A showcase of Unity games demonstrating advanced programming techniques, 
            modern development practices, and professional software architecture.
          </p>
          
          {/* Portfolio Stats */}
          <div className="hero-tags">
            <div className="hero-tag">
              <Target className="hero-tag-icon" />
              <span>{games.length} Games</span>
            </div>
            <div className="hero-tag">
              <Users className="hero-tag-icon" />
              <span>{games.filter(g => g.status === 'live').length} Live</span>
            </div>
            <div className="hero-tag">
              <Calendar className="hero-tag-icon" />
              <span>2024-2025</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { key: 'all', label: 'All Games', count: games.length },
            { key: 'live', label: 'Live & Playable', count: games.filter(g => g.status === 'live').length },
            { key: 'development', label: 'In Development', count: games.filter(g => g.status === 'development').length },
            { key: 'completed', label: 'Completed', count: games.filter(g => g.status === 'completed').length }
          ].map(({ key, label, count }) => (
            <button
              key={key}
              onClick={() => setFilter(key as any)}
              className={filter === key ? 'btn-primary' : 'btn-secondary'}
              style={{ 
                fontSize: '0.875rem',
                padding: '0.5rem 1rem',
                minWidth: 'auto'
              }}
            >
              {label} ({count})
            </button>
          ))}
        </div>
      </section>

      {/* Featured Games */}
      {filter === 'all' && featuredGames.length > 0 && (
        <section style={{ padding: '0 2rem 2rem', maxWidth: '1400px', margin: '0 auto' }}>
          <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '2rem', textAlign: 'left' }}>
            ⭐ Featured Projects
          </h2>
          {featuredGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </section>
      )}

      {/* All Games */}
      <section style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
        <h2 className="section-title" style={{ 
          fontSize: '1.5rem', 
          marginBottom: '2rem', 
          textAlign: 'left',
          display: filter === 'all' && featuredGames.length > 0 ? 'block' : 'none'
        }}>
          📚 All Games
        </h2>
        
        {filteredGames.length > 0 ? (
          filteredGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))
        ) : (
          <div className="experience-card" style={{ textAlign: 'center', padding: '3rem' }}>
            <p style={{ color: '#9ca3af', fontSize: '1.125rem' }}>
              No games found for the selected filter.
            </p>
          </div>
        )}
      </section>

      {/* Call to Action */}
      <section className="contact-section">
        <h2 className="section-title">Interested in My Game Development?</h2>
        <p className="contact-description">
          Each game demonstrates different aspects of professional Unity development. 
          Let's discuss how these skills can benefit your next project.
        </p>
        <div className="contact-buttons">
          <a href="mailto:maponteprof@gmail.com" className="btn-primary">
            <span>Get In Touch</span>
          </a>
          <a href="/" className="btn-secondary">
            <span>View Full Portfolio</span>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p className="footer-text">
          &copy; 2025 Misael Aponte - Interactive Game Portfolio
        </p>
      </footer>

      <style>{`
        .featured-game {
          border: 2px solid rgba(147, 51, 234, 0.5) !important;
          box-shadow: 0 8px 32px rgba(147, 51, 234, 0.2) !important;
        }
        
        @media (max-width: 768px) {
          .experience-card > div {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }
          
          .experience-card img {
            width: 100% !important;
            max-width: 400px !important;
            margin: 0 auto !important;
          }
        }
      `}</style>
    </div>
  );
};

export default GamesPage;