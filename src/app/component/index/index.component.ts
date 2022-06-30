import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  Employees: any[] = [];
  el!: any;
  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.Employees = [
      'Employee 1',
      'Employee 2',
      'Employee 3',
      'Employee 4',
      'Employee 5',
    ];
  }

  addRow() {
    this.el = this.elementRef.nativeElement;
    let options: string;
    this.Employees.forEach((emp) => {
      options += `<option value="${emp}">${emp}</option>`;
    });
    const parent = this.renderer.selectRootElement('#employee-container', true);
    setTimeout(() => {
      const row = `<div class="d-flex align-items-center employee-item">
                      <div class="d-flex me-3">
                        <div class="form-group mb-2 me-3">
                          <label>Employee</label>
                          <select class="form-control employee">
                            <option value="" selected>-- Select --</option>
                            ${options}
                          </select>
                        </div>
                        <div class="form-group mb-2">
                          <label>Estimate</label>
                          <input type="number" class="form-control txtEstimate" placeholder="Enter estimate">
                        </div>
                      </div>
                      <div>
                        <button (click)="removeRow($event)" type="button" class="btn btn-danger remove-element mt-3">-</button>
                      </div>
                    </div>`;
      parent.insertAdjacentHTML('beforeend', row);

      const newRow: HTMLElement[] = this.el.querySelectorAll('.remove-element');

      for (const row of newRow) {
        row.addEventListener('click', this.removeRow.bind(this));
      }
    }, 50);
  }

  saveRecord() {
    this.el = this.elementRef.nativeElement;
    const totalEstimate = Number(
      this.el.querySelector('#txtTotalEstimate').value
    );
    const items = this.el.querySelectorAll('.employee-item');
    const task = this.el.querySelector('#txtTask').value;
    const employeeRecord = [];
    let ctr = 0;
    let hasElementEmpty = false;

    for (const item of items) {
      const estimate = item.querySelector('.txtEstimate').value;
      const employee = item.querySelector('.employee').value;
      ctr += Number(estimate) || 0;
      employeeRecord.push({ employee, estimate });

      if (this.isEmpty(estimate) || this.isEmpty(employee)) {
        hasElementEmpty = true;
      }
    }

    if (
      !this.isEmpty(task) &&
      !this.isEmpty(totalEstimate) &&
      !hasElementEmpty
    ) {
      if (totalEstimate === ctr) {
        const payload = {
          task,
          totalEstimate,
          employeeRecord,
        };

        //api for add record here
        console.log(payload);
        alert("Add now the record!");
      } else {
        alert('Total estimates is not equal to the employee estimates');
      }
    } else {
      alert('Fill up all the fields!');
    }
  }

  private isEmpty(txt: string | number) {
    return txt === '';
  }

  private removeRow(e: MouseEvent) {
    const target = e.target as HTMLElement;
    const row = target.closest('.employee-item');
    const parent = this.el.querySelector('#employee-container');
    this.renderer.removeChild(parent, row, true);
  }
}
