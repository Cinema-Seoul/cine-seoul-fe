declare module "api:domain" {
  type YN = "Y" | "N" | "C";
  type YNC = "Y" | "N" | "C";

  namespace Api {
    export type UniqueNum = number;

    export type TrueOrFalse = YN;
    export type TicketState = YNC;
    export type PayState = YNC;
    
    export type ReleaseDate = string;
  }
}
