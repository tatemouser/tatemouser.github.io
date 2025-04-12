
tatemouser-new/
├── node_modules/
├── public/
├── src/
│   ├── app/
│   │   ├── core/            # Core functionality, services, guards
│   │   │   ├── services/    # Global services
│   │   │   ├── guards/      # Route guards
│   │   │   └── models/      # Interfaces and models
│   │   ├── features/        # Feature modules
│   │   │   ├── home/        # Home page feature
│   │   │   │   ├── components/  # Components specific to home
│   │   │   │   │   ├── project-filter/
│   │   │   │   │   ├── cs-projects/
│   │   │   │   │   └── marketing-projects/
│   │   │   │   ├── home.component.html
│   │   │   │   ├── home.component.scss
│   │   │   │   ├── home.component.ts
│   │   │   │   └── home.component.spec.ts
│   │   │   ├── about/       # About page feature
│   │   │   │   ├── about.component.html
│   │   │   │   ├── about.component.scss
│   │   │   │   ├── about.component.ts
│   │   │   │   └── about.component.spec.ts
│   │   │   └── contact/     # Contact page feature
│   │   │       ├── contact.component.html
│   │   │       ├── contact.component.scss
│   │   │       ├── contact.component.ts
│   │   │       └── contact.component.spec.ts
│   │   ├── shared/          # Shared components, directives, pipes
│   │   │   ├── components/
│   │   │   │   ├── header/
│   │   │   │   │   ├── header.component.html
│   │   │   │   │   ├── header.component.scss
│   │   │   │   │   ├── header.component.ts
│   │   │   │   │   └── header.component.spec.ts
│   │   │   │   ├── footer/
│   │   │   │   │   ├── footer.component.html
│   │   │   │   │   ├── footer.component.scss
│   │   │   │   │   ├── footer.component.ts
│   │   │   │   │   └── footer.component.spec.ts
│   │   │   │   └── project-card/
│   │   │   │   │   ├── project-card.component.html
│   │   │   │   │   ├── project-card.component.scss
│   │   │   │   │   ├── project-card.component.ts
│   │   │   │   │   └── project-card.component.spec.ts
│   │   │   ├── directives/
│   │   │   └── pipes/
│   │   ├── app.component.html
│   │   ├── app.component.scss
│   │   ├── app.component.spec.ts
│   │   ├── app.component.ts
│   │   ├── app.config.ts
│   |   └── app.routes.ts
|   | 
│   |── assets/
│   │   └── images/
│   │       ├── about/
│   │       ├── contact/
│   │       ├── home/
│   │       ├── icons/
│   │       |    └── TEMPIMAGE.jpg
│   │       └── projects/
│   │   └── scss/
│   │       ├── _animations.scss/
│   │       ├── _responsive.scss/
│   │       └── _variables_.scss/
│   │   
│   │  
│   ├── environments/    # Environment configurations
│   ├── index.html
│   ├── main.ts
│   └── styles.scss      # Global styles
└── ... config files (angular.json, tsconfig.json, etc.)

