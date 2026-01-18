export interface AboutInfo {
  id: number;
  title: string;
  sections: {
    heading: string;
    paragraphs?: string[];
    list?: string[];
  }[];
}
