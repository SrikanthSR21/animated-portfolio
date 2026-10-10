import { Project, PosterItem, SkillItem, ToolItem, TestimonialItem, AchievementItem } from '../types/portfolio';

// Real high-fidelity image paths generated from storyboards and user video reference
export const HERO_DESIGNER_IMG = '/src/assets/images/hero_designer_neon_1791622126511.jpg';
export const DESIGNER_HEAD_CUTOUT_IMG = '/src/assets/images/designer_head_cutout_1791623909069.jpg';
export const PAPER_BALL_IMG = '/src/assets/images/paper_ball_crumpled_1791623880930.jpg';
export const PAPER_SHEET_IMG = '/src/assets/images/paper_sheet_crinkled_1791623893531.jpg';
export const POSTER_BREATHE_IMG = '/src/assets/images/poster_breathe_red_1791622139749.jpg';
export const POSTER_DREAM_IMG = '/src/assets/images/poster_dream_create_1791622151618.jpg';
export const POSTER_ONE_MORE_SHOT_IMG = '/src/assets/images/poster_one_more_shot_1791622162836.jpg';
export const POSTER_MIND_ELEVATION_IMG = '/src/assets/images/poster_digital_drawing_1791623925242.jpg';
export const SHOWREEL_THUMBNAIL_IMG = '/src/assets/images/showreel_cinematic_street_1791622173574.jpg';

export const FEATURED_PROJECTS: Project[] = [
  {
    id: 'mind-elevation',
    title: 'MIND ELEVATION',
    subtitle: 'Cybernetic Digital Drawing & Key Art',
    category: 'Poster Design',
    year: '2024',
    tools: ['Digital Drawing', 'Adobe Photoshop', 'Procreate'],
    description: 'Intricate digital character drawing combining cyberpunk exoskeletons, vivid neon lime ink splatters, and brutalist typography.',
    fullDescription: 'An experimental digital drawing commissioned for a limited cyber-art exhibition. Synthesizing hand-drawn ink linework with vector typography overlays and electric neon lime palette.',
    process: [
      'High-detail anatomical mechanical pencil & digital linework in Procreate',
      'Layered neon-lime aerosol spray effects and ink spatter passes',
      'Brutalist micro-typography frames and cybernetic tech specs',
      'Final screen-printing halftone texturing in Photoshop'
    ],
    coverImage: POSTER_MIND_ELEVATION_IMG,
    client: 'Cyber Frontier Art Edition',
    metrics: 'Selected for Digital Art Annual 2024',
    accentColor: '#ccff00'
  },
  {
    id: 'breathe-poster',
    title: 'BREATHE',
    subtitle: 'And You Shall Begin Again',
    category: 'Poster Design',
    year: '2024',
    tools: ['Adobe Photoshop', 'Adobe Illustrator', 'Halftone FX'],
    description: 'A visual expression of mental peace and inner resilience through high-contrast typography, explosive crimson particle fields, and tactile paper grain.',
    fullDescription: 'The "Breathe" project explored the intersection of visceral human vulnerability and kinetic brutalist typography. Built as an editorial poster for the Resilience Project 2024, the piece emphasizes heavy distressed lettering contrasted with a luminous crimson silhouette bursting from darkness.',
    process: [
      'Raw human silhouette isolation and anatomical lighting passes',
      'Custom particle burst synthesis and thermal ember mapping in Photoshop',
      'Distressed typography distressing and custom kerning adjustments',
      'Organic paper fold overlay and screen-print halftone generation'
    ],
    coverImage: POSTER_BREATHE_IMG,
    client: 'Resilience Project / Cultural Edition',
    metrics: 'Featured on Behance Top Graphic Design Showcase',
    accentColor: '#ff2d55'
  },
  {
    id: 'dream-create-repeat',
    title: 'DREAM CREATE REPEAT',
    subtitle: 'Urban Tribe Streetwear Poster',
    category: 'Poster Design',
    year: '2024',
    tools: ['Adobe Photoshop', 'Mixed Media Scan', 'Spray Stencils'],
    description: 'A high-energy urban streetwear poster blending gritty photocopier textures, vibrant neon lime spray paint, and layered youth culture collage.',
    fullDescription: 'Created as an authentic creative manifesto for the underground streetwear label Urban Tribe. Combining analog paper cuts, adhesive tape scan textures, and neon spray paint elements to express the relentless momentum of youthful creators.',
    process: [
      'Analog collage composition using scanned wheat-paste photography',
      'Spray stencil hand-vectorization and high-saturation neon pigmenting',
      'Torn paper boundary rendering with accurate physical shadows',
      'Brutalist micro-typography and framing details'
    ],
    coverImage: POSTER_DREAM_IMG,
    client: 'Urban Tribe Apparel',
    metrics: 'Over 12,000 prints distributed across Berlin & Tokyo',
    accentColor: '#ccff00'
  },
  {
    id: 'one-more-shot',
    title: 'ONE MORE SHOT',
    subtitle: 'Cyberpunk Cinema Key Art',
    category: 'Video & Motion',
    year: '2024',
    tools: ['Adobe Premiere Pro', 'After Effects', 'Photoshop'],
    description: 'Cinematic key visual and promotional motion art for an indie sci-fi narrative set against atmospheric rain-slicked megacity streets.',
    fullDescription: 'Commissioned by Premia Studios for director Eliza Vance\'s cyberpunk thriller "One More Shot". Developed both the master theatrical poster and animated title sequences, focusing on deep atmospheric cyan lighting, rain reflections, and aggressive anamorphic flares.',
    process: [
      'Volumetric street plate composite with multi-layer depth grading',
      'Anamorphic horizontal streak and atmospheric rain simulation',
      'Custom sharp display typography with electric cyan edge highlights',
      'Motion graphics title treatment for theatrical teaser'
    ],
    coverImage: POSTER_ONE_MORE_SHOT_IMG,
    client: 'Premia Studios / Eliza Vance',
    metrics: 'Official key visual for festival release 2024',
    accentColor: '#00d2ff'
  }
];

