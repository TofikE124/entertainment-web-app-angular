export interface Title {
  key: string;
  category: 'Movie' | 'TV Series';
  isBookmarked: boolean;
  isTrending: boolean;
  rating: string;
  title: string;
  year: number;
  thumbnail: {
    regular: {
      large: string;
      medium: string;
      small: string;
    };
    trending?: {
      large: string;
      small: string;
    };
  };
}
