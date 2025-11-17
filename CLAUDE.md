# CLAUDE.md - AI Assistant Guide for sreejit.dev

> Comprehensive guide for AI assistants working on Sreejit De's personal portfolio website

## Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture & Tech Stack](#architecture--tech-stack)
3. [Project Structure](#project-structure)
4. [Development Workflow](#development-workflow)
5. [Key Conventions](#key-conventions)
6. [Data Management](#data-management)
7. [Styling Guidelines](#styling-guidelines)
8. [Component Patterns](#component-patterns)
9. [Common Tasks](#common-tasks)
10. [Important Notes](#important-notes)

---

## Project Overview

**Type**: Personal portfolio website (Single-Page Application)
**Live URL**: https://www.sreejit.dev
**Purpose**: Showcase work experience, skills, projects, and blog posts
**Node Version**: 22.x (specified in package.json)

### Architecture Pattern
- **Single-page scroll-based navigation** with hash-based routing (#about, #skills, etc.)
- **Static Site Generation (SSG)** for blog posts from Hashnode
- **Client-Side Rendering (CSR)** for projects from GraphCMS
- **Static data** for skills, work experience, and social handles

---

## Architecture & Tech Stack

### Core Framework
- **Next.js** 12.2.2 (Pages Router, not App Router)
- **React** 18.2.0
- **TypeScript** 4.9.5 (strict mode enabled)

### Styling
- **SASS** 1.35.2
- **CSS Modules** pattern (`*.module.scss`)
- **classnames** library (imported as `cn`) for conditional classes

### Data & APIs
- **GraphQL** 16.3.0 with `graphql-request` 4.2.0
- **Hashnode GraphQL API** for blog posts
- **GraphCMS (Hygraph)** for project data
- **YAML** 2.1.3 for static data parsing

### UI & Animation
- **Framer Motion** 4.1.17 for animations
- **React Icons** 4.2.0 for icon components
- **react-loading-skeleton** 3.1.0 for loading states

### Image Optimization
- Next.js Image component with configured domains:
  - `cdn.hashnode.com` (blog images)
  - `media.graphassets.com` (GraphCMS)
  - `ap-south-1.graphassets.com` (GraphCMS regional)

---

## Project Structure

```
sreejit.dev/
├── pages/                      # Next.js pages (routing)
│   ├── _app.tsx               # Global app wrapper with styles
│   ├── _document.tsx          # Custom HTML document
│   ├── index.tsx              # Main homepage (all sections)
│   └── api/
│       └── hello.ts           # Example API endpoint (unused)
│
├── src/
│   ├── components/            # Reusable React components (10)
│   │   ├── BlogPost/          # Blog post card component
│   │   ├── Footer/            # Site footer
│   │   ├── Layout/            # Layout wrapper (if needed)
│   │   ├── MailButton/        # Contact email button
│   │   ├── Navbar/            # Desktop navigation
│   │   ├── ScrollIndicator/   # Scroll progress indicator
│   │   ├── Section/           # Section wrapper component
│   │   ├── Sidebar/           # Mobile navigation
│   │   ├── Tooltip/           # Custom tooltip system
│   │   └── Workplace/         # Work experience card
│   │
│   ├── context/               # React Context providers (2)
│   │   ├── useGlobalContext/  # Sidebar state & visible section tracking
│   │   └── useTooltipContext/ # Tooltip display management
│   │
│   ├── sections/              # Page section components (6)
│   │   ├── About/             # About section with workplaces
│   │   ├── Blog/              # Blog posts section
│   │   ├── Contact/           # Contact section with social links
│   │   ├── Introduction/      # Hero section
│   │   ├── Projects/          # Projects showcase from GraphCMS
│   │   └── Skills/            # Skills grid
│   │
│   ├── data/                  # Static data files (6)
│   │   ├── blogQuery.ts       # GraphQL query for Hashnode
│   │   ├── navItems.ts        # Navigation items enum & array
│   │   ├── sections.ts        # Section definitions
│   │   ├── skills.tsx         # Skills array with icons
│   │   ├── socialHandles.tsx  # Social media links
│   │   └── work.yaml          # Workplace information (YAML)
│   │
│   ├── services/              # API service layer
│   │   └── index.ts           # GraphCMS service for projects
│   │
│   ├── utils/                 # Utility functions
│   │   └── blogUtils.ts       # Hashnode API fetch utilities
│   │
│   ├── hooks/                 # Custom React hooks (2)
│   │   ├── useScroll.ts       # Scroll position tracking
│   │   └── useWindowDimensions.ts  # Viewport size tracking
│   │
│   └── styles/                # Global styles
│       ├── index.scss         # Main entry (imports globals & variables)
│       ├── _globals.scss      # Global styles, utility classes, reset
│       └── _variables.scss    # CSS custom properties (theme variables)
│
├── public/
│   ├── images/                # Static images
│   │   ├── Sreejit_dp.webp   # Profile photo
│   │   ├── setu.svg          # Company logos
│   │   ├── hashedin.svg
│   │   ├── SidebarIcon.svg
│   │   └── SidebarCloseIcon.svg
│   ├── manifest.json          # PWA manifest
│   └── [favicons]             # Multiple favicon sizes
│
├── package.json               # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration
├── next.config.js             # Next.js configuration
├── .eslintrc                  # ESLint configuration
└── README.md                  # Project README
```

### Directory Responsibilities

- **pages/**: Next.js file-based routing (only uses index.tsx for SPA)
- **src/components/**: Reusable, self-contained UI components
- **src/sections/**: Major page sections (each is a distinct portfolio section)
- **src/context/**: Global state management via React Context
- **src/data/**: Static data files (TS/TSX/YAML)
- **src/services/**: External API integration logic
- **src/utils/**: Helper functions and utilities
- **src/hooks/**: Custom React hooks
- **src/styles/**: Global SASS styles and variables

---

## Development Workflow

### Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
# Opens on http://localhost:3000

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

### Environment Variables

Create a `.env.local` file in the root:

```env
GRAPHCMS_PROJECTS_ENDPOINT=your_graphcms_endpoint_here
```

**Note**: This endpoint is required for the Projects section to load data.

### Build Process

1. **Static Site Generation (SSG)**:
   - Blog posts fetched at build time via `getStaticProps` in `pages/index.tsx`
   - Work info loaded from `src/data/work.yaml` at build time
   - Results in pre-rendered HTML with data

2. **Client-Side Data Fetching**:
   - Projects fetched on component mount in `src/sections/Projects`
   - Loading skeletons shown during fetch

3. **Image Optimization**:
   - Use `next/image` Image component for all images
   - Configure allowed domains in `next.config.js`

### Git Workflow

- **Main branch**: Production-ready code
- **Feature branches**: Use descriptive names (e.g., `feature/add-certifications`)
- **Commit messages**: Clear, concise, imperative mood (e.g., "Add dark mode toggle")

---

## Key Conventions

### File Naming

- **Components/Sections**: PascalCase folder with `index.tsx` and `.module.scss`
  ```
  components/Navbar/
  ├── index.tsx
  ├── Navbar.module.scss
  └── types.ts (if needed)
  ```
- **Data files**: camelCase with `.ts`, `.tsx`, or `.yaml`
- **Utility files**: camelCase with `.ts`

### Import Organization

Follow this order in all files:

```typescript
// 1. Next.js/React imports
import { GetStaticProps } from "next";
import { useState, useEffect } from "react";

// 2. Third-party libraries
import cn from "classnames";
import { motion } from "framer-motion";

// 3. Components
import Navbar from "../components/Navbar";

// 4. Styles
import styles from "./Component.module.scss";

// 5. Data/Utils
import { navItems } from "../data/navItems";
import { fetchPosts } from "../utils/blogUtils";

// 6. Types
import { ComponentType } from "./types";
```

### TypeScript Conventions

1. **Interfaces for Props**: Name with `Type` or `Props` suffix
   ```typescript
   interface ComponentPropsType {
     title: string;
     children: ReactNode;
   }
   ```

2. **Enums for Constants**: Use for navigation items, sections, action types
   ```typescript
   export enum navItemTitles {
     About = "About",
     Skills = "Skills",
     Projects = "Projects",
   }
   ```

3. **Type Aliases for Unions**: Especially for Context actions
   ```typescript
   type Action = SetSidebarAction | SetVisibleSectionAction;
   ```

4. **Refs with MutableRefObject**: For section refs
   ```typescript
   const ref = useRef() as MutableRefObject<HTMLElement>;
   ```

5. **Typed getStaticProps**: Always specify return type
   ```typescript
   export const getStaticProps: GetStaticProps<{
     posts: BlogPostType[];
     workInfo: Record<string, WorkplaceType>;
   }> = async () => { ... }
   ```

### Component Structure

**Standard Component Pattern**:
```typescript
import styles from "./Component.module.scss";
import { ComponentPropsType } from "./types";

interface ComponentPropsType {
  title: string;
}

const Component = ({ title }: ComponentPropsType) => {
  return (
    <div className={styles.container}>
      <h2>{title}</h2>
    </div>
  );
};

export default Component;
```

**Section Component Pattern** (with forwardRef):
```typescript
import { forwardRef } from "react";
import styles from "./Section.module.scss";

interface SectionPropsType {
  data: string[];
}

const Section = forwardRef<HTMLElement, SectionPropsType>(
  ({ data }, ref) => {
    return (
      <section ref={ref} className={styles.section}>
        {/* Content */}
      </section>
    );
  }
);

Section.displayName = "Section";
export default Section;
```

### State Management Pattern

**Context + useReducer**:
```typescript
// Define action types
enum ActionTypes {
  SET_SIDEBAR = "SET_SIDEBAR",
  SET_VISIBLE_SECTION = "SET_VISIBLE_SECTION",
}

// Define actions
type Action =
  | { type: ActionTypes.SET_SIDEBAR; payload: boolean }
  | { type: ActionTypes.SET_VISIBLE_SECTION; payload: string };

// Create reducer
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionTypes.SET_SIDEBAR:
      return { ...state, isSidebarOpen: action.payload };
    default:
      return state;
  }
};

// Provide context
export const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};
```

---

## Data Management

### Data Sources

#### 1. Hashnode Blog (GraphQL API)

**Location**: `src/utils/blogUtils.ts`
**Endpoint**: `https://gql.hashnode.com`
**Usage**: Fetched at build time via `getStaticProps`

```typescript
// Query defined in src/data/blogQuery.ts
export const BLOG_QUERY = `
  query GetPosts {
    publication(host: "blog.sreejit.dev") {
      posts(first: 3) {
        edges {
          node {
            title
            brief
            slug
            coverImage {
              url
            }
          }
        }
      }
    }
  }
`;

// Fetch function
export const fetchPosts = async () => {
  const res = await fetch("https://gql.hashnode.com", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: BLOG_QUERY }),
  });
  const data = await res.json();
  return data.data.publication.posts.edges;
};
```

#### 2. GraphCMS Projects (Headless CMS)

**Location**: `src/services/index.ts`
**Endpoint**: Environment variable `GRAPHCMS_PROJECTS_ENDPOINT`
**Usage**: Client-side fetch on component mount

```typescript
import { GraphQLClient, gql } from "graphql-request";

const client = new GraphQLClient(
  process.env.GRAPHCMS_PROJECTS_ENDPOINT || ""
);

const PROJECTS_QUERY = gql`
  query GetProjects {
    projectsConnection {
      edges {
        node {
          desc
          image { url }
          title
          url
          github
          techStack
        }
      }
    }
  }
`;

export const fetchProjects = async () => {
  const data = await client.request(PROJECTS_QUERY);
  return data.projectsConnection.edges;
};
```

#### 3. YAML Static Data

**Location**: `src/data/work.yaml`
**Usage**: Loaded at build time

```yaml
Setu:
  timeline: "Oct 2021 - Present"
  desc: "Building scalable fintech solutions..."
  logo: "/images/setu.svg"
  current: true
```

**Loading in getStaticProps**:
```typescript
import yaml from "yaml";
import fs from "fs";

const workplacesFile = fs.readFileSync("./src/data/work.yaml", "utf-8");
const workInfo: Record<string, WorkplaceType> = yaml.parse(workplacesFile);
```

#### 4. TypeScript/TSX Static Data

**Examples**:
- `src/data/skills.tsx` - Skills with React Icons
- `src/data/socialHandles.tsx` - Social media links
- `src/data/navItems.ts` - Navigation configuration

```typescript
// Example: src/data/skills.tsx
import { SiTypescript, SiReact } from "react-icons/si";

export const skills = [
  { name: "TypeScript", icon: <SiTypescript /> },
  { name: "React", icon: <SiReact /> },
];
```

### Data Flow Diagram

```
Build Time (SSG):
  Hashnode API → getStaticProps → Blog Section
  work.yaml → getStaticProps → About Section

Runtime (CSR):
  GraphCMS API → useEffect → Projects Section

Static:
  skills.tsx → Skills Section
  socialHandles.tsx → Contact Section
```

---

## Styling Guidelines

### CSS Architecture

**Pattern**: CSS Modules + Global SASS

```
src/styles/
├── index.scss          # Entry point (imports globals & variables)
├── _globals.scss       # Global styles, utilities, CSS reset
└── _variables.scss     # CSS custom properties (theme)
```

### CSS Custom Properties

Defined in `src/styles/_variables.scss`:

```scss
:root {
  // Layout
  --navbar-height: 80px;

  // Colors
  --primary-btn-color: #6d61ee;
  --primary-color: #7569ff;
  --dark-bg: #141414;
  --white-text: #e8e8e8;

  // Typography
  --fs-body: 1.2rem;
  --fs-title: 3rem;

  // Other
  --default-border-radius: 10px;
}
```

### Global Utility Classes

Available from `_globals.scss`:

**Flexbox Utilities**:
- `.flex` - display: flex
- `.flex-col` - flex-direction: column
- `.flex-center` - justify-content + align-items: center
- `.flex-justify-center` - justify-content: center
- `.flex-wrap` - flex-wrap: wrap

**Button Utilities**:
- `.btn` - Base button styles
- `.btn-sm`, `.btn-md`, `.btn-lg` - Size variants
- `.btn-primary` - Primary color

**Text Utilities**:
- `.section-title` - Section heading styles
- `.gradient-text` - Gradient text effect

### CSS Modules Pattern

**File**: `Component.module.scss`

```scss
@use "../../styles/variables" as *;

.container {
  padding: 2rem;
  background: var(--dark-bg);
}

.title {
  font-size: var(--fs-title);
  color: var(--white-text);
}

// BEM-like naming
.card-header {
  display: flex;
}

.card-header-title {
  font-weight: bold;
}
```

**Usage in Component**:
```typescript
import styles from "./Component.module.scss";
import cn from "classnames";

<div className={styles.container}>
  <h2 className={cn(styles.title, "gradient-text")}>Title</h2>
</div>
```

### Responsive Design

**Breakpoint**: 768px (mobile)

```scss
// In module.scss files
.element {
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
}
```

**Conditional Rendering**:
```typescript
import useWindowDimensions from "../../hooks/useWindowDimensions";

const Component = () => {
  const { width } = useWindowDimensions();
  const isMobileView = width <= 768;

  return (
    <>
      {isMobileView ? <MobileNav /> : <DesktopNav />}
    </>
  );
};
```

### Animation with Framer Motion

```typescript
import { motion } from "framer-motion";

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

---

## Component Patterns

### Section Component with Ref

All section components use `forwardRef` for scroll tracking:

```typescript
import { forwardRef } from "react";
import styles from "./Section.module.scss";

interface SectionProps {
  title: string;
}

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ title }, ref) => {
    return (
      <section ref={ref} id="section" className={styles.section}>
        <h2>{title}</h2>
      </section>
    );
  }
);

