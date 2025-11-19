import { ImageStore } from "@store";

export interface MultiformProps {
  elements: MultiformElementProps[];
  externalStore?: unknown;
}

export interface MultiformElementProps {
  id: string;
  component: React.ReactNode;
  getNavigationState?: (store?: ImageStore) => Partial<NavigationState>;
}

export interface NavigationState {
  canGoNext: boolean;
  canGoPrev: boolean;
  nextLabel: string;
  prevLabel: string;
}
