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
    mean_point_logitude: number;
    shape_area_m2: number;
  };
}