Section.displayName = "Section";
export default Section;
```

### Page with Section Refs

In `pages/index.tsx`:

```typescript
import { useRef, useMemo, MutableRefObject } from "react";

const Home = () => {
  // Create refs for each section
  const aboutRef = useRef() as MutableRefObject<HTMLElement>;
  const skillsRef = useRef() as MutableRefObject<HTMLElement>;

  // Memoize section refs array
  const sectionRefs = useMemo(
    () => [
      { section: "About", ref: aboutRef },
      { section: "Skills", ref: skillsRef },
    ],
    []
  );

  return (
    <>
      <Navbar refs={sectionRefs} />
      <About ref={aboutRef} />
      <Skills ref={skillsRef} />
    </>
  );
};
```

### Data Fetching Pattern

**Build Time (SSG)**:
```typescript
export const getStaticProps: GetStaticProps<Props> = async () => {
  const data = await fetchData();

  return {
    props: { data },
  };
};
```

**Client Side (CSR)**:
```typescript
const Component = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const result = await fetchData();
      setData(result);
      setLoading(false);
    };
    getData();
  }, []);

  if (loading) return <Skeleton />;

  return <div>{/* Render data */}</div>;
};
```

### Loading States

Use `react-loading-skeleton`:

```typescript
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingSkeleton = () => (
  <div>
    <Skeleton height={200} />
    <Skeleton count={3} />
  </div>
);
```

---

## Common Tasks

### Adding a New Section

1. **Create section component**:
   ```bash
   mkdir src/sections/NewSection
   touch src/sections/NewSection/index.tsx
   touch src/sections/NewSection/NewSection.module.scss
   ```

2. **Implement section with forwardRef**:
   ```typescript
   // src/sections/NewSection/index.tsx
   import { forwardRef } from "react";
   import styles from "./NewSection.module.scss";

   const NewSection = forwardRef<HTMLElement>((props, ref) => {
     return (
       <section ref={ref} className={styles.section}>
         <h2 className="section-title">New Section</h2>
       </section>
     );
   });

   NewSection.displayName = "NewSection";
   export default NewSection;
   ```

3. **Add to navigation** in `src/data/navItems.ts`:
   ```typescript
   export enum navItemTitles {
     // ... existing
     NewSection = "NewSection",
   }

   export const navItems = [
     // ... existing
     { title: navItemTitles.NewSection, href: "#newsection" },
   ];
   ```

4. **Add to homepage** (`pages/index.tsx`):
   ```typescript
   import NewSection from "../src/sections/NewSection";

   const newSectionRef = useRef() as MutableRefObject<HTMLElement>;

   // Add to sectionRefs array
   const sectionRefs = useMemo(
     () => [
       // ... existing
       { section: navItemTitles.NewSection, ref: newSectionRef },
     ],
     []
   );

   // Render in JSX
   <NewSection ref={newSectionRef} />
   ```

### Adding a New Skill

Edit `src/data/skills.tsx`:

```typescript
import { SiNewSkill } from "react-icons/si";

