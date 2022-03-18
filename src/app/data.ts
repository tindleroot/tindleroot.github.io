export interface Draft {
    draft_name: string;
    league_id: number;
    rounds: number;
    open_time: string;
    id: number;
    scores_finalized: boolean;
    draft_type: string;
    draft_key: string;
    teams: DraftTeam[];
}

export interface DraftTeam {
    slot: number;
    team_short: string;
    score: number;
    picks: DraftPick[];
}

export interface DraftPick {
    pick_id: string;
    pick_status: string;
    assigned_team_id: number;
    assigned_team_slot: number;
    waiver_expiry: any;
    score: number;
}
