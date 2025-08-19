const API_BASE_URL = 'http://localhost:8000/api/v1';

class ModelComparatorAPI {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async getModels() {
    try {
      const response = await fetch(`${this.baseURL}/models`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching models:', error);
      throw error;
    }
  }

  async compareModels(prompt, modelNames = null) {
    try {
      const requestBody = {
        prompt: prompt,
        model_names: modelNames
      };

      const response = await fetch(`${this.baseURL}/compare`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error comparing models:', error);
      throw error;
    }
  }

  async healthCheck() {
    try {
      const response = await fetch(`${this.baseURL}/health`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error checking API health:', error);
      throw error;
    }
  }

  // Helper method to check if API is available
  async isAvailable() {
    try {
      await this.healthCheck();
      return true;
    } catch (error) {
      return false;
    }
  }
}

export default new ModelComparatorAPI();