export const POSTER_COLLECTION: PosterItem[] = [
  {
    id: 'poster-mind-elevation',
    title: 'MIND ELEVATION',
    year: '2024',
    software: 'Digital Drawing / Photoshop',
    description: 'Complex digital linework and cyber character drawing with neon lime aerosol splatters.',
    concept: 'Exploring the symbiosis of digital human consciousness and brutalist mechanical armor.',
    image: POSTER_MIND_ELEVATION_IMG,
    colorAccent: '#ccff00',
    tags: ['Digital Drawing', 'Cyberpunk', 'Character Key Art'],
    dimensions: '70 × 100 cm',
    initialRotation: -3
  },
  {
    id: 'poster-dream',
    title: 'DREAM CREATE REPEAT',
    year: '2024',
    software: 'Adobe Photoshop / Mixed Media',
    description: 'A motivational poster design with raw urban collage, torn paper creases, and vibrant neon lime spray stencils.',
    concept: 'Explores the daily cycle of relentless creation, unfiltered youth culture, and analog-digital fusion.',
    image: POSTER_DREAM_IMG,
    colorAccent: '#ccff00',
    tags: ['Urban Streetwear', 'Torn Paper', 'Spray Paint'],
    dimensions: '70 × 100 cm',
    initialRotation: -4
  },
  {
    id: 'poster-breathe',
    title: 'BREATHE',
    year: '2024',
    software: 'Adobe Photoshop / Illustrator',
    description: 'Gritty crimson silhouette poster celebrating mental fortitude and rising above chaos through focused calm.',
    concept: 'Inner stillness manifested through burning embers and brutalist editorial typography.',
    image: POSTER_BREATHE_IMG,
    colorAccent: '#ff2d55',
    tags: ['Typography', 'Halftone', 'Crimson Embers'],
    dimensions: '50 × 70 cm',
    initialRotation: 3
  },
  {
    id: 'poster-onemoreshot',
    title: 'ONE MORE SHOT',
    year: '2024',
    software: 'Photoshop / After Effects',
    description: 'Atmospheric neo-noir sci-fi theatrical key art with wet pavement reflections and anamorphic blue flares.',
    concept: 'The tension of isolation in an overcrowded dystopian metropolis under ceaseless rain.',
    image: POSTER_ONE_MORE_SHOT_IMG,
    colorAccent: '#00d2ff',
    tags: ['Cinema Key Art', 'Cyberpunk', 'Volumetric'],
    dimensions: '60 × 90 cm',
    initialRotation: -2
  }
];

