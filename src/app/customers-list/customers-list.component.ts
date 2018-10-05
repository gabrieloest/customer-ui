import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
 
import { CustomerService } from '../customer.service';
import { Customer } from '../customer';
 
@Component({
  selector: 'customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent implements OnInit {
 
  customers: Observable<Customer[]>;
 
  constructor(private customerService: CustomerService) { }
 
  ngOnInit() {
    this.reloadData();
  }
 
  deleteCustomers() {
    this.customerService.deleteAll()
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log('ERROR: ' + error));
  }

  updateActive(isActive: boolean, customer: Customer) {
    this.customerService.updateCustomer(customer.id,
      { name: customer.name, age: customer.age, active: isActive })
      .subscribe(
        data => {
          console.log(data);
          customer = data as Customer;
          this.reloadData();
        },
        error => console.log(error));
  }
 
  deleteCustomer(customer: Customer) {
    this.customerService.deleteCustomer(customer.id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }
 
  reloadData() {
    this.customers = this.customerService.getCustomersList();
  }
}