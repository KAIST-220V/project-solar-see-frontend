export interface Loc {
  lat: number;
  lng: number;
}

export interface District {
  name: string;
  center: Loc;
}

export interface MarkerType {
  shape_attributes: {
    mean_point_latitude: number;
    mean_point_longitude: number;
    shape_area_m2: number;
  };
}

export interface PanelInImages {
  all_points_x: number[];
  all_points_y: number[];
}
