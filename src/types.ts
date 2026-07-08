export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  image: string;
  size: 'large' | 'small';
  isHighlighted?: boolean;
  description?: string;
}

export interface ExhibitionItem {
  id: string;
  index: string;
  title: string;
  location: string;
  date: string;
}

export interface Statistic {
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
}

export interface SocialLink {
  id: string;
  label: string;
  url: string;
}
