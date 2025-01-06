export interface User {
  id: number;
  name: string;
}

export interface ClothingItem {
  id: number;
  userId: number;
  title: string;
  size: string;
  season: 'winter' | 'summer';
  imageUrl: string; // This will now store base64 image data
}