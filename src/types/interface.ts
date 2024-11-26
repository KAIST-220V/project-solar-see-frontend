export interface Loc {
  lat: number;
  lng: number;
}

export interface District {
  name: string;
  center: Loc;
}

export interface MarkerType {
  latitude: number;
  longitude: number;
  area_m2: number;
  image_url: string;
  id: number;
}

export interface PanelInImages {
  all_points_x: number[];
  all_points_y: number[];
}
