import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Fee } from '../fee-detail/fee.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fee-detail-view',
  templateUrl: './fee-detail-view.component.html',
  styleUrls: ['./fee-detail-view.component.scss']
})
export class FeeDetailViewComponent implements OnInit {

  @Input() fee: Fee;
  @Output() notify: EventEmitter<Fee> = new EventEmitter<Fee>();
  private selectFeeId: number;
  constructor(private _route: ActivatedRoute) { }

  ngOnInit() {
    this.selectFeeId = +this._route.snapshot.paramMap.get('Id');
  }

  handleClick() {
    this.notify.emit(this.fee);
  }
}
