export interface ClassItem {
    id: string;
    className: string;
    totalPlaces: number;
    seatsLeft: number;
  }
  export type NavbarProps = {
    onMenuClick: () => void;
  };