export const skills = [
  // ... existing skills
  {
    name: "New Skill",
    icon: <SiNewSkill />,
  },
];
```

Find icons at: https://react-icons.github.io/react-icons/

### Updating Work Experience

Edit `src/data/work.yaml`:

```yaml
NewCompany:
  timeline: "Jan 2024 - Present"
  desc: "Description of work at new company..."
  logo: "/images/newcompany.svg"
  current: true  # Set to true for current position

# Update previous company
OldCompany:
  current: false  # Set to false when no longer current
```

### Adding a Blog Post

Blog posts are automatically fetched from Hashnode. To show them:
1. Publish on your Hashnode blog (blog.sreejit.dev)
2. Rebuild the site (`npm run build`)
3. The 3 most recent posts will appear

### Adding Social Media Link

Edit `src/data/socialHandles.tsx`:

```typescript
import { SiNewPlatform } from "react-icons/si";

export const socialHandles = [
  // ... existing
  {
    name: "New Platform",
    href: "https://newplatform.com/username",
    icon: <SiNewPlatform />,
  },
];
```

### Updating Images

1. **Add image to** `public/images/`
2. **Use Next.js Image component**:
   ```typescript
   import Image from "next/image";

   <Image
     src="/images/filename.png"
     alt="Description"
     width={500}
     height={300}
     loading="lazy"
   />
   ```

3. **For external images**, add domain to `next.config.js`:
   ```javascript
   images: {
     domains: ["cdn.hashnode.com", "newdomain.com"],
   }
   ```

### Testing Locally

```bash
# Development mode (hot reload)
npm run dev

