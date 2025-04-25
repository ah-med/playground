#!/bin/bash


# Create necessary directories if they don't exist
mkdir -p src/{atoms,molecules,organisms,templates,pages,styles,utils}

# Create placeholder files for components
touch src/atoms/{button,input,icon,typography}.tsx
touch src/molecules/{search-bar,card-header,form-group}.tsx
touch src/organisms/{music-card,playlist-grid,navigation-bar}.tsx
touch src/templates/{main-layout,sidebar-layout,grid-layout}.tsx
touch src/pages/{home-page,library-page,profile-page}.tsx

# Create placeholder files for stories
touch src/atoms/*.stories.tsx
touch src/molecules/*.stories.tsx
touch src/organisms/*.stories.tsx
touch src/templates/*.stories.tsx
touch src/pages/*.stories.tsx

echo "Setup complete! You can now run 'npm run storybook' to start the development server." 