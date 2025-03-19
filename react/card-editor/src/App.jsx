import { useState } from 'react';
import Card from './components/Card';
import CardForm from './components/CardForm';
import './App.css';

function App() {
  const initialCardProps = {
    title: "Mountain Vista",
    subtext: "A serene mountain landscape captured during golden hour, showcasing nature's majestic beauty in all its glory.",
    backgroundColor: "#ffffff",
    textColor: "#000000",
    imageUrl: "",
  };

  const [cardProps, setCardProps] = useState(initialCardProps);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setCardProps(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleReset = () => {
    setCardProps(initialCardProps);
  };

  return (
    <div className="min-h-screen p-4 flex items-start justify-center gap-8">
      <div className="w-96">
        <CardForm 
          onFormChange={handleFormChange} 
          onReset={handleReset}
          values={cardProps}
        />
      </div>
      <div className="w-96 sticky top-4">
        <Card {...cardProps} />
      </div>
    </div>
  );
}

export default App;