import React, { useState, useEffect, useRef } from 'react';
import { Gamepad2, AlertTriangle, ExternalLink, Download, ArrowLeft, Code } from 'lucide-react';

// Unity Game Component - Fixed canvas setup for Unity
const UnityGame = ({ 
  gameName = "Pong", 
  height = "600px"
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [unityInstance, setUnityInstance] = useState<any>(null);

  useEffect(() => {
    const loadUnity = async () => {
      try {
        // Ensure canvas has proper setup for Unity
        if (canvasRef.current) {
          canvasRef.current.id = 'unity-canvas';
          canvasRef.current.tabIndex = -1;
        }

        const script = document.createElement('script');
        script.src = `/unity/pong/Build/${gameName}.loader.js`;
        script.onload = initUnity;
        script.onerror = () => setError('Failed to load Unity loader script');
        document.head.appendChild(script);
      } catch (err) {
        setError(`Unity initialization failed: ${(err as Error).message}`);
      }
    };

    const initUnity = async () => {
      if (!window.createUnityInstance || !canvasRef.current) return;

      try {
        const config = {
          dataUrl: `/unity/pong/Build/${gameName}.data.gz`,
          frameworkUrl: `/unity/pong/Build/${gameName}.framework.js.gz`,
          codeUrl: `/unity/pong/Build/${gameName}.wasm.gz`,
          streamingAssetsUrl: "StreamingAssets",
          companyName: "Misael Aponte",
          productName: "PongRemastered",
          productVersion: "1.0",
          // Add these Unity-specific settings
          matchWebGLToCanvasSize: false,
          devicePixelRatio: 1,
        };

        const instance = await window.createUnityInstance(
          canvasRef.current, 
          config, 
          (progressValue: number) => {
            setProgress(Math.round(progressValue * 100));
          }
        );

        setUnityInstance(instance);
        setLoading(false);
      } catch (err) {
        setError(`Failed to create Unity instance: ${(err as Error).message}`);
        setLoading(false);
      }
    };

    loadUnity();

    return () => {
      if (unityInstance) {
        unityInstance.Quit().catch(console.error);
      }
    };
  }, [gameName]);

  if (error) {
    return (
      <div className="error-container">
        <AlertTriangle size={40} style={{ marginBottom: '12px', color: '#ff6b6b' }} />
        <h4 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>Game Load Error</h4>
        <p style={{ margin: '0 0 12px 0', fontSize: '14px' }}>{error}</p>
        <small style={{ color: '#636e72' }}>
          Files found at: /unity/pong/Build/{gameName}.*
        </small>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="unity-container" 
      style={{ 
        height, 
        margin: '2rem 0', 
        width: '100%',
        position: 'relative',
        background: '#000',
        borderRadius: '8px',
        overflow: 'hidden'
      }}
    >
      {loading && (
        <div className="loading-overlay">
          <div style={{ textAlign: 'center' }}>
            <Gamepad2 size={48} style={{ 
              marginBottom: '20px', 
              color: '#a855f7',
              animation: 'pulse 2s infinite'
            }} />
            <h4 style={{ 
              margin: '0 0 16px 0', 
              fontSize: '20px',
              fontWeight: '600',
              color: 'white'
            }}>
              Loading PongRemastered...
            </h4>
            
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${progress}%` }}
              />
            </div>
            
            <p style={{ 
              margin: '8px 0 0 0', 
              fontSize: '16px',
              color: '#a855f7'
            }}>
              {progress}%
            </p>
          </div>
        </div>
      )}
      
      <canvas
        ref={canvasRef}
        id="unity-canvas"
        tabIndex={-1}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          outline: 'none',
          border: 'none'
        }}
      />
    </div>
  );
};

// Main Pong Page Component  
const PongPage: React.FC = () => {
  return (
    <div className="portfolio">
      {/* Navigation */}
      <nav className="nav">
        <div className="nav-container">
          <div className="nav-brand">
            <div className="nav-logo">
              <Code className="lucide" />
            </div>
            <span className="nav-title">PongRemastered</span>
          </div>
          
          <div className="nav-links">
            <a 
              href="/games" 
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
              Back to Games
            </a>
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
              Back to Portfolio
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-avatar">
            🏓
          </div>
          <h1 className="hero-title">
            PongRemastered
            <span className="hero-subtitle">
              Enterprise Unity Architecture
            </span>
          </h1>
          <p className="hero-description">
            Professional Unity game showcasing advanced physics, component architecture, 
            and modern development practices. Experience zero-tunneling physics and 
            enterprise-grade software design patterns.
          </p>
          
          {/* Game Stats */}
          <div className="hero-tags">
            <div className="hero-tag">
              <Gamepad2 className="hero-tag-icon" />
              <span>WebGL Ready</span>
            </div>
            <div className="hero-tag">
              <Code className="hero-tag-icon" />
              <span>Unity 2023.2</span>
            </div>
            <div className="hero-tag">
              <span>🚀</span>
              <span>Zero Tunneling</span>
            </div>
          </div>
        </div>
      </section>

      {/* Game Section */}
      <section style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Game Container */}
        <div className="experience-card" style={{ marginBottom: '3rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', color: '#a855f7', marginBottom: '1rem' }}>
              🎮 Play Now
            </h2>
            <p style={{ color: '#d1d5db', marginBottom: '1rem' }}>
              Use W/S or Arrow keys to control paddles. Click to start!
            </p>
          </div>

          {/* Unity Game - Fixed canvas setup */}
          <UnityGame gameName="Pong" height="600px" />
        </div>

        {/* Technical Details */}
        <div className="skills-grid">
          <div className="skill-category">
            <h3 className="skill-category-title">🎮 Game Controls</h3>
            <div style={{ color: '#d1d5db', lineHeight: '1.6' }}>
              <p><strong>Player 1:</strong> W/S keys or Mouse/Touch</p>
              <p><strong>Player 2:</strong> ↑/↓ arrow keys</p>
              <p><strong>Mobile:</strong> Touch controls supported</p>
              <p><strong>AI Mode:</strong> Built-in intelligent opponent</p>
            </div>
          </div>

          <div className="skill-category">
            <h3 className="skill-category-title">⚡ Technical Features</h3>
            <div className="skill-tags">
              <span className="skill-tag">Raycast Collision</span>
              <span className="skill-tag">Component Decoupling</span>
              <span className="skill-tag">UniTask Async</span>
              <span className="skill-tag">New Input System</span>
              <span className="skill-tag">Responsive Design</span>
              <span className="skill-tag">Professional Workflows</span>
            </div>
          </div>
        </div>

        {/* Architecture Deep Dive */}
        <div className="education-card" style={{ marginTop: '3rem' }}>
          <div className="education-header">
            <Code className="education-icon" />
            <h3 className="education-header-title">Architecture Highlights</h3>
          </div>
          
          <div className="education-item">
            <h4 className="education-degree">Zero-Coupling Component Design</h4>
            <p className="education-description">
              Components communicate only through UnityEvents with no direct references, 
              enabling independent development, testing, and infinite extensibility.
            </p>
          </div>
          
          <div className="education-item">
            <h4 className="education-degree">Advanced Physics Implementation</h4>
            <p className="education-description">
              Custom raycast collision detection prevents ball tunneling at unlimited speeds, 
              solving the fundamental problem mathematically rather than limiting performance.
            </p>
          </div>
          
          <div className="education-item">
            <h4 className="education-degree">Modern Unity Technology Stack</h4>
            <p className="education-description">
              Integrates Unity's New Input System, UniTask for high-performance async operations, 
              and professional development workflows with built-in testing and debugging tools.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="hero-buttons" style={{ justifyContent: 'center', marginTop: '3rem' }}>
          <button className="btn-primary">
            <ExternalLink className="lucide" />
            <span>View Source Code</span>
          </button>
          
          <button className="btn-secondary">
            <Download className="lucide" />
            <span>Download Build</span>
          </button>
          
          <a href="/games" className="btn-secondary">
            <ArrowLeft className="lucide" />
            <span>More Games</span>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p className="footer-text">
          &copy; 2025 Misael Aponte - PongRemastered | Enterprise Unity Development
        </p>
      </footer>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        
        #unity-canvas {
          outline: none !important;
          border: none !important;
        }
      `}</style>
    </div>
  );
};

export default PongPage;