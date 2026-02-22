interface HeroDataRecord {
  title: string;
  subtitle: string;
  description: string;
  image?: { url: string }[];
  video?: string | null;
}
