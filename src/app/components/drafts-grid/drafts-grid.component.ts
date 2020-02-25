import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { Subject, forkJoin } from 'rxjs';
import { AgGridCellValueFormatters } from '../transaction-grid/ag-grid-value-formatters';
import { AllocationInfoWithPrice, AllocationInfo } from 'src/app/models/allocations';
import { UserService } from 'src/app/services/user.service';
import { StocksService } from 'src/app/services/stocks.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-drafts-grid',
  templateUrl: './drafts-grid.component.html',
  styleUrls: ['./drafts-grid.component.css']
})
export class DraftsGridComponent implements OnInit {
  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
  @Input() symbol = '';
  private trash = new Subject();

  assets: Array<any>;
  priceFormatter = AgGridCellValueFormatters.priceFormatter;

  constructor(private userService: UserService, private stocksService: StocksService, private transactionService: TransactionService,
    private toastr: ToastrService) { }

  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit() {
    if (this.agGrid) {
      this.agGrid.api.addEventListener('rowDataChanged', () => {
        this.agGrid.api.sizeColumnsToFit();
      });
      this.agGrid.api.sizeColumnsToFit();
    }
  }

  ngOnInit() {
    this.fetchData();
  }
  ngOnDestroy() {
    this.trash.next();
    this.trash.complete();
  }
  fetchData() {
    this.userService.getDrafts()
      .subscribe((res) => {
        console.log(res);
        this.assets = res;
      }, (err) => {
        console.log(err);
      });
  }
  openBuySellPopup() {
    for (let index = 0; index < this.assets.length; index++) {
      const ele = this.assets[index];
      ele.side = 'BUY';
      this.transactionService.makeTransaction(ele);
    }
    this.userService.deleteDrafts().subscribe(
      (res) => {
        console.log(res);
        this.assets = [];
        this.toastr.success('Success', 'Drafts put to market successfully');
      }, (err) => {
        this.toastr.error('Error', 'Something went wrong');
      }
    );

  }
}
