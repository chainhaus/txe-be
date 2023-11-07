export class Affiliate {
  requested_by_client_id: number;
  requested_of_client_id: number;
  rev_share_pct: number;
  authorized: boolean;

  constructor(partial: Partial<Affiliate>) {
    Object.assign(this, partial);
  }
}
