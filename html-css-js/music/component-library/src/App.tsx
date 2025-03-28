import './styles/globals.css'

export default function App() {
  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)] p-8">
      {/* Header */}
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-4 metal-title">Metallic Design System</h1>
        <p className="metal-subtitle">A modern, metallic-themed component library</p>
      </header>

      {/* Basic Components Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 metal-title">Basic Components</h2>
        
        {/* Buttons */}
        <div className="mb-8">
          <h3 className="text-xl mb-4 metal-subtitle">Buttons</h3>
          <div className="flex flex-wrap gap-4">
            <button className="metal-button">
              Default Button
            </button>
            <button className="metal-button">
              <i className="fas fa-play mr-2"></i>
              With Icon
            </button>
            <button className="metal-button" disabled>
              Disabled
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="mb-8">
          <h3 className="text-xl mb-4 metal-subtitle">Cards</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="metal-card">
              <div className="metal-texture"></div>
              <h4 className="text-lg font-semibold mb-2">Card Title</h4>
              <p className="text-sm opacity-80">This is a sample card with metallic styling.</p>
            </div>
            <div className="metal-card">
              <div className="metal-texture"></div>
              <h4 className="text-lg font-semibold mb-2">Card Title</h4>
              <p className="text-sm opacity-80">This is a sample card with metallic styling.</p>
            </div>
            <div className="metal-card">
              <div className="metal-texture"></div>
              <h4 className="text-lg font-semibold mb-2">Card Title</h4>
              <p className="text-sm opacity-80">This is a sample card with metallic styling.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Layout Components Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 metal-title">Layout Components</h2>
        
        {/* Container */}
        <div className="mb-8">
          <h3 className="text-xl mb-4 metal-subtitle">Container</h3>
          <div className="metal-container p-6">
            <div className="metal-texture"></div>
            <h4 className="text-lg font-semibold mb-4">Container Title</h4>
            <p className="mb-4">This is a metallic container with texture overlay.</p>
            <button className="metal-button">Action Button</button>
          </div>
        </div>

        {/* Grid */}
        <div className="mb-8">
          <h3 className="text-xl mb-4 metal-subtitle">Grid Layout</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="metal-card">
                <div className="metal-texture"></div>
                <h4 className="text-lg font-semibold mb-2">Grid Item {i}</h4>
                <p className="text-sm opacity-80">Sample content for grid item {i}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Typography Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 metal-title">Typography</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-lg mb-2 metal-subtitle">Headings</h3>
            <h1 className="text-4xl mb-2">Heading 1</h1>
            <h2 className="text-3xl mb-2">Heading 2</h2>
            <h3 className="text-2xl mb-2">Heading 3</h3>
            <h4 className="text-xl mb-2">Heading 4</h4>
          </div>

          <div>
            <h3 className="text-lg mb-2 metal-subtitle">Body Text</h3>
            <p className="text-base mb-2">Regular paragraph text with metallic styling.</p>
            <p className="text-sm mb-2">Smaller text for secondary information.</p>
            <p className="text-xs">Extra small text for fine details.</p>
          </div>
        </div>
      </section>

      {/* Interactive Elements Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 metal-title">Interactive Elements</h2>
        
        {/* Hover Effects */}
        <div className="mb-8">
          <h3 className="text-xl mb-4 metal-subtitle">Hover Effects</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="metal-card group cursor-pointer">
              <div className="metal-texture"></div>
              <h4 className="text-lg font-semibold mb-2 group-hover:text-[var(--color-metal-highlight)] transition-colors">
                Hover Card
              </h4>
              <p className="text-sm opacity-80">Hover over this card to see the effect.</p>
            </div>
            <div className="metal-card group cursor-pointer">
              <div className="metal-texture"></div>
              <h4 className="text-lg font-semibold mb-2 group-hover:text-[var(--color-metal-highlight)] transition-colors">
                Interactive Card
              </h4>
              <p className="text-sm opacity-80">This card has interactive hover states.</p>
            </div>
          </div>
        </div>

        {/* Loading States */}
        <div className="mb-8">
          <h3 className="text-xl mb-4 metal-subtitle">Loading States</h3>
          <div className="flex gap-4">
            <button className="metal-button" disabled>
              <span className="animate-spin mr-2">⚡</span>
              Loading...
            </button>
            <button className="metal-button" disabled>
              <span className="animate-pulse mr-2">⚡</span>
              Processing
            </button>
          </div>
        </div>
      </section>

      {/* Responsive Design Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 metal-title">Responsive Design</h2>
        
        <div className="metal-container p-6">
          <div className="metal-texture"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="metal-card">
              <h4 className="text-lg font-semibold mb-2">Mobile First</h4>
              <p className="text-sm opacity-80">Adapts to all screen sizes.</p>
            </div>
            <div className="metal-card">
              <h4 className="text-lg font-semibold mb-2">Tablet Ready</h4>
              <p className="text-sm opacity-80">Optimized for tablet views.</p>
            </div>
            <div className="metal-card">
              <h4 className="text-lg font-semibold mb-2">Desktop Optimized</h4>
              <p className="text-sm opacity-80">Enhanced for larger screens.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
