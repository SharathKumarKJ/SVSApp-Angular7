import { Component, OnInit } from '@angular/core';
import { Fee } from '../fee-detail/fee.model';
import { FeeService } from '../shared/fee.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Class } from '../class-detail/class.model';
import { ClassDetailService } from '../shared/class-detail.service';

@Component({
  selector: 'app-fee-detail-list',
  templateUrl: './fee-detail-list.component.html',
  styleUrls: ['./fee-detail-list.component.scss']
})
export class FeeDetailListComponent implements OnInit {

  Fees: Fee[];
  filterdFee: Fee[];
  feeToDisplay: Fee;
  private arrayIndex: 1;
  dataFromChild: Fee;
  private _searchTerm: string;
  classDetails: Class[];

  get searchTerm(): string {
    return this._searchTerm;
  }
  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filterdFee = this.filterdFees(value);
  }
  constructor(private FeeService: FeeService
    , private _router: Router
    , private _route: ActivatedRoute
    , private classService: ClassDetailService) { }

  ngOnInit() {
    this.GetClasses();
  }

  private GetClasses() {
    this.classService.getClasses().subscribe((data: any) => {
      this.classDetails = data;
    }, (error: any) => { });
  }
  private GetFeesByClass(classId :number) {
    this.FeeService.GetFeesByClass(classId).subscribe((x) => {
      this.Fees = x;
      if (this._route.snapshot.queryParamMap.has('searchTerm')) {
        this.searchTerm = this._route.snapshot.queryParamMap.get('searchTerm');
      }
      else {
        this.feeToDisplay = this.Fees[0];
        this.filterdFee = this.Fees;
      }
    });
  }

  filterdFees(searchTerm: string): Fee[] {

    return this.Fees.filter(x => x.Student.FirstName.toLowerCase().indexOf(searchTerm.toLocaleLowerCase()) != -1)

  }
  nextFee(): void {
    if (this.arrayIndex <= 2) {
      this.feeToDisplay = this.Fees[this.arrayIndex];
      this.arrayIndex++;
    }
    else {
      this.feeToDisplay = this.Fees[0];
      this.arrayIndex = 1;
    }
  }

  handleNotify(eventData: Fee) {
    this.dataFromChild = eventData;
  }

  viewFees(classId: number) {
    this.GetFeesByClass(classId);
  }

  onClick(FeeId: number) {
    this._router.navigate(
      ['/Fee', FeeId]
      , { queryParams: { 'searchTerm': this.searchTerm, 'testParam': 'testvalue' } }
    );

  }


}