# Production build test
npm run build
npm start

# Lint check
npm run lint
```

---

## Important Notes

### Do's ✓

1. **Always use TypeScript strict mode** - types are enforced
2. **Use CSS Modules** for component styles - avoid global CSS pollution
3. **Import classnames as cn** - consistent convention
4. **Use forwardRef for sections** - required for scroll tracking
5. **Add displayName to forwardRef components** - for debugging
6. **Memoize section refs** - prevents unnecessary re-renders
7. **Use Next.js Image component** - automatic optimization
8. **Follow import order** - React → Libraries → Components → Styles → Data → Types
9. **Use semantic HTML** - header, nav, main, section, article, footer
10. **Add alt text to images** - accessibility requirement

### Don'ts ✗

1. **Don't create global CSS** - use modules or utilities
2. **Don't skip TypeScript types** - always type props and state
3. **Don't use inline styles** - use CSS modules
4. **Don't import images without Image component** - loses optimization
5. **Don't add external domains without config** - images won't load
6. **Don't commit .env files** - use .env.local (gitignored)
7. **Don't use class components** - use functional components with hooks
8. **Don't skip displayName** - causes warnings in forwardRef
9. **Don't use index as key** - use unique identifiers
10. **Don't fetch at runtime without loading states** - poor UX

### Performance Considerations

1. **Static data is preferred** - faster than API calls
2. **SSG when possible** - better SEO and performance than CSR
3. **Lazy load images** - use `loading="lazy"` prop
4. **Memoize expensive computations** - use useMemo/useCallback
5. **Code splitting is automatic** - Next.js handles it

### Accessibility

1. **Semantic HTML** - use appropriate elements
2. **Alt text** - all images must have descriptive alt text
3. **Keyboard navigation** - ensure all interactive elements are accessible
4. **ARIA labels** - add where semantic HTML isn't enough
5. **Color contrast** - maintain WCAG AA standards

### SEO Considerations

1. **Head component** - use Next.js Head for meta tags
2. **Semantic HTML** - helps search engines understand content
3. **SSG for content** - pre-rendered pages are indexed better
4. **Image alt text** - contributes to SEO
5. **Page titles** - descriptive and unique

### Security

1. **Environment variables** - never commit secrets
2. **Input sanitization** - if adding forms, sanitize inputs
3. **HTTPS only** - enforce secure connections
4. **Dependency updates** - regularly update npm packages
5. **CSP headers** - consider Content Security Policy

### Common Gotchas

1. **GraphCMS endpoint required** - projects won't load without it
2. **Node version matters** - use Node 22.x as specified
3. **Image domains** - must be configured in next.config.js
4. **YAML syntax** - indentation matters in work.yaml
5. **Ref typing** - must cast as MutableRefObject<HTMLElement>
6. **getStaticProps** - only works in pages/, not components
7. **CSS Module naming** - use kebab-case, access with bracket notation
8. **Hashnode publication** - query uses host "blog.sreejit.dev"

---

## Debugging Tips

### Common Issues

**Issue**: Images not loading from external domains
**Solution**: Add domain to `next.config.js` images.domains array

**Issue**: Projects section shows loading forever
**Solution**: Check GRAPHCMS_PROJECTS_ENDPOINT in .env.local

**Issue**: Build fails with "Cannot find module"
**Solution**: Run `npm install` to ensure all dependencies are installed

**Issue**: TypeScript errors about refs
**Solution**: Cast refs as `MutableRefObject<HTMLElement>`

**Issue**: CSS modules not applying
**Solution**: Ensure file is named `*.module.scss` and imported correctly

**Issue**: Scroll tracking not working
**Solution**: Verify refs are passed correctly and sections have IDs

### Useful Development Commands

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check TypeScript errors
npx tsc --noEmit

# Format code (if prettier is added)
npx prettier --write .
```

---

## Contact & Resources

- **Live Site**: https://www.sreejit.dev
- **Blog**: https://blog.sreejit.dev
- **GitHub**: Repository at Sreejit7/sreejit.dev

### External Documentation

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [SASS Guide](https://sass-lang.com/guide)
- [Framer Motion](https://www.framer.com/motion/)
- [GraphQL](https://graphql.org/learn/)
- [Hashnode GraphQL API](https://apidocs.hashnode.com/)

---

**Last Updated**: November 2024
**Document Version**: 1.0

*This document should be updated whenever significant architectural changes are made to the codebase.*
