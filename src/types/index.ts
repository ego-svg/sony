export interface NavItem {
  id: string;
  label: string;
  badge?: string;
}

export interface SpecCategory {
  title: string;
  items: {
    label: string;
    value: string;
  }[];
}

export interface ChapterData {
  chapterNumber: string;
  totalChapters: string;
  kicker: string;
  headline: string;
  headlineSecondLine?: string;
  body: string;
  ctaText: string;
  specValue?: string;
  specUnit?: string;
  specBadge: string;
  stageTitle: string;
}

export interface SampleImage {
  id: string;
  title: string;
  category: string;
  src: string;
  originalFileName: string;
  description: string;
  specs: {
    iso: string;
    shutter: string;
    aperture: string;
    lens: string;
    format: string;
  };
}