export const SKILLS_LIST: SkillItem[] = [
  {
    name: 'Graphic Design',
    percentage: 90,
    category: 'Core Discipline',
    highlight: 'Composition, layout systems, hierarchy, and editorial storytelling'
  },
  {
    name: 'Photo Editing',
    percentage: 85,
    category: 'Image Manipulation',
    highlight: 'Advanced color grading, frequency separation, and composite realism'
  },
  {
    name: 'Video Editing',
    percentage: 75,
    category: 'Post-Production',
    highlight: 'Rhythm cuts, sound design sync, cinematic pacing, and color timing'
  },
  {
    name: 'Motion Graphics',
    percentage: 80,
    category: 'Animation & 3D',
    highlight: 'Kinetic typography, 3D element integration, and brand micro-motion'
  }
];

export const SOFTWARE_TOOLS: ToolItem[] = [
  {
    name: 'Photoshop',
    abbr: 'Ps',
    category: 'Raster & Composite',
    color: '#001e36',
    textColor: '#31a8ff',
    description: 'Mastery of composite artwork, paper crease simulation, and high-impact key art.'
  },
  {
    name: 'Illustrator',
    abbr: 'Ai',
    category: 'Vector & Identity',
    color: '#330000',
    textColor: '#ff9a00',
    description: 'Precision vector logos, bespoke typographic treatments, and geometric icons.'
  },
  {
    name: 'Premiere Pro',
    abbr: 'Pr',
    category: 'Video Editing',
    color: '#330033',
    textColor: '#ea77ff',
    description: 'Editorial pacing, dynamic narrative assembly, multi-cam sync, and mastering.'
  },
  {
    name: 'After Effects',
    abbr: 'Ae',
    category: 'Motion Design',
    color: '#00005b',
    textColor: '#9999ff',
    description: 'Kinetic typography, motion tracking, particle simulations, and title sequences.'
  },
  {
    name: 'Lightroom',
    abbr: 'Lr',
    category: 'Color & Tone',
    color: '#001f28',
    textColor: '#31a8ff',
    description: 'Film emulation, precision curves, chromatic grading, and unified batch palettes.'
  },
  {
    name: 'Figma',
    abbr: 'Fg',
    category: 'UI & Systems',
    color: '#1e1e1e',
    textColor: '#0acf83',
    description: 'Responsive interactive portfolio architectures, design tokens, and components.'
  },
  {
    name: 'Blender',
    abbr: 'Bl',
    category: '3D & Physics',
    color: '#261b0c',
    textColor: '#e87d0d',
    description: 'Cloth and paper physics simulations, product mockups, and dimensional lighting.'
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'test-1',
    name: 'Marcus Vance',
    role: 'Creative Director',
    company: 'Vanguard Media Studio',
    quote: 'Alex brings an unmistakable kinetic energy to every poster and brand project. His command over physical paper textures and neon typography produces work that commands attention in any gallery.',
    year: '2024'
  },
  {
    id: 'test-2',
    name: 'Elena Rostova',
    role: 'Producer & Key Art Lead',
    company: 'Premia Studios',
    quote: 'Working with Alex on "One More Shot" was seamless. He didn\'t just design a movie poster—he built an entire atmospheric visual universe that set the tone for our worldwide campaign.',
    year: '2024'
  },
  {
    id: 'test-3',
    name: 'David Chen',
    role: 'Brand Architect',
    company: 'Nexa Mobility',
    quote: 'Rarely do you find a designer who balances raw streetwear experimentation with pristine corporate discipline. The identity system Alex created continues to turn heads.',
    year: '2023'
  }
];

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    title: 'Behance Best of Graphic Design',
    organization: 'Behance Curators Choice',
    year: '2024',
    badge: 'Curated'
  },
  {
    title: 'Site of the Day Nominee',
    organization: 'Awwwards Interactive',
    year: '2024',
    badge: 'Nominee'
  },
  {
    title: '50+ Poster Commissions',
    organization: 'International Independent Labels',
    year: '2023 - 2024',
    badge: 'Milestone'
  },
  {
    title: 'Young Visual Artist Grant',
    organization: 'Urban Culture Alliance',
    year: '2023',
    badge: 'Award'
  }
];
