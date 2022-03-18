import { Component, OnInit } from '@angular/core';
import { Draft, DraftPick, DraftTeam } from '../data';
import { DraftService } from '../draft.service';

@Component({
  selector: 'app-drafts',
  templateUrl: './drafts.component.html',
  styleUrls: ['./drafts.component.scss']
})
export class DraftsComponent implements OnInit {
  drafts: Draft[];
  selectedDraftPicks: DraftPick[];
  selectedDraft: Draft;
  selectedDraftDetail: Draft;
  availableDraftPicks: DraftPick[][];

  constructor(private draftService: DraftService) { }

  ngOnInit(): void {
    this.getDrafts();
  }

  getDraft(): void {
    this.draftService.getDraft(this.selectedDraft.id).subscribe(draft => this.selectedDraftDetail = draft);
  }

  getDrafts(): void {
    this.draftService.getDrafts(1).subscribe(drafts => this.drafts = drafts);
  }

  getDraftPicks(): void {
    this.draftService.getDraftPicks(this.selectedDraft.id).subscribe(draftPicks => {
      this.selectedDraftPicks = draftPicks;
      this.chunkSelectedDraftPicks(10);
    });
  }

  changeDraft(): void {
    this.getDraft();
    this.getDraftPicks();
  }

  chunkSelectedDraftPicks(chunkSize: number): void {
    this.availableDraftPicks = [];
    let availablePicks: DraftPick[] = this.selectedDraftPicks.filter((pick, index, array) => !(['Assigned', 'MIA'].includes(pick.pick_status)));
    for (let i = 0; i < availablePicks.length; i += chunkSize) {
      this.availableDraftPicks.push(availablePicks.slice(i, i+chunkSize));
    }
  }

  counter(n: number) {
    let arr = [];
    for (let i = 0; i < n; i++) {
      arr.push(i);
    }
    return arr;
  }

}